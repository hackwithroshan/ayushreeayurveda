
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');
const ActivityLog = require('../models/ActivityLog');
// Fix: Added missing model and service imports for the new tracking route
const AnalyticsEvent = require('../models/AnalyticsEvent');
const { sendCapiEvent } = require('../utils/facebookCapiService');
const { protect, admin } = require('../middleware/authMiddleware');

// @desc    Get analytics summary for admin dashboard
// @route   GET /api/analytics/dashboard-summary
router.get('/dashboard-summary', protect, admin, async (req, res) => {
    try {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        
        // Basic Stats
        const [orders, customers, logs] = await Promise.all([
            Order.find({ status: { $ne: 'Cancelled' } }),
            User.find({ role: 'User' }),
            ActivityLog.find().sort({ createdAt: -1 }).limit(10)
        ]);

        const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
        const thisMonthRevenue = orders
            .filter(o => o.date >= startOfMonth)
            .reduce((sum, o) => sum + o.total, 0);

        res.json({
            kpis: {
                totalRevenue: { value: totalRevenue, growth: 12.5 },
                totalOrders: { value: orders.length, growth: 8.2 },
                newCustomers: { value: customers.length, growth: 4.1 },
                avgOrderValue: { value: orders.length > 0 ? (totalRevenue / orders.length).toFixed(0) : 0, growth: 2.3 }
            },
            logs: logs.map(l => ({
                userName: l.userName || 'System',
                action: l.action,
                target: l.target,
                details: l.details,
                createdAt: l.createdAt
            }))
        });
    } catch (error) {
        res.status(500).json({ message: 'Analytics failed' });
    }
});

// @desc    Track user events (dual browser/server events)
// @route   POST /api/analytics/track
// Fix: Added missing track route called by frontend utils/analytics.ts
router.post('/track', async (req, res) => {
    try {
        const { eventType, eventId, fbp, fbc, ...customData } = req.body;
        
        // 1. Save to internal database for business intelligence and admin charts
        await AnalyticsEvent.create({
            eventType,
            path: req.body.path,
            source: req.body.source,
            utm: req.body.utm,
            data: customData
        });

        // 2. Trigger Meta Conversion API (CAPI)
        // This ensures tracking works even if browser pixels are blocked
        await sendCapiEvent({
            eventName: eventType,
            eventUrl: `${process.env.FRONTEND_URL || 'http://localhost:3000'}${req.body.path || ''}`,
            eventId: eventId,
            userData: {
                ip: req.ip,
                userAgent: req.headers['user-agent'],
                fbp: fbp,
                fbc: fbc,
                // Optional: If user is logged in, pass identifiable info for better matching
                email: req.user?.email,
                phone: req.user?.phone
            },
            customData: customData
        });

        res.status(200).json({ status: 'ok' });
    } catch (error) {
        console.error('Analytics tracking endpoint error:', error);
        // Always return 200 to the frontend tracking calls to avoid console errors for users
        res.status(200).json({ status: 'error', message: 'Logged internally' });
    }
});

module.exports = router;


import React from 'react';
import * as ReactRouterDom from 'react-router-dom';
const { Link } = ReactRouterDom as any;
import { useSiteData } from '../contexts/SiteDataContext';

const SocialIcon = ({ platform }: { platform: string }) => {
    const p = platform.toLowerCase();
    if (p === 'instagram') return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c.796 0 1.441.645 1.441 1.44s-.645 1.44-1.441 1.44c-.795 0-1.439-.645-1.439-1.44s.644-1.44 1.439-1.44z"/></svg>;
    if (p === 'facebook') return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>;
    if (p === 'youtube') return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>;
    if (p === 'twitter' || p === 'x') return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
    return <span className="text-[10px] font-bold uppercase">{platform[0]}</span>;
};

const Footer: React.FC = () => {
  const { footerSettings, siteSettings, loading } = useSiteData();

  if (loading) return null;

  const BrandName = siteSettings?.storeName || "Ayushree Ayurveda";
  const bgStyle: React.CSSProperties = {
      backgroundColor: footerSettings.backgroundColor || 'var(--brand-primary)',
      backgroundImage: footerSettings.backgroundImage ? `url(${footerSettings.backgroundImage})` : 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative'
  };

  const overlayStyle: React.CSSProperties = {
      position: 'absolute',
      inset: 0,
      backgroundColor: footerSettings.overlayColor || '#000000',
      opacity: (footerSettings.overlayOpacity || 0) / 100,
      zIndex: 1
  };

  return (
    <footer style={bgStyle} className="text-white overflow-hidden">
      {/* Dynamic Overlay */}
      <div style={overlayStyle}></div>

      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-16">
          
          {/* Brand Info Column */}
          <div className="col-span-1 space-y-8">
            <Link to="/" className="inline-block">
                {footerSettings.logoUrl ? (
                    <img src={footerSettings.logoUrl} alt={BrandName} className="h-10 md:h-12 w-auto object-contain" />
                ) : (
                    <h2 className="text-3xl font-brand font-black italic tracking-tighter uppercase">{BrandName}</h2>
                )}
            </Link>
            
            <p className="text-gray-300/90 text-sm leading-relaxed font-medium">
              {footerSettings.brandDescription || `Reviving ancient secrets for your daily health at ${BrandName}. Our products are ethically sourced and 100% natural.`}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
                {footerSettings.socialLinks.map((s, i) => (
                    <a 
                        key={i} 
                        href={s.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-brand-accent hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                        title={s.platform}
                    >
                        <SocialIcon platform={s.platform} />
                    </a>
                ))}
            </div>
          </div>
          
          {/* Dynamic Navigation Columns */}
          {footerSettings.columns.map((col, idx) => (
              <div key={idx}>
                <h3 className="text-[11px] font-black text-brand-accent tracking-[0.3em] uppercase mb-8">{col.title}</h3>
                <ul className="space-y-4">
                    {col.links.map((link, lIdx) => (
                        <li key={lIdx}>
                            <Link to={link.url} className="text-sm text-gray-300 hover:text-white transition-colors block font-medium">
                                {link.text}
                            </Link>
                        </li>
                    ))}
                </ul>
              </div>
          ))}
        </div>
        
        {/* Sub-Footer */}
        <div className="mt-10 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
             <p>{footerSettings.copyrightText || `© ${new Date().getFullYear()} ${BrandName}. All Rights Reserved.`}</p>
             <div className="hidden md:flex gap-6">
                <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Safe & Secure</span>
                <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Quality Assured</span>
             </div>
          </div>

          <div className="flex items-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
             <img src="https://cdn-icons-png.flaticon.com/512/349/349221.png" className="h-5" alt="Visa" />
             <img src="https://cdn-icons-png.flaticon.com/512/349/349228.png" className="h-5" alt="Mastercard" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1200px-UPI-Logo-vector.svg.png" className="h-3" alt="UPI" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

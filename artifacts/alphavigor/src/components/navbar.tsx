import { ChevronDown, MessageCircle, Send, Mail, Instagram } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { products, BRANDS } from '@/data/products';
import { useSiteConfig } from '@/contexts/SiteConfigContext';
import { assetUrl } from '@/lib/assetUrl';

const productsByBrand = BRANDS.filter(b => b !== 'All').map(brand => ({
  brand,
  items: products.filter(p => p.brand === brand),
}));

export function Navbar() {
  const { contact } = useSiteConfig();
  const WHATSAPP  = `https://wa.me/${contact.whatsapp}?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20your%20pharmaceutical%20export%20catalogue`;
  const TELEGRAM  = `https://t.me/${contact.telegram}`;
  const EMAIL     = `mailto:${contact.email}?subject=Export%20Enquiry&body=Hi%2C%20I%27d%20like%20to%20enquire%20about%20your%20pharmaceutical%20export%20catalogue.`;
  const INSTAGRAM = `https://instagram.com/alpha_vigorrr`;

  const [dropdownOpen,  setDropdownOpen]  = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [scrolled,      setScrolled]      = useState(false);
  const [expandedBrand, setExpandedBrand] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMobile = () => { setMobileOpen(false); setExpandedBrand(null); };

  return (
    <>
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-white shadow-sm border-b border-gray-100' : 'bg-white border-b border-gray-50'}`}>
        <div className="container mx-auto px-4 md:px-6 h-[68px] flex items-center justify-between gap-6">

          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 shrink-0 group">
            <img src={assetUrl('/images/logo.png')} alt="AlphaVigor" className="h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            <span className="font-extrabold text-[22px] tracking-tight text-[#0f1f3d]">AlphaVigor</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(prev => !prev)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${dropdownOpen ? 'bg-[#0f1f3d]/5 text-[#0f1f3d]' : 'text-gray-600 hover:text-[#0f1f3d] hover:bg-gray-50'}`}
              >
                Products
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[720px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                  <div className="p-6">
                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-5 flex items-center justify-between">
                      <span>Browse by Brand</span>
                      <a href="#products" onClick={() => setDropdownOpen(false)} className="text-[#0f1f3d] text-[10px] font-black uppercase tracking-widest hover:underline">View All →</a>
                    </div>
                    <div className="grid grid-cols-4 gap-6">
                      {productsByBrand.map(({ brand, items }) => (
                        <div key={brand}>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#0f1f3d] shrink-0" />
                            <h4 className="text-xs font-black text-[#0f1f3d] uppercase tracking-wider">{brand}</h4>
                          </div>
                          <ul className="space-y-1.5">
                            {Array.from(new Map(items.map(p => [p.name, p])).values()).slice(0, 8).map(p => (
                              <li key={p.id}>
                                <a href="#products" onClick={() => setDropdownOpen(false)} className="text-[13px] text-gray-500 hover:text-[#0f1f3d] font-medium transition-colors leading-snug block py-0.5">
                                  {p.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-gray-100 px-6 py-4 bg-gray-50 flex items-center justify-between">
                    <p className="text-xs text-gray-400 font-medium">30+ export-ready presentations available</p>
                    <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 bg-[#25D366] text-white text-xs font-bold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                      <MessageCircle className="h-3.5 w-3.5" />
                      WhatsApp for Full List
                    </a>
                  </div>
                </div>
              )}
            </div>

            <a href="#standards" className="px-4 py-2 rounded-lg text-sm font-bold text-gray-600 hover:text-[#0f1f3d] hover:bg-gray-50 transition-colors">Standards</a>
            <a href="#contact"   className="px-4 py-2 rounded-lg text-sm font-bold text-gray-600 hover:text-[#0f1f3d] hover:bg-gray-50 transition-colors">Contact</a>
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <a href={EMAIL} className="flex items-center gap-2 bg-[#0f1f3d] text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-[#1a3a6b] active:scale-95 transition-all">
              <Mail className="h-4 w-4" />
              Enquire Now
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden flex flex-col items-center justify-center gap-[5px] h-10 w-10 rounded-xl hover:bg-gray-100 active:scale-90 transition-all duration-150"
            aria-label="Open menu"
          >
            <span className="block h-[1.5px] w-[22px] bg-[#0f1f3d] rounded-full" />
            <span className="block h-[1.5px] w-[22px] bg-[#0f1f3d] rounded-full" />
            <span className="block h-[1.5px] w-[14px] bg-[#0f1f3d] rounded-full self-start ml-[4px]" />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-[200] flex flex-col bg-white">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
            <a href="#" onClick={closeMobile} className="flex items-center gap-2.5">
              <img src={assetUrl('/images/logo.png')} alt="AlphaVigor" className="h-8 w-auto object-contain"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              <span className="font-extrabold text-xl tracking-tight text-[#0f1f3d]">AlphaVigor</span>
            </a>
            <button onClick={closeMobile} className="flex items-center justify-center h-10 w-10 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 active:scale-90 transition-all" aria-label="Close menu">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-[#0f1f3d]">
                <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-400 mb-5">Browse Products</p>
            {productsByBrand.map(({ brand, items }) => {
              const uniqueItems = Array.from(new Map(items.map(p => [p.name, p])).values());
              const isExpanded  = expandedBrand === brand;
              return (
                <div key={brand} className="mb-2 rounded-2xl border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => setExpandedBrand(isExpanded ? null : brand)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left active:bg-gray-50 transition-colors"
                  >
                    <span className="font-bold text-[#0f1f3d] text-[15px] tracking-tight">{brand}</span>
                    <div className="flex items-center gap-2.5">
                      <span className="text-[11px] text-gray-400 font-semibold">{uniqueItems.length} products</span>
                      <div className={`h-5 w-5 rounded-full border border-gray-200 flex items-center justify-center transition-transform duration-200 ${isExpanded ? 'rotate-180 bg-[#0f1f3d] border-[#0f1f3d]' : ''}`}>
                        <ChevronDown className={`h-3 w-3 ${isExpanded ? 'text-white' : 'text-gray-400'}`} />
                      </div>
                    </div>
                  </button>
                  {isExpanded && (
                    <div className="border-t border-gray-100 bg-gray-50/50 px-5 pb-4">
                      <ul className="pt-3 space-y-0.5">
                        {uniqueItems.map(p => (
                          <li key={p.id}>
                            <a href="#products" onClick={closeMobile} className="flex items-start py-2.5 px-2 rounded-xl hover:bg-white active:bg-white transition-colors group">
                              <div>
                                <span className="block text-sm font-semibold text-[#0f1f3d] group-hover:text-[#0f3a8c] transition-colors">{p.name}</span>
                                <span className="block text-xs text-gray-400 mt-0.5">{p.form}</span>
                              </div>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="shrink-0 border-t border-gray-100 px-5 py-4 bg-white">
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 text-center mb-3.5">Connect with export desk</p>
            <div className="grid grid-cols-2 gap-2">
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" onClick={closeMobile}
                className="flex flex-col items-center gap-1.5 py-3 rounded-2xl bg-[#25D366]/10 text-[#1a9e4f] font-bold text-[11px] active:scale-95 transition-all">
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </a>
              <a href={TELEGRAM} target="_blank" rel="noopener noreferrer" onClick={closeMobile}
                className="flex flex-col items-center gap-1.5 py-3 rounded-2xl bg-[#0088cc]/10 text-[#0070a8] font-bold text-[11px] active:scale-95 transition-all">
                <Send className="h-5 w-5" />
                Telegram
              </a>
              <a href={EMAIL} onClick={closeMobile}
                className="flex flex-col items-center gap-1.5 py-3 rounded-2xl bg-[#0f1f3d]/8 text-[#0f1f3d] font-bold text-[11px] active:scale-95 transition-all">
                <Mail className="h-5 w-5" />
                Email
              </a>
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" onClick={closeMobile}
                className="flex flex-col items-center gap-1.5 py-3 rounded-2xl bg-[#e1306c]/10 text-[#c01f5a] font-bold text-[11px] active:scale-95 transition-all">
                <Instagram className="h-5 w-5" />
                Instagram
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

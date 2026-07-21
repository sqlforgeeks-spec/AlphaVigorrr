import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ArrowRight } from 'lucide-react';
import { ripple } from '@/lib/ripple';
import { assetUrl } from '@/lib/assetUrl';

const TRUST_CHECKS = [
  '100% Authentic', 'Best Prices', 'Worldwide Shipping',
  'Bulk Orders',    'Discreet Packaging', 'Fast Delivery',
];

const SLIDES = [
  { name: 'AlphaVigor', compound: 'Premium Export',  accent: '#c9930a', image: assetUrl('/images/carousel-1.png') },
  { name: 'Fildena',    compound: 'Sildenafil',       accent: '#7b2cbf', image: assetUrl('/images/carousel-2.jpg') },
  { name: 'Vidalista',  compound: 'Tadalafil',        accent: '#1a5fb4', image: assetUrl('/images/carousel-3.jpg') },
  { name: 'Vilitra',    compound: 'Vardenafil',        accent: '#b45309', image: assetUrl('/images/carousel-4.jpg') },
  { name: 'Cenforce',   compound: 'Sildenafil',        accent: '#15803d', image: assetUrl('/images/carousel-5.png') },
];

export function Hero() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent(p => (p + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCurrent(p => (p - 1 + SLIDES.length) % SLIDES.length), []);

  // Auto-advance — always running
  useEffect(() => {
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
  }, [next]);

  // Touch-swipe support
  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) delta < 0 ? next() : prev();
    touchStartX.current = null;
  };

  const slide = SLIDES[current];

  return (
    <section
      className="relative overflow-hidden bg-[#0b1628]"
      style={{ minHeight: 'min(62vh, 500px)' }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ── Background carousel images ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.name}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: 'center bottom' }}
          />
          {/* Layered gradient overlays for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1628]/92 via-[#0b1628]/60 to-[#0b1628]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1628]/85 via-transparent to-[#0b1628]/25" />
        </motion.div>
      </AnimatePresence>

      {/* ── Main content ── */}
      <div
        className="relative z-10 container mx-auto px-4 md:px-8 flex flex-col justify-center"
        style={{ minHeight: 'min(62vh, 500px)', paddingTop: '72px', paddingBottom: '52px' }}
      >
        <div className="max-w-2xl">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white/80 mb-4"
          >
            <Globe className="mr-2 h-3.5 w-3.5 shrink-0" />
            Global Pharmaceutical Sourcing
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.05] mb-1">
              Premium Men's
            </h1>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#c9930a] leading-[1.05] uppercase mb-3">
              Wellness Products
            </h1>
            <p className="text-xs sm:text-sm font-bold text-white/40 uppercase tracking-widest mb-4">
              For Global Wholesale Buyers
            </p>
          </motion.div>

          {/* Trust checkmarks */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-y-1.5 gap-x-4 mb-4"
          >
            {TRUST_CHECKS.map(item => (
              <div key={item} className="flex items-center gap-1.5 text-sm font-semibold text-white/75">
                <span className="text-[#c9930a] font-black text-base leading-none shrink-0">✓</span>
                {item}
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <a
              href="#contact"
              onClick={ripple}
              className="relative overflow-hidden inline-flex h-12 sm:h-13 items-center justify-center rounded-xl border-2 border-[#c9930a] text-[#c9930a] px-7 text-sm font-bold hover:bg-[#c9930a] hover:text-white transition-all duration-300 gap-2 active:scale-95"
            >
              Get Wholesale Price List <ArrowRight className="h-4 w-4 shrink-0" />
            </a>
            <a
              href="#products"
              onClick={ripple}
              className="relative overflow-hidden inline-flex h-12 sm:h-13 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm border border-white/25 px-7 text-sm font-bold text-white hover:bg-white/20 transition-colors active:scale-95"
            >
              View Products
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── Slide dots ── */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.name}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}: ${s.name}`}
            style={{
              width: i === current ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: i === current ? '#c9930a' : 'rgba(255,255,255,0.3)',
              transition: 'all 0.35s ease',
            }}
          />
        ))}
      </div>

      {/* ── Current brand chip — bottom right ── */}
      <div className="absolute bottom-4 right-4 z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={`chip-${current}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            className="flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5"
          >
            <span className="h-2 w-2 rounded-full shrink-0" style={{ background: slide.accent }} />
            <span className="text-[11px] font-black uppercase tracking-wider text-white">{slide.name}</span>
            <span className="text-[10px] text-white/50 font-medium">· {slide.compound}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Mail, ChevronRight, Sparkles } from 'lucide-react';
import { useSiteConfig } from '@/contexts/SiteConfigContext';
import { playHoverSound } from '@/lib/sounds';
import { ripple } from '@/lib/ripple';
import { assetUrl } from '@/lib/assetUrl';

const EMAIL_BASE = 'mailto:export@alphavigor.com?subject=Export%20Enquiry%20-%20';

function createEmailLink(name: string) {
  return (
    EMAIL_BASE +
    encodeURIComponent(name) +
    '&body=' +
    encodeURIComponent(`Hi,\n\nI am interested in ${name}.\n\nPlease share export availability, pricing, and documentation.\n\nThank you.`)
  );
}

function SkLogoCover() {
  return (
    <div
      aria-hidden
      className="absolute top-0 right-0 z-10 pointer-events-none"
      style={{
        width: '42%',
        height: '60%',
        background:
          'radial-gradient(ellipse 90% 90% at 100% 0%, #cdd0d2 40%, #cdd0d2cc 60%, transparent 100%)',
      }}
    />
  );
}

const BRAND_META: Record<string, { bg: string; text: string; dot: string; border: string; activeBg: string }> = {
  Vidalista: { bg: '#EEF4FF', text: '#1a5fb4', dot: '#1a5fb4', border: '#bfd3f7', activeBg: '#1a5fb4' },
  Fildena:   { bg: '#F5EEFF', text: '#7b2cbf', dot: '#7b2cbf', border: '#d9c3f7', activeBg: '#7b2cbf' },
  Vilitra:   { bg: '#FFFBEB', text: '#b45309', dot: '#b45309', border: '#f5d98a', activeBg: '#b45309' },
  Cenforce:  { bg: '#ECFDF5', text: '#15803d', dot: '#15803d', border: '#a7f3d0', activeBg: '#15803d' },
};

type FilterTab = 'Featured' | 'Vidalista' | 'Fildena' | 'Vilitra' | 'Cenforce';
const BRAND_TABS: FilterTab[] = ['Vidalista', 'Fildena', 'Vilitra', 'Cenforce'];
const FILTER_TABS: FilterTab[] = ['Featured', ...BRAND_TABS];

export function Catalogue() {
  const { products: siteProducts } = useSiteConfig();

  const [searchTerm,       setSearchTerm]       = useState('');
  const [selectedFilter,   setSelectedFilter]   = useState<FilterTab>('Featured');
  const [visibleCount,     setVisibleCount]     = useState(12);
  const [showAllFeatured,  setShowAllFeatured]  = useState(false);

  // 3 products per brand = 12 total for the Featured tab
  const featuredProducts = useMemo(() => {
    return BRAND_TABS.flatMap(brand =>
      siteProducts.filter(p => p.brand === brand).slice(0, 3)
    );
  }, [siteProducts]);

  const filteredProducts = useMemo(() => {
    if (selectedFilter === 'Featured') return showAllFeatured ? siteProducts : featuredProducts;
    const base = siteProducts.filter(p => p.brand === selectedFilter);
    if (!searchTerm) return base;
    return base.filter(
      p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.form.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [selectedFilter, siteProducts, featuredProducts, searchTerm, showAllFeatured]);

  const visibleProducts = selectedFilter === 'Featured'
    ? filteredProducts
    : filteredProducts.slice(0, visibleCount);

  const hasMore           = selectedFilter !== 'Featured' && visibleCount < filteredProducts.length;
  const hasFeaturedMore   = selectedFilter === 'Featured' && !showAllFeatured;

  function switchTab(tab: FilterTab) {
    setSelectedFilter(tab);
    setVisibleCount(12);
    setSearchTerm('');
    setShowAllFeatured(false);
  }

  return (
    /* pt-12 (reduced from py-24) to close the gap with the hero above by ~50% */
    <section id="products" className="pt-12 pb-24 bg-[#f8f9fb] border-t border-gray-100 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">

        {/* Header */}
        <div className="max-w-2xl mb-10">
          <div className="inline-flex items-center gap-2 text-[11px] font-black text-[#0f1f3d] uppercase tracking-[0.15em] mb-5">
            <span className="h-px w-8 bg-[#0f1f3d]/40" />
            Pharmaceutical Catalogue
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#0f1f3d] mb-4 leading-[1.1]">
            Export-ready presentations,<br className="hidden md:block" /> ready to review.
          </h2>
          <p className="text-base text-gray-500 leading-relaxed">
            Filter by brand, search by compound, and contact the export desk for availability and documentation.
          </p>
        </div>

        {/* Filter bar */}
        <div className="mb-6 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

          {/* Tab pills — single scrollable row, never wraps on any screen size */}
          <div
            className="flex items-center gap-2 px-3 pt-3 pb-2"
            style={{
              overflowX: 'auto',
              overflowY: 'visible',
              flexWrap: 'nowrap',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {FILTER_TABS.map(tab => {
              const meta = BRAND_META[tab];
              const isActive = selectedFilter === tab;
              const isFeatured = tab === 'Featured';

              const activeStyle = isFeatured
                ? { backgroundColor: '#c9930a', color: '#fff' }
                : meta
                  ? { backgroundColor: meta.activeBg, color: '#fff' }
                  : {};

              const inactiveStyle = isFeatured
                ? { color: '#c9930a' }
                : meta
                  ? { color: meta.text }
                  : { color: '#6b7280' };

              return (
                <button
                  key={tab}
                  onClick={e => { ripple(e); switchTab(tab); }}
                  style={isActive ? activeStyle : inactiveStyle}
                  className="relative overflow-hidden shrink-0 whitespace-nowrap flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 active:scale-95 hover:opacity-90"
                >
                  {isFeatured && <Sparkles className="h-3 w-3 shrink-0" />}
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Search — only for brand tabs */}
          {selectedFilter !== 'Featured' && (
            <div className="px-3 pb-3">
              <div className="relative">
                <Search className="absolute inset-y-0 left-3 my-auto h-4 w-4 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  className="block w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0f1f3d]/20 focus:border-[#0f1f3d]/40 font-medium transition-all"
                  placeholder="Search by name or compound…"
                  value={searchTerm}
                  onChange={e => { setSearchTerm(e.target.value); setVisibleCount(12); }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Sub-label */}
        {selectedFilter === 'Featured' ? (
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-[#c9930a] shrink-0" />
            {showAllFeatured
              ? `All ${siteProducts.length} products — select a brand above to filter`
              : '3 from each brand — select a brand above to explore the full range'}
          </p>
        ) : (
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-6">
            {filteredProducts.length} presentation{filteredProducts.length !== 1 ? 's' : ''} found
          </p>
        )}

        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-gray-200">
            <Filter className="h-10 w-10 text-gray-300 mx-auto mb-4" />
            <h3 className="text-base font-bold text-[#0f1f3d] mb-2">No presentations found</h3>
            <p className="text-sm text-gray-400 mb-6">Try adjusting your brand filter or search term.</p>
            <button
              onClick={() => switchTab('Featured')}
              className="inline-flex h-10 items-center justify-center rounded-xl bg-[#0f1f3d]/5 px-6 text-sm font-bold text-[#0f1f3d] hover:bg-[#0f1f3d]/10 transition-colors active:scale-95"
            >
              Back to Featured
            </button>
          </div>
        ) : (
          <>
            <div
              className={
                selectedFilter === 'Featured'
                  ? 'grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4'
                  : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
              }
            >
              <AnimatePresence mode="popLayout">
                {visibleProducts.map((product, index) => {
                  const meta = BRAND_META[product.brand] ?? { bg: '#f5f5f5', text: '#374151', dot: '#6b7280', border: '#e5e7eb', activeBg: '#374151' };
                  const isFeatured = selectedFilter === 'Featured';

                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.4) }}
                      key={product.id}
                      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                      onMouseEnter={playHoverSound}
                    >
                      {/* Image */}
                      <div
                        className="relative overflow-hidden bg-[#d0d2d4]"
                        style={{ height: isFeatured ? '130px' : '155px' }}
                      >
                        <SkLogoCover />
                        <img
                          src={assetUrl(product.image)}
                          alt={product.name}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          style={{ objectPosition: 'center 82%' }}
                          onError={e => {
                            (e.target as HTMLImageElement).src =
                              `https://placehold.co/600x300/e8e9eb/1a3a6b?text=${encodeURIComponent(product.name)}`;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f3d]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Body */}
                      <div className={`flex flex-col flex-1 ${isFeatured ? 'gap-2 p-3' : 'gap-3 p-5'}`}>
                        {/* Brand chip */}
                        <div
                          className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border"
                          style={{ background: meta.bg, color: meta.text, borderColor: meta.border }}
                        >
                          <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: meta.dot }} />
                          {product.brand}
                        </div>

                        <div>
                          <h3
                            className={`font-extrabold text-[#0f1f3d] leading-tight group-hover:text-[#0f3a8c] transition-colors ${isFeatured ? 'text-[13px] mb-0.5' : 'text-[17px] mb-1.5'}`}
                          >
                            {product.name}
                          </h3>
                          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider leading-tight">{product.form}</p>
                        </div>

                        {!isFeatured && (
                          <p className="text-[12.5px] text-gray-500 leading-relaxed flex-1 line-clamp-3">{product.description}</p>
                        )}

                        <a
                          href={createEmailLink(product.name)}
                          onClick={ripple}
                          className={`relative overflow-hidden group/btn flex items-center justify-between w-full rounded-xl border border-gray-200 bg-gray-50 hover:bg-[#0f1f3d] hover:border-[#0f1f3d] transition-all duration-200 active:scale-95 mt-auto ${isFeatured ? 'px-3 py-2' : 'px-4 py-3'}`}
                        >
                          <div className={`flex items-center gap-2 font-bold text-[#0f1f3d] group-hover/btn:text-white transition-colors ${isFeatured ? 'text-[11px]' : 'text-sm'}`}>
                            <Mail className={isFeatured ? 'h-3 w-3' : 'h-4 w-4'} />
                            Enquire
                          </div>
                          <ChevronRight className={`text-gray-400 group-hover/btn:text-white group-hover/btn:translate-x-0.5 transition-all ${isFeatured ? 'h-3 w-3' : 'h-4 w-4'}`} />
                        </a>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Show More — Featured tab reveals all products */}
            {hasFeaturedMore && (
              <div className="mt-12 text-center">
                <button
                  onClick={e => { ripple(e); setShowAllFeatured(true); }}
                  className="relative overflow-hidden inline-flex h-12 items-center justify-center rounded-xl border-2 border-[#0f1f3d]/10 bg-white px-8 text-sm font-bold text-[#0f1f3d] shadow-sm hover:bg-[#0f1f3d]/5 hover:border-[#0f1f3d]/20 active:scale-95 transition-all gap-2"
                >
                  <Sparkles className="h-4 w-4 text-[#c9930a]" />
                  Show All {siteProducts.length} Products
                </button>
              </div>
            )}

            {/* Show More — brand tabs */}
            {hasMore && (
              <div className="mt-12 text-center">
                <button
                  onClick={e => { ripple(e); setVisibleCount(prev => prev + 9); }}
                  className="relative overflow-hidden inline-flex h-12 items-center justify-center rounded-xl border-2 border-[#0f1f3d]/10 bg-white px-8 text-sm font-bold text-[#0f1f3d] shadow-sm hover:bg-[#0f1f3d]/5 hover:border-[#0f1f3d]/20 active:scale-95 transition-all"
                >
                  Show More — {filteredProducts.length - visibleCount} remaining
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';

const FEATURES = [
  { emoji: '🏅', title: 'GMP Certified Supply',       desc: 'WHO-GMP manufacturers, COA on every order'        },
  { emoji: '📄', title: 'Buyer-Ready Docs',            desc: 'Invoice, origin cert & compliance docs on demand'  },
  { emoji: '💬', title: '24/7 Export Desk',            desc: 'WhatsApp & phone support across all time zones'    },
  { emoji: '🌍', title: 'Global Reach',                desc: 'Asia, Europe, Africa & beyond — 100+ countries'    },
  { emoji: '🚚', title: 'Reliable Logistics',          desc: 'Air & sea freight with tracking & customs support'  },
  { emoji: '⭐', title: 'Premium Indian Generics',     desc: 'Vidalista · Fildena · Vilitra · Cenforce'          },
];

export function Standards() {
  return (
    <section id="standards" className="py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-[11px] font-black text-emerald-600 uppercase tracking-[0.15em] mb-4">
            <span className="h-px w-6 bg-emerald-400" />
            Why AlphaVigor
            <span className="h-px w-6 bg-emerald-400" />
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#0f1f3d] leading-snug">
            Why international buyers<br className="hidden sm:block" /> choose AlphaVigor.
          </h2>
        </div>

        {/* Feature grid — compact emoji cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group flex flex-col items-center text-center bg-[#f8f9fb] border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:-translate-y-1 hover:border-emerald-100 transition-all duration-300 cursor-default"
            >
              <span className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300 block">{f.emoji}</span>
              <div className="text-[13px] font-extrabold text-[#0f1f3d] mb-1.5 leading-snug">{f.title}</div>
              <div className="text-[11px] text-gray-400 leading-snug">{f.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useSiteConfig } from '@/contexts/SiteConfigContext';
import { ripple } from '@/lib/ripple';

function PayPalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-[#003087]">
      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.566 4.643-5.813 4.643h-2.19a.988.988 0 0 0-.979.838l-1.264 8.025h3.419c.457 0 .845-.332.917-.784l.038-.196.728-4.617.047-.254a.928.928 0 0 1 .917-.784h.578c3.741 0 6.668-1.52 7.522-5.912.358-1.836.173-3.369-.272-4.472z"/>
    </svg>
  );
}

function USDTIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-[#26a17b]">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.5 17.5v-3.004c-2.92-.14-5.1-.79-5.1-1.571 0-.78 2.18-1.43 5.1-1.57V9.5h-3.5V7.5h9v2h-3.5v1.855c2.92.14 5.1.79 5.1 1.571 0 .78-2.18 1.43-5.1 1.57V17.5h-2z"/>
    </svg>
  );
}

function BitcoinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-[#f7931a]">
      <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548v-.002zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.705-.167-1.064-.25l.526-2.127-1.32-.33-.54 2.165c-.285-.067-.565-.132-.84-.2l-1.815-.45-.35 1.407s.975.225.955.236c.535.136.63.486.615.766l-1.477 5.92c-.075.166-.24.406-.614.314.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.242-.54 2.19 1.32.327.54-2.17c.36.1.705.19 1.05.273l-.51 2.154 1.32.33.545-2.19c2.24.427 3.93.257 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.76 1.68-1.93h.01zm-3.01 4.22c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.23 3.757.67 3.33 2.37zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.18 3.137.524 2.75 2.084v.006z"/>
    </svg>
  );
}

function BankIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[#0f1f3d]">
      <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M8 10v11M12 10v11M16 10v11M20 10v11"/>
    </svg>
  );
}

const PAYMENT_METHODS = [
  { label: 'PayPal',        icon: <PayPalIcon />,  bg: 'bg-[#003087]/8',  ring: 'border-[#003087]/15' },
  { label: 'USDT',          icon: <USDTIcon />,    bg: 'bg-[#26a17b]/8',  ring: 'border-[#26a17b]/15' },
  { label: 'Bitcoin',       icon: <BitcoinIcon />, bg: 'bg-[#f7931a]/8',  ring: 'border-[#f7931a]/15' },
  { label: 'Bank Transfer', icon: <BankIcon />,    bg: 'bg-[#0f1f3d]/6',  ring: 'border-[#0f1f3d]/12' },
];

export function Contact() {
  const { contact } = useSiteConfig();

  const emailHref = `mailto:${contact.email}?subject=Export%20Enquiry`;

  return (
    <section id="contact" className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 text-[11px] font-black text-emerald-600 uppercase tracking-[0.15em] mb-5">
            <span className="h-px w-8 bg-emerald-300" />
            Export Contact
            <span className="h-px w-8 bg-emerald-300" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#0f1f3d] mb-4 leading-[1.1]">
            Speak directly to<br className="hidden sm:block" /> our export desk.
          </h2>
          <p className="text-lg text-gray-500 max-w-lg mx-auto leading-relaxed">
            No forms, no wait. Catalogue access, pricing, documentation, and supply availability — we respond within 2 hours.
          </p>
        </div>

        {/* Info duo: Email + Payment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">

          {/* Email */}
          <div className="bg-[#f8f9fb] rounded-2xl border border-gray-100 p-7 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <div className="text-4xl mb-4">📧</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Email</div>
            <a
              href={`mailto:${contact.email}`}
              className="text-sm font-bold text-[#0f1f3d] hover:text-[#0f3a8c] transition-colors break-all"
            >
              {contact.email}
            </a>
          </div>

          {/* Payment Methods */}
          <div className="bg-[#f8f9fb] rounded-2xl border border-gray-100 p-7 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 text-center">We Accept Payment As</div>
            <div className="grid grid-cols-2 gap-2.5">
              {PAYMENT_METHODS.map(({ label, icon, bg, ring }) => (
                <div
                  key={label}
                  className={`flex items-center gap-2.5 ${bg} border ${ring} rounded-xl px-3 py-2.5`}
                >
                  <span className="shrink-0">{icon}</span>
                  <span className="text-[12px] font-bold text-[#0f1f3d] leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dark CTA card */}
        <div className="bg-[#0f1f3d] rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <span className="relative flex h-2.5 w-2.5 mt-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </span>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/50 mb-2">
                Available 24/7 for International Enquiries
              </p>
              <p className="text-lg md:text-xl font-bold text-white leading-snug max-w-xl">
                Reach AlphaVigor directly for catalogue access, pricing, destination-specific documentation, and supply availability — worldwide.
              </p>
            </div>
          </div>
          <a
            href={emailHref}
            onClick={ripple}
            className="relative overflow-hidden shrink-0 flex items-center gap-2.5 bg-white text-[#0f1f3d] font-bold text-sm px-7 py-3.5 rounded-xl hover:bg-gray-100 active:scale-95 transition-all whitespace-nowrap"
          >
            ✉ &nbsp;Enquire by Email
          </a>
        </div>
      </div>
    </section>
  );
}

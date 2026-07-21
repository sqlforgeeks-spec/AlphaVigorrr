import { useEffect } from 'react';
import { AnnouncementBar } from '@/components/announcement-bar';
import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { Catalogue } from '@/components/catalogue';
import { Standards } from '@/components/standards';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';
import { FloatingButtons } from '@/components/floating-buttons';

export default function Home() {
  // Auto-scroll to products section on page load (if no hash already set)
  useEffect(() => {
    if (window.location.hash) return;
    const timer = setTimeout(() => {
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-[100dvh] w-full flex flex-col bg-white overflow-x-hidden">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Catalogue />
        <Standards />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}

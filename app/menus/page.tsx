'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { MenuDisplay } from '@/components/menu-display';

export default function MenusPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&h=900&fit=crop)',
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Iacofano&apos;s Catering Menus
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            If you or your business is looking for a dependable catering company that takes pride in
            what they create&hellip; Iacofano&apos;s Catering and Food Service would be happy to
            serve you!
          </p>
        </div>
      </section>

      {/* About the Menu */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 text-lg leading-relaxed">
            Iacofano&apos;s Catering &amp; Food Service has been serving up great food at exceptional
            prices from their Catering Menu for more than a decade. Based out of Mount Pleasant,
            South Carolina, Iacofano&apos;s has grown from a local deli, to a fine dining restaurant,
            to a full scale catering company.
          </p>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#c8a85c] text-sm uppercase tracking-[0.3em] mb-3">Browse &amp; Order</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Catering Menu</h2>
          </div>
          <MenuDisplay />
        </div>
      </section>

      <Footer />
    </div>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { MenuDisplay } from '@/components/menu-display';
import { ChevronRight, Phone, Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Kayne Wallace',
    event: 'Wedding',
    text: "Our wedding day was absolutely perfect, and the catering was a huge part of that! The food was phenomenal—every dish was beautifully presented and full of flavor, leaving our guests raving all night long.",
  },
  {
    name: 'Maria Santos',
    event: 'Corporate Event',
    text: "Iacofano's made our annual gala a tremendous success. The quality of food and the professionalism of the staff exceeded every expectation. We've already booked them for next year!",
  },
  {
    name: 'David Chen',
    event: 'Private Dinner',
    text: "From the appetizers to dessert, every course was a masterpiece. The team handled everything flawlessly and our guests are still talking about the food weeks later.",
  },
];

const SERVICES = [
  {
    title: 'In-Flight Catering',
    description: "Iacofano's offers a variety of inflight catering options including single passenger breakfast, lunch and dinner items; multi-passenger catering trays of appetizers.",
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&h=400&fit=crop',
    href: '/inflight-catering',
  },
  {
    title: 'Corporate Event Catering',
    description: 'From boardroom lunches to grand galas, we deliver exceptional cuisine and flawless service for any corporate occasion.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop',
    href: '/catering-services',
  },
  {
    title: 'Nourish & Care',
    description: 'Providing nutritious and comforting meals for healthcare facilities, senior living communities, and those in need of special dietary care.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop',
    href: '/nourish-and-care',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1555244162-803834f70033?w=1600&h=900&fit=crop)',
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="text-[#c8a85c] text-sm uppercase tracking-[0.3em] mb-4 font-medium">
            Need Catering ?
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            WE&apos;RE ALWAYS<br />AVAILABLE FOR YOU
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Premium catering for corporate events, weddings, inflight dining, and special occasions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#c8a85c] text-white px-8 py-4 text-sm uppercase tracking-widest font-semibold hover:bg-[#b89a4e] transition-colors"
            >
              Get a Quote
              <ChevronRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+18554853663"
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-8 py-4 text-sm uppercase tracking-widest font-semibold hover:bg-white/10 transition-colors"
            >
              <Phone className="w-4 h-4" />
              855-485-3663
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#c8a85c] text-sm uppercase tracking-[0.3em] mb-3">What We Offer</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Catering Services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="group relative overflow-hidden bg-white border border-gray-200 hover:border-[#c8a85c]/50 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-1 text-[#c8a85c] text-sm font-medium hover:gap-2 transition-all"
                  >
                    MORE DETAILS
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery / CTA Section */}
      <section className="relative py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-[#c8a85c] text-sm uppercase tracking-[0.3em]">Why Choose Us</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Catering Excellence Since Day One
              </h2>
              <p className="text-gray-600 leading-relaxed">
                At Iacofano&apos;s, we believe every event deserves exceptional cuisine. Our team of experienced chefs and event coordinators work together to create unforgettable dining experiences tailored to your unique vision.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-[#c8a85c]">4</p>
                  <p className="text-gray-600 text-sm">Locations</p>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-[#c8a85c]">24/7</p>
                  <p className="text-gray-600 text-sm">Available</p>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-[#c8a85c]">1000+</p>
                  <p className="text-gray-600 text-sm">Events Catered</p>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-[#c8a85c]">100%</p>
                  <p className="text-gray-600 text-sm">Client Satisfaction</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=500&fit=crop"
                alt="Catering dining"
                className="w-full h-64 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=500&fit=crop"
                alt="Gourmet food"
                className="w-full h-64 object-cover mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=500&fit=crop"
                alt="Event catering"
                className="w-full h-64 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=500&fit=crop"
                alt="Fine dining"
                className="w-full h-64 object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#c8a85c] text-sm uppercase tracking-[0.3em] mb-3">Testimonials</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What They Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-gray-50 border border-gray-200 p-8 space-y-6 relative"
              >
                <Quote className="w-10 h-10 text-[#c8a85c]/30" />
                <p className="text-gray-600 text-sm leading-relaxed italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex items-center gap-1 text-[#c8a85c]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <div>
                  <p className="text-gray-900 font-semibold">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Preview Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#c8a85c] text-sm uppercase tracking-[0.3em] mb-3">Our Menu</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Browse Our Catering Menu</h2>
          </div>
          <MenuDisplay />
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1530062845289-9109b2c9c868?w=1600&h=600&fit=crop)',
          }}
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-8">
          <p className="text-[#c8a85c] text-sm uppercase tracking-[0.3em]">Get In Touch</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            How May We Serve You?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            We&apos;d love to hear from you! Whether you&apos;re planning a wedding, corporate event, or intimate gathering, our team is here to make your vision a reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#c8a85c] text-white px-8 py-4 text-sm uppercase tracking-widest font-semibold hover:bg-[#b89a4e] transition-colors"
            >
              Contact Us
              <ChevronRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+18554853663"
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-8 py-4 text-sm uppercase tracking-widest font-semibold hover:bg-white/10 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call Us Now
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

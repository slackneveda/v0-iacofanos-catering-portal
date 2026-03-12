'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, Clock, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] border-t border-[#333333]">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Tagline */}
          <div className="space-y-6">
            <Image
              src="/logo.png"
              alt="Iacofano's Catering"
              width={200}
              height={70}
              className="h-16 w-auto"
            />
            <p className="text-gray-400 text-sm leading-relaxed">
              Let us take care of the details, so you can focus on enjoying the moments that matter.
            </p>
          </div>

          {/* Company Information */}
          <div className="space-y-4">
            <h4 className="text-[#c8a85c] text-sm uppercase tracking-widest font-semibold">
              Company Information
            </h4>
            <nav className="space-y-3">
              <Link href="/" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Home
              </Link>
              <Link href="/contact" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Locations
              </Link>
              <Link href="/contact" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Catering News
              </Link>
              <Link href="/contact" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Refund &amp; Cancelation Policy
              </Link>
            </nav>
          </div>

          {/* Catering Services */}
          <div className="space-y-4">
            <h4 className="text-[#c8a85c] text-sm uppercase tracking-widest font-semibold">
              Catering Services
            </h4>
            <nav className="space-y-3">
              <Link href="/catering-services" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Corporate Event Catering
              </Link>
              <Link href="/catering-services" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Anytime Catering
              </Link>
              <Link href="/inflight-catering" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Inflight Catering
              </Link>
              <Link href="/nourish-and-care" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Nourish &amp; Care
              </Link>
            </nav>
          </div>

          {/* Contact Us */}
          <div className="space-y-4">
            <h4 className="text-[#c8a85c] text-sm uppercase tracking-widest font-semibold">
              Contact Us
            </h4>
            <div className="space-y-3">
              <a href="mailto:order@iacofanos.com" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
                <Mail className="w-4 h-4 text-[#c8a85c]" />
                order@iacofanos.com
              </a>
              <a href="tel:+18554853663" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
                <Phone className="w-4 h-4 text-[#c8a85c]" />
                1-855-485-3663
              </a>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Clock className="w-4 h-4 text-[#c8a85c]" />
                Open 24 Hours
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#333333]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs">
              All Rights Reserved, &copy; {new Date().getFullYear()} &ndash; Iacofano&apos;s Catering
            </p>
            <div className="flex items-center gap-6 text-xs">
              <Link href="/contact" className="text-gray-500 hover:text-gray-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/contact" className="text-gray-500 hover:text-gray-300 transition-colors">
                Terms and Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

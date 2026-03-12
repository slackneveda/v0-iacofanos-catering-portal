'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { ShoppingCart, User, LogOut, Menu, X, Mail, Phone } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Bar */}
      <div className="bg-[#1a1a1a] border-b border-[#333333]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-10 text-sm">
            <div className="flex items-center gap-6">
              <a href="mailto:order@iacofanos.com" className="flex items-center gap-1.5 text-gray-300 hover:text-[#c8a85c] transition-colors">
                <Mail className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">order@iacofanos.com</span>
              </a>
              <a href="tel:+18554853663" className="flex items-center gap-1.5 text-gray-300 hover:text-[#c8a85c] transition-colors">
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">855-485-3663</span>
              </a>
            </div>
            <div className="hidden md:flex items-center gap-6 text-xs uppercase tracking-wider">
              <Link href="/catering-services" className="text-gray-300 hover:text-[#c8a85c] transition-colors">Catering Services</Link>
              <Link href="/inflight-catering" className="text-gray-300 hover:text-[#c8a85c] transition-colors">Inflight Catering</Link>
              <Link href="/contact" className="text-gray-300 hover:text-[#c8a85c] transition-colors">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Left Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/catering-services" className="text-gray-800 hover:text-[#c8a85c] transition-colors text-sm uppercase tracking-widest font-medium">
                Catering
              </Link>
              <Link href="/inflight-catering" className="text-gray-800 hover:text-[#c8a85c] transition-colors text-sm uppercase tracking-widest font-medium">
                Inflight
              </Link>
              <Link href="/nourish-and-care" className="text-gray-800 hover:text-[#c8a85c] transition-colors text-sm uppercase tracking-widest font-medium">
                Nourish &amp; Care
              </Link>
            </nav>

            {/* Center Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Iacofano's Catering"
                width={180}
                height={60}
                className="h-14 w-auto"
                priority
              />
            </Link>

            {/* Right Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <Link href="/menus" className="text-gray-800 hover:text-[#c8a85c] transition-colors text-sm uppercase tracking-widest font-medium">
                Menus
              </Link>
              <Link href="/contact" className="text-gray-800 hover:text-[#c8a85c] transition-colors text-sm uppercase tracking-widest font-medium">
                Contact Us
              </Link>
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => router.push('/cart')}
                  className="relative text-gray-700 hover:text-[#c8a85c] hover:bg-transparent"
                >
                  <ShoppingCart className="w-5 h-5" />
                </Button>
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-gray-700 hover:text-[#c8a85c] hover:bg-transparent">
                        <User className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white border-gray-200">
                      <div className="px-2 py-1.5 text-sm font-medium text-gray-900">
                        {user.first_name} {user.last_name}
                      </div>
                      <div className="px-2 py-1 text-xs text-gray-500">
                        {user.email}
                      </div>
                      <DropdownMenuSeparator className="bg-gray-200" />
                      <DropdownMenuItem onClick={() => router.push('/orders')} className="text-gray-700 focus:text-gray-900 focus:bg-gray-100">
                        Order History
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-gray-200" />
                      <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-700 focus:bg-red-50">
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button
                    onClick={() => router.push('/login')}
                    className="bg-[#c8a85c] text-white hover:bg-[#b89a4e] text-xs uppercase tracking-wider font-semibold px-5"
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-gray-700 hover:text-[#c8a85c] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-3">
              <Link href="/catering-services" onClick={() => setMobileMenuOpen(false)} className="block text-gray-800 hover:text-[#c8a85c] transition-colors text-sm uppercase tracking-widest py-2">
                Catering
              </Link>
              <Link href="/inflight-catering" onClick={() => setMobileMenuOpen(false)} className="block text-gray-800 hover:text-[#c8a85c] transition-colors text-sm uppercase tracking-widest py-2">
                Inflight
              </Link>
              <Link href="/nourish-and-care" onClick={() => setMobileMenuOpen(false)} className="block text-gray-800 hover:text-[#c8a85c] transition-colors text-sm uppercase tracking-widest py-2">
                Nourish &amp; Care
              </Link>
              <Link href="/menus" onClick={() => setMobileMenuOpen(false)} className="block text-gray-800 hover:text-[#c8a85c] transition-colors text-sm uppercase tracking-widest py-2">
                Menus
              </Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block text-gray-800 hover:text-[#c8a85c] transition-colors text-sm uppercase tracking-widest py-2">
                Contact Us
              </Link>
              <div className="flex items-center gap-3 pt-3 border-t border-gray-200">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => { router.push('/cart'); setMobileMenuOpen(false); }}
                  className="text-gray-700 hover:text-[#c8a85c] hover:bg-transparent"
                >
                  <ShoppingCart className="w-5 h-5" />
                </Button>
                {user ? (
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="text-gray-700 hover:text-[#c8a85c] hover:bg-transparent text-sm"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                ) : (
                  <Button
                    onClick={() => { router.push('/login'); setMobileMenuOpen(false); }}
                    className="bg-[#c8a85c] text-white hover:bg-[#b89a4e] text-xs uppercase tracking-wider font-semibold"
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

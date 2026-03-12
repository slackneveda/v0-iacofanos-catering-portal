'use client';

import { Header } from '@/components/header';
import { MenuDisplay } from '@/components/menu-display';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-12 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
            Premium Catering & Events
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our exquisite menu curated for corporate gatherings, weddings, and special occasions
          </p>
        </div>

        {/* Menu Display */}
        <MenuDisplay />
      </main>
    </div>
  );
}

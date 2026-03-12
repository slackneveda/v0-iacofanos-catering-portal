'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api-client';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  dietary_info: string;
  min_guests: number;
  image_url: string;
}

export function MenuDisplay() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchMenuData() {
      try {
        setLoading(true);
        const [itemsData, categoriesData] = await Promise.all([
          api.menu.getAll(),
          api.menu.getCategories(),
        ]);
        setItems(itemsData);
        setCategories(categoriesData);
      } catch (err) {
        setError('Failed to load menu');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMenuData();
  }, []);

  const filteredItems = selectedCategory
    ? items.filter(item => item.category === selectedCategory)
    : items;

  const groupedByCategory = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Loader2 className="w-8 h-8 animate-spin text-[#c8a85c]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 justify-center">
        <Button
          variant={selectedCategory === null ? 'default' : 'outline'}
          onClick={() => setSelectedCategory(null)}
          className={selectedCategory === null ? 'bg-[#c8a85c] text-white hover:bg-[#b89a4e]' : 'border-gray-300 text-gray-600 hover:text-gray-900 hover:border-[#c8a85c]'}
        >
          All Items
        </Button>
        {categories.map(cat => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(cat)}
            className={selectedCategory === cat ? 'bg-[#c8a85c] text-white hover:bg-[#b89a4e]' : 'border-gray-300 text-gray-600 hover:text-gray-900 hover:border-[#c8a85c]'}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Menu Items Grid */}
      {Object.entries(groupedByCategory).map(([category, categoryItems]) => (
        <div key={category} className="space-y-4">
          {!selectedCategory && (
            <h3 className="text-xl font-semibold text-[#c8a85c] uppercase tracking-wider">
              {category}
            </h3>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryItems.map(item => (
              <Card key={item.id} className="overflow-hidden bg-white border-gray-200 hover:border-[#c8a85c]/50 transition-all duration-300 group shadow-sm hover:shadow-md">
                {item.image_url && (
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <CardTitle className="text-lg text-gray-900">{item.name}</CardTitle>
                      {item.dietary_info && (
                        <Badge variant="secondary" className="mt-2 text-xs bg-[#c8a85c]/10 text-[#b89a4e] border-[#c8a85c]/30">
                          {item.dietary_info}
                        </Badge>
                      )}
                    </div>
                    <div className="text-lg font-semibold text-[#c8a85c]">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    {item.description}
                  </p>
                  
                  {item.min_guests && (
                    <p className="text-xs text-gray-500">
                      Minimum {item.min_guests} guests
                    </p>
                  )}

                  <Button
                    onClick={() => router.push(`/cart?add=${item.id}`)}
                    className="w-full bg-[#c8a85c] text-white hover:bg-[#b89a4e] uppercase tracking-wider text-xs font-semibold"
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No items available in this category</p>
        </div>
      )}
    </div>
  );
}

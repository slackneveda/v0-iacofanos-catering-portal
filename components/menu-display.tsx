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
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? 'default' : 'outline'}
          onClick={() => setSelectedCategory(null)}
        >
          All Items
        </Button>
        {categories.map(cat => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Menu Items Grid */}
      {Object.entries(groupedByCategory).map(([category, categoryItems]) => (
        <div key={category} className="space-y-4">
          {!selectedCategory && (
            <h3 className="text-xl font-serif font-semibold text-foreground">
              {category}
            </h3>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryItems.map(item => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {item.image_url && (
                  <div className="w-full h-48 bg-muted overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      {item.dietary_info && (
                        <Badge variant="secondary" className="mt-2 text-xs">
                          {item.dietary_info}
                        </Badge>
                      )}
                    </div>
                    <div className="text-lg font-semibold text-primary">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                  
                  {item.min_guests && (
                    <p className="text-xs text-muted-foreground">
                      Minimum {item.min_guests} guests
                    </p>
                  )}

                  <Button
                    onClick={() => router.push(`/cart?add=${item.id}`)}
                    className="w-full"
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
          <p className="text-muted-foreground">No items available in this category</p>
        </div>
      )}
    </div>
  );
}

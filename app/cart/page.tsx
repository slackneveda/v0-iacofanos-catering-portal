'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import { useAuth } from '@/lib/auth-context';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Minus, Plus } from 'lucide-react';
import { api } from '@/lib/api-client';
import { useToast } from '@/hooks/use-toast';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
}

export default function CartPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { items, addItem, removeItem, updateQuantity, clear, total } = useCart();
  const { user, token } = useAuth();
  const { toast } = useToast();
  const [menuItem, setMenuItem] = useState<MenuItem | null>(null);

  // Check if adding item from menu
  useEffect(() => {
    const addParam = searchParams.get('add');
    if (addParam) {
      const itemId = parseInt(addParam);
      api.menu.getById(itemId).then(item => {
        setMenuItem(item);
        addItem(item.id, item.name, item.price, 1);
      }).catch(err => {
        console.error('Failed to add item:', err);
      });
    }
  }, [searchParams, addItem]);

  const [formData, setFormData] = useState({
    event_date: '',
    event_time: '',
    event_type: '',
    num_guests: '',
    delivery_address: '',
    delivery_city: '',
    delivery_postal_code: '',
    special_requests: '',
  });

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !token) {
      router.push('/login');
      return;
    }

    if (!formData.event_date || !formData.num_guests || items.length === 0) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields and add items to cart',
        variant: 'destructive',
      });
      return;
    }

    try {
      await api.orders.create({
        event_date: formData.event_date,
        event_time: formData.event_time || null,
        event_type: formData.event_type,
        num_guests: parseInt(formData.num_guests),
        delivery_address: formData.delivery_address,
        delivery_city: formData.delivery_city,
        delivery_postal_code: formData.delivery_postal_code,
        special_requests: formData.special_requests,
        items: items.map(item => ({
          menu_item_id: item.menu_item_id,
          quantity: item.quantity,
        })),
      }, token);

      toast({
        title: 'Success',
        description: 'Order placed successfully!',
      });

      clear();
      router.push('/orders');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to place order',
        variant: 'destructive',
      });
    }
  };

  if (items.length === 0 && !menuItem) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <h1 className="text-3xl font-serif font-bold mb-4">Shopping Cart</h1>
            <p className="text-muted-foreground mb-6">Your cart is empty</p>
            <Button onClick={() => router.push('/')}>
              Continue Shopping
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-serif font-bold mb-8">Order Details</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Information</CardTitle>
                <CardDescription>Tell us about your event</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitOrder} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Event Date *</label>
                      <Input
                        type="date"
                        required
                        value={formData.event_date}
                        onChange={(e) => setFormData({...formData, event_date: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Event Time</label>
                      <Input
                        type="time"
                        value={formData.event_time}
                        onChange={(e) => setFormData({...formData, event_time: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Event Type</label>
                      <Input
                        placeholder="e.g., Wedding, Corporate Event"
                        value={formData.event_type}
                        onChange={(e) => setFormData({...formData, event_type: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Number of Guests *</label>
                      <Input
                        type="number"
                        min="1"
                        required
                        value={formData.num_guests}
                        onChange={(e) => setFormData({...formData, num_guests: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Delivery Address</label>
                    <Input
                      placeholder="Street address"
                      value={formData.delivery_address}
                      onChange={(e) => setFormData({...formData, delivery_address: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">City</label>
                      <Input
                        placeholder="City"
                        value={formData.delivery_city}
                        onChange={(e) => setFormData({...formData, delivery_city: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Postal Code</label>
                      <Input
                        placeholder="Postal code"
                        value={formData.delivery_postal_code}
                        onChange={(e) => setFormData({...formData, delivery_postal_code: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Special Requests</label>
                    <Textarea
                      placeholder="Any dietary restrictions, allergies, or special requests..."
                      value={formData.special_requests}
                      onChange={(e) => setFormData({...formData, special_requests: e.target.value})}
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Place Order
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Cart Summary */}
          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-2 bg-muted rounded">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-6 text-center text-sm">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => router.push('/')}
                >
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

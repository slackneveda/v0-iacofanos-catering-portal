'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, ArrowLeft } from 'lucide-react';
import { api } from '@/lib/api-client';

interface OrderItem {
  id: number;
  menu_item_id: number;
  name: string;
  quantity: number;
  price: number;
}

interface OrderDetail {
  id: number;
  status: string;
  total_amount: number;
  event_date: string;
  event_time: string;
  event_type: string;
  num_guests: number;
  delivery_address: string;
  delivery_city: string;
  delivery_postal_code: string;
  special_requests: string;
  created_at: string;
  items: OrderItem[];
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  preparing: 'bg-purple-100 text-purple-800',
  ready: 'bg-green-100 text-green-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const statusSteps = ['pending', 'confirmed', 'preparing', 'ready', 'delivered'];

export default function OrderDetailPage() {
  const { id } = useParams();
  const { user, token } = useAuth();
  const router = useRouter();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || !token) {
      router.push('/login');
      return;
    }

    async function fetchOrder() {
      try {
        setLoading(true);
        const data = await api.orders.getById(parseInt(id as string), token);
        setOrder(data);
      } catch (err) {
        setError('Failed to load order');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchOrder();
    }
  }, [id, user, token, router]);

  const getStatusProgress = (status: string) => {
    const index = statusSteps.indexOf(status);
    return index >= 0 ? ((index + 1) / statusSteps.length) * 100 : 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center min-h-96">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </main>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <p className="text-destructive font-medium mb-4">
              {error || 'Order not found'}
            </p>
            <Button onClick={() => router.push('/orders')}>
              Back to Orders
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 -ml-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="space-y-6">
          {/* Status Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Order #{order.id}</CardTitle>
                  <CardDescription>
                    Placed on {new Date(order.created_at).toLocaleDateString()}
                  </CardDescription>
                </div>
                <Badge className={statusColors[order.status] || 'bg-gray-100 text-gray-800'}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground mb-2">Order Status</p>
                <div className="flex justify-between items-center">
                  {statusSteps.map((step, index) => (
                    <div key={step} className="flex flex-col items-center flex-1">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mb-2 ${
                          statusSteps.indexOf(order.status) >= index
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {index + 1}
                      </div>
                      <p className="text-xs text-center">
                        {step.charAt(0).toUpperCase() + step.slice(1)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${getStatusProgress(order.status)}%` }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Event Details */}
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Event Date</p>
                <p className="font-semibold">
                  {new Date(order.event_date).toLocaleDateString()}
                </p>
              </div>
              {order.event_time && (
                <div>
                  <p className="text-sm text-muted-foreground">Event Time</p>
                  <p className="font-semibold">{order.event_time}</p>
                </div>
              )}
              {order.event_type && (
                <div>
                  <p className="text-sm text-muted-foreground">Event Type</p>
                  <p className="font-semibold">{order.event_type}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground">Number of Guests</p>
                <p className="font-semibold">{order.num_guests}</p>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Information */}
          {(order.delivery_address || order.delivery_city) && (
            <Card>
              <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {order.delivery_address && (
                  <p>{order.delivery_address}</p>
                )}
                <p>
                  {order.delivery_city} {order.delivery_postal_code}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {order.items.map(item => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center p-3 bg-muted rounded"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${order.total_amount.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-primary">${order.total_amount.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Special Requests */}
          {order.special_requests && (
            <Card>
              <CardHeader>
                <CardTitle>Special Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{order.special_requests}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}

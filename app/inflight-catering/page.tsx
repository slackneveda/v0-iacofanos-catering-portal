'use client';

import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ChevronRight, Phone, Mail, CheckCircle, Plane } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/lib/api-client';

const FAQ_ITEMS = [
  {
    question: 'What types of catering services do you offer?',
    answer:
      'We offer a wide range of catering services including corporate event catering, wedding catering, anytime catering, inflight catering, and Nourish & Care meals for senior communities and healthcare facilities.',
  },
  {
    question: 'Do you accommodate dietary restrictions or special requests?',
    answer:
      'Absolutely! Our chefs are experienced in preparing meals for various dietary needs including vegetarian, vegan, gluten-free, and allergen-free options. Just let us know your requirements.',
  },
  {
    question: 'How far in advance should I book catering services?',
    answer:
      'We recommend booking at least 2 weeks in advance for large events. However, we understand that plans can change, and last-minute orders are not an issue for us.',
  },
  {
    question: 'What is included in your catering packages?',
    answer:
      'Our packages typically include food, setup, and serving essentials. Depending on the event, we can also provide staff, tableware, and additional services upon request.',
  },
];

export default function InflightCateringPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [orderForm, setOrderForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    billTo: '',
    deliverTo: '',
    deliveryDate: '',
    tailNumber: '',
    tripNumber: '',
    allergies: '',
    passengers: '',
    foodOrder: '',
    beverageOrder: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setOrderForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderForm.email || !orderForm.foodOrder) {
      toast({ title: 'Error', description: 'Please fill in all required fields.', variant: 'destructive' });
      return;
    }
    setIsSubmitting(true);
    try {
      await api.contact.submit({
        name: `${orderForm.firstName} ${orderForm.lastName}`,
        email: orderForm.email,
        phone: orderForm.phone,
        subject: `Inflight Order - Tail#${orderForm.tailNumber} - ${orderForm.deliveryDate}`,
        message: `Bill To: ${orderForm.billTo}\nDeliver To: ${orderForm.deliverTo}\nTail Number: ${orderForm.tailNumber}\nTrip Number: ${orderForm.tripNumber}\nPassengers: ${orderForm.passengers}\nAllergies: ${orderForm.allergies}\n\nFood Order:\n${orderForm.foodOrder}\n\nBeverage Order:\n${orderForm.beverageOrder}`,
      });
      toast({ title: 'Success', description: 'Your inflight order has been submitted. We will confirm receipt within 15 minutes.' });
      setOrderForm({ firstName: '', lastName: '', email: '', phone: '', billTo: '', deliverTo: '', deliveryDate: '', tailNumber: '', tripNumber: '', allergies: '', passengers: '', foodOrder: '', beverageOrder: '' });
    } catch {
      toast({ title: 'Error', description: 'Failed to submit order. Please try again.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=1600&h=900&fit=crop)',
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Inflight Catering</h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            We&apos;re delighted to introduce Iacofano&apos;s, your culinary partner in the sky.
          </p>
        </div>
      </section>

      {/* Premium Services Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#c8a85c] text-sm uppercase tracking-[0.3em] mb-3">Premium Quality</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              We Provide Premium Catering Services
            </h2>
          </div>
          <p className="text-gray-600 text-center max-w-3xl mx-auto text-lg leading-relaxed">
            Indulge in our carefully curated menu, crafted with fresh, premium ingredients to ensure
            your inflight dining experience is nothing short of exceptional.
          </p>
        </div>
      </section>

      {/* Inflight Catering Details */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Inflight Catering</h2>
              <p className="text-gray-600 leading-relaxed">
                Chef and owner, John Iacofano, strives to continually raise the bar of inflight
                catering. Having been in the catering business for more than 10 years he understands
                that the clients needs are of the utmost importance and he strives to ensure that
                every request is fulfilled.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Catering Specialists are available 24 hours a day to take your order and last minute
                orders are not an issue for us.
              </p>
              <p className="text-gray-600 leading-relaxed">
                At Iacofano&apos;s our mission is to bring you the finest quality of food with the
                freshest ingredients. Our highly trained chefs and kitchen staff work around the
                clock to ensure that your meal is elegant, delicious and delivered on time.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Iacofano&apos;s offers a variety of inflight catering options including but not
                limited to: single passenger breakfast, lunch and dinner items; multi-passenger
                catering trays of appetizers, fruits, cheeses, desserts, sandwiches, beverages, and
                seafood; as well as items such as blankets, pillows, magazines and newspapers.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-[#c8a85c] font-medium hover:gap-3 transition-all"
              >
                Contact Us Today
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=700&fit=crop"
                alt="Inflight catering food presentation"
                className="w-full h-[500px] object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Order Form */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#c8a85c] text-sm uppercase tracking-[0.3em] mb-3">Place Your Order</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Order Form</h2>
            <p className="text-gray-600 mt-4">
              Place your order. We will confirm receipt within 15 minutes.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <Input name="firstName" value={orderForm.firstName} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <Input name="lastName" value={orderForm.lastName} onChange={handleChange} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <Input type="email" name="email" value={orderForm.email} onChange={handleChange} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone / Mobile</label>
                <Input name="phone" value={orderForm.phone} onChange={handleChange} />
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Plane className="w-5 h-5 text-[#c8a85c]" />
                Delivery Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bill To</label>
                  <Input name="billTo" value={orderForm.billTo} onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Deliver To (Airport and FBO)
                  </label>
                  <Input name="deliverTo" value={orderForm.deliverTo} onChange={handleChange} placeholder="Please provide the airport and FBO" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Date & Time</label>
                    <Input type="datetime-local" name="deliveryDate" value={orderForm.deliveryDate} onChange={handleChange} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tail Number</label>
                    <Input name="tailNumber" value={orderForm.tailNumber} onChange={handleChange} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Trip Number</label>
                    <Input name="tripNumber" value={orderForm.tripNumber} onChange={handleChange} />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Allergies, Food Restrictions, Special Instructions
                  </label>
                  <Textarea name="allergies" rows={2} value={orderForm.allergies} onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Passengers</label>
                  <Input name="passengers" value={orderForm.passengers} onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Food Order *</label>
                  <Textarea name="foodOrder" rows={4} value={orderForm.foodOrder} onChange={handleChange} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Beverage Order</label>
                  <Textarea name="beverageOrder" rows={3} value={orderForm.beverageOrder} onChange={handleChange} />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#c8a85c] text-white hover:bg-[#b89a4e] uppercase tracking-widest font-semibold py-3"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Form'}
            </Button>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="text-[#c8a85c] text-sm uppercase tracking-[0.3em] mb-3">FAQ</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">General Questions</h2>
              <p className="text-gray-600 mb-8">
                If you can&apos;t find the answer to your question, please call us. We are happy to
                help you create a custom experience for you and your guests.
              </p>

              <div className="space-y-4">
                {FAQ_ITEMS.map((item, index) => (
                  <div key={index} className="border border-gray-200 bg-white">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full text-left px-6 py-4 flex items-center justify-between gap-4"
                    >
                      <span className="text-gray-900 font-medium text-sm">{item.question}</span>
                      <ChevronRight
                        className={`w-4 h-4 text-[#c8a85c] transition-transform flex-shrink-0 ${
                          openFaq === index ? 'rotate-90' : ''
                        }`}
                      />
                    </button>
                    {openFaq === index && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white border border-gray-200 p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Getting Started</h3>
                <p className="text-gray-600 text-sm mb-6">
                  We&apos;re here to assist you every step of the way! To ensure a smooth catering
                  experience, here&apos;s a quick checklist:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#c8a85c] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">Decide on the event type and guest count.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#c8a85c] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">Choose your menu and note any dietary preferences.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#c8a85c] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">Contact us to confirm availability and finalize details.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Have a question?</h3>
                <p className="text-gray-600 text-sm mb-6">
                  We&apos;re here to help! Feel free to reach out anytime.
                </p>
                <div className="space-y-3">
                  <a href="mailto:order@iacofanos.com" className="flex items-center gap-3 text-gray-600 hover:text-[#c8a85c] transition-colors text-sm">
                    <Mail className="w-4 h-4 text-[#c8a85c]" />
                    order@iacofanos.com
                  </a>
                  <a href="tel:+18554853663" className="flex items-center gap-3 text-gray-600 hover:text-[#c8a85c] transition-colors text-sm">
                    <Phone className="w-4 h-4 text-[#c8a85c]" />
                    (+1) 855-485-3663
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

'use client';

import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ChevronRight, Phone, Mail, CheckCircle } from 'lucide-react';
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

export default function CateringServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    cateringType: 'Event Catering',
    subject: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) {
      toast({ title: 'Error', description: 'Please fill in all required fields.', variant: 'destructive' });
      return;
    }
    setIsSubmitting(true);
    try {
      await api.contact.submit({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: '',
        subject: `[${formData.cateringType}] ${formData.subject}`,
        message: formData.message,
      });
      toast({ title: 'Success', description: 'Your message has been sent!' });
      setFormData({ firstName: '', lastName: '', email: '', cateringType: 'Event Catering', subject: '', message: '' });
    } catch {
      toast({ title: 'Error', description: 'Failed to send message. Please try again.', variant: 'destructive' });
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
              'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&h=900&fit=crop)',
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Catering Services</h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Whether you&apos;re planning a corporate event, a dream wedding, or a celebration with
            friends and family, we&apos;re here to craft a dining experience that delights every guest.
          </p>
        </div>
      </section>

      {/* Premium Services Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#c8a85c] text-sm uppercase tracking-[0.3em] mb-3">What We Offer</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              We Provide Premium Catering Services
            </h2>
          </div>
          <p className="text-gray-600 text-center max-w-3xl mx-auto text-lg leading-relaxed mb-16">
            Welcome to Iacofano&apos;s catering services. Call our dedicated and experienced staff of
            caterers and take all the worry out of planning your next corporate catering meeting,
            small party catering get-together, or food catering event. Iacofano&apos;s catering
            provides catering delivery in Charleston, SC, and Columbia, SC.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 border border-gray-200 hover:border-[#c8a85c]/50 transition-colors">
              <div className="w-16 h-16 bg-[#c8a85c]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-[#c8a85c]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Corporate Events</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                From boardroom lunches to grand galas, we deliver exceptional cuisine and flawless
                service for any corporate occasion.
              </p>
            </div>
            <div className="text-center p-8 border border-gray-200 hover:border-[#c8a85c]/50 transition-colors">
              <div className="w-16 h-16 bg-[#c8a85c]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-[#c8a85c]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Anytime Catering</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Need catering on short notice? Our team is available 24/7 to fulfill your catering
                needs whenever you need us.
              </p>
            </div>
            <div className="text-center p-8 border border-gray-200 hover:border-[#c8a85c]/50 transition-colors">
              <div className="w-16 h-16 bg-[#c8a85c]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-[#c8a85c]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Wedding Catering</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Make your special day unforgettable with our elegant wedding catering packages,
                tailored to your vision and taste.
              </p>
            </div>
          </div>
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

            {/* Getting Started */}
            <div className="space-y-8">
              <div className="bg-white border border-gray-200 p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Getting Started</h3>
                <p className="text-gray-600 text-sm mb-6">
                  We&apos;re here to assist you every step of the way! To ensure a smooth catering
                  experience, here&apos;s a quick checklist to help you get started:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#c8a85c] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">
                      Decide on the event type and guest count.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#c8a85c] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">
                      Choose your menu and note any dietary preferences.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#c8a85c] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">
                      Contact us to confirm availability and finalize details.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Have a question?</h3>
                <p className="text-gray-600 text-sm mb-6">
                  We&apos;re here to help! Whether you need more information or assistance planning
                  your event, feel free to reach out.
                </p>
                <div className="space-y-3">
                  <a
                    href="mailto:order@iacofanos.com"
                    className="flex items-center gap-3 text-gray-600 hover:text-[#c8a85c] transition-colors text-sm"
                  >
                    <Mail className="w-4 h-4 text-[#c8a85c]" />
                    order@iacofanos.com
                  </a>
                  <a
                    href="tel:+18554853663"
                    className="flex items-center gap-3 text-gray-600 hover:text-[#c8a85c] transition-colors text-sm"
                  >
                    <Phone className="w-4 h-4 text-[#c8a85c]" />
                    (+1) 855-485-3663
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#c8a85c] text-sm uppercase tracking-[0.3em] mb-3">Get In Touch</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Request a Quote</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <Input name="firstName" value={formData.firstName} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <Input name="lastName" value={formData.lastName} onChange={handleChange} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What kind of catering may we help you with?
              </label>
              <select
                name="cateringType"
                value={formData.cateringType}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#c8a85c] focus:border-transparent"
              >
                <option>Event Catering</option>
                <option>In Flight</option>
                <option>Nourish &amp; Care</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <Input name="subject" value={formData.subject} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Message *</label>
              <Textarea name="message" rows={5} value={formData.message} onChange={handleChange} required />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#c8a85c] text-white hover:bg-[#b89a4e] uppercase tracking-widest font-semibold py-3"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}

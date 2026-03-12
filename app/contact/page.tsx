'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/lib/api-client';
import { CheckCircle, Mail, Phone, Clock, MapPin } from 'lucide-react';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await api.contact.submit(formData);

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });

      toast({
        title: 'Success',
        description: 'Your message has been sent. We will get back to you soon!',
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1530062845289-9109b2c9c868?w=1600&h=600&fit=crop)',
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-4">
          <p className="text-[#c8a85c] text-sm uppercase tracking-[0.3em] mb-3">Get In Touch</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white">Contact Us</h1>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Iacofano&apos;s Catering</h3>
              <div className="space-y-5">
                <a href="mailto:order@iacofanos.com" className="flex items-start gap-3 text-gray-600 hover:text-gray-900 transition-colors">
                  <Mail className="w-5 h-5 text-[#c8a85c] mt-0.5 flex-shrink-0" />
                  <span className="text-sm">order@iacofanos.com</span>
                </a>
                <a href="tel:+18554853663" className="flex items-start gap-3 text-gray-600 hover:text-gray-900 transition-colors">
                  <Phone className="w-5 h-5 text-[#c8a85c] mt-0.5 flex-shrink-0" />
                  <span className="text-sm">(+1) 855-485-3663</span>
                </a>
                <div className="flex items-start gap-3 text-gray-600">
                  <Clock className="w-5 h-5 text-[#c8a85c] mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Open 24 Hours</span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <h4 className="text-[#c8a85c] text-sm uppercase tracking-widest font-semibold mb-4">
                How May We Serve You?
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                We&apos;d love to hear from you! Whether you&apos;re planning a wedding, corporate event, or intimate gathering, our team is here to make your vision a reality.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Send us a Message</h3>
              <p className="text-gray-600 text-sm mb-8">
                Fill out the form below and we&apos;ll get back to you as soon as possible
              </p>

              {submitted && (
                <div className="mb-6 p-4 bg-green-900/30 border border-green-700/50 flex gap-3 items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-green-300">Message Sent!</p>
                    <p className="text-sm text-green-400/80">
                      Thank you for contacting us. We&apos;ll be in touch shortly.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">First Name *</label>
                    <Input
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                      className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-[#c8a85c] focus:ring-[#c8a85c]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email *</label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                      className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-[#c8a85c] focus:ring-[#c8a85c]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phone</label>
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="+1 (234) 567-890"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-[#c8a85c] focus:ring-[#c8a85c]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">What kind of catering may we help you with?</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    disabled={isSubmitting}
                    className="w-full h-10 px-3 bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:border-[#c8a85c] focus:ring-1 focus:ring-[#c8a85c] focus:outline-none"
                  >
                    <option value="">Select a service...</option>
                    <option value="Event Catering">Event Catering</option>
                    <option value="In Flight">In Flight</option>
                    <option value="Nourish & Care">Nourish &amp; Care</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Your Message *</label>
                  <Textarea
                    name="message"
                    placeholder="Tell us more about your event..."
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                    className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-[#c8a85c] focus:ring-[#c8a85c]"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-[#c8a85c] text-white hover:bg-[#b89a4e] uppercase tracking-widest font-semibold text-sm py-6"
                >
                  {isSubmitting ? 'Sending...' : 'SUBMIT'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

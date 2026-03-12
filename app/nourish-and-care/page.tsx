'use client';

import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ChevronRight, Phone, Mail, CheckCircle, Heart } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/lib/api-client';

const SENIOR_MENU_ITEMS = [
  'Baked Pollock in Lemon Butter Sauce',
  'Macaroni and Cheese',
  'Stewed Carrots',
  'Corn Bread',
  'Gelatin',
  'Sugar Free Iced Tea or 2% Milk',
  'Roast Turkey with Brown Gravy',
  'Mashed Potatoes',
  'Buttered Vegetables',
  'Biscuit',
  'Brownie',
  'Sugar Free Fruit Punch or 2% Milk',
];

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

export default function NourishAndCarePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    cateringType: 'Nourish & Care',
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
      setFormData({ firstName: '', lastName: '', email: '', cateringType: 'Nourish & Care', subject: '', message: '' });
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
              'url(https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1600&h=900&fit=crop)',
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Nourish &amp; Care</h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            We understand the importance of providing meals that are both nutritious and comforting
            for seniors. Our thoughtfully crafted menus are designed to meet dietary needs while
            delivering delicious, wholesome flavors.
          </p>
        </div>
      </section>

      {/* Premium Services Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#c8a85c] text-sm uppercase tracking-[0.3em] mb-3">Our Mission</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              We Provide Premium Catering Services
            </h2>
          </div>
          <p className="text-gray-600 text-center max-w-3xl mx-auto text-lg leading-relaxed">
            We believe that food is more than just sustenance&mdash;it&apos;s a way to nourish the
            body, uplift the spirit, and show care for those who matter most. Whether it&apos;s a
            corporate gathering, family celebration, or community event, our thoughtfully crafted
            menus and exceptional service ensure every guest feels valued and satisfied.
          </p>
        </div>
      </section>

      {/* Senior Meals Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Senior Meals Catering &ndash; Meals for Seniors
              </h2>
              <div className="bg-[#c8a85c]/10 border border-[#c8a85c]/20 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-[#c8a85c]" />
                  Dedicated to Affordable Senior Meals
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Iacofano&apos;s is dedicated to providing Senior Meals Catering at a price that
                  every person can afford.
                </p>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Chef John Iacofano has worked with a certified dietician to ensure that every senior
                meal we offer meets daily dietary requirements for a healthy senior lifestyle. We
                monitor glucose and sodium as well as portion control. Senior catering meals come
                complete with entree, sides, bread, dessert and beverage.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our service can deliver your food hot and ready to go or you have the option of
                getting your food cold to be heated whenever your schedule sees fit. Do you have an
                on-site kitchen? Let us run it for you! We have a complete staff of trained cooks and
                chefs and our Catering Specialists can work with your organization to meet any needs
                that you might have.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-[#c8a85c] font-medium hover:gap-3 transition-all"
              >
                Contact Us for a Quote
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-6">
              <img
                src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&h=400&fit=crop"
                alt="Senior meals catering"
                className="w-full h-64 object-cover shadow-lg"
              />
              <div className="bg-white border border-gray-200 p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Senior Meals Catering Menu</h3>
                <ul className="space-y-2">
                  {SENIOR_MENU_ITEMS.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c8a85c] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-50 border border-gray-200 p-6 italic">
                <p className="text-gray-600 text-sm leading-relaxed">
                  &ldquo;Chef &ndash; Wanted to let you know how wonderful your meal looked today at
                  Meals on Wheels&hellip;I&apos;m sure the recipients will enjoy it immensely! Thank
                  you!&rdquo;
                </p>
                <p className="text-gray-500 text-xs mt-2">
                  &mdash; K. Little, Volunteer, East Cooper Meals On Wheels
                </p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Request Information</h2>
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
                  We&apos;re here to assist you every step of the way!
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

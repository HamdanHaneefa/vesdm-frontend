import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Users, BookOpen, DollarSign, Award, Headphones, ChevronRight, FileText, Download, CheckCircle, Target, Zap, Shield, X, Loader2 } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Card from '../../components/Card';
import SEO from '../../components/SEO';
import apiClient from '../../api/apiClient';

const FranchisePage = () => {
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      await apiClient.post('/inquiries', {
        ...formData,
        type: 'franchise',
      });
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => {
        setShowApplicationModal(false);
        setSubmitSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Error submitting franchise application:', error);
      setSubmitError(error.response?.data?.msg || 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  const benefits = [
    {
      icon: Award,
      title: 'Proven Brand',
      description: 'Leverage VESDM\'s established reputation and 6+ years of educational excellence',
    },
    {
      icon: BookOpen,
      title: 'Complete Curriculum',
      description: 'Access to 45+ industry-aligned programs and continuous content updates',
    },
    {
      icon: Users,
      title: 'Training & Support',
      description: 'Comprehensive training for staff and ongoing operational support',
    },
    {
      icon: TrendingUp,
      title: 'Marketing Assistance',
      description: 'National marketing campaigns, digital assets, and promotional materials',
    },
    {
      icon: Zap,
      title: 'Technology Platform',
      description: 'Advanced LMS, student portal, and administrative tools included',
    },
    {
      icon: Shield,
      title: 'Exclusive Territory',
      description: 'Protected geographical area with no competition from other franchises',
    },
  ];

  const investmentBreakdown = [
    { item: 'Franchise Fee', amount: '₹5,00,000', description: 'One-time initial fee' },
    { item: 'Infrastructure Setup', amount: '₹8,00,000 - ₹12,00,000', description: 'Office, furniture, equipment' },
    { item: 'Technology & Software', amount: '₹2,00,000', description: 'LMS, portal, tools setup' },
    { item: 'Marketing Deposit', amount: '₹1,00,000', description: 'Initial marketing fund' },
    { item: 'Working Capital', amount: '₹3,00,000', description: 'First 6 months operations' },
  ];

  const supportSystems = [
    {
      title: 'Curriculum & Materials',
      items: ['Complete course content', 'Study materials & resources', 'Regular content updates', 'Assessment tools'],
      color: 'blue',
    },
    {
      title: 'Training Programs',
      items: ['Franchise owner training', 'Staff training modules', 'Faculty development', 'Student counseling training'],
      color: 'emerald',
    },
    {
      title: 'Marketing Support',
      items: ['National campaigns', 'Digital marketing assets', 'Social media content', 'Lead generation support'],
      color: 'purple',
    },
    {
      title: 'Operational Guidance',
      items: ['SOP documentation', 'Quality assurance', 'Performance metrics', '24/7 helpdesk support'],
      color: 'amber',
    },
  ];

  const successStories = [
    { name: 'Rajesh Kumar', location: 'Mumbai', students: '500+', quote: 'Best business decision I made. The support from VESDM team is exceptional.' },
    { name: 'Priya Sharma', location: 'Bangalore', students: '350+', quote: 'Running a VESDM franchise has been a rewarding experience both financially and personally.' },
    { name: 'Amit Patel', location: 'Ahmedabad', students: '420+', quote: 'The proven systems and continuous support make it easy to focus on growth.' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Franchise Opportunities - Partner with VESDM | Vocational Education"
        description="Join VESDM's franchise network. Proven business model, comprehensive support, and growing demand for vocational education. Start your education franchise today."
        keywords="vesdm franchise, education franchise opportunity, vocational education franchise, business opportunity"
        canonical="/franchise"
      />
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#007ACC] to-[#0F172A] text-white py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Partner with VESDM
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Join India's fastest-growing vocational education network. Build a profitable business while transforming lives through quality education.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setShowApplicationModal(true)}
                  className="px-6 py-3 bg-white text-[#007ACC] rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2"
                >
                  <FileText className="w-5 h-5" />
                  Apply for Franchise
                </button>
                <Button variant="outline" size="lg" className="!text-white border-white hover:bg-white hover:!text-[#007ACC]">
                  Download Brochure
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
                alt="Franchise Partnership"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose VESDM */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose VESDM Franchise?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need to build a successful educational business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#007ACC] to-[#0F172A] rounded-2xl mb-4">
                      <Icon size={28} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                    <p className="text-slate-600">{benefit.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Investment Breakdown */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Investment Overview
            </h2>
            <p className="text-lg text-slate-600">
              Transparent breakdown of franchise investment requirements
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card>
              <div className="divide-y divide-slate-100">
                {investmentBreakdown.map((item, i) => (
                  <div key={i} className="py-6 first:pt-0 last:pb-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900 mb-1">{item.item}</h3>
                        <p className="text-sm text-slate-600">{item.description}</p>
                      </div>
                      <div className="text-2xl font-bold text-[#007ACC]">{item.amount}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-slate-200">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-slate-900">Total Investment</span>
                  <span className="text-3xl font-bold text-[#007ACC]">₹19 - 23 Lakhs</span>
                </div>
                <p className="text-sm text-slate-600 mt-4">* Expected ROI: 18-24 months | Annual Revenue Potential: ₹50-80 Lakhs</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Support Systems */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Comprehensive Support Systems
            </h2>
            <p className="text-lg text-slate-600">
              We provide everything you need for successful operations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {supportSystems.map((system, i) => {
              const colorClasses = {
                blue: 'bg-blue-50 border-blue-200',
                emerald: 'bg-emerald-50 border-emerald-200',
                purple: 'bg-purple-50 border-purple-200',
                amber: 'bg-amber-50 border-amber-200',
              };
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className={`h-full border-2 ${colorClasses[system.color]}`}>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{system.title}</h3>
                    <ul className="space-y-3">
                      {system.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <CheckCircle size={20} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Franchise Success Stories
            </h2>
            <p className="text-lg text-slate-600">
              Hear from our successful franchise partners
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full">
                  <div className="mb-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#007ACC] to-[#0F172A] rounded-full mb-4"></div>
                    <h3 className="text-xl font-bold text-slate-900">{story.name}</h3>
                    <p className="text-sm text-slate-600">{story.location}</p>
                    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 bg-emerald-50 rounded-full">
                      <Users size={16} className="text-emerald-600" />
                      <span className="text-sm font-medium text-emerald-700">{story.students} Students</span>
                    </div>
                  </div>
                  <p className="text-slate-600 italic">"{story.quote}"</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#007ACC] to-[#0F172A] text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join 50+ successful franchise partners across India. Limited territories available.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setShowApplicationModal(true)}
              className="px-6 py-3 bg-white text-[#007ACC] rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2"
            >
              <FileText className="w-5 h-5" />
              Apply for Franchise
            </button>
            <Button variant="outline" size="lg" className="!text-white border-white hover:bg-white hover:!text-[#007ACC]" icon={Headphones}>
              Talk to Franchise Expert
            </Button>
          </div>
          <p className="mt-8 text-blue-200">
            Call us at +91 9876543210 or email: franchise@vesdm.edu
          </p>
        </div>
      </section>

      {/* Franchise Application Modal */}
      <AnimatePresence>
        {showApplicationModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-[#007ACC] to-[#0F172A] text-white p-6 flex items-center justify-between rounded-t-2xl">
                <div>
                  <h2 className="text-2xl font-bold">Franchise Application</h2>
                  <p className="text-blue-100 text-sm mt-1">Join the VESDM family today</p>
                </div>
                <button
                  onClick={() => setShowApplicationModal(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                {submitSuccess ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
                    <p className="text-gray-600">Thank you for your interest. Our team will contact you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {submitError && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                        {submitError}
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007ACC] focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007ACC] focus:border-transparent"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007ACC] focus:border-transparent"
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tell us about your interest <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows="4"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007ACC] focus:border-transparent resize-none"
                        placeholder="Tell us about your location, expected investment, and why you want to become a VESDM franchise partner..."
                      />
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-800">
                        <strong>Next Steps:</strong> After submission, our franchise team will review your application and contact you within 2-3 business days to discuss the next steps.
                      </p>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowApplicationModal(false)}
                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 px-6 py-3 bg-[#007ACC] text-white rounded-lg font-medium hover:bg-[#006BB3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <FileText className="w-5 h-5" />
                            Submit Application
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default FranchisePage;

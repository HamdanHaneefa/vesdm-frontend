import { motion } from 'framer-motion';
import { TrendingUp, Users, BookOpen, DollarSign, Award, Headphones, ChevronRight, FileText, Download, CheckCircle, Target, Zap, Shield } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Card from '../../components/Card';

const FranchisePage = () => {
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
                <Button variant="secondary" size="lg" icon={Download}>
                  Download Brochure
                </Button>
                <Button variant="outline" size="lg" className="!text-white border-white hover:bg-white hover:!text-[#007ACC]">
                  Schedule Meeting
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
            <Button variant="secondary" size="lg" icon={FileText}>
              Apply for Franchise
            </Button>
            <Button variant="outline" size="lg" className="!text-white border-white hover:bg-white hover:!text-[#007ACC]" icon={Headphones}>
              Talk to Franchise Expert
            </Button>
          </div>
          <p className="mt-8 text-blue-200">
            Call us at +91 9876543210 or email: franchise@vesdm.edu
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FranchisePage;

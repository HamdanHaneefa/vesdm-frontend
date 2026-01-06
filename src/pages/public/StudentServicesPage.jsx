import { motion } from 'framer-motion';
import { BookOpen, Users, Briefcase, Award, Headphones, Clock, Target, TrendingUp, GraduationCap, Heart, Zap, Shield } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Card from '../../components/Card';
import Button from '../../components/Button';

const StudentServicesPage = () => {
  const services = [
    {
      icon: BookOpen,
      title: 'Academic Support',
      description: 'Access to learning resources, doubt clearing sessions, and supplementary materials',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: Users,
      title: 'Mentorship Program',
      description: 'One-on-one guidance from industry experts and experienced professionals',
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      icon: Briefcase,
      title: 'Internship Opportunities',
      description: 'Connect with leading companies for internships and practical experience',
      color: 'bg-purple-50 text-purple-600',
    },
    {
      icon: GraduationCap,
      title: 'Placement Assistance',
      description: 'Resume building, interview prep, and direct placement opportunities',
      color: 'bg-amber-50 text-amber-600',
    },
    {
      icon: Headphones,
      title: 'Career Counseling',
      description: 'Professional guidance to help you make informed career decisions',
      color: 'bg-rose-50 text-rose-600',
    },
    {
      icon: Award,
      title: 'Skill Development',
      description: 'Additional workshops and certifications to enhance your capabilities',
      color: 'bg-indigo-50 text-indigo-600',
    },
  ];

  const academicSupport = [
    { title: 'Digital Library', description: 'Access to 10,000+ e-books, journals, and research papers' },
    { title: 'Study Materials', description: 'Comprehensive notes, PPTs, and reference materials for all courses' },
    { title: 'Doubt Sessions', description: 'Regular doubt clearing sessions with faculty members' },
    { title: 'Practice Tests', description: 'Mock tests and assessments to track your progress' },
    { title: 'Project Assistance', description: 'Guidance and support for academic projects and assignments' },
    { title: 'Extra Classes', description: 'Additional classes for complex topics and exam preparation' },
  ];

  const placementStats = [
    { value: '92%', label: 'Placement Rate', icon: Target },
    { value: '₹4.5L', label: 'Avg Package', icon: TrendingUp },
    { value: '150+', label: 'Partner Companies', icon: Briefcase },
    { value: '500+', label: 'Students Placed', icon: Users },
  ];

  const mentorshipFeatures = [
    { title: 'Industry Experts', description: 'Learn from professionals with 10+ years of experience' },
    { title: 'Personalized Guidance', description: 'One-on-one sessions tailored to your goals' },
    { title: 'Career Roadmap', description: 'Create a clear path to achieve your career objectives' },
    { title: 'Networking', description: 'Connect with alumni and industry professionals' },
  ];

  const placementProcess = [
    { step: 1, title: 'Profile Building', description: 'Create impressive resume and LinkedIn profile' },
    { step: 2, title: 'Skill Assessment', description: 'Evaluate strengths and areas for improvement' },
    { step: 3, title: 'Interview Prep', description: 'Mock interviews and communication training' },
    { step: 4, title: 'Company Connects', description: 'Direct referrals to partner companies' },
    { step: 5, title: 'Placement', description: 'Support until you secure your dream job' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#007ACC] to-[#0F172A] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Student Services
            </h1>
            <p className="text-xl text-blue-100">
              Comprehensive support system to ensure your academic success and career growth
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need to succeed in your educational journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 ${service.color} rounded-2xl mb-4`}>
                      <Icon size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                    <p className="text-slate-600">{service.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Academic Support Details */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Academic Support Services
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                We provide comprehensive academic support to ensure you excel in your studies and achieve your full potential.
              </p>
              <div className="space-y-4">
                {academicSupport.map((item, i) => (
                  <Card key={i} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                      <BookOpen size={20} className="text-[#007ACC]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-slate-600">{item.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                alt="Academic Support"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mentorship Program */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
                alt="Mentorship"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Mentorship Program
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Get personalized guidance from industry experts who have walked the path you're on. Our mentors provide career advice, technical guidance, and help you navigate challenges.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {mentorshipFeatures.map((feature, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                        <Heart size={16} className="text-emerald-600" />
                      </div>
                      <h3 className="font-bold text-slate-900">{feature.title}</h3>
                    </div>
                    <p className="text-sm text-slate-600">{feature.description}</p>
                  </div>
                ))}
              </div>
              <Button size="lg" className="mt-8">Apply for Mentorship</Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Placement Stats */}
      <section className="py-16 bg-gradient-to-r from-[#007ACC] to-[#0F172A] text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {placementStats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <Icon size={40} className="mx-auto mb-3 text-blue-200" />
                  <h3 className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</h3>
                  <p className="text-blue-200">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Placement Process */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Placement Process
            </h2>
            <p className="text-lg text-slate-600">
              Our structured approach to ensure you land your dream job
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {placementProcess.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="flex items-center gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#007ACC] to-[#0F172A] rounded-xl flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{step.step}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{step.title}</h3>
                    <p className="text-slate-600">{step.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Need Help? We're Here for You
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Our support team is available 24/7 to assist you with any questions or concerns.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" icon={Headphones}>Contact Support</Button>
            <Button variant="outline" size="lg">Book a Counseling Session</Button>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <Clock size={32} className="mx-auto mb-3 text-[#007ACC]" />
              <h3 className="font-bold text-slate-900 mb-1">24/7 Support</h3>
              <p className="text-sm text-slate-600">Always available when you need us</p>
            </Card>
            <Card className="text-center">
              <Zap size={32} className="mx-auto mb-3 text-[#007ACC]" />
              <h3 className="font-bold text-slate-900 mb-1">Quick Response</h3>
              <p className="text-sm text-slate-600">Average response time: 2 hours</p>
            </Card>
            <Card className="text-center">
              <Shield size={32} className="mx-auto mb-3 text-[#007ACC]" />
              <h3 className="font-bold text-slate-900 mb-1">Dedicated Team</h3>
              <p className="text-sm text-slate-600">Expert counselors and advisors</p>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StudentServicesPage;

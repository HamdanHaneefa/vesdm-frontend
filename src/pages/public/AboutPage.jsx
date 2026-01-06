import { motion } from 'framer-motion';
import { Target, Eye, Heart, Users, Award, TrendingUp, Shield, Zap } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Card from '../../components/Card';
import SEO from '../../components/SEO';

const AboutPage = () => {
  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for the highest standards in education and student outcomes.',
    },
    {
      icon: Heart,
      title: 'Integrity',
      description: 'We maintain honesty, transparency, and ethical practices in all we do.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We foster a supportive, inclusive environment for all learners.',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We embrace new technologies and teaching methods to enhance learning.',
    },
  ];

  const milestones = [
    { year: '2018', event: 'VESDM Founded', description: 'Started with a vision to democratize quality education' },
    { year: '2019', event: '1,000 Students', description: 'Reached our first major milestone' },
    { year: '2020', event: 'Online Expansion', description: 'Launched comprehensive online learning platform' },
    { year: '2022', event: 'International Recognition', description: 'Programs recognized across 15+ countries' },
    { year: '2024', event: '10,000+ Graduates', description: 'Celebrated 10,000 successful career transformations' },
    { year: '2026', event: 'Industry Partnerships', description: 'Partnered with 150+ leading companies' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="About VESDM - Our Mission, Vision & Values | Vocational Education"
        description="Learn about VESDM's commitment to quality vocational education. Discover our mission, vision, values, and the expert team dedicated to your success."
        keywords="about vesdm, vocational education mission, skill development vision, education values, about us"
        canonical="/about"
      />
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
              About VESDM
            </h1>
            <p className="text-xl text-blue-100">
              Empowering individuals through quality education and industry-aligned training since 2018
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                alt="VESDM Campus"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Who We Are
              </h2>
              <p className="text-lg text-slate-600 mb-4">
                VESDM (Vocational Education & Skills Development Management) is a leading educational institution dedicated to bridging the gap between academic learning and industry requirements.
              </p>
              <p className="text-lg text-slate-600 mb-4">
                We offer a comprehensive range of skill development programs, diploma courses, and professional certifications designed to prepare students for successful careers in today's competitive job market.
              </p>
              <p className="text-lg text-slate-600">
                With a focus on practical, hands-on training and strong industry partnerships, we ensure our graduates are job-ready and equipped with the skills employers are looking for.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-6">
                <Eye size={40} className="text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Our Vision
              </h2>
              <p className="text-lg text-slate-600">
                To be the leading provider of industry-aligned vocational education, empowering millions of learners worldwide to achieve their career aspirations and contribute meaningfully to society.
              </p>
            </Card>

            <Card className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl mb-6">
                <Target size={40} className="text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-slate-600">
                To deliver high-quality, accessible education that combines theoretical knowledge with practical skills, preparing students for successful careers through innovative teaching methods and strong industry partnerships.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="text-center h-full">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl mb-4">
                      <Icon size={32} className="text-[#007ACC]" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                    <p className="text-slate-600">{value.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-slate-600">
              From humble beginnings to educational excellence
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-[#007ACC] to-[#0F172A] rounded-2xl flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{milestone.year}</span>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{milestone.event}</h3>
                    <p className="text-slate-600">{milestone.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-[#007ACC] to-[#0F172A] text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '10,000+', label: 'Students Enrolled' },
              { value: '45+', label: 'Programs' },
              { value: '150+', label: 'Industry Partners' },
              { value: '92%', label: 'Placement Rate' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <h3 className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</h3>
                <p className="text-blue-200">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;

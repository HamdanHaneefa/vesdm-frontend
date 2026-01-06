import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowRight, CheckCircle2, Users, Award, Briefcase, 
  TrendingUp, BookOpen, Target, Shield, Zap 
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Card from '../../components/Card';
import SEO from '../../components/SEO';
import { programCategories } from '../../data/programsData';
import { testimonials } from '../../data/testimonialsData';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import useCountUp from '../../hooks/useCountUp';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const heroRef = useRef(null);
  const statsRef = useRef(null);

  // Initialize scroll animations
  useScrollAnimation();

  // Counter animations for stats
  const [studentsCount, studentsRef] = useCountUp(10000, 2500);
  const [programsCount, programsRef] = useCountUp(50, 2000);
  const [placementRate, placementRef] = useCountUp(95, 2200);
  const [partnersCount, partnersRef] = useCountUp(200, 2300);

  useEffect(() => {
    // Hero text animation
    gsap.fromTo('.hero-title',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
    );

    gsap.fromTo('.hero-subtitle',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: 'power3.out' }
    );

    gsap.fromTo('.hero-buttons',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.7, ease: 'power3.out' }
    );
  }, []);

  const stats = [
    { label: 'Students Enrolled', value: studentsCount, ref: studentsRef, suffix: '+', icon: Users },
    { label: 'Courses Offered', value: programsCount, ref: programsRef, suffix: '+', icon: BookOpen },
    { label: 'Industry Partners', value: partnersCount, ref: partnersRef, suffix: '+', icon: Briefcase },
    { label: 'Placement Rate', value: placementRate, ref: placementRef, suffix: '%', icon: TrendingUp },
  ];

  const features = [
    {
      icon: Target,
      title: 'Industry-Aligned Curriculum',
      description: 'Programs designed with input from industry leaders to ensure relevance and employability.',
    },
    {
      icon: Award,
      title: 'Recognized Certifications',
      description: 'Earn certificates that are valued by employers across industries worldwide.',
    },
    {
      icon: Users,
      title: 'Expert Instructors',
      description: 'Learn from professionals with real-world experience and industry expertise.',
    },
    {
      icon: Shield,
      title: 'Career Support',
      description: 'Comprehensive placement assistance, resume building, and interview preparation.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="VESDM - Vocational Education & Skill Development | Transform Your Future"
        description="Join 10,000+ students building successful careers with VESDM. Industry-aligned vocational education, professional certifications, and 95% placement rate."
        keywords="vocational education, skill development, online courses, diploma programs, professional certification, career training, VESDM"
        canonical="/"
      />
      <Header />

      {/* Hero Section */}
      <section ref={heroRef} className="relative bg-gradient-to-br from-[#007ACC] to-[#0F172A] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-12 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
              >
                <span className="text-sm font-bold uppercase tracking-wider">Learn Without Limits</span>
              </motion.div>
              
              <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Transform Your Future with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-emerald-200">
                  Quality Education
                </span>
              </h1>
              
              <p className="hero-subtitle text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
                Join VESDM for industry-aligned skill development, recognized diplomas, and professional certifications that open doors to successful careers.
              </p>
              
              <div className="hero-buttons flex flex-col sm:flex-row gap-4">
                <Link to="/programs">
                  <Button size="lg" variant="secondary" icon={ArrowRight}>
                    Explore Programs
                  </Button>
                </Link>
                <Link to="/admissions">
                  <Button size="lg" variant="outline">
                    Apply Now
                  </Button>
                </Link>
              </div>

              <div className="hero-buttons mt-12 flex items-center gap-8">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white bg-slate-300"
                    />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-bold">Join 10,000+ Students</p>
                  <p className="text-xs text-blue-200">Building their careers with VESDM</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-white/10 rounded-3xl transform rotate-6"></div>
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                  alt="Students learning"
                  className="relative rounded-3xl shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="stat-item scale-in text-center" ref={stat.ref}>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl mb-4">
                    <Icon size={32} className="text-[#007ACC]" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                    {stat.value.toLocaleString()}{stat.suffix}
                  </h3>
                  <p className="text-sm text-slate-600 font-medium">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Program Categories */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
            >
              Explore Our Programs
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-600 max-w-2xl mx-auto"
            >
              Choose from a diverse range of programs designed to meet industry demands and boost your career prospects.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-item">
            {programCategories.map((category, i) => {
              const Icon = category.icon;
              return (
                <Link key={category.id} to={`/programs?category=${category.id}`}>
                  <Card hover className="h-full group cursor-pointer">
                    <div className={`w-16 h-16 ${category.bg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon size={32} className={category.color} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#007ACC] transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-500">{category.count} Courses</span>
                      <ArrowRight size={18} className="text-[#007ACC] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-12 reveal">
            <Link to="/programs">
              <Button size="lg" icon={ArrowRight}>
                View All Programs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose VESDM */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose VESDM?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We're committed to providing education that makes a real difference in your career.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-item">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-6 shadow-lg">
                    <Icon size={36} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Student Success Stories
            </h2>
            <p className="text-lg text-slate-600">
              Hear from our graduates who transformed their careers with VESDM
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="h-full">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-slate-700 mb-4">"{testimonial.content}"</p>
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <CheckCircle2 key={i} size={16} className="text-emerald-500 fill-current" />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#007ACC] to-[#0F172A] text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of students who are building successful careers with VESDM
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/admissions">
                <Button size="lg" variant="secondary" icon={ArrowRight}>
                  Apply for Admission
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;

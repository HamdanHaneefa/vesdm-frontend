import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, BookOpen, DollarSign, GraduationCap, Users, HelpCircle, Mail } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Card from '../../components/Card';
import Button from '../../components/Button';

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openFaq, setOpenFaq] = useState(null);

  const categories = [
    { id: 'general', label: 'General', icon: HelpCircle },
    { id: 'programs', label: 'Programs', icon: BookOpen },
    { id: 'admissions', label: 'Admissions', icon: GraduationCap },
    { id: 'fees', label: 'Fees & Payment', icon: DollarSign },
    { id: 'support', label: 'Support', icon: Users },
  ];

  const faqs = {
    general: [
      {
        question: 'What is VESDM?',
        answer:
          'VESDM (Vocational Education & Skills Development Management) is a leading educational institution offering industry-aligned diploma, degree, and certificate programs designed to prepare students for successful careers.',
      },
      {
        question: 'Are VESDM certificates recognized?',
        answer:
          'Yes, all VESDM certificates are recognized by industry partners and education authorities. Our programs are designed in collaboration with leading companies to ensure industry relevance.',
      },
      {
        question: 'What is the difference between online and offline programs?',
        answer:
          'Online programs offer flexibility with recorded lectures and virtual live sessions, while offline programs provide in-person classroom instruction. Both follow the same curriculum and offer the same certification.',
      },
      {
        question: 'Can I switch from online to offline mode?',
        answer:
          'Yes, you can request a mode change subject to availability and program requirements. Contact your program coordinator for assistance with the transition.',
      },
    ],
    programs: [
      {
        question: 'What programs do you offer?',
        answer:
          'We offer 45+ programs across various fields including Computer Science, Digital Marketing, Business Management, Healthcare, Engineering, Design, and more. Programs range from 6-month certificates to 4-year degrees.',
      },
      {
        question: 'How long do programs typically last?',
        answer:
          'Certificate courses: 6-12 months, Diploma programs: 1-2 years, Degree programs: 3-4 years. The duration depends on the specific program and study mode (full-time/part-time).',
      },
      {
        question: 'Do you provide internship opportunities?',
        answer:
          'Yes, we partner with 150+ companies to provide internship opportunities. Most programs include mandatory internships as part of the curriculum to give you practical industry experience.',
      },
      {
        question: 'Are the study materials included?',
        answer:
          'Yes, all study materials, e-books, and access to our digital library are included in your program fee. Physical textbooks can be purchased separately if preferred.',
      },
    ],
    admissions: [
      {
        question: 'What are the eligibility criteria?',
        answer:
          'Eligibility varies by program. Certificate courses require 10th pass, Diplomas need 10th/12th pass, and Degrees require 12th pass with 50% marks. Check specific program pages for detailed requirements.',
      },
      {
        question: 'How do I apply for admission?',
        answer:
          'You can apply online through our website by filling the admission form. Submit required documents, pay the application fee, and await confirmation from our admissions team within 24-48 hours.',
      },
      {
        question: 'When do admissions open?',
        answer:
          'We have rolling admissions throughout the year with multiple intake batches. Major intakes are in January, April, July, and October. Check our admissions page for upcoming batch dates.',
      },
      {
        question: 'Is there an entrance exam?',
        answer:
          'Most programs do not require an entrance exam. Admission is based on your academic record and document verification. Some specialized programs may have aptitude tests or interviews.',
      },
    ],
    fees: [
      {
        question: 'What is the fee structure?',
        answer:
          'Fees vary by program: Certificate courses (₹10,000-25,000), Diplomas (₹25,000-50,000), Degrees (₹75,000-1,50,000). Detailed fee structure is available on individual program pages.',
      },
      {
        question: 'Do you offer EMI payment options?',
        answer:
          'Yes, we offer flexible EMI payment options for most programs. You can pay in 3, 6, or 12 monthly installments with no additional interest charges.',
      },
      {
        question: 'Are scholarships available?',
        answer:
          'Yes, we offer merit-based scholarships up to 50% for deserving students. Scholarships are awarded based on academic performance and entrance test scores where applicable.',
      },
      {
        question: 'Is there a refund policy?',
        answer:
          'Yes, we have a refund policy. If you withdraw within 7 days of admission, 100% fee is refunded. After 7 days but before 30 days, 50% is refunded. No refunds after 30 days of admission.',
      },
    ],
    support: [
      {
        question: 'What kind of placement support do you provide?',
        answer:
          'We offer comprehensive placement support including resume building, interview preparation, mock interviews, and direct referrals to 150+ partner companies. Our placement rate is 92%.',
      },
      {
        question: 'How can I contact student support?',
        answer:
          'You can reach our support team via email at support@vesdm.edu, call +91 9876543210, or use the chat feature in the student portal. We respond within 2-4 hours during business days.',
      },
      {
        question: 'Do you provide career counseling?',
        answer:
          'Yes, we offer free career counseling to all students. Our experienced counselors help you choose the right program and plan your career path based on your interests and goals.',
      },
      {
        question: 'What happens if I miss classes?',
        answer:
          'For offline classes, recordings are made available in the student portal. For online classes, all sessions are recorded and accessible anytime. Faculty support is available for doubt clearing.',
      },
    ],
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

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
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-blue-100">
              Find answers to common questions about programs, admissions, fees, and more
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    setOpenFaq(null);
                  }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                    activeCategory === category.id
                      ? 'bg-[#007ACC] text-white shadow-lg shadow-blue-500/30'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Icon size={18} />
                  {category.label}
                </button>
              );
            })}
          </div>

          {/* FAQ Accordion */}
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {faqs[activeCategory].map((faq, index) => (
                  <Card
                    key={index}
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-start justify-between gap-4 text-left"
                    >
                      <h3 className="text-lg font-bold text-slate-900 flex-1">
                        {faq.question}
                      </h3>
                      <motion.div
                        animate={{ rotate: openFaq === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                      >
                        <ChevronDown
                          size={24}
                          className="text-slate-400"
                        />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {openFaq === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-slate-600 mt-4 pt-4 border-t border-slate-100">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-12">
          <Card className="text-center bg-gradient-to-br from-[#007ACC] to-[#0F172A] text-white border-0">
            <HelpCircle size={48} className="mx-auto mb-6 text-blue-200" />
            <h2 className="text-3xl font-bold mb-4">
              Still Have Questions?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Our support team is here to help you with any questions or concerns
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="secondary" size="lg" icon={Mail}>
                Contact Support
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="!text-white border-white hover:bg-white hover:!text-[#007ACC]"
              >
                Schedule a Call
              </Button>
            </div>
            <p className="mt-8 text-blue-200">
              Email: support@vesdm.edu | Phone: +91 9876543210
            </p>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQPage;

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Card from '../../components/Card';
import FormInput from '../../components/FormInput';
import SEO from '../../components/SEO';
import { useToast } from '../../components/ToastProvider';
import { validators } from '../../utils/validation';

const ContactPage = () => {
  const { success, error } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'general',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
    
    // Clear error when user starts typing
    if (touched[fieldName]) {
      validateField(fieldName, value);
    }
  };

  const handleBlur = (fieldName) => {
    setTouched({ ...touched, [fieldName]: true });
    validateField(fieldName, formData[fieldName]);
  };

  const validateField = (fieldName, value) => {
    let fieldError = '';

    switch (fieldName) {
      case 'name':
        fieldError = validators.required(value, 'Name');
        break;
      case 'email':
        fieldError = validators.email(value);
        break;
      case 'phone':
        fieldError = validators.phone(value);
        break;
      case 'message':
        fieldError = validators.required(value, 'Message') || 
                     validators.minLength(value, 10, 'Message');
        break;
      default:
        break;
    }

    setErrors({ ...errors, [fieldName]: fieldError });
    return fieldError === '';
  };

  const validateForm = () => {
    const newErrors = {};
    const newTouched = {};

    ['name', 'email', 'phone', 'message'].forEach(field => {
      newTouched[field] = true;
      let fieldError = '';

      switch (field) {
        case 'name':
          fieldError = validators.required(formData[field], 'Name');
          break;
        case 'email':
          fieldError = validators.email(formData[field]);
          break;
        case 'phone':
          fieldError = validators.phone(formData[field]);
          break;
        case 'message':
          fieldError = validators.required(formData[field], 'Message') || 
                       validators.minLength(formData[field], 10, 'Message');
          break;
        default:
          break;
      }

      if (fieldError) newErrors[field] = fieldError;
    });

    setTouched(newTouched);
    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      error('Please fix all errors before submitting');
      return;
    }

    setStatus('loading');

    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', phone: '', inquiryType: 'general', message: '' });
      setTouched({});
      setErrors({});
      
      setTimeout(() => setStatus('idle'), 1000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['123 Education Street', 'Learning City, EDU 12345'],
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+1 (555) 123-4567', 'Mon-Fri: 9AM - 6PM'],
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@vesdm.edu', 'admissions@vesdm.edu'],
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'admission', label: 'Admission Information' },
    { value: 'programs', label: 'Program Details' },
    { value: 'franchise', label: 'Franchise Opportunity' },
    { value: 'support', label: 'Technical Support' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Contact Us - VESDM | Get in Touch for Admissions & Inquiries"
        description="Have questions about our programs? Contact VESDM for admissions, course inquiries, or support. We're here to help you start your learning journey."
        keywords="contact vesdm, admissions inquiry, course information, support, get in touch"
        canonical="/contact"
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
              Get In Touch
            </h1>
            <p className="text-xl text-blue-100">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-8">
            {contactInfo.map((info, i) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="text-center h-full">
                    <div className={`inline-flex items-center justify-center w-16 h-16 ${info.color} rounded-2xl mb-4`}>
                      <Icon size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{info.title}</h3>
                    {info.details.map((detail, j) => (
                      <p key={j} className="text-slate-600">{detail}</p>
                    ))}
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Send Us a Message</h2>
              <p className="text-slate-600 mb-8">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <FormInput
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.name}
                  touched={touched.name}
                  placeholder="John Doe"
                  required
                  icon={Mail}
                />

                <FormInput
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.email}
                  touched={touched.email}
                  placeholder="john@example.com"
                  required
                  icon={Mail}
                />

                <FormInput
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.phone}
                  touched={touched.phone}
                  placeholder="1234567890"
                  required
                  icon={Phone}
                />

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Inquiry Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={(e) => handleChange('inquiryType', e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl outline-none focus:border-[#007ACC] focus:ring-4 focus:ring-blue-200 transition-all"
                  >
                    {inquiryTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    onBlur={() => handleBlur('message')}
                    rows={5}
                    placeholder="Tell us how we can help you..."
                    className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all resize-none
                      ${touched.message && errors.message
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        : 'border-slate-200 focus:border-[#007ACC] focus:ring-blue-200'
                      } focus:ring-4`}
                  />
                  {touched.message && errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-600 mt-2 flex items-center gap-1"
                    >
                      <AlertCircle size={14} />
                      {errors.message}
                    </motion.p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  fullWidth
                  disabled={status === 'loading'}
                  icon={Send}
                >
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </motion.div>

            {/* Map & Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Find Us</h2>
                <div className="rounded-2xl overflow-hidden border border-slate-200 h-80 bg-slate-100">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2412648718453!2d-73.98784368459395!3d40.74844097932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1635959942352!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="VESDM Location"
                  ></iframe>
                </div>
              </div>

              <Card>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Office Hours</h3>
                <div className="space-y-3">
                  {[
                    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
                    { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
                    { day: 'Sunday', hours: 'Closed' },
                  ].map((schedule, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                      <span className="font-medium text-slate-900">{schedule.day}</span>
                      <span className="text-slate-600">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-[#007ACC] to-[#0F172A] text-white border-0">
                <h3 className="text-xl font-bold mb-3">Quick Response Guarantee</h3>
                <p className="text-blue-100">
                  We pride ourselves on quick response times. You'll hear back from our team within 24 hours on business days.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;

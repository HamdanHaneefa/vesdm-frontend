import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, ArrowLeft, FileText, Upload, CreditCard, CheckSquare, Calendar, GraduationCap, BookOpen, Users, Award } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Card from '../../components/Card';
import SEO from '../../components/SEO';
import apiClient from '../../api/apiClient';

const AdmissionsPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    qualification: '',
    institution: '',
    yearOfPassing: '',
    percentage: '',
    course: '',
    studyMode: 'online',
    startDate: '',
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await apiClient.get('/courses');
        setCourses(res.data);
      } catch (err) {
        console.error('Failed to load courses', err);
      } finally {
        setLoadingCourses(false);
      }
    };
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError('');
    try {
      await apiClient.post('/admissions', formData);
      setSubmitSuccess(true);
    } catch (err) {
      setSubmitError('Failed to submit application. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitSuccess(false);
    setSubmitError('');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      dob: '',
      qualification: '',
      institution: '',
      yearOfPassing: '',
      percentage: '',
      course: '',
      studyMode: 'online',
      startDate: '',
    });
    setCurrentStep(1);
  };

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const steps = [
    { id: 1, title: 'Personal Info', icon: Users },
    { id: 2, title: 'Academic Details', icon: GraduationCap },
    { id: 3, title: 'Program Selection', icon: BookOpen },
    { id: 4, title: 'Documents', icon: FileText },
    { id: 5, title: 'Review & Submit', icon: CheckSquare },
  ];

  const admissionProcess = [
    { step: 1, title: 'Fill Application', description: 'Complete the online application form with accurate information', icon: FileText },
    { step: 2, title: 'Document Verification', description: 'Submit required documents for verification', icon: CheckCircle },
    { step: 3, title: 'Eligibility Check', description: 'Our team reviews your eligibility for the program', icon: Award },
    { step: 4, title: 'Fee Payment', description: 'Pay the admission fee to confirm your seat', icon: CreditCard },
    { step: 5, title: 'Enrollment', description: 'Receive confirmation and access to student portal', icon: GraduationCap },
    { step: 6, title: 'Start Learning', description: 'Begin your educational journey with VESDM', icon: Calendar },
  ];

  const eligibilityRequirements = [
    { program: 'Diploma Programs', requirement: '10th or 12th pass from recognized board' },
    { program: 'Degree Programs', requirement: '12th pass with minimum 50% marks' },
    { program: 'Certificate Courses', requirement: '10th pass or equivalent qualification' },
    { program: 'Advanced Programs', requirement: 'Relevant diploma/degree with work experience' },
  ];

  const feeStructure = [
    { category: 'Diploma Programs', fee: '₹25,000 - ₹50,000', duration: '1-2 Years', emi: 'Available' },
    { category: 'Degree Programs', fee: '₹75,000 - ₹1,50,000', duration: '3-4 Years', emi: 'Available' },
    { category: 'Certificate Courses', fee: '₹10,000 - ₹25,000', duration: '6-12 Months', emi: 'Not Required' },
    { category: 'Advanced Programs', fee: '₹50,000 - ₹1,00,000', duration: '1-2 Years', emi: 'Available' },
  ];

  const selectedCourse = courses.find(c => c._id === formData.course);
  const courseDisplay = selectedCourse 
    ? `${selectedCourse.name}${selectedCourse.type ? ` - ${selectedCourse.type}` : ''}`
    : 'Not selected';

  const studyModeDisplay = formData.studyMode 
    ? formData.studyMode.charAt(0).toUpperCase() + formData.studyMode.slice(1)
    : 'Online';

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Admissions - Apply Now | VESDM Vocational Education"
        description="Start your journey with VESDM. Learn about admission requirements, application process, and deadlines. Apply online for vocational programs today."
        keywords="vesdm admissions, apply now, admission process, enrollment, application requirements"
        canonical="/admissions"
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
              Start Your Journey
            </h1>
            <p className="text-xl text-blue-100">
              Take the first step towards a successful career. Simple, transparent admission process.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Admission Process
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Six simple steps to begin your educational journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {admissionProcess.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="relative">
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-[#007ACC] to-[#0F172A] rounded-xl flex items-center justify-center text-white font-bold text-lg">
                      {item.step}
                    </div>
                    <div className="mt-4">
                      <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-50 rounded-xl mb-4">
                        <Icon size={28} className="text-[#007ACC]" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-slate-600">{item.description}</p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Eligibility Criteria */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Eligibility Criteria
            </h2>
            <p className="text-lg text-slate-600">
              Check if you meet the requirements for your desired program
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card>
              <div className="divide-y divide-slate-100">
                {eligibilityRequirements.map((item, i) => (
                  <div key={i} className="py-6 first:pt-0 last:pb-0">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                        <CheckCircle size={20} className="text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900 mb-1">{item.program}</h3>
                        <p className="text-slate-600">{item.requirement}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Fee Structure
            </h2>
            <p className="text-lg text-slate-600">
              Transparent pricing with flexible payment options
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 uppercase tracking-wide rounded-tl-xl">Program Category</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 uppercase tracking-wide">Fee Range</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 uppercase tracking-wide">Duration</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 uppercase tracking-wide rounded-tr-xl">EMI Option</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {feeStructure.map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{item.category}</td>
                    <td className="px-6 py-4 text-slate-600">{item.fee}</td>
                    <td className="px-6 py-4 text-slate-600">{item.duration}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                        item.emi === 'Available' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {item.emi}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <p className="text-slate-600 mb-4">* Scholarships available for meritorious students</p>
            <p className="text-slate-600">* Education loan assistance provided</p>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Apply Now
            </h2>
            <p className="text-lg text-slate-600">
              Complete your application in 5 simple steps
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between">
              {steps.map((step, i) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                return (
                  <div key={step.id} className="flex-1 relative">
                    <div className="flex flex-col items-center">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                        isCompleted ? 'bg-emerald-500' : isActive ? 'bg-[#007ACC]' : 'bg-slate-200'
                      }`}>
                        <Icon size={24} className="text-white" />
                      </div>
                      <span className={`text-sm mt-2 font-medium hidden md:block ${
                        isActive || isCompleted ? 'text-slate-900' : 'text-slate-400'
                      }`}>
                        {step.title}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`absolute top-7 left-1/2 w-full h-0.5 translate-x-1/2 ${
                        currentStep > step.id + 1 ? 'bg-emerald-500' : 'bg-slate-200'
                      }`} style={{ left: '50%' }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Content */}
          <Card>
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Personal Information</h3>
                  <Input label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required />
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
                    <Input label="Phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                  </div>
                  <Input label="Date of Birth" type="date" name="dob" value={formData.dob} onChange={handleChange} required />
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Academic Details</h3>
                  <Input label="Highest Qualification" name="qualification" value={formData.qualification} onChange={handleChange} required />
                  <Input label="Institution Name" name="institution" value={formData.institution} onChange={handleChange} required />
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input label="Year of Passing" type="number" name="yearOfPassing" value={formData.yearOfPassing} onChange={handleChange} required />
                    <Input label="Percentage/CGPA" name="percentage" value={formData.percentage} onChange={handleChange} required />
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Program Selection</h3>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Choose Program</label>
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      required
                      disabled={loadingCourses}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#007ACC] focus:ring-2 focus:ring-[#007ACC]/20"
                    >
                      <option value="">Select a program</option>
                      {courses.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.name} {c.type ? ` - ${c.type}` : ''}
                        </option>
                      ))}
                    </select>
                    {loadingCourses && <p className="text-sm text-slate-500 mt-2">Loading programs...</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Study Mode</label>
                    <div className="flex gap-4">
                      {['online', 'offline', 'hybrid'].map((mode) => (
                        <label key={mode} className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="studyMode" value={mode} checked={formData.studyMode === mode} onChange={handleChange} className="w-4 h-4" />
                          <span className="capitalize">{mode}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <Input label="Preferred Start Date" type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Upload Documents</h3>
                  <div className="space-y-4">
                    {['10th Marksheet', '12th Marksheet', 'Photo', 'ID Proof'].map((doc) => (
                      <div key={doc} className="p-6 border-2 border-dashed border-slate-200 rounded-xl hover:border-[#007ACC] transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Upload size={24} className="text-slate-400" />
                            <span className="font-medium text-slate-700">{doc}</span>
                          </div>
                          <Button variant="outline" size="sm">Upload</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <p className="text-sm text-slate-600">• Accepted formats: PDF, JPG, PNG (Max 5MB)</p>
                    <p className="text-sm text-slate-600">• Ensure documents are clear and readable</p>
                    <p className="text-sm text-slate-600 mt-2">* Note: Upload functionality is simulated. Documents will be collected after initial submission.</p>
                  </div>
                </motion.div>
              )}

              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  {submitSuccess ? (
                    <div className="py-12 text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8"
                      >
                        <CheckCircle className="w-12 h-12 text-emerald-600" />
                      </motion.div>
                      <h3 className="text-3xl font-bold text-slate-900 mb-4">
                        Application Submitted Successfully!
                      </h3>
                      <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Thank you{formData.fullName ? `, ${formData.fullName}` : ''}. We have received your application and will review it shortly. You will receive a confirmation email soon.
                      </p>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-2xl font-bold text-slate-900">Review Your Application</h3>

                      <div className="space-y-8">
                        {/* Personal Information */}
                        <div>
                          <h4 className="text-lg font-semibold text-slate-900 mb-4">Personal Information</h4>
                          <div className="bg-slate-50 p-6 rounded-xl space-y-3">
                            <div className="flex justify-between"><span className="font-medium">Full Name:</span><span>{formData.fullName || 'Not provided'}</span></div>
                            <div className="flex justify-between"><span className="font-medium">Email:</span><span>{formData.email || 'Not provided'}</span></div>
                            <div className="flex justify-between"><span className="font-medium">Phone:</span><span>{formData.phone || 'Not provided'}</span></div>
                            <div className="flex justify-between"><span className="font-medium">Date of Birth:</span><span>{formData.dob || 'Not provided'}</span></div>
                          </div>
                        </div>

                        {/* Academic Details */}
                        <div>
                          <h4 className="text-lg font-semibold text-slate-900 mb-4">Academic Details</h4>
                          <div className="bg-slate-50 p-6 rounded-xl space-y-3">
                            <div className="flex justify-between"><span className="font-medium">Highest Qualification:</span><span>{formData.qualification || 'Not provided'}</span></div>
                            <div className="flex justify-between"><span className="font-medium">Institution:</span><span>{formData.institution || 'Not provided'}</span></div>
                            <div className="flex justify-between"><span className="font-medium">Year of Passing:</span><span>{formData.yearOfPassing || 'Not provided'}</span></div>
                            <div className="flex justify-between"><span className="font-medium">Percentage/CGPA:</span><span>{formData.percentage || 'Not provided'}</span></div>
                          </div>
                        </div>

                        {/* Program Selection */}
                        <div>
                          <h4 className="text-lg font-semibold text-slate-900 mb-4">Program Selection</h4>
                          <div className="bg-slate-50 p-6 rounded-xl space-y-3">
                            <div className="flex justify-between"><span className="font-medium">Program:</span><span>{courseDisplay}</span></div>
                            <div className="flex justify-between"><span className="font-medium">Study Mode:</span><span>{studyModeDisplay}</span></div>
                            <div className="flex justify-between"><span className="font-medium">Preferred Start Date:</span><span>{formData.startDate || 'Not provided'}</span></div>
                          </div>
                        </div>

                        {/* Documents Note */}
                        <div>
                          <h4 className="text-lg font-semibold text-slate-900 mb-4">Documents</h4>
                          <div className="bg-slate-50 p-6 rounded-xl">
                            <p className="text-slate-600">Document uploads are simulated. Required documents will be verified after initial application review.</p>
                          </div>
                        </div>
                      </div>

                      {submitError && (
                        <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-xl">
                          {submitError}
                        </div>
                      )}

                      <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl">
                        <CheckCircle size={20} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-700">
                          By submitting, you agree to our terms and conditions and privacy policy. You will receive a confirmation email within 24 hours.
                        </p>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
              {submitSuccess ? (
                <div className="w-full text-center">
                  <Button onClick={resetForm} size="lg">
                    Submit Another Application
                  </Button>
                </div>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    onClick={prevStep} 
                    disabled={currentStep === 1} 
                    icon={ArrowLeft}
                  >
                    Previous
                  </Button>
                  {currentStep < 5 ? (
                    <Button onClick={nextStep} icon={ArrowRight} iconPosition="right">
                      Next Step
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleSubmit} 
                      disabled={submitting} 
                      icon={CheckCircle} 
                      iconPosition="right"
                    >
                      {submitting ? 'Submitting...' : 'Submit Application'}
                    </Button>
                  )}
                </>
              )}
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdmissionsPage;
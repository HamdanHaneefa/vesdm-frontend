import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Search, CheckCircle, XCircle, FileText, Calendar, User, Award } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Card from '../../components/Card';

const CertificateVerificationPage = () => {
  const [regNumber, setRegNumber] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | notFound
  const [certificateData, setCertificateData] = useState(null);

  // Mock certificate data
  const mockCertificates = {
    'VESDM2025001234': {
      studentName: 'Rajesh Kumar Sharma',
      program: 'Diploma in Computer Science',
      issueDate: 'December 15, 2025',
      grade: 'A+',
      cgpa: '8.9/10',
      validity: 'Lifetime',
      certificateNumber: 'VESDM2025001234',
    },
    'VESDM2024005678': {
      studentName: 'Priya Patel',
      program: 'Certificate in Digital Marketing',
      issueDate: 'November 20, 2024',
      grade: 'A',
      cgpa: '8.5/10',
      validity: 'Lifetime',
      certificateNumber: 'VESDM2024005678',
    },
  };

  const handleVerify = (e) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate API call
    setTimeout(() => {
      const data = mockCertificates[regNumber.toUpperCase().trim()];
      if (data) {
        setCertificateData(data);
        setStatus('success');
      } else {
        setCertificateData(null);
        setStatus('notFound');
      }
    }, 1500);
  };

  const features = [
    {
      icon: Shield,
      title: 'Secure Verification',
      description: 'All certificates are securely stored with blockchain technology',
    },
    {
      icon: FileText,
      title: 'Instant Results',
      description: 'Get verification results in seconds',
    },
    {
      icon: CheckCircle,
      title: 'Authentic Records',
      description: 'Verified against our official database',
    },
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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-2xl mb-6">
              <Shield size={40} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Certificate Verification
            </h1>
            <p className="text-xl text-blue-100">
              Verify the authenticity of VESDM certificates instantly using the registration number
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="text-center h-full">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl mb-4">
                      <Icon size={28} className="text-[#007ACC]" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                    <p className="text-slate-600">{feature.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Verification Form */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-12">
          <Card>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Verify Certificate
              </h2>
              <p className="text-slate-600">
                Enter the certificate registration number to verify its authenticity
              </p>
            </div>

            <form onSubmit={handleVerify} className="space-y-6">
              <Input
                label="Certificate Registration Number"
                value={regNumber}
                onChange={(e) => setRegNumber(e.target.value)}
                placeholder="e.g., VESDM2025001234"
                required
              />

              <Button
                type="submit"
                size="lg"
                fullWidth
                disabled={status === 'loading'}
                icon={Search}
              >
                {status === 'loading' ? 'Verifying...' : 'Verify Certificate'}
              </Button>
            </form>

            <div className="mt-8 p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-slate-600">
                <strong>Note:</strong> The registration number can be found on the certificate document. For assistance, contact support@vesdm.edu
              </p>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-500">
                Try sample numbers: <span className="font-mono font-medium text-[#007ACC]">VESDM2025001234</span> or <span className="font-mono font-medium text-[#007ACC]">VESDM2024005678</span>
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Verification Result */}
      {status !== 'idle' && status !== 'loading' && (
        <section className="pb-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {status === 'success' ? (
                <Card className="border-2 border-emerald-200 bg-emerald-50/50">
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-emerald-200">
                    <div className="flex-shrink-0 w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center">
                      <CheckCircle size={32} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-emerald-900 mb-1">
                        Certificate Verified
                      </h3>
                      <p className="text-emerald-700">
                        This is an authentic VESDM certificate
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center gap-2 text-sm text-emerald-700 mb-2">
                          <User size={16} />
                          <span className="font-medium">Student Name</span>
                        </div>
                        <p className="text-lg font-bold text-slate-900">
                          {certificateData.studentName}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-sm text-emerald-700 mb-2">
                          <FileText size={16} />
                          <span className="font-medium">Certificate Number</span>
                        </div>
                        <p className="text-lg font-mono font-bold text-slate-900">
                          {certificateData.certificateNumber}
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center gap-2 text-sm text-emerald-700 mb-2">
                          <Award size={16} />
                          <span className="font-medium">Program</span>
                        </div>
                        <p className="text-lg font-bold text-slate-900">
                          {certificateData.program}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-sm text-emerald-700 mb-2">
                          <Calendar size={16} />
                          <span className="font-medium">Issue Date</span>
                        </div>
                        <p className="text-lg font-bold text-slate-900">
                          {certificateData.issueDate}
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 bg-white rounded-xl">
                        <p className="text-sm text-emerald-700 mb-1">Grade</p>
                        <p className="text-2xl font-bold text-slate-900">{certificateData.grade}</p>
                      </div>
                      <div className="p-4 bg-white rounded-xl">
                        <p className="text-sm text-emerald-700 mb-1">CGPA</p>
                        <p className="text-2xl font-bold text-slate-900">{certificateData.cgpa}</p>
                      </div>
                      <div className="p-4 bg-white rounded-xl">
                        <p className="text-sm text-emerald-700 mb-1">Validity</p>
                        <p className="text-2xl font-bold text-slate-900">{certificateData.validity}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-emerald-200">
                    <p className="text-sm text-emerald-700 text-center">
                      ✅ This certificate has been verified against our official records on {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </Card>
              ) : (
                <Card className="border-2 border-rose-200 bg-rose-50/50">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-rose-500 rounded-full flex items-center justify-center">
                      <XCircle size={32} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-rose-900 mb-1">
                        Certificate Not Found
                      </h3>
                      <p className="text-rose-700">
                        The registration number you entered does not match our records
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-xl">
                    <p className="text-sm text-slate-600 mb-3">
                      <strong>Possible reasons:</strong>
                    </p>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span>The registration number was entered incorrectly</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span>The certificate is not from VESDM</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span>The certificate may be fraudulent</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6">
                    <p className="text-sm text-slate-600 text-center">
                      If you believe this is an error, please contact us at{' '}
                      <a href="mailto:verify@vesdm.edu" className="text-[#007ACC] font-medium hover:underline">
                        verify@vesdm.edu
                      </a>
                    </p>
                  </div>
                </Card>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How Verification Works
            </h2>
            <p className="text-lg text-slate-600">
              Our secure verification process ensures certificate authenticity
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Enter Details', description: 'Input the certificate registration number' },
              { step: 2, title: 'Database Check', description: 'System checks against official records' },
              { step: 3, title: 'Verification', description: 'Certificate details are cross-verified' },
              { step: 4, title: 'Result Display', description: 'Instant verification result with details' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="text-center relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#007ACC] to-[#0F172A] rounded-xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CertificateVerificationPage;

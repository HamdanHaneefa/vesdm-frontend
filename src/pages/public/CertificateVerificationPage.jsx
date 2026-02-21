import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Search, CheckCircle, XCircle, FileText, 
  Calendar, User, Award, Loader2, X, GraduationCap 
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Card from '../../components/Card';
import apiClient from '../../api/apiClient';

const CertificateVerificationPage = () => {
  const [regNumber, setRegNumber] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | notFound
  const [certificateData, setCertificateData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!regNumber.trim()) return;

    setStatus('loading');
    setCertificateData(null);

    try {
      // 1. Start the API call
      const apiPromise = apiClient.post('/students/verify-certificate', {
        registrationNumber: regNumber.trim().toUpperCase()
      });

      // 2. Create a "Fake Loader" delay of 1 second
      const delayPromise = new Promise(resolve => setTimeout(resolve, 1000));

      // 3. Wait for both
      const [response] = await Promise.all([apiPromise, delayPromise]);

      if (response.data.valid) {
        const data = response.data.details;
        setCertificateData({
          studentName: data.studentName,
          program: data.program,
          issueDate: new Date(data.issueDate).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
          }),
          certificateNumber: data.certificateNumber,
          validity: data.validity,
          grade: 'Verified',
          cgpa: 'Official Record'
        });
        setStatus('success');
      } else {
        setStatus('notFound');
      }
      setIsModalOpen(true);
    } catch (err) {
      console.error("Verification error", err);
      setStatus('notFound');
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Reset status after modal closes to allow fresh search
    setTimeout(() => setStatus('idle'), 300);
  };

  const features = [
    { icon: Shield, title: 'Secure Verification', description: 'All certificates are verified against our encrypted database records.' },
    { icon: FileText, title: 'Instant Results', description: 'Real-time cross-referencing for immediate authenticity confirmation.' },
    { icon: CheckCircle, title: 'Official Records', description: 'Access student name, program details, and original issue dates.' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#007ACC] to-[#0F172A] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-2xl mb-6">
              <Shield size={40} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Certificate Verification</h1>
            <p className="text-xl text-blue-100">Ensure the authenticity of VESDM credentials in real-time.</p>
          </motion.div>
        </div>
      </section>

      {/* Verification Form */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-12">
          <Card className="shadow-2xl border-0">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Verify Now</h2>
              <p className="text-slate-600">Enter the unique Certificate Registration Number found on the document.</p>
            </div>

            <form onSubmit={handleVerify} className="space-y-6">
              <Input
                label="Certificate ID"
                value={regNumber}
                onChange={(e) => setRegNumber(e.target.value)}
                placeholder="e.g., VESDM2026-645B-1234"
                required
                className="text-center font-mono uppercase"
              />

              <Button
                type="submit"
                size="lg"
                fullWidth
                disabled={status === 'loading'}
                className="bg-[#007ACC] hover:bg-[#005FA3]"
              >
                {status === 'loading' ? (
                  <span className="flex items-center gap-2"><Loader2 className="animate-spin" /> Verifying...</span>
                ) : (
                  <span className="flex items-center gap-2"><Search size={20}/> Check Authenticity</span>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12 text-center">
            <div className="grid md:grid-cols-3 gap-12">
                {features.map((f, i) => (
                    <div key={i}>
                        <div className="w-16 h-16 bg-blue-50 text-[#007ACC] rounded-full flex items-center justify-center mx-auto mb-4">
                            <f.icon size={30} />
                        </div>
                        <h3 className="font-bold text-xl mb-2">{f.title}</h3>
                        <p className="text-slate-500">{f.description}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* RESULT MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden"
            >
              {/* Close Button */}
              <button onClick={closeModal} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 z-10">
                <X size={24} />
              </button>

              {status === 'success' ? (
                <div>
                  <div className="bg-emerald-500 p-8 text-white text-center">
                    <CheckCircle size={60} className="mx-auto mb-4" />
                    <h2 className="text-3xl font-bold">Certificate Verified</h2>
                    <p className="opacity-90">Official VESDM Digital Credential</p>
                  </div>
                  
                  <div className="p-8 space-y-6">
                    <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl">
                        <User className="text-[#007ACC] mt-1" />
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase">Student Name</p>
                            <p className="text-xl font-bold text-slate-900">{certificateData.studentName}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 border border-slate-100 rounded-2xl">
                            <GraduationCap className="text-[#007ACC] mb-2" size={20} />
                            <p className="text-xs font-bold text-slate-400 uppercase">Program</p>
                            <p className="font-bold text-slate-800">{certificateData.program}</p>
                        </div>
                        <div className="p-4 border border-slate-100 rounded-2xl">
                            <Calendar className="text-[#007ACC] mb-2" size={20} />
                            <p className="text-xs font-bold text-slate-400 uppercase">Issue Date</p>
                            <p className="font-bold text-slate-800">{certificateData.issueDate}</p>
                        </div>
                    </div>

                    <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex justify-between items-center">
                        <div>
                            <p className="text-xs font-bold text-emerald-600 uppercase">Status</p>
                            <p className="font-bold text-emerald-700">Authentic & Active</p>
                        </div>
                        <Award className="text-emerald-500" size={32} />
                    </div>

                    <Button fullWidth onClick={closeModal} className="bg-slate-900 hover:bg-black text-white py-4 rounded-2xl">
                        Close Verification
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center">
                  <div className="w-20 h-20 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <XCircle size={48} />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">Verification Failed</h2>
                  <p className="text-slate-500 mb-8">
                    The registration number <span className="font-mono font-bold text-slate-800">"{regNumber}"</span> was not found in our records. Please check for typos and try again.
                  </p>
                  <Button fullWidth onClick={closeModal} className="bg-rose-600 hover:bg-rose-700 text-white py-4 rounded-2xl">
                    Try Another Number
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default CertificateVerificationPage;
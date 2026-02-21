import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Download, Calendar, Loader2, AlertCircle } from 'lucide-react';
import apiClient from '../../../api/apiClient';

const StudentCertificates = () => {
  const [enrollmentsWithCerts, setEnrollmentsWithCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // We fetch the student profile which contains enrolledCourses
        const res = await apiClient.get('/student/profile');
        
        // Filter enrolledCourses that have a certificate issued
        const issued = (res.data.enrolledCourses || []).filter(
          (e) => e.certificate && e.certificate.number
        );
        
        setEnrollmentsWithCerts(issued);
        setError(null);
      } catch (err) {
        setError('Failed to load certificates');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-purple-600" size={48} /></div>;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Academic Certificates</h1>
          <p className="text-slate-600 text-lg">Download verified certificates for your completed courses.</p>
        </motion.div>

        {enrollmentsWithCerts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border">
            <Award className="text-slate-300 mx-auto mb-4" size={48} />
            <p className="text-slate-500">No certificates issued yet.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {enrollmentsWithCerts.map((enrollment, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 flex flex-col md:flex-row justify-between items-center"
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                    <Award size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{enrollment.course?.name}</h3>
                    <p className="text-sm text-slate-500 font-mono">ID: {enrollment.certificate.number}</p>
                    <p className="text-xs text-slate-400 mt-1">Issued: {new Date(enrollment.certificate.issueDate).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <a 
                  href={`${import.meta.env.VITE_UPLOADS_URL}/${enrollment.certificate.file}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 md:mt-0 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2"
                >
                  <Download size={18} /> Download PDF
                </a>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentCertificates;
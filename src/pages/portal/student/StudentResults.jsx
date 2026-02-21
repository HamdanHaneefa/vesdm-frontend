import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Loader2, AlertCircle, GraduationCap } from 'lucide-react';
import apiClient from '../../../api/apiClient';

const StudentResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const resultsRes = await apiClient.get('/student/results');
        setResults(resultsRes.data || []);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.msg || 'Failed to load results');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getGradeColor = (grade) => {
    if (!grade) return 'bg-slate-100 text-slate-600';
    const upper = grade.toUpperCase();
    if (['A+', 'A'].includes(upper)) return 'bg-emerald-100 text-emerald-700';
    if (['B+', 'B'].includes(upper)) return 'bg-blue-100 text-blue-700';
    if (['C+', 'C'].includes(upper)) return 'bg-amber-100 text-amber-700';
    return 'bg-rose-100 text-rose-700';
  };

  // Group by course safely
  const groupedResults = results.reduce((acc, result) => {
    const course = result.course;
    
    // Logic to handle if course is an object or just an ID string
    const courseId = course?._id || (typeof course === 'string' ? course : 'unknown');
    const courseName = course?.name || 'General / Other';

    if (!acc[courseId]) {
      acc[courseId] = {
        name: courseName,
        results: []
      };
    }
    acc[courseId].results.push(result);
    return acc;
  }, {});

  const groups = Object.values(groupedResults).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="animate-spin text-purple-600 mb-4" size={48} />
        <p className="text-slate-500 font-medium">Fetching your grades...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-10 bg-rose-50 border-2 border-rose-200 rounded-xl p-6 flex items-center gap-3">
        <AlertCircle size={24} className="text-rose-600" />
        <p className="text-rose-800 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-600 rounded-lg text-white">
              <GraduationCap size={24} />
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Academic Performance</h1>
          </div>
          <p className="text-slate-600 text-lg">Detailed report of your examination results</p>
        </motion.div>

        {results.length === 0 ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-16 text-center shadow-sm border border-slate-200">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="text-slate-300" size={40} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No Results Found</h3>
            <p className="text-slate-500 max-w-sm mx-auto">Your results will be visible here once the administration publishes them.</p>
          </motion.div>
        ) : (
          <div className="space-y-10">
            {groups.map((group, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">{group.name}</h2>
                    <p className="text-slate-400 text-sm">Course Curriculum Performance</p>
                  </div>
                  <div className="bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
                    <span className="text-sm font-bold">{group.results.length} Exam Records</span>
                  </div>
                </div>

                <div className="p-2 md:p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-100">
                          <th className="text-left py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Exam Subject</th>
                          <th className="text-center py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Score</th>
                          <th className="text-center py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Grade</th>
                          <th className="text-right py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Date Published</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {group.results
                          .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))
                          .map((result, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/80 transition-colors group">
                              <td className="py-5 px-4">
                                <p className="font-bold text-slate-800 group-hover:text-purple-600 transition-colors">{result.examName}</p>
                                <p className="text-xs text-slate-400 font-medium uppercase">{result.subject}</p>
                              </td>
                              <td className="py-5 px-4 text-center">
                                <span className="text-lg font-black text-slate-900">
                                  {result.marks ?? 'N/A'}
                                </span>
                              </td>
                              <td className="py-5 px-4 text-center">
                                {result.grade ? (
                                  <span className={`inline-block w-12 py-1 rounded-lg font-black text-sm shadow-sm ${getGradeColor(result.grade)}`}>
                                    {result.grade}
                                  </span>
                                ) : (
                                  <span className="text-slate-300">—</span>
                                )}
                              </td>
                              <td className="py-5 px-4 text-right text-sm font-medium text-slate-500">
                                {result.publishedDate
                                  ? new Date(result.publishedDate).toLocaleDateString('en-GB', { 
                                      day: '2-digit', 
                                      month: 'short', 
                                      year: 'numeric' 
                                    })
                                  : 'Pending'}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentResults;
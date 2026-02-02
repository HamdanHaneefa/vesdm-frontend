import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Loader2, AlertCircle } from 'lucide-react';
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

  // Group by course using populated course data
  const groupedResults = results.reduce((acc, result) => {
    const course = result.course || null;
    const courseId = course ? course._id.toString() : 'unknown';
    const courseName = course ? course.name : 'Unknown Course';

    if (!acc[courseId]) {
      acc[courseId] = {
        name: courseName,
        results: []
      };
    }
    acc[courseId].results.push(result);
    return acc;
  }, {});

  // Convert to array and sort groups by course name
  const groups = Object.values(groupedResults).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-purple-600" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-rose-50 border-2 border-rose-200 rounded-xl p-6 flex items-center gap-3">
        <AlertCircle size={24} className="text-rose-600" />
        <p className="text-rose-800">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">My Exam Results</h1>
          <p className="text-slate-600">View your performance in various exams</p>
        </motion.div>

        {results.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl p-12 text-center shadow-lg border border-slate-200">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="text-slate-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No results available</h3>
            <p className="text-slate-600">Results will appear here once published by the admin.</p>
          </motion.div>
        ) : (
          <div className="space-y-8">
            {groups.map((group, index) => {
              const { name: courseName, results: courseResults } = group;

              return (
                <motion.div
                  key={group.name + index} // fallback key if unknown
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
                    <h2 className="text-2xl font-bold">{courseName}</h2>
                    <p className="text-purple-100">{courseResults.length} exam{courseResults.length !== 1 ? 's' : ''}</p>
                  </div>

                  <div className="p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b-2 border-slate-200">
                            <th className="text-left py-3 px-4 text-sm font-bold text-slate-700 uppercase tracking-wide">Exam</th>
                            <th className="text-center py-3 px-4 text-sm font-bold text-slate-700 uppercase tracking-wide">Marks</th>
                            <th className="text-center py-3 px-4 text-sm font-bold text-slate-700 uppercase tracking-wide">Grade</th>
                            <th className="text-center py-3 px-4 text-sm font-bold text-slate-700 uppercase tracking-wide">Published Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {courseResults
                            .sort((a, b) => new Date(b.publishedDate || 0) - new Date(a.publishedDate || 0))
                            .map((result, idx) => (
                              <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                                {/* <td className="py-4 px-4 font-mono text-sm text-slate-600">
                                  {result.examId || 'N/A'}
                                </td> */}
                                <td className="py-4 px-4 font-mono text-sm text-slate-600">
                                  {result.examName || 'N/A'}
                                </td>
                                <td className="py-4 px-4 text-center font-bold text-slate-900">
                                  {result.marks !== undefined && result.marks !== null ? result.marks : 'Pending'}
                                </td>
                                <td className="py-4 px-4 text-center">
                                  {result.grade ? (
                                    <span className={`px-4 py-1.5 rounded-full font-bold text-sm ${getGradeColor(result.grade)}`}>
                                      {result.grade}
                                    </span>
                                  ) : (
                                    <span className="text-slate-400 italic">-</span>
                                  )}
                                </td>
                                <td className="py-4 px-4 text-center text-sm text-slate-600">
                                  {result.publishedDate
                                    ? new Date(result.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                    : '-'}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentResults;
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Search, Loader2, AlertCircle, CheckCircle, UserCheck, UserPlus } from 'lucide-react';
import apiClient from '../../../api/apiClient';
import { useAuth } from '../../../contexts/AuthContext';

const RegisterStudentsForExam = () => {
  const { user } = useAuth();

  const [exams, setExams] = useState([]);
  const [selectedExamId, setSelectedExamId] = useState('');

  const [availableStudents, setAvailableStudents] = useState([]);
  const [registeredStudents, setRegisteredStudents] = useState([]);

  const [selectedStudents, setSelectedStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  // 1. Fetch open exams on mount
  useEffect(() => {
    setLoading(true);
    apiClient
      .get('/exams?status=open')
      .then(res => setExams(res.data || []))
      .catch(() => setMessage({ type: 'error', text: 'Failed to load available exams' }))
      .finally(() => setLoading(false));
  }, []);

  // 2. Fetch categorised students when exam is selected
  const fetchStudentStatus = useCallback(async () => {
    if (!selectedExamId) return;
    try {
      const res = await apiClient.get(`/exams/${selectedExamId}/registration-status`);
      setAvailableStudents(res.data.available || []);
      setRegisteredStudents(res.data.registered || []);
      setSelectedStudents([]);
    } catch {
      setMessage({ type: 'error', text: 'Failed to load students' });
    }
  }, [selectedExamId]);

  useEffect(() => {
    fetchStudentStatus();
  }, [fetchStudentStatus]);

  const filteredAvailable = availableStudents.filter(
    s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.registrationNumber?.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStudent = id => {
    setSelectedStudents(prev =>
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    );
  };

  const selectAllVisible = () => {
    if (selectedStudents.length === filteredAvailable.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredAvailable.map(s => s._id));
    }
  };

  const handleRegister = async () => {
    if (selectedStudents.length === 0) return;
    setSubmitting(true);
    setMessage(null);
    try {
      await apiClient.post(`/exams/${selectedExamId}/register`, { studentIds: selectedStudents });
      setMessage({ type: 'success', text: `Successfully registered ${selectedStudents.length} student(s)!` });
      await fetchStudentStatus();
    } catch (err) {
      setMessage({ type: 'error', text: err?.response?.data?.msg || 'Registration failed' });
    } finally {
      setSubmitting(false);
    }
  };

  if (user?.role !== 'franchisee') {
    return <div className="p-10 text-center text-red-600 text-xl">Access denied – Franchise only</div>;
  }

  const selectedExam = exams.find(ex => ex._id === selectedExamId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 rounded-3xl p-8 text-white shadow-2xl"
        >
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Calendar className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Register Students for Examination</h1>
              <p className="text-purple-100 mt-1">Apply for exams before the deadline</p>
            </div>
          </div>
        </motion.div>

        {/* Status Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`p-4 rounded-xl flex items-center gap-3 border ${
              message.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}
          >
            {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span>{message.text}</span>
          </motion.div>
        )}

        {/* Exam Selection */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Select Examination</label>
          {loading ? (
            <div className="flex items-center gap-2 text-slate-500 py-3">
              <Loader2 className="animate-spin" size={18} /> Loading exams...
            </div>
          ) : (
            <select
              value={selectedExamId}
              onChange={e => { setSelectedExamId(e.target.value); setMessage(null); }}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Choose an exam</option>
              {exams.map(exam => (
                <option key={exam._id} value={exam._id}>
                  {exam.name} | Date: {new Date(exam.date).toLocaleDateString('en-GB')} (Deadline: {new Date(exam.deadline).toLocaleDateString('en-GB')})
                </option>
              ))}
            </select>
          )}

          {exams.length === 0 && !loading && (
            <p className="mt-3 text-sm text-slate-400 italic">No open exams available at the moment.</p>
          )}
        </div>

        {/* Registration Area */}
        {selectedExam && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Available Students */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <UserPlus size={18} className="text-purple-600" /> Available Students
                </h2>
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>
              </div>

              <div className="overflow-x-auto min-h-[300px]">
                <table className="w-full">
                  <thead className="bg-slate-50 text-slate-600 text-sm">
                    <tr>
                      <th className="px-6 py-4 text-left">
                        <input
                          type="checkbox"
                          checked={selectedStudents.length === filteredAvailable.length && filteredAvailable.length > 0}
                          onChange={selectAllVisible}
                          className="rounded text-purple-600"
                        />
                      </th>
                      <th className="px-6 py-4 text-left font-medium">Reg. Number</th>
                      <th className="px-6 py-4 text-left font-medium">Student Name</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredAvailable.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="px-6 py-12 text-center text-slate-400">
                          No students available for registration.
                        </td>
                      </tr>
                    ) : (
                      filteredAvailable.map(s => (
                        <tr key={s._id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4">
                            <input
                              type="checkbox"
                              checked={selectedStudents.includes(s._id)}
                              onChange={() => toggleStudent(s._id)}
                              className="rounded text-purple-600"
                            />
                          </td>
                          <td className="px-6 py-4 text-sm font-mono">{s.registrationNumber}</td>
                          <td className="px-6 py-4 text-sm font-medium text-slate-700">{s.name}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                <span className="text-sm text-slate-500">{selectedStudents.length} selected</span>
                <button
                  onClick={handleRegister}
                  disabled={submitting || selectedStudents.length === 0}
                  className="px-6 py-2.5 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 flex items-center gap-2 transition-all shadow-md"
                >
                  {submitting ? <Loader2 className="animate-spin" size={18} /> : <UserCheck size={18} />}
                  {submitting ? 'Registering...' : 'Register Selected'}
                </button>
              </div>
            </motion.div>

            {/* Already Registered Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col"
            >
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-emerald-700">
                <CheckCircle size={18} /> Registered ({registeredStudents.length})
              </h2>
              <div className="space-y-3 overflow-y-auto flex-grow max-h-[600px]">
                {registeredStudents.length === 0 ? (
                  <p className="text-sm text-slate-400 italic">No students registered yet for this exam.</p>
                ) : (
                  registeredStudents.map(s => (
                    <div key={s._id} className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex justify-between items-center">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{s.name}</p>
                        <p className="text-xs text-slate-500 font-mono">{s.registrationNumber}</p>
                      </div>
                      <CheckCircle className="text-emerald-500 opacity-60" size={16} />
                    </div>
                  ))
                )}
              </div>
            </motion.div>

          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterStudentsForExam;

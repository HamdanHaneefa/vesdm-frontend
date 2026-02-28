import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Timer, Target, CheckCircle, Loader2 } from 'lucide-react';
import apiClient from '../../../api/apiClient';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

const CreateExam = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const [form, setForm] = useState({
    name: '',
    subject: '',
    customSubject: '',
    date: '',
    deadline: '',
    time: '',
    duration: '',
    totalMarks: '',
    passingMarks: '',
    course: '',
  });

  useEffect(() => {
    apiClient
      .get('/courses')
      .then((res) => setCourses(res.data || []))
      .catch((err) => console.error('Courses fetch failed', err));
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrorMsg(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const examDate = new Date(form.date);
    examDate.setHours(0, 0, 0, 0);

    const deadlineDate = new Date(form.deadline);
    deadlineDate.setHours(0, 0, 0, 0);

    if (examDate < today) {
      setErrorMsg('Exam date cannot be in the past.');
      return;
    }

    if (deadlineDate < today) {
      setErrorMsg('Registration deadline cannot be in the past.');
      return;
    }

    if (deadlineDate >= examDate) {
      setErrorMsg('Registration deadline must be at least one day before the exam date.');
      return;
    }

    if (form.subject === 'other' && !form.customSubject.trim()) {
      setErrorMsg('Please type the subject name.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: form.name.trim(),
        subject: form.subject === 'other' ? (form.customSubject || '').trim() : form.subject.trim(),
        date: form.date,
        deadline: form.deadline,
        time: form.time,
        duration: Number(form.duration),
        totalMarks: Number(form.totalMarks),
        passingMarks: Number(form.passingMarks),
        courseId: form.course,
      };

      await apiClient.post('/exams', payload);
      alert('Exam created successfully!');
      navigate('/portal/admin/dashboard');
    } catch (err) {
      const msg = err?.response?.data?.msg || 'Failed to create exam.';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== 'admin') {
    return (
      <div className="p-10 text-center text-red-600 text-xl">
        Access denied – Admin only
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-slate-800 mb-2"
        >
          Create New Examination
        </motion.h1>
        <p className="text-slate-600 mb-8">
          Set up exam details — students will be registered by franchises.
        </p>

        {errorMsg && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl">
            {errorMsg}
          </div>
        )}

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-slate-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Exam Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Exam Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Mid-Term Exam 2026"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Course */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Course *</label>
              <select
                name="course"
                value={form.course}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select Subject</option>
                {courses.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name} ({c.type})
                  </option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Subject *</label>
              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select Subject</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="SEO & Social Media Marketing">SEO & Social Media Marketing</option>
                <option value="Content Strategy & Analytics">Content Strategy & Analytics</option>
                <option value="Full Stack Web Development">Full Stack Web Development</option>
                <option value="Frontend Development (HTML/CSS/JS)">Frontend Development (HTML/CSS/JS)</option>
                <option value="Backend Development (Node.js)">Backend Development (Node.js)</option>
                <option value="React & Modern Frameworks">React & Modern Frameworks</option>
                <option value="Database Management">Database Management</option>
                <option value="Business Management">Business Management</option>
                <option value="Financial Accounting">Financial Accounting</option>
                <option value="Leadership & Operations">Leadership & Operations</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Mobile App Development">Mobile App Development</option>
                <option value="Data Structures & Algorithms">Data Structures & Algorithms</option>
                <option value="Networking & Cybersecurity">Networking & Cybersecurity</option>
                <option value="Cloud Computing">Cloud Computing</option>
                <option value="other">Other (type below)</option>
              </select>
              {form.subject === 'other' && (
                <input
                  type="text"
                  name="subject"
                  value={form.customSubject || ''}
                  onChange={e => setForm(prev => ({ ...prev, customSubject: e.target.value }))}
                  placeholder="Type subject name..."
                  required
                  autoFocus
                  className="mt-2 w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              )}
            </div>

            {/* Exam Date */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Exam Date *</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Exam Time */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Exam Time *</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Duration (minutes) *</label>
              <div className="relative">
                <Timer className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="number"
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                  required
                  min="1"
                  placeholder="e.g., 180"
                  className="w-full pl-10 px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Total Marks */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Total Marks *</label>
              <div className="relative">
                <Target className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="number"
                  name="totalMarks"
                  value={form.totalMarks}
                  onChange={handleChange}
                  required
                  min="1"
                  placeholder="e.g., 100"
                  className="w-full pl-10 px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Passing Marks */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Passing Marks *</label>
              <div className="relative">
                <CheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="number"
                  name="passingMarks"
                  value={form.passingMarks}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="e.g., 40"
                  className="w-full pl-10 px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Application Deadline */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Application Deadline *</label>
              <input
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <p className="text-xs text-amber-600 mt-1">⚠ Franchises can register students until this date (must be before exam date)</p>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/portal/admin/dashboard')}
              className="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-all"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-red-600 to-rose-700 text-white rounded-xl font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
            >
              {loading && <Loader2 className="animate-spin" size={18} />}
              {loading ? 'Creating...' : '+ Create Exam'}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default CreateExam;

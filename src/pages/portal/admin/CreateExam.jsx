import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, BookOpen, Save, Plus } from 'lucide-react';

const CreateExam = () => {
  const [examDetails, setExamDetails] = useState({
    examName: '',
    subject: '',
    examDate: '',
    examTime: '',
    duration: '',
    totalMarks: '',
    passingMarks: '',
    applicationDeadline: ''
  });

  const [exams, setExams] = useState([
    { id: 1, name: 'Mid-Term Exam - Programming Fundamentals', subject: 'Programming', date: '2026-03-15', totalMarks: 100, passingMarks: 40, deadline: '2026-03-10' },
    { id: 2, name: 'Mid-Term Exam - Web Technologies', subject: 'Web Tech', date: '2026-03-18', totalMarks: 100, passingMarks: 40, deadline: '2026-03-13' },
    { id: 3, name: 'Final Exam - Database Management', subject: 'DBMS', date: '2026-03-20', totalMarks: 100, passingMarks: 40, deadline: '2026-03-15' }
  ]);

  const subjects = [
    'Programming Fundamentals',
    'Web Technologies',
    'Database Management',
    'Data Structures',
    'Digital Marketing Basics',
    'SEO & Analytics',
    'Graphic Design Fundamentals',
    'UI/UX Design',
    'Mobile App Development'
  ];

  const handleExamDetailChange = (e) => {
    const { name, value } = e.target;
    setExamDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate deadline is before exam date
    const examDate = new Date(examDetails.examDate);
    const deadline = new Date(examDetails.applicationDeadline);
    
    if (deadline >= examDate) {
      alert('Application deadline must be before the exam date!');
      return;
    }
    
    console.log('Exam Created:', examDetails);
    
    // Add to exams list
    const newExam = {
      id: exams.length + 1,
      name: examDetails.examName,
      subject: examDetails.subject,
      date: examDetails.examDate,
      totalMarks: examDetails.totalMarks,
      passingMarks: examDetails.passingMarks,
      deadline: examDetails.applicationDeadline
    };
    
    setExams([...exams, newExam]);
    
    // Reset form
    setExamDetails({
      examName: '',
      subject: '',
      examDate: '',
      examTime: '',
      duration: '',
      totalMarks: '',
      passingMarks: '',
      applicationDeadline: ''
    });
    
    alert('Exam created successfully!');
  };

  const handleDeleteExam = (examId) => {
    if (confirm('Are you sure you want to delete this exam?')) {
      setExams(exams.filter(exam => exam.id !== examId));
    }
  };

  const getDeadlineStatus = (deadline) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
    
    if (daysLeft < 0) {
      return { status: 'Closed', color: 'slate', days: 0 };
    } else if (daysLeft <= 3) {
      return { status: 'Closing Soon', color: 'red', days: daysLeft };
    } else if (daysLeft <= 7) {
      return { status: 'Open', color: 'amber', days: daysLeft };
    } else {
      return { status: 'Open', color: 'emerald', days: daysLeft };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-600 via-red-700 to-rose-700 rounded-3xl p-8 text-white shadow-2xl"
        >
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Calendar className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Create Examination</h1>
              <p className="text-red-100 mt-1">Set up new exams and configure exam details</p>
            </div>
          </div>
        </motion.div>

        {/* Exam Creation Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-100 rounded-xl">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Examination Details</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Exam Name *</label>
                <input
                  type="text"
                  name="examName"
                  value={examDetails.examName}
                  onChange={handleExamDetailChange}
                  placeholder="e.g., Mid-Term Examination 2026"
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Subject *</label>
                <select
                  name="subject"
                  value={examDetails.subject}
                  onChange={handleExamDetailChange}
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select Subject</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Exam Date *</label>
                <input
                  type="date"
                  name="examDate"
                  value={examDetails.examDate}
                  onChange={handleExamDetailChange}
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Exam Time *</label>
                <input
                  type="time"
                  name="examTime"
                  value={examDetails.examTime}
                  onChange={handleExamDetailChange}
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Duration (minutes) *</label>
                <input
                  type="number"
                  name="duration"
                  value={examDetails.duration}
                  onChange={handleExamDetailChange}
                  placeholder="e.g., 180"
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Total Marks *</label>
                <input
                  type="number"
                  name="totalMarks"
                  value={examDetails.totalMarks}
                  onChange={handleExamDetailChange}
                  placeholder="e.g., 100"
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Passing Marks *</label>
                <input
                  type="number"
                  name="passingMarks"
                  value={examDetails.passingMarks}
                  onChange={handleExamDetailChange}
                  placeholder="e.g., 40"
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Application Deadline *</label>
                <input
                  type="date"
                  name="applicationDeadline"
                  value={examDetails.applicationDeadline}
                  onChange={handleExamDetailChange}
                  max={examDetails.examDate ? examDetails.examDate : undefined}
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <p className="text-xs text-slate-500 mt-1">⚠️ Franchises can register students until this date (must be before exam date)</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => setExamDetails({
                  examName: '',
                  subject: '',
                  examDate: '',
                  examTime: '',
                  duration: '',
                  totalMarks: '',
                  passingMarks: '',
                  applicationDeadline: ''
                })}
                className="px-6 py-3 border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Create Exam
              </button>
            </div>
          </form>
        </motion.div>

        {/* Existing Exams List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-8"
        >
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Scheduled Examinations</h2>
          
          <div className="space-y-4">
            {exams.map((exam) => {
              const deadlineInfo = getDeadlineStatus(exam.deadline);
              return (
                <div key={exam.id} className="border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-slate-800">{exam.name}</h3>
                        <span className={`px-3 py-1 bg-${deadlineInfo.color}-100 text-${deadlineInfo.color}-700 rounded-lg text-xs font-bold`}>
                          {deadlineInfo.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                        <div>
                          <p className="text-xs text-slate-500">Subject</p>
                          <p className="text-sm font-semibold text-slate-700">{exam.subject}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Exam Date</p>
                          <p className="text-sm font-semibold text-slate-700">{exam.date}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Total Marks</p>
                          <p className="text-sm font-semibold text-slate-700">{exam.totalMarks}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Passing Marks</p>
                          <p className="text-sm font-semibold text-slate-700">{exam.passingMarks}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Application Deadline</p>
                          <p className="text-sm font-semibold text-red-600">{exam.deadline}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Days Left</p>
                          <p className={`text-sm font-bold ${deadlineInfo.days === 0 ? 'text-slate-400' : deadlineInfo.days <= 3 ? 'text-red-600' : 'text-emerald-600'}`}>
                            {deadlineInfo.days === 0 ? 'Closed' : `${deadlineInfo.days} day${deadlineInfo.days !== 1 ? 's' : ''}`}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteExam(exam.id)}
                      className="ml-4 px-4 py-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors text-sm font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateExam;

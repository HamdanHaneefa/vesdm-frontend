// src/pages/portal/admin/CreateExam.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  BookOpen,
  Clock,
  Timer,
  Target,
  CheckCircle,
  Loader2,
} from "lucide-react";
import apiClient from "../../../api/apiClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

const CreateExam = () => {
  const { user } = useAuth() as { user: { role: string } | null };
  const navigate = useNavigate();

  const [courses, setCourses] = useState<
    { _id: string; name: string; type: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    subject: "",
    date: "",
    deadline: "",
    time: "", // e.g. "14:30"
    duration: "", // minutes
    totalMarks: "",
    passingMarks: "",
    course: "", // renamed from courseId → matches backend
  });

  useEffect(() => {
    apiClient
      .get("/courses")
      .then((res) => setCourses(res.data || []))
      .catch((err) => console.error("Courses fetch failed", err));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrorMsg(null); // clear error on change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // 1. Get current date at midnight for comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 2. Parse input dates and normalize them to midnight
    const examDate = new Date(form.date);
    examDate.setHours(0, 0, 0, 0);

    const deadlineDate = new Date(form.deadline);
    deadlineDate.setHours(0, 0, 0, 0);

    // --- VALIDATION RULES ---

    // A. Exam Date: Must be Today or Future
    if (examDate < today) {
      setErrorMsg("Exam date cannot be in the past.");
      return;
    }

    // B. Deadline: Must not be in the past
    if (deadlineDate < today) {
      setErrorMsg("Registration deadline cannot be in the past.");
      return;
    }

    // C. Deadline: Must be before the exam (and not on the same day)
    if (deadlineDate >= examDate) {
      setErrorMsg("Registration deadline must be at least one day before the exam date.");
      return;
    }

    // D. Deadline: Must not be in the future relative to the Exam 
    // (Handled by the logic: Today <= Deadline < Exam)

    setLoading(true);

    try {
      const payload = {
        name: form.name.trim(),
        subject: form.subject.trim(),
        date: form.date,
        deadline: form.deadline,
        time: form.time,
        duration: Number(form.duration),
        totalMarks: Number(form.totalMarks),
        passingMarks: Number(form.passingMarks),
        courseId: form.course,
      };

      await apiClient.post("/exams", payload);
      alert("Exam created successfully!");
      navigate("/portal/admin/dashboard");
    } catch (err: any) {
      const msg = err?.response?.data?.msg || "Failed to create exam.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== "admin") {
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
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Exam Name *
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Mid-Term Exam 2025"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Course */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Course *
              </label>
              <select
                name="course"
                value={form.course}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select course...</option>
                {courses.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name} ({c.type})
                  </option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Subject (optional)
              </label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Mathematics / Financial Accounting / ..."
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Exam Date */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Exam Date *
              </label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Registration Deadline *
              </label>
              <input
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Exam Time *
              </label>
              <div className="relative">
                <Clock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Duration (minutes) *
              </label>
              <div className="relative">
                <Timer
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="number"
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                  required
                  min="1"
                  placeholder="180"
                  className="w-full pl-10 px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Total Marks */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Total Marks *
              </label>
              <div className="relative">
                <Target
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="number"
                  name="totalMarks"
                  value={form.totalMarks}
                  onChange={handleChange}
                  required
                  min="1"
                  placeholder="100"
                  className="w-full pl-10 px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Passing Marks */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Passing Marks *
              </label>
              <div className="relative">
                <CheckCircle
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="number"
                  name="passingMarks"
                  value={form.passingMarks}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="40"
                  className="w-full pl-10 px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl font-medium hover:shadow-lg hover:from-indigo-700 hover:to-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
            >
              {loading && <Loader2 className="animate-spin" size={18} />}
              {loading ? "Creating..." : "Create Examination"}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default CreateExam;

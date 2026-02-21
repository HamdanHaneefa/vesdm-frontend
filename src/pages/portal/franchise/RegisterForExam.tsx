import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, Search, Loader2, AlertCircle, CheckCircle, UserCheck, UserPlus } from "lucide-react";
import apiClient from "../../../api/apiClient";
import { useAuth } from "../../../contexts/AuthContext";

type Exam = {
  _id: string;
  name: string;
  date: string;
  deadline: string;
  course?: { name: string };
};

type Student = {
  _id: string;
  name: string;
  registrationNumber: string;
};

const RegisterForExam = () => {
  const { user } = useAuth() as { user: { role: string } | null };

  const [exams, setExams] = useState<Exam[]>([]);
  const [selectedExamId, setSelectedExamId] = useState<string>("");
  
  // Split student states
  const [availableStudents, setAvailableStudents] = useState<Student[]>([]);
  const [registeredStudents, setRegisteredStudents] = useState<Student[]>([]);
  
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // 1. Fetch open exams on mount
  useEffect(() => {
    setLoading(true);
    apiClient
      .get("/exams?status=open")
      .then((res) => setExams(res.data || []))
      .catch(() => setMessage({ type: "error", text: "Failed to load available exams" }))
      .finally(() => setLoading(false));
  }, []);

  // 2. Fetch Categorized Students when exam is selected
  const fetchStudentStatus = async () => {
    if (!selectedExamId) return;
    try {
      const res = await apiClient.get(`/exams/${selectedExamId}/registration-status`);
      setAvailableStudents(res.data.available || []);
      setRegisteredStudents(res.data.registered || []);
      setSelectedStudents([]); // Reset selection on exam change
    } catch (err) {
      setMessage({ type: "error", text: "Failed to load students" });
    }
  };

  useEffect(() => {
    fetchStudentStatus();
  }, [selectedExamId]);

  // Filtering for Available list
  const filteredAvailable = availableStudents.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.registrationNumber?.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStudent = (id: string) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const selectAllVisible = () => {
    if (selectedStudents.length === filteredAvailable.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredAvailable.map((s) => s._id));
    }
  };

  const handleRegister = async () => {
    if (selectedStudents.length === 0) return;

    setSubmitting(true);
    setMessage(null);

    try {
      await apiClient.post(`/exams/${selectedExamId}/register`, {
        studentIds: selectedStudents,
      });
      
      setMessage({
        type: "success",
        text: `Successfully registered ${selectedStudents.length} student(s)!`,
      });

      // Refresh the lists to move students from 'available' to 'registered'
      await fetchStudentStatus();
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err?.response?.data?.msg || "Registration failed",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (user?.role !== "franchisee") {
    return <div className="p-10 text-center text-red-600 text-xl">Access denied – Franchise only</div>;
  }

  const selectedExam = exams.find((ex) => ex._id === selectedExamId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50/30 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="hidden md:block">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800">Exam Registration Portal</h1>
          <p className="text-slate-600 mt-2">Enroll your students for upcoming examinations.</p>
        </div>

        {/* Status Messaging */}
        {message && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            className={`p-4 rounded-xl flex items-center gap-3 border ${
              message.type === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-rose-50 border-rose-200 text-rose-800"
            }`}
          >
            {message.type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span>{message.text}</span>
          </motion.div>
        )}

        {/* Section 1: Exam Selection */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-200">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-700">
            <Calendar size={18} className="text-indigo-600" /> 1. Select Examination
          </h2>
          {loading ? (
            <Loader2 className="animate-spin text-indigo-600" />
          ) : (
            <select
              value={selectedExamId}
              onChange={(e) => setSelectedExamId(e.target.value)}
              className="w-full max-w-xl px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="">-- Choose an Exam --</option>
              {exams.map((exam) => (
                <option key={exam._id} value={exam._id}>
                  {exam.name} | Date: {new Date(exam.date).toLocaleDateString()} (Deadline: {new Date(exam.deadline).toLocaleDateString()})
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Section 2: Registration Area */}
        {selectedExam && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left: Available Students Table */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <UserPlus size={18} className="text-indigo-600" /> Available Students
                </h2>
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
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
                          className="rounded text-indigo-600"
                        />
                      </th>
                      <th className="px-6 py-4 text-left font-medium">Reg. Number</th>
                      <th className="px-6 py-4 text-left font-medium">Student Name</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredAvailable.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="px-6 py-12 text-center text-slate-400">No students available for registration.</td>
                      </tr>
                    ) : (
                      filteredAvailable.map((s) => (
                        <tr key={s._id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4">
                            <input
                              type="checkbox"
                              checked={selectedStudents.includes(s._id)}
                              onChange={() => toggleStudent(s._id)}
                              className="rounded text-indigo-600"
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
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2 transition-all shadow-md"
                >
                  {submitting ? <Loader2 className="animate-spin" size={18} /> : <UserCheck size={18} />}
                  Register Selected
                </button>
              </div>
            </motion.div>

            {/* Right: Already Registered Sidebar */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col h-full"
            >
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-emerald-700">
                <CheckCircle size={18} /> Registered ({registeredStudents.length})
              </h2>
              <div className="space-y-3 overflow-y-auto flex-grow max-h-[600px] pr-2 scrollbar-thin scrollbar-thumb-slate-200">
                {registeredStudents.length === 0 ? (
                  <p className="text-sm text-slate-400 italic">No students registered yet for this exam.</p>
                ) : (
                  registeredStudents.map((s) => (
                    <div key={s._id} className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex justify-between items-center group">
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

export default RegisterForExam;
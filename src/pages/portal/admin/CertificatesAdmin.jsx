import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award, Search, Download, Eye, CheckCircle, XCircle,
  Calendar, Building2, FileText, Upload, Loader2, X
} from 'lucide-react';
import apiClient from '../../../api/apiClient';

const CertificatesAdmin = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [uploadFile, setUploadFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      // Fetching all students to manage their certificates
      const res = await apiClient.get('/students');
      setStudents(res.data || []);
    } catch (err) {
      console.error("Error fetching students", err);
    } finally {
      setLoading(false);
    }
  };

  const handleIssueCertificate = async (e) => {
    e.preventDefault();
    if (!selectedStudent || !selectedCourseId || !uploadFile) {
      return alert("Please fill all fields and select a file");
    }

    const formData = new FormData();
    formData.append('certificate', uploadFile);
    formData.append('courseId', selectedCourseId);

    setIsSubmitting(true);
    try {
      await apiClient.post(`/students/${selectedStudent._id}/upload-certificate`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("Certificate issued successfully!");
      setIsModalOpen(false);
      setUploadFile(null);
      setSelectedCourseId('');
      fetchStudents(); // Refresh data
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to issue certificate");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Logic to flatten students into a list of "certificate view"
  // Each student can have multiple certificates or be 'pending'
  const displayData = students.flatMap(student => {
    return student.enrolledCourses.map(enrollment => ({
      _id: student._id,
      studentName: student.name,
      regNo: student.registrationNumber,
      courseName: enrollment.course?.name || 'Unknown',
      courseId: enrollment.course?._id,
      // Determine status based on presence of certificate inside enrollment
      status: enrollment.certificate?.number ? 'issued' : 'pending',
      issueDate: enrollment.certificate?.issueDate,
      certNo: enrollment.certificate?.number || 'N/A',
      file: enrollment.certificate?.file,
      enrolledCourses: student.enrolledCourses // passed to modal for context
    }));
  });

  const filteredData = displayData.filter(item => {
    const matchesSearch =
      item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.regNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: 'Total Records', value: displayData.length, icon: Award, color: 'blue' },
    { label: 'Issued', value: displayData.filter(c => c.status === 'issued').length, icon: CheckCircle, color: 'emerald' },
    { label: 'Pending', value: displayData.filter(c => c.status === 'pending').length, icon: FileText, color: 'amber' },
  ];

  if (loading) return (
    <div className="flex h-96 items-center justify-center">
      <Loader2 className="animate-spin text-red-600" size={40} />
    </div>
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Certificate Management</h1>
        <p className="text-gray-600">Issue and verify official student certificates</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4"
          >
            <div className={`p-4 bg-${stat.color}-50 rounded-xl`}>
              <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by student or registration number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
          />
        </div>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          {['all', 'issued', 'pending'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${statusFilter === status ? 'bg-white text-red-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              {status.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Student / Reg No</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Course</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Cert Number</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredData.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-gray-900">{item.studentName}</div>
                  <div className="text-xs text-gray-500 font-mono">{item.regNo}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{item.courseName}</td>
                <td className="px-6 py-4 text-xs font-mono text-gray-500">{item.certNo}</td>
                <td className="px-6 py-4">
                  {item.status === 'issued' ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">
                      <CheckCircle size={12} /> Issued
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">
                      <FileText size={12} /> Pending
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {item.status === 'issued' ? (
                    <div className="flex gap-2">
                      <a
                        href={`${import.meta.env.VITE_UPLOADS_URL}/${item.file}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 hover:bg-gray-100 rounded text-blue-600"
                      >
                        <Eye size={18} />
                      </a>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedStudent(item);
                        setIsModalOpen(true);
                      }}
                      className="flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 transition-all"
                    >
                      <Upload size={14} /> Issue Cert
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Issue Certificate Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>

              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Award className="text-red-600" /> Issue Certificate
              </h2>

              <form onSubmit={handleIssueCertificate} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Student</label>
                  <input
                    type="text"
                    readOnly
                    value={`${selectedStudent?.studentName} (${selectedStudent?.regNo})`}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Select Course</label>
                  <select
                    required
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">-- Choose Course --</option>
                    {selectedStudent?.enrolledCourses?.map(ec => (
                      <option key={ec.course._id} value={ec.course._id}>
                        {ec.course.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Certificate File (PDF)</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-red-400 transition-colors">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-10 w-10 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500">
                          <span>{uploadFile ? uploadFile.name : "Upload a file"}</span>
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => setUploadFile(e.target.files[0])}
                            className="sr-only"
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">PDF up to 10MB</p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : "Finalize & Issue"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CertificatesAdmin;
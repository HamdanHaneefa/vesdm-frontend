import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle, Loader2, Search, Building2, Eye } from 'lucide-react';
import apiClient from '../../../api/apiClient';

const PublishedExams = () => {
    const [exams, setExams] = useState([]);
    const [selectedExamId, setSelectedExamId] = useState('');
    const [students, setStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loadingExams, setLoadingExams] = useState(true);
    const [loadingStudents, setLoadingStudents] = useState(false);

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const res = await apiClient.get('/exams');
                // Franchisee only sees exams that are published or they have students in
                setExams(res.data || []);
            } catch (err) {
                console.error("Error fetching exams", err);
            } finally {
                setLoadingExams(false);
            }
        };
        fetchExams();
    }, []);

    const fetchExamStudents = async () => {
        if (!selectedExamId) {
            setStudents([]);
            return;
        }
        setLoadingStudents(true);
        try {
            const res = await apiClient.get(`/exams/${selectedExamId}/students`);
            const mappedStudents = res.data.map(s => {
                const examRecord = s.exams?.find(e => e.examId === selectedExamId);
                return {
                    id: s._id,
                    rollNo: s.registrationNumber,
                    name: s.name,
                    marks: examRecord?.marks ?? '-',
                    grade: examRecord?.grade ?? '-',
                };
            });
            setStudents(mappedStudents);
        } catch (err) {
            console.error("Error fetching students", err);
        } finally {
            setLoadingStudents(false);
        }
    };

    useEffect(() => {
        fetchExamStudents();
    }, [selectedExamId]);

    const selectedExamData = exams.find(e => e._id === selectedExamId);

    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.rollNo?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-emerald-700 rounded-3xl p-8 text-white shadow-lg flex justify-between items-center"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/20 rounded-xl"><Eye size={32} /></div>
                        <div>
                            <h1 className="text-3xl font-bold">Exam Results</h1>
                            <p className="opacity-80">View published marks for your franchise students</p>
                        </div>
                    </div>
                </motion.div>

                <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-200">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Select Examination</label>
                    <select
                        className="w-full md:w-1/2 p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                        value={selectedExamId}
                        onChange={(e) => setSelectedExamId(e.target.value)}
                    >
                        <option value="">-- Select to view results --</option>
                        {exams.filter(e => e.isPublished).map(exam => (
                            <option key={exam._id} value={exam._id}>
                                {exam.name}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedExamId && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between gap-4">
                            <h2 className="text-xl font-bold text-slate-800">Student Results</h2>
                            <div className="relative w-full md:w-80">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search student..."
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 text-slate-600 text-sm font-medium">
                                    <tr>
                                        <th className="px-6 py-4">Roll No</th>
                                        <th className="px-6 py-4">Student Name</th>
                                        <th className="px-6 py-4 text-center">Marks ({selectedExamData?.totalMarks})</th>
                                        <th className="px-6 py-4 text-center">Grade</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {loadingStudents ? (
                                        <tr><td colSpan={4} className="text-center py-10"><Loader2 className="animate-spin inline mr-2" /> Loading...</td></tr>
                                    ) : filteredStudents.length === 0 ? (
                                        <tr><td colSpan={4} className="text-center py-10 text-slate-400">No students found.</td></tr>
                                    ) : filteredStudents.map((student) => (
                                        <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 font-mono text-sm">{student.rollNo}</td>
                                            <td className="px-6 py-4 font-medium">{student.name}</td>
                                            <td className="px-6 py-4 text-center font-bold text-slate-900">{student.marks}</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-3 py-1 bg-slate-100 rounded-full text-xs font-bold`}>
                                                    {student.grade}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default PublishedExams;
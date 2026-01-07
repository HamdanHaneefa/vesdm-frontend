import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { BookOpen, Video, FileText, Download, Search, Play, Eye, ArrowDown, Lock, CheckCircle, AlertCircle } from 'lucide-react';

const StudentResources = () => {
  const [searchParams] = useSearchParams();
  const courseIdFromUrl = searchParams.get('courseId');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState(courseIdFromUrl || 'all');

  useEffect(() => {
    if (courseIdFromUrl) {
      setSelectedCourse(courseIdFromUrl);
    }
  }, [courseIdFromUrl]);

  const enrolledCourses = [
    { id: '1', name: 'Digital Marketing Professional', color: 'from-purple-500 to-purple-600' },
    { id: '2', name: 'Full Stack Web Development', color: 'from-pink-500 to-pink-600' },
    { id: '3', name: 'Business Management Fundamentals', color: 'from-blue-500 to-blue-600' },
    { id: '4', name: 'Data Analytics with Python', color: 'from-amber-500 to-amber-600' },
  ];

  const categories = [
    { id: 'all', label: 'All Resources', icon: BookOpen },
    { id: 'notes', label: 'Study Notes', icon: FileText },
    { id: 'videos', label: 'Video Lectures', icon: Video },
    { id: 'books', label: 'E-Books', icon: BookOpen },
  ];

  const resources = [
    // Digital Marketing Resources
    {
      id: 1,
      title: 'Introduction to Digital Marketing',
      type: 'notes',
      courseId: '1',
      courseName: 'Digital Marketing Professional',
      subject: 'Marketing Fundamentals',
      size: '2.5 MB',
      format: 'PDF',
      downloads: 1250,
      uploadDate: '2025-01-05',
      locked: false,
      requiredModule: null,
      module: 'Module 1'
    },
    {
      id: 2,
      title: 'SEO & SEM Strategies',
      type: 'videos',
      courseId: '1',
      courseName: 'Digital Marketing Professional',
      subject: 'Search Marketing',
      size: '12 videos',
      format: 'MP4',
      downloads: 890,
      uploadDate: '2025-01-03',
      locked: false,
      requiredModule: null,
      module: 'Module 2'
    },
    {
      id: 3,
      title: 'Social Media Marketing Handbook',
      type: 'books',
      courseId: '1',
      courseName: 'Digital Marketing Professional',
      subject: 'Social Media',
      size: '15.8 MB',
      format: 'PDF',
      downloads: 2100,
      uploadDate: '2024-12-28',
      locked: false,
      requiredModule: null,
      module: 'Module 3'
    },
    {
      id: 4,
      title: 'Advanced Analytics & Conversion Optimization',
      type: 'notes',
      courseId: '1',
      courseName: 'Digital Marketing Professional',
      subject: 'Analytics',
      size: '3.2 MB',
      format: 'PDF',
      downloads: 980,
      uploadDate: '2024-12-20',
      locked: true,
      requiredModule: 'Module 8',
      module: 'Module 9'
    },
    {
      id: 5,
      title: 'Email Marketing Mastery',
      type: 'videos',
      courseId: '1',
      courseName: 'Digital Marketing Professional',
      subject: 'Email Marketing',
      size: '8 videos',
      format: 'MP4',
      downloads: 750,
      uploadDate: '2024-12-15',
      locked: true,
      requiredModule: 'Module 9',
      module: 'Module 10'
    },
    
    // Web Development Resources
    {
      id: 6,
      title: 'HTML & CSS Fundamentals',
      type: 'notes',
      courseId: '2',
      courseName: 'Full Stack Web Development',
      subject: 'Frontend Basics',
      size: '4.1 MB',
      format: 'PDF',
      downloads: 1560,
      uploadDate: '2024-12-25',
      locked: false,
      requiredModule: null,
      module: 'Module 1'
    },
    {
      id: 7,
      title: 'JavaScript Deep Dive',
      type: 'videos',
      courseId: '2',
      courseName: 'Full Stack Web Development',
      subject: 'JavaScript',
      size: '25 videos',
      format: 'MP4',
      downloads: 1320,
      uploadDate: '2024-12-20',
      locked: false,
      requiredModule: null,
      module: 'Module 2'
    },
    {
      id: 8,
      title: 'React.js Complete Guide',
      type: 'books',
      courseId: '2',
      courseName: 'Full Stack Web Development',
      subject: 'React Framework',
      size: '18.5 MB',
      format: 'PDF',
      downloads: 980,
      uploadDate: '2024-12-15',
      locked: false,
      requiredModule: null,
      module: 'Module 3'
    },
    {
      id: 9,
      title: 'Node.js & Express Backend Development',
      type: 'videos',
      courseId: '2',
      courseName: 'Full Stack Web Development',
      subject: 'Backend Development',
      size: '30 videos',
      format: 'MP4',
      downloads: 850,
      uploadDate: '2024-12-10',
      locked: true,
      requiredModule: 'Module 6',
      module: 'Module 7'
    },
    {
      id: 10,
      title: 'MongoDB Database Design',
      type: 'notes',
      courseId: '2',
      courseName: 'Full Stack Web Development',
      subject: 'Database',
      size: '5.2 MB',
      format: 'PDF',
      downloads: 720,
      uploadDate: '2024-12-05',
      locked: true,
      requiredModule: 'Module 7',
      module: 'Module 8'
    },
    {
      id: 11,
      title: 'Full Stack Deployment & DevOps',
      type: 'videos',
      courseId: '2',
      courseName: 'Full Stack Web Development',
      subject: 'Deployment',
      size: '15 videos',
      format: 'MP4',
      downloads: 650,
      uploadDate: '2024-12-01',
      locked: true,
      requiredModule: 'Module 14',
      module: 'Module 15'
    },

    // Business Management Resources
    {
      id: 12,
      title: 'Business Strategy Fundamentals',
      type: 'notes',
      courseId: '3',
      courseName: 'Business Management Fundamentals',
      subject: 'Strategy',
      size: '3.8 MB',
      format: 'PDF',
      downloads: 1100,
      uploadDate: '2024-11-28',
      locked: false,
      requiredModule: null,
      module: 'Module 1'
    },
    {
      id: 13,
      title: 'Financial Management Video Series',
      type: 'videos',
      courseId: '3',
      courseName: 'Business Management Fundamentals',
      subject: 'Finance',
      size: '20 videos',
      format: 'MP4',
      downloads: 950,
      uploadDate: '2024-11-25',
      locked: false,
      requiredModule: null,
      module: 'Module 2'
    },

    // Data Analytics Resources
    {
      id: 14,
      title: 'Python for Data Analysis',
      type: 'notes',
      courseId: '4',
      courseName: 'Data Analytics with Python',
      subject: 'Python Programming',
      size: '6.2 MB',
      format: 'PDF',
      downloads: 1850,
      uploadDate: '2024-11-20',
      locked: false,
      requiredModule: null,
      module: 'Module 1'
    },
    {
      id: 15,
      title: 'Pandas & NumPy Tutorial',
      type: 'videos',
      courseId: '4',
      courseName: 'Data Analytics with Python',
      subject: 'Data Processing',
      size: '18 videos',
      format: 'MP4',
      downloads: 1420,
      uploadDate: '2024-11-15',
      locked: false,
      requiredModule: null,
      module: 'Module 2'
    },
    {
      id: 16,
      title: 'Data Visualization with Matplotlib',
      type: 'books',
      courseId: '4',
      courseName: 'Data Analytics with Python',
      subject: 'Visualization',
      size: '12.3 MB',
      format: 'PDF',
      downloads: 1280,
      uploadDate: '2024-11-10',
      locked: false,
      requiredModule: null,
      module: 'Module 3'
    },
  ];

  const filteredResources = resources.filter((resource) => {
    const matchesCourse = selectedCourse === 'all' || resource.courseId === selectedCourse;
    const matchesCategory = activeCategory === 'all' || resource.type === activeCategory;
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.courseName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCourse && matchesCategory && matchesSearch;
  });

  const unlockedResources = filteredResources.filter(r => !r.locked);
  const lockedResources = filteredResources.filter(r => r.locked);

  const getIcon = (type) => {
    switch (type) {
      case 'notes':
        return FileText;
      case 'videos':
        return Video;
      case 'books':
        return BookOpen;
      default:
        return FileText;
    }
  };

  const getGradient = (type) => {
    switch (type) {
      case 'notes':
        return 'from-blue-500 to-blue-600';
      case 'videos':
        return 'from-rose-500 to-rose-600';
      case 'books':
        return 'from-emerald-500 to-emerald-600';
      default:
        return 'from-slate-500 to-slate-600';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Learning Resources</h1>
        <p className="text-slate-500 text-lg">Access course materials, study notes, and video lectures</p>
      </motion.div>

      {/* Course Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-white rounded-2xl p-4 shadow-lg border border-slate-200"
      >
        <label className="block text-sm font-semibold text-slate-700 mb-3">Filter by Course</label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          <button
            onClick={() => setSelectedCourse('all')}
            className={`px-4 py-3 rounded-xl font-semibold transition-all ${
              selectedCourse === 'all'
                ? 'bg-gradient-to-r from-slate-600 to-slate-700 text-white shadow-lg'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Courses
          </button>
          {enrolledCourses.map((course) => (
            <button
              key={course.id}
              onClick={() => setSelectedCourse(course.id)}
              className={`px-4 py-3 rounded-xl font-semibold transition-all text-left ${
                selectedCourse === course.id
                  ? `bg-gradient-to-r ${course.color} text-white shadow-lg`
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span className="line-clamp-1">{course.name}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search resources by title, subject, or course..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg text-lg"
        />
      </motion.div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3">
        {categories.map((category, i) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;
          const count = filteredResources.filter(r => category.id === 'all' || r.type === category.id).length;
          return (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              <Icon size={20} />
              <span>{category.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                isActive ? 'bg-white/20' : 'bg-slate-100'
              }`}>
                {count}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Stats */}
      {filteredResources.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-4"
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="text-emerald-600" size={20} />
            <span className="text-sm font-semibold text-slate-700">
              {unlockedResources.length} Available
            </span>
          </div>
          {lockedResources.length > 0 && (
            <div className="flex items-center gap-2">
              <Lock className="text-amber-600" size={20} />
              <span className="text-sm font-semibold text-slate-700">
                {lockedResources.length} Locked
              </span>
            </div>
          )}
        </motion.div>
      )}

      {/* Unlocked Resources */}
      {unlockedResources.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <CheckCircle className="text-emerald-600" />
            Available Resources
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {unlockedResources.map((resource, i) => {
              const Icon = getIcon(resource.type);
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-all group"
                >
                  <div className={`h-32 bg-gradient-to-br ${getGradient(resource.type)} relative`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon size={48} className="text-white opacity-80" />
                    </div>
                    <div className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-slate-700">
                      {resource.format}
                    </div>
                    <div className="absolute top-3 left-3 px-3 py-1 bg-emerald-500 text-white rounded-full text-xs font-bold flex items-center gap-1">
                      <CheckCircle size={12} />
                      Unlocked
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full">
                        {resource.module}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {resource.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                        {resource.subject}
                      </span>
                    </div>

                    {selectedCourse === 'all' && (
                      <p className="text-xs text-slate-500 mb-3 font-medium">{resource.courseName}</p>
                    )}

                    <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                      <div className="flex items-center gap-4">
                        <span className="font-semibold">{resource.size}</span>
                        <span className="flex items-center gap-1">
                          <ArrowDown size={14} />
                          {resource.downloads}
                        </span>
                      </div>
                      <span className="text-xs">{new Date(resource.uploadDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>

                    <div className="flex gap-2">
                      {resource.type === 'videos' ? (
                        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-rose-500/30">
                          <Play size={16} />
                          Watch
                        </button>
                      ) : (
                        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/30">
                          <Download size={16} />
                          Download
                        </button>
                      )}
                      <button className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all">
                        <Eye size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Locked Resources */}
      {lockedResources.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Lock className="text-amber-600" />
            Locked Resources
            <span className="text-sm font-normal text-slate-500 ml-2">
              Complete required modules to unlock
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lockedResources.map((resource, i) => {
              const Icon = getIcon(resource.type);
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl shadow-lg border-2 border-amber-200 overflow-hidden relative"
                >
                  {/* Locked Overlay */}
                  <div className="absolute inset-0 bg-slate-900/5 backdrop-blur-[1px] z-10 flex items-center justify-center">
                    <div className="bg-white rounded-2xl p-6 shadow-2xl text-center max-w-xs mx-4">
                      <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Lock className="text-amber-600" size={28} />
                      </div>
                      <h4 className="font-bold text-slate-900 mb-2">Resource Locked</h4>
                      <p className="text-sm text-slate-600 mb-3">
                        Complete <span className="font-semibold text-amber-600">{resource.requiredModule}</span> to unlock this resource
                      </p>
                      <div className="px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 font-semibold">
                        Keep learning to unlock!
                      </div>
                    </div>
                  </div>

                  <div className={`h-32 bg-gradient-to-br ${getGradient(resource.type)} relative opacity-60`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon size={48} className="text-white opacity-80" />
                    </div>
                    <div className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-slate-700">
                      {resource.format}
                    </div>
                    <div className="absolute top-3 left-3 px-3 py-1 bg-amber-500 text-white rounded-full text-xs font-bold flex items-center gap-1">
                      <Lock size={12} />
                      Locked
                    </div>
                  </div>

                  <div className="p-5 opacity-60">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full">
                        {resource.module}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-2">
                      {resource.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                        {resource.subject}
                      </span>
                    </div>

                    {selectedCourse === 'all' && (
                      <p className="text-xs text-slate-500 mb-3 font-medium">{resource.courseName}</p>
                    )}

                    <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                      <div className="flex items-center gap-4">
                        <span className="font-semibold">{resource.size}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredResources.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 bg-white rounded-2xl shadow-lg border border-slate-200"
        >
          <BookOpen size={64} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-2xl font-bold text-slate-900 mb-2">No resources found</h3>
          <p className="text-slate-500">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}
    </div>
  );
};

export default StudentResources;

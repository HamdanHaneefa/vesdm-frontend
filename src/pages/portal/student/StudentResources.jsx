import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Video, FileText, Download, Search, Play, Eye, ArrowDown } from 'lucide-react';

const StudentResources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Resources', icon: BookOpen, count: 6 },
    { id: 'notes', label: 'Study Notes', icon: FileText, count: 2 },
    { id: 'videos', label: 'Video Lectures', icon: Video, count: 2 },
    { id: 'books', label: 'E-Books', icon: BookOpen, count: 2 },
  ];

  const resources = [
    {
      id: 1,
      title: 'Complete C++ Programming Notes',
      type: 'notes',
      subject: 'Programming',
      size: '2.5 MB',
      format: 'PDF',
      downloads: 1250,
      uploadDate: '2025-01-05',
      thumbnail: 'notes',
    },
    {
      id: 2,
      title: 'Data Structures & Algorithms Video Series',
      type: 'videos',
      subject: 'Computer Science',
      size: '45 videos',
      format: 'MP4',
      downloads: 890,
      uploadDate: '2025-01-03',
      thumbnail: 'video',
    },
    {
      id: 3,
      title: 'Database Management System - Complete Guide',
      type: 'books',
      subject: 'Database',
      size: '15.8 MB',
      format: 'PDF',
      downloads: 2100,
      uploadDate: '2024-12-28',
      thumbnail: 'book',
    },
    {
      id: 4,
      title: 'Web Development Tutorial - HTML, CSS, JS',
      type: 'videos',
      subject: 'Web Development',
      size: '32 videos',
      format: 'MP4',
      downloads: 1560,
      uploadDate: '2024-12-25',
      thumbnail: 'video',
    },
    {
      id: 5,
      title: 'Operating Systems Concepts',
      type: 'notes',
      subject: 'Operating Systems',
      size: '3.2 MB',
      format: 'PDF',
      downloads: 980,
      uploadDate: '2024-12-20',
      thumbnail: 'notes',
    },
    {
      id: 6,
      title: 'Python Programming - Beginner to Advanced',
      type: 'books',
      subject: 'Programming',
      size: '12.4 MB',
      format: 'PDF',
      downloads: 3200,
      uploadDate: '2024-12-15',
      thumbnail: 'book',
    },
  ];

  const filteredResources = resources.filter((resource) => {
    const matchesCategory = activeCategory === 'all' || resource.type === activeCategory;
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Learning Resources 📚</h1>
        <p className="text-slate-500 text-lg">Access study materials, video lectures, and e-books</p>
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
          placeholder="Search resources by title or subject..."
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
                {category.count}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Resources Grid */}
      {filteredResources.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, i) => {
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
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {resource.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                      {resource.subject}
                    </span>
                  </div>

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
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
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

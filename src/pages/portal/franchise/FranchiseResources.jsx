import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, Download, FileText, Video, BookMarked, Filter } from 'lucide-react';

const FranchiseResources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Resources', icon: BookOpen },
    { id: 'training', name: 'Training Materials', icon: Video },
    { id: 'forms', name: 'Forms & Templates', icon: FileText },
    { id: 'guides', name: 'Admin Guides', icon: BookMarked }
  ];

  const resources = [
    {
      id: 1,
      title: 'Franchise Operations Manual',
      category: 'guides',
      description: 'Complete guide for managing daily franchise operations',
      type: 'PDF',
      size: '2.5 MB',
      uploadDate: '2024-01-15',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      title: 'Student Registration Form',
      category: 'forms',
      description: 'Official form template for new student registrations',
      type: 'DOCX',
      size: '156 KB',
      uploadDate: '2024-01-10',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      id: 3,
      title: 'Exam Conduct Guidelines',
      category: 'guides',
      description: 'Standard operating procedures for conducting examinations',
      type: 'PDF',
      size: '1.8 MB',
      uploadDate: '2024-01-20',
      gradient: 'from-emerald-500 to-emerald-600'
    },
    {
      id: 4,
      title: 'Marketing Training Video Series',
      category: 'training',
      description: 'Complete video series on franchise marketing strategies',
      type: 'Video',
      size: '450 MB',
      uploadDate: '2024-01-18',
      gradient: 'from-rose-500 to-rose-600'
    },
    {
      id: 5,
      title: 'Result Publishing Template',
      category: 'forms',
      description: 'Excel template for organizing and publishing exam results',
      type: 'XLSX',
      size: '245 KB',
      uploadDate: '2024-01-12',
      gradient: 'from-amber-500 to-amber-600'
    },
    {
      id: 6,
      title: 'Staff Training Manual',
      category: 'training',
      description: 'Comprehensive training guide for franchise staff members',
      type: 'PDF',
      size: '3.2 MB',
      uploadDate: '2024-01-22',
      gradient: 'from-cyan-500 to-cyan-600'
    },
    {
      id: 7,
      title: 'Certificate Issuance Process',
      category: 'guides',
      description: 'Step-by-step guide for certificate generation and distribution',
      type: 'PDF',
      size: '1.2 MB',
      uploadDate: '2024-01-14',
      gradient: 'from-indigo-500 to-indigo-600'
    },
    {
      id: 8,
      title: 'Fee Collection Form',
      category: 'forms',
      description: 'Standard form for documenting student fee payments',
      type: 'PDF',
      size: '180 KB',
      uploadDate: '2024-01-16',
      gradient: 'from-violet-500 to-violet-600'
    },
    {
      id: 9,
      title: 'Quality Assurance Guidelines',
      category: 'guides',
      description: 'Maintaining educational standards and quality control',
      type: 'PDF',
      size: '2.1 MB',
      uploadDate: '2024-01-19',
      gradient: 'from-pink-500 to-pink-600'
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const getTypeIcon = (type) => {
    switch(type) {
      case 'PDF': return <FileText size={20} className="text-red-500" />;
      case 'DOCX': return <FileText size={20} className="text-blue-500" />;
      case 'XLSX': return <FileText size={20} className="text-green-500" />;
      case 'Video': return <Video size={20} className="text-purple-500" />;
      default: return <FileText size={20} className="text-slate-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 rounded-3xl p-8 text-white shadow-2xl"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                <BookOpen className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Franchise Resources</h1>
                <p className="text-purple-100 mt-1">Training materials, forms, and operational guides</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{resources.length}</p>
              <p className="text-purple-100 text-sm">Resources</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-xl">
                <BookMarked className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">
                  {resources.filter(r => r.category === 'guides').length}
                </p>
                <p className="text-sm text-slate-600">Guides</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Video className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">
                  {resources.filter(r => r.category === 'training').length}
                </p>
                <p className="text-sm text-slate-600">Training</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-100 rounded-xl">
                <FileText className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">
                  {resources.filter(r => r.category === 'forms').length}
                </p>
                <p className="text-sm text-slate-600">Forms</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-100 rounded-xl">
                <Download className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">1,247</p>
                <p className="text-sm text-slate-600">Downloads</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Category Buttons */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                      activeCategory === category.id
                        ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Resources Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              {/* Card Header */}
              <div className={`bg-gradient-to-r ${resource.gradient} p-6 text-white`}>
                <div className="flex items-start justify-between">
                  <div className="text-4xl">{getTypeIcon(resource.type)}</div>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-xs font-semibold">
                    {resource.type}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-2">{resource.title}</h3>
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">{resource.description}</p>

                <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                  <span>{resource.size}</span>
                  <span>{resource.uploadDate}</span>
                </div>

                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all">
                  <Download className="w-5 h-5" />
                  Download
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredResources.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-3xl shadow-xl p-12 text-center"
          >
            <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Resources Found</h3>
            <p className="text-slate-600">Try adjusting your search or category filter</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FranchiseResources;

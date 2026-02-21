import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import {
  BookOpen, Search, Download, FileText, Video, BookMarked,
  Loader2, AlertCircle
} from 'lucide-react';
import apiClient from '../../../api/apiClient';
const resourceUrl = import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '');


const StudentResources = () => {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('courseId');

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const [resources, setResources] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const resourcesUrl = courseId ? `/student/resources?courseId=${courseId}` : '/student/resources';
        const [resourcesRes, coursesRes] = await Promise.all([
          apiClient.get(resourcesUrl),
          apiClient.get('/student/courses')
        ]);
        setResources(resourcesRes.data || []);
        setCourses(coursesRes.data || []);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.msg || 'Failed to load resources');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [courseId]);

  const categories = [
    { id: 'all', name: 'All Resources', icon: BookOpen },
    { id: 'training', name: 'Training Materials', icon: Video },
    { id: 'forms', name: 'Forms & Templates', icon: FileText },
    { id: 'guides', name: 'Guides', icon: BookMarked }
  ];

  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const matchesSearch =
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (resource.description && resource.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        resource.course.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [resources, searchQuery, activeCategory]);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'PDF': return <FileText size={40} className="text-red-500" />;
      case 'DOCX': return <FileText size={40} className="text-blue-500" />;
      case 'XLSX': return <FileText size={40} className="text-green-500" />;
      case 'VIDEO': return <Video size={40} className="text-blue-500" />;
      default: return <FileText size={40} className="text-slate-500" />;
    }
  };

  const getGradient = (category) => {
    switch (category) {
      case 'training': return 'from-blue-600 to-blue-800';
      case 'forms': return 'from-green-600 to-green-800';
      case 'guides': return 'from-blue-600 to-blue-800';
      default: return 'from-slate-600 to-slate-800';
    }
  };

  // Current course name (with fallback)
  const currentCourseName = useMemo(() => {
    if (!courseId) return null;
    return resources[0]?.course?.name ||
      courses.find(c => c.id === courseId || c._id === courseId)?.name ||
      'Course';
  }, [courseId, resources, courses]);

  // Grouping for multi-course view
  const groupedResources = useMemo(() => {
    const groups = filteredResources.reduce((acc, resource) => {
      const cid = resource.course._id;
      const cname = resource.course.name;
      if (!acc[cid]) {
        acc[cid] = { id: cid, name: cname, resources: [] };
      }
      acc[cid].resources.push(resource);
      return acc;
    }, {});

    return Object.values(groups)
      .map(group => ({
        ...group,
        resources: group.resources.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredResources]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-rose-50 border-2 border-rose-200 rounded-xl p-6 flex items-center gap-3 max-w-2xl mx-auto">
        <AlertCircle size={24} className="text-rose-600" />
        <p className="text-rose-800">{error}</p>
      </div>
    );
  }

  const isSingleCourse = !!courseId;
  const displayResources = isSingleCourse ? filteredResources : groupedResources.flatMap(g => g.resources);
  const totalFiltered = filteredResources.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center md:text-left"
        >
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Learning Resources</h1>
          <p className="text-slate-600 text-lg">
            {isSingleCourse
              ? `Resources for ${currentCourseName}`
              : 'Resources from all your enrolled courses'}
          </p>
          {totalFiltered > 0 && (
            <p className="text-slate-500 mt-2">{totalFiltered} resource{totalFiltered !== 1 ? 's' : ''} found</p>
          )}
        </motion.div>

        {/* Search & Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${activeCategory === category.id
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
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

        {/* Resources Display */}
        {resources.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl p-12 text-center shadow-lg border border-slate-200"
          >
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="text-slate-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No resources available</h3>
            <p className="text-slate-600">
              Resources will appear here once they are uploaded by the admin.
            </p>
          </motion.div>
        ) : filteredResources.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl p-12 text-center shadow-lg border border-slate-200"
          >
            <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">No resources found</h3>
            <p className="text-slate-600">Try adjusting your search or category filter</p>
          </motion.div>
        ) : (
          <>
            {isSingleCourse ? (
              /* Single course - flat grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource, index) => (
                  <ResourceCard key={resource._id} resource={resource} index={index} getTypeIcon={getTypeIcon} getGradient={getGradient} />
                ))}
              </div>
            ) : (
              /* Multi-course - grouped sections */
              groupedResources.map(group => (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-8 h-8 text-blue-600" />
                    <h2 className="text-2xl font-bold text-slate-800">
                      {group.name}
                      <span className="text-lg font-normal text-slate-500 ml-2">({group.resources.length} resources)</span>
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {group.resources.map((resource, index) => (
                      <ResourceCard key={resource._id} resource={resource} index={index} getTypeIcon={getTypeIcon} getGradient={getGradient} />
                    ))}
                  </div>
                </motion.div>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
};

/* Reusable Resource Card Component */
const ResourceCard = ({ resource, index, getTypeIcon, getGradient }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all"
  >
    <div className={`bg-gradient-to-r ${getGradient(resource.category)} p-6 text-white`}>
      <div className="flex items-start justify-between">
        <div>{getTypeIcon(resource.type)}</div>
        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-xs font-semibold">
          {resource.type}
        </span>
      </div>
    </div>
    <div className="p-6 space-y-4">
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-2">{resource.title}</h3>
        <p className="text-sm text-slate-600 line-clamp-2">
          {resource.description || 'No description'}
        </p>
      </div>
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>{resource.size}</span>
        <span>{new Date(resource.uploadDate).toLocaleDateString()}</span>
      </div>
      <a
        href={`${resourceUrl}${resource.fileUrl}`}

        download
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
      >
        <Download className="w-5 h-5" />
        Download
      </a>
    </div>
  </motion.div>
);

export default StudentResources;
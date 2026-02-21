import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen, Search, Download, FileText, Video, BookMarked,
  Plus, Pencil, Trash2, X, Upload, Loader2
} from 'lucide-react';
import apiClient from '../../../api/apiClient';

const ResourceManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [resources, setResources] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'guides',
    course: '',
    file: null
  });
  const fileInputRef = useRef(null);

  const resourceUrl = import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resRes, resCourses] = await Promise.all([
          apiClient.get('/resources'),
          apiClient.get('/courses')
        ]);
        setResources(resRes.data);
        setCourses(resCourses.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
        setLoadingCourses(false);
      }
    };
    fetchData();
  }, []);

  const fetchResources = async () => {
    try {
      const res = await apiClient.get('/resources');
      setResources(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const categories = [
    { id: 'all', name: 'All Resources', icon: BookOpen },
    { id: 'training', name: 'Training Materials', icon: Video },
    { id: 'forms', name: 'Forms & Templates', icon: FileText },
    { id: 'guides', name: 'Guides', icon: BookMarked }
  ];

  if (loading || loadingCourses) {
    return <div className="p-10 flex justify-center"><Loader2 className="animate-spin w-12 h-12" /></div>;
  }

  const filteredResources = resources.filter(resource => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (resource.description && resource.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      resource.course.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'PDF': return <FileText size={20} className="text-red-500" />;
      case 'DOCX': return <FileText size={20} className="text-blue-500" />;
      case 'XLSX': return <FileText size={20} className="text-green-500" />;
      case 'VIDEO': return <Video size={20} className="text-purple-500" />;
      default: return <FileText size={20} className="text-slate-500" />;
    }
  };

  const getGradient = (category) => {
    switch (category) {
      case 'training': return 'from-purple-600 to-purple-800';
      case 'forms': return 'from-green-600 to-green-800';
      case 'guides': return 'from-blue-600 to-blue-800';
      default: return 'from-slate-600 to-slate-800';
    }
  };

  const openModal = (resource = null, preselectCourse = null) => {
    if (resource) {
      setFormData({
        title: resource.title,
        description: resource.description || '',
        category: resource.category,
        course: resource.course._id,
        file: null
      });
      setEditingResource(resource);
    } else {
      setFormData({
        title: '',
        description: '',
        category: 'guides',
        course: preselectCourse || (courses[0]?._id || ''),
        file: null
      });
      setEditingResource(null);
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingResource(null);
    setFormData({ title: '', description: '', category: 'guides', course: '', file: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.course || (!editingResource && !formData.file)) {
      alert('Please fill all required fields');
      return;
    }
    const fd = new FormData();
    fd.append('title', formData.title);
    fd.append('description', formData.description);
    fd.append('category', formData.category);
    fd.append('course', formData.course);
    if (formData.file) fd.append('file', formData.file);

    try {
      if (editingResource) {
        await apiClient.put(`/resources/${editingResource._id}`, fd);
      } else {
        await apiClient.post('/resources', fd);
      }
      await fetchResources();
      closeModal();
    } catch (err) {
      console.error(err);
      alert('Error saving resource');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resource?')) return;
    try {
      await apiClient.delete(`/resources/${id}`);
      await fetchResources();
    } catch (err) {
      console.error(err);
    }
  };

  const getFileName = (url) => url.split('/').pop();

  // Grouping logic
  const groupedResources = filteredResources.reduce((acc, resource) => {
    const cid = resource.course._id;
    if (!acc[cid]) {
      acc[cid] = { id: cid, name: resource.course.name, resources: [] };
    }
    acc[cid].resources.push(resource);
    return acc;
  }, {});

  const groups = Object.values(groupedResources).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-600 via-red-700 to-gray-900 rounded-3xl p-8 text-white shadow-2xl"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                <BookOpen className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Resource Management</h1>
                <p className="text-red-100 mt-1">Manage training materials, forms, and guides for all courses</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{resources.length}</p>
              <p className="text-red-100 text-sm">Total Resources</p>
            </div>
          </div>
        </motion.div>

        {/* Add Resource Button (global) */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-right">
          <button
            onClick={() => openModal()}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-600 to-gray-900 text-white text-lg font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all"
          >
            <Plus className="w-6 h-6 mr-3" />
            Add New Resource
          </button>
        </motion.div>

        {/* Search and Category Filter */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-3xl shadow-xl p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
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
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                      activeCategory === category.id
                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg'
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
        <div>
          {resources.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-3xl shadow-xl p-20 text-center">
              <BookOpen className="w-24 h-24 text-slate-200 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">No Resources Yet</h3>
              <p className="text-slate-600 mb-8">Start adding resources to courses</p>
              <button onClick={() => openModal()} className="px-8 py-4 bg-red-600 text-white rounded-xl font-bold shadow-lg">
                <Plus className="w-5 h-5 inline mr-2" />
                Add First Resource
              </button>
            </motion.div>
          ) : filteredResources.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-3xl shadow-xl p-12 text-center">
              <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">No Resources Found</h3>
              <p className="text-slate-600">Try adjusting your search or category filter</p>
            </motion.div>
          ) : (
            groups.map(group => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                    <BookOpen className="w-8 h-8 text-red-600" />
                    {group.name}
                    <span className="text-lg font-normal text-slate-500">({group.resources.length} resources)</span>
                  </h2>
                  <button
                    onClick={() => openModal(null, group.id)}
                    className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold shadow hover:shadow-lg transition"
                  >
                    <Plus className="w-5 h-5 inline mr-2" />
                    Add Resource
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.resources.map((resource, index) => (
                    <motion.div
                      key={resource._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all"
                    >
                      <div className={`bg-gradient-to-r ${getGradient(resource.category)} p-6 text-white`}>
                        <div className="flex items-start justify-between">
                          <div className="text-4xl">{getTypeIcon(resource.type)}</div>
                          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-xs font-semibold">
                            {resource.type}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-slate-800 mb-2">{resource.title}</h3>
                        <p className="text-sm text-slate-600 mb-4 line-clamp-2">{resource.description || 'No description'}</p>
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-6">
                          <span>{resource.size}</span>
                          <span>{new Date(resource.uploadDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex gap-3">
                          <a
                          href={`${resourceUrl}/${resource.fileUrl}`}
                            download
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                          >
                            <Download className="w-5 h-5" />
                            Download
                          </a>
                          <button
                            onClick={() => openModal(resource)}
                            className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                          >
                            <Pencil className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(resource._id)}
                            className="p-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Add/Edit Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{editingResource ? 'Edit' : 'Add New'} Resource</h2>
                <button onClick={closeModal}><X className="w-6 h-6" /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold mb-1">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none"
                  >
                    <option value="training">Training Materials</option>
                    <option value="forms">Forms & Templates</option>
                    <option value="guides">Guides</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Course *</label>
                  <select
                    value={formData.course}
                    onChange={e => setFormData({ ...formData, course: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none"
                    required
                  >
                    <option value="">Select a course</option>
                    {courses.map(c => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    File {editingResource ? '(optional - leave blank to keep current)' : '*'}
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center">
                    <Upload className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={e => setFormData({ ...formData, file: e.target.files[0] })}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,video/*"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      className="px-6 py-3 bg-red-100 text-red-700 rounded-xl font-semibold hover:bg-red-200 transition"
                    >
                      Choose File
                    </button>
                    {formData.file && <p className="mt-3 text-sm font-medium">{formData.file.name}</p>}
                    {editingResource && !formData.file && (
                      <p className="mt-3 text-sm text-slate-600">
                        Current: {getFileName(editingResource.fileUrl)}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 py-3 border border-slate-300 rounded-xl font-semibold hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-gradient-to-r from-red-600 to-gray-900 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition"
                  >
                    {editingResource ? 'Update' : 'Add'} Resource
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceManagement;
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Image as ImageIcon, Video, Calendar, Users, Award, PartyPopper } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Card from '../../components/Card';
import Badge from '../../components/Badge';

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxImage, setLightboxImage] = useState(null);

  const categories = [
    { id: 'all', label: 'All', icon: ImageIcon },
    { id: 'events', label: 'Events', icon: PartyPopper },
    { id: 'campus', label: 'Campus', icon: Users },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'activities', label: 'Activities', icon: Calendar },
  ];

  const photos = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80',
      title: 'Annual Convocation 2025',
      category: 'events',
      date: 'Dec 2025',
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
      title: 'State-of-the-art Campus',
      category: 'campus',
      date: 'Nov 2025',
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
      title: 'Student Project Showcase',
      category: 'activities',
      date: 'Oct 2025',
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?auto=format&fit=crop&w=800&q=80',
      title: 'Hackathon Winners 2025',
      category: 'achievements',
      date: 'Sep 2025',
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&w=800&q=80',
      title: 'Tech Fest Opening Ceremony',
      category: 'events',
      date: 'Aug 2025',
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      title: 'Team Building Workshop',
      category: 'activities',
      date: 'Jul 2025',
    },
    {
      id: 7,
      url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80',
      title: 'Modern Library Facility',
      category: 'campus',
      date: 'Jun 2025',
    },
    {
      id: 8,
      url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
      title: 'Industry Award Ceremony',
      category: 'achievements',
      date: 'May 2025',
    },
    {
      id: 9,
      url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
      title: 'Cultural Festival Celebration',
      category: 'events',
      date: 'Apr 2025',
    },
  ];

  const videos = [
    {
      id: 1,
      thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
      title: 'VESDM Campus Tour',
      duration: '5:32',
      views: '12.5K',
    },
    {
      id: 2,
      thumbnail: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
      title: 'Student Success Stories',
      duration: '8:15',
      views: '8.2K',
    },
    {
      id: 3,
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
      title: 'Annual Day Highlights',
      duration: '12:45',
      views: '15.3K',
    },
    {
      id: 4,
      thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      title: 'Industry Expert Seminar',
      duration: '45:20',
      views: '6.8K',
    },
  ];

  const filteredPhotos =
    activeCategory === 'all'
      ? photos
      : photos.filter((photo) => photo.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#007ACC] to-[#0F172A] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Gallery</h1>
            <p className="text-xl text-blue-100">
              Glimpse into our vibrant campus life, events, and student achievements
            </p>
          </motion.div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Photo Gallery
            </h2>
            <p className="text-lg text-slate-600">
              Explore moments that define our community
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                    activeCategory === category.id
                      ? 'bg-[#007ACC] text-white shadow-lg shadow-blue-500/30'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Icon size={18} />
                  {category.label}
                </button>
              );
            })}
          </div>

          {/* Photo Grid */}
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredPhotos.map((photo) => (
                <motion.div
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setLightboxImage(photo)}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white font-bold text-lg mb-2">
                        {photo.title}
                      </h3>
                      <p className="text-blue-200 text-sm">{photo.date}</p>
                    </div>
                  </div>
                  <Badge className="absolute top-4 right-4">
                    {categories.find((c) => c.id === photo.category)?.label}
                  </Badge>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredPhotos.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-500 text-lg">No photos found in this category</p>
            </div>
          )}
        </div>
      </section>

      {/* Video Gallery */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Video Gallery
            </h2>
            <p className="text-lg text-slate-600">
              Watch our campus life and events come alive
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {videos.map((video, i) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="group cursor-pointer overflow-hidden">
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play size={32} className="text-[#007ACC] ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/80 rounded-lg text-white text-sm font-medium">
                      {video.duration}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {video.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <span className="flex items-center gap-1">
                      <Video size={16} />
                      {video.views} views
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X size={24} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-6xl w-full"
            >
              <img
                src={lightboxImage.url}
                alt={lightboxImage.title}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {lightboxImage.title}
                </h3>
                <p className="text-blue-200">{lightboxImage.date}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default GalleryPage;

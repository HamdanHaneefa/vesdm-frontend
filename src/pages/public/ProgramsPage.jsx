import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Clock, Award, CheckCircle } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import { programCategories, programs } from '../../data/programsData';
import { generateSlug } from '../../utils/helpers';

const ProgramsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPrograms = programs.filter(program => {
    const matchesCategory = selectedCategory === 'all' || program.category === selectedCategory;
    const matchesSearch = program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Programs & Courses - VESDM | Vocational Education & Skill Development"
        description="Explore 50+ vocational programs in Technology, Business, Healthcare, Creative Arts, and Engineering. Industry-aligned courses with professional certifications."
        keywords="vocational programs, skill development courses, diploma programs, certification courses, online education"
        canonical="/programs"
      />
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#007ACC] to-[#0F172A] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Explore Our Programs
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Choose from {programs.length}+ industry-aligned courses designed to accelerate your career growth
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b border-slate-200 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="w-full lg:w-96 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search programs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#007ACC] focus:ring-2 focus:ring-[#007ACC]/20 transition-all"
              />
            </div>

            {/* Category Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-[#007ACC] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All Programs
              </button>
              {programCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category.id
                      ? 'bg-[#007ACC] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 text-sm text-slate-600">
            Showing <span className="font-bold text-slate-900">{filteredPrograms.length}</span> programs
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          {filteredPrograms.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-200 rounded-full mb-4">
                <Search size={40} className="text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No programs found</h3>
              <p className="text-slate-600 mb-6">Try adjusting your search or filters</p>
              <Button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPrograms.map((program, i) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card hover className="h-full flex flex-col">
                    <div className="relative h-48 -m-6 mb-4 rounded-t-2xl overflow-hidden">
                      <img
                        src={program.image}
                        alt={program.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge variant="primary">{program.level}</Badge>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">
                        {program.name}
                      </h3>
                      <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                        {program.description}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                        <div className="flex items-center gap-1">
                          <Clock size={16} />
                          <span>{program.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Award size={16} />
                          <span>{program.eligibility}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {program.skills.slice(0, 3).map((skill, i) => (
                          <Badge key={i} variant="default" size="sm">
                            {skill}
                          </Badge>
                        ))}
                        {program.skills.length > 3 && (
                          <Badge variant="default" size="sm">
                            +{program.skills.length - 3}
                          </Badge>
                        )}
                      </div>

                      <div className="mt-auto pt-4 border-t border-slate-200 flex items-center justify-between">
                        <div>
                          <p className="text-xs text-slate-500">Starting at</p>
                          <p className="text-2xl font-bold text-[#007ACC]">{program.fees}</p>
                        </div>
                        <Link to={`/programs/${generateSlug(program.name)}`}>
                          <Button size="sm">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Contact our admissions team for personalized guidance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg">Contact Us</Button>
            </Link>
            <Link to="/admissions">
              <Button size="lg" variant="outline">Apply Now</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProgramsPage;

import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Clock, Award, BookOpen, CheckCircle, Users, Download, 
  Calendar, TrendingUp, Target, Briefcase, GraduationCap,
  ArrowLeft, ArrowRight, Share2, Heart, Star, Loader2, AlertCircle
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import apiClient from '../../api/apiClient';
import { generateSlug } from '../../utils/helpers';

const ProgramDetailPage = () => {
  const { programId } = useParams();
  const navigate = useNavigate();
  
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default placeholder image
  const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop';

  useEffect(() => {
    fetchProgramDetails();
  }, [programId]);

  const fetchProgramDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get('/courses');
      const courses = response.data;
      
      // Find course by matching slug
      const foundCourse = courses.find(c => generateSlug(c.name) === programId);
      
      if (!foundCourse) {
        navigate('/programs');
        return;
      }
      
      setProgram(foundCourse);
    } catch (err) {
      console.error('Error fetching program details:', err);
      setError('Failed to load program details.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex flex-col items-center justify-center py-32">
          <Loader2 className="w-12 h-12 text-[#007ACC] animate-spin mb-4" />
          <p className="text-slate-600 text-lg">Loading program details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !program) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex flex-col items-center justify-center py-32">
          <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Program Not Found</h3>
          <p className="text-slate-600 mb-6">{error || 'The program you are looking for does not exist.'}</p>
          <Link to="/programs">
            <Button>Back to Programs</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#007ACC] to-[#0F172A] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] animate-[slide_20s_linear_infinite]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link to="/programs" className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-6 transition-colors">
              <ArrowLeft size={20} />
              Back to Programs
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="primary" className="mb-4">{program.type}</Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {program.name}
                </h1>
                <p className="text-xl text-blue-100 mb-8">
                  {program.description || 'Comprehensive program designed to develop professional skills and industry expertise.'}
                </p>

                <div className="flex flex-wrap gap-6 mb-8">
                  {program.duration && (
                    <div className="flex items-center gap-2">
                      <Clock className="text-blue-300" size={24} />
                      <div>
                        <p className="text-sm text-blue-200">Duration</p>
                        <p className="font-semibold">{program.duration}</p>
                      </div>
                    </div>
                  )}
                  {program.eligibility && (
                    <div className="flex items-center gap-2">
                      <Award className="text-blue-300" size={24} />
                      <div>
                        <p className="text-sm text-blue-200">Eligibility</p>
                        <p className="font-semibold">{program.eligibility}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <GraduationCap className="text-blue-300" size={24} />
                    <div>
                      <p className="text-sm text-blue-200">Type</p>
                      <p className="font-semibold">{program.type}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link to="/admissions">
                    <Button size="lg" className="!bg-white !text-[#007ACC] hover:!bg-blue-50 shadow-lg">
                      Enroll Now
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="!border-white !text-white hover:!bg-white/10">
                    <Download size={20} />
                    Download Brochure
                  </Button>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={DEFAULT_IMAGE}
                    alt={program.name}
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-600 mb-1">Program Fee</p>
                          {program.fee ? (
                            <p className="text-3xl font-bold text-[#007ACC]">₹{program.fee.toLocaleString()}</p>
                          ) : (
                            <p className="text-lg font-semibold text-slate-600">Contact for pricing</p>
                          )}
                        </div>
                        <div className="text-right">
                          <Badge variant="primary" size="lg">{program.type}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Program Info Section */}
      <section className="py-8 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#007ACC] mb-2">{program.duration || 'Flexible'}</div>
              <div className="text-slate-600">Duration</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#007ACC] mb-2">{program.type}</div>
              <div className="text-slate-600">Program Type</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#007ACC] mb-2">{program.eligibility || '12th Pass'}</div>
              <div className="text-slate-600">Eligibility</div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Program Overview</h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  {program.description || 'This comprehensive program is designed to equip students with cutting-edge skills and practical knowledge essential for today\'s competitive job market. Through a blend of theoretical concepts and hands-on projects, participants will develop industry-ready expertise.'}
                </p>

                <h3 className="text-2xl font-bold text-slate-900 mb-4">Program Details</h3>
                <div className="bg-slate-50 rounded-2xl p-6 mb-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Clock className="text-[#007ACC]" size={20} />
                        <h4 className="font-semibold text-slate-900">Duration</h4>
                      </div>
                      <p className="text-slate-600 ml-8">{program.duration || 'Contact for details'}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <GraduationCap className="text-[#007ACC]" size={20} />
                        <h4 className="font-semibold text-slate-900">Program Type</h4>
                      </div>
                      <p className="text-slate-600 ml-8">{program.type}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Award className="text-[#007ACC]" size={20} />
                        <h4 className="font-semibold text-slate-900">Eligibility</h4>
                      </div>
                      <p className="text-slate-600 ml-8">{program.eligibility || 'Contact for details'}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Briefcase className="text-[#007ACC]" size={20} />
                        <h4 className="font-semibold text-slate-900">Program Fee</h4>
                      </div>
                      <p className="text-slate-600 ml-8">
                        {program.fee ? `₹${program.fee.toLocaleString()}` : 'Contact for pricing'}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Quick Facts</h3>
                <div className="space-y-4">
                  {program.duration && (
                    <div className="flex items-center justify-between py-3 border-b border-slate-100">
                      <span className="text-slate-600">Duration</span>
                      <span className="font-semibold text-slate-900">{program.duration}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between py-3 border-b border-slate-100">
                    <span className="text-slate-600">Type</span>
                    <Badge variant="default">{program.type}</Badge>
                  </div>
                  {program.eligibility && (
                    <div className="flex items-center justify-between py-3 border-b border-slate-100">
                      <span className="text-slate-600">Eligibility</span>
                      <span className="font-semibold text-slate-900">{program.eligibility}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between py-3 border-b border-slate-100">
                    <span className="text-slate-600">Fee</span>
                    {program.fee ? (
                      <span className="font-bold text-[#007ACC] text-lg">₹{program.fee.toLocaleString()}</span>
                    ) : (
                      <span className="text-sm text-slate-600">Contact us</span>
                    )}
                  </div>
                  <div className="pt-3">
                    <Link to="/admissions">
                      <Button className="w-full">
                        Enroll Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#007ACC] to-[#0F172A] text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join {program.name} and take the first step towards your dream career
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/admissions">
                <Button size="lg" className="bg-white text-[#007ACC] hover:bg-blue-50">
                  Enroll Now
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Talk to Counselor
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProgramDetailPage;

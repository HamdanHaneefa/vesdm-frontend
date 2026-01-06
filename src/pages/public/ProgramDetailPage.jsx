import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Clock, Award, BookOpen, CheckCircle, Users, Download, 
  Calendar, TrendingUp, Target, Briefcase, GraduationCap,
  ArrowLeft, ArrowRight, Share2, Heart, Star
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import { programs } from '../../data/programsData';
import { generateSlug } from '../../utils/helpers';

const ProgramDetailPage = () => {
  const { programId } = useParams();
  const navigate = useNavigate();
  
  // Find program by slug
  const program = programs.find(p => generateSlug(p.name) === programId);

  // If program not found, redirect to programs page
  if (!program) {
    navigate('/programs');
    return null;
  }

  // Sample detailed data (can be expanded with backend integration)
  const programDetails = {
    overview: "This comprehensive program is designed to equip students with cutting-edge skills and practical knowledge essential for today's competitive job market. Through a blend of theoretical concepts and hands-on projects, participants will develop industry-ready expertise.",
    objectives: [
      "Master fundamental and advanced concepts in the field",
      "Develop practical skills through real-world projects",
      "Build a professional portfolio showcasing your capabilities",
      "Network with industry professionals and peers",
      "Earn recognized certification upon successful completion"
    ],
    curriculum: [
      {
        module: "Module 1: Foundations",
        duration: "4 weeks",
        topics: ["Introduction to core concepts", "Industry standards and best practices", "Essential tools and technologies", "Hands-on exercises"]
      },
      {
        module: "Module 2: Intermediate Concepts",
        duration: "6 weeks",
        topics: ["Advanced techniques and methodologies", "Real-world case studies", "Industry project simulation", "Collaborative assignments"]
      },
      {
        module: "Module 3: Advanced Applications",
        duration: "6 weeks",
        topics: ["Expert-level strategies", "Capstone project development", "Industry mentorship", "Portfolio building"]
      },
      {
        module: "Module 4: Professional Development",
        duration: "4 weeks",
        topics: ["Interview preparation", "Resume building", "Job search strategies", "Final assessments"]
      }
    ],
    careerOpportunities: [
      "Industry-specific roles with competitive salaries",
      "Freelance and consulting opportunities",
      "Leadership positions in established companies",
      "Entrepreneurship and business ventures",
      "International career prospects"
    ],
    facultyHighlights: [
      "15+ years of combined industry experience",
      "Certified professionals and subject matter experts",
      "Active industry practitioners",
      "Dedicated mentors for personalized guidance"
    ],
    features: [
      { icon: BookOpen, title: "Live Interactive Sessions", description: "Engage in real-time with expert instructors" },
      { icon: Users, title: "Peer Learning", description: "Collaborate with fellow students" },
      { icon: Briefcase, title: "Industry Projects", description: "Work on real-world assignments" },
      { icon: Award, title: "Certification", description: "Receive recognized credentials" },
      { icon: TrendingUp, title: "Career Support", description: "Job placement assistance included" },
      { icon: Target, title: "Skill Assessment", description: "Regular progress evaluation" }
    ],
    admissionProcess: [
      { step: 1, title: "Apply Online", description: "Fill out the application form on our website" },
      { step: 2, title: "Document Submission", description: "Upload required educational documents" },
      { step: 3, title: "Review & Acceptance", description: "Our team reviews your application" },
      { step: 4, title: "Fee Payment", description: "Complete the enrollment fee payment" },
      { step: 5, title: "Start Learning", description: "Access course materials and begin your journey" }
    ],
    testimonials: [
      {
        name: "Amit Sharma",
        role: "Software Developer",
        company: "Tech Corp",
        image: "https://i.pravatar.cc/150?img=12",
        rating: 5,
        text: "This program completely transformed my career. The practical approach and expert guidance helped me land my dream job!"
      },
      {
        name: "Priya Patel",
        role: "Digital Marketing Manager",
        company: "Marketing Pro",
        image: "https://i.pravatar.cc/150?img=47",
        rating: 5,
        text: "Excellent curriculum and supportive instructors. I gained skills that are directly applicable in my daily work."
      }
    ],
    faqs: [
      { question: "What are the prerequisites?", answer: `The basic requirement is ${program.eligibility}. However, a passion for learning and dedication are the most important prerequisites.` },
      { question: "Is financial aid available?", answer: "Yes, we offer flexible payment plans and scholarship opportunities for eligible candidates." },
      { question: "What is the batch size?", answer: "We maintain small batch sizes of 20-25 students to ensure personalized attention." },
      { question: "Will I get placement assistance?", answer: "Yes, we provide comprehensive career support including resume building, interview preparation, and job placement assistance." }
    ]
  };

  // Related programs
  const relatedPrograms = programs
    .filter(p => p.category === program.category && p.id !== program.id)
    .slice(0, 3);

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
                <Badge variant="primary" className="mb-4">{program.level}</Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {program.name}
                </h1>
                <p className="text-xl text-blue-100 mb-8">
                  {program.description}
                </p>

                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    <Clock className="text-blue-300" size={24} />
                    <div>
                      <p className="text-sm text-blue-200">Duration</p>
                      <p className="font-semibold">{program.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="text-blue-300" size={24} />
                    <div>
                      <p className="text-sm text-blue-200">Eligibility</p>
                      <p className="font-semibold">{program.eligibility}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="text-blue-300" size={24} />
                    <div>
                      <p className="text-sm text-blue-200">Level</p>
                      <p className="font-semibold">{program.level}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link to="/admissions">
                    <Button size="lg" className="bg-white text-[#007ACC] hover:bg-blue-50">
                      Enroll Now
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    <Download size={20} />
                    Download Brochure
                  </Button>
                  <button className="p-3 border-2 border-white/30 rounded-xl hover:bg-white/10 transition-colors">
                    <Share2 size={20} />
                  </button>
                  <button className="p-3 border-2 border-white/30 rounded-xl hover:bg-white/10 transition-colors">
                    <Heart size={20} />
                  </button>
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
                    src={program.image}
                    alt={program.name}
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-600 mb-1">Program Fee</p>
                          <p className="text-3xl font-bold text-[#007ACC]">{program.fees}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-slate-600 mb-1">Rating</p>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                            ))}
                            <span className="ml-2 text-sm font-semibold text-slate-900">4.9</span>
                          </div>
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

      {/* Skills Section */}
      <section className="py-8 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-lg font-bold text-slate-900">Skills You'll Learn:</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {program.skills.map((skill, i) => (
              <Badge key={i} variant="default" size="lg">
                {skill}
              </Badge>
            ))}
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
                  {programDetails.overview}
                </p>

                <h3 className="text-2xl font-bold text-slate-900 mb-4">Learning Objectives</h3>
                <ul className="space-y-3 mb-12">
                  {programDetails.objectives.map((objective, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="text-emerald-600 flex-shrink-0 mt-1" size={20} />
                      <span className="text-slate-700">{objective}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Quick Facts</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-slate-100">
                    <span className="text-slate-600">Duration</span>
                    <span className="font-semibold text-slate-900">{program.duration}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-slate-100">
                    <span className="text-slate-600">Level</span>
                    <Badge variant="default">{program.level}</Badge>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-slate-100">
                    <span className="text-slate-600">Eligibility</span>
                    <span className="font-semibold text-slate-900">{program.eligibility}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-slate-100">
                    <span className="text-slate-600">Fee</span>
                    <span className="font-bold text-[#007ACC] text-lg">{program.fees}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-slate-100">
                    <span className="text-slate-600">Students Enrolled</span>
                    <span className="font-semibold text-slate-900">1,234+</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-slate-600">Completion Rate</span>
                    <span className="font-semibold text-emerald-600">94%</span>
                  </div>
                </div>
                <Link to="/admissions" className="mt-6 block">
                  <Button className="w-full" size="lg">Apply Now</Button>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Program Features</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Comprehensive learning experience designed for your success
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programDetails.features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card hover className="h-full">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#007ACC]/10 rounded-xl">
                        <Icon className="text-[#007ACC]" size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                        <p className="text-slate-600">{feature.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Course Curriculum</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Structured learning path from fundamentals to advanced concepts
            </p>
          </motion.div>

          <div className="space-y-6">
            {programDetails.curriculum.map((module, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card>
                  <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-full bg-[#007ACC] text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                        {i + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{module.module}</h3>
                        <div className="flex items-center gap-2 text-sm text-slate-600 mt-1">
                          <Calendar size={16} />
                          <span>{module.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ul className="grid md:grid-cols-2 gap-3 ml-16">
                    {module.topics.map((topic, j) => (
                      <li key={j} className="flex items-start gap-2 text-slate-600">
                        <CheckCircle className="text-emerald-600 flex-shrink-0 mt-1" size={16} />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Opportunities */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Career Opportunities</h2>
              <p className="text-lg text-slate-600 mb-6">
                Our program opens doors to diverse career paths and growth opportunities:
              </p>
              <ul className="space-y-3">
                {programDetails.careerOpportunities.map((opportunity, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Briefcase className="text-[#007ACC] flex-shrink-0 mt-1" size={20} />
                    <span className="text-slate-700">{opportunity}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Expert Faculty</h2>
              <p className="text-lg text-slate-600 mb-6">
                Learn from industry veterans and experienced professionals:
              </p>
              <ul className="space-y-3">
                {programDetails.facultyHighlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Award className="text-[#007ACC] flex-shrink-0 mt-1" size={20} />
                    <span className="text-slate-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Student Success Stories</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Hear from graduates who transformed their careers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {programDetails.testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                      <p className="text-sm text-slate-600">{testimonial.role} at {testimonial.company}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 italic">"{testimonial.text}"</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Admission Process</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Simple and transparent enrollment in 5 easy steps
            </p>
          </motion.div>

          <div className="relative">
            <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-[#007ACC]/20"></div>
            <div className="grid md:grid-cols-5 gap-8 relative">
              {programDetails.admissionProcess.map((process, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#007ACC] to-[#0F172A] text-white flex items-center justify-center font-bold text-2xl shadow-lg">
                    {process.step}
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">{process.title}</h4>
                  <p className="text-sm text-slate-600">{process.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/admissions">
              <Button size="lg">
                Start Your Application
                <ArrowRight size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-slate-600">
              Get answers to common questions about this program
            </p>
          </motion.div>

          <div className="space-y-4">
            {programDetails.faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card>
                  <h4 className="font-bold text-slate-900 mb-2">{faq.question}</h4>
                  <p className="text-slate-600">{faq.answer}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/contact" className="text-[#007ACC] hover:underline font-medium">
              Have more questions? Contact us →
            </Link>
          </div>
        </div>
      </section>

      {/* Related Programs */}
      {relatedPrograms.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Related Programs</h2>
              <p className="text-lg text-slate-600">
                Explore other programs you might be interested in
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedPrograms.map((relatedProgram, i) => (
                <motion.div
                  key={relatedProgram.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card hover className="h-full flex flex-col">
                    <div className="relative h-48 -m-6 mb-4 rounded-t-2xl overflow-hidden">
                      <img
                        src={relatedProgram.image}
                        alt={relatedProgram.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{relatedProgram.name}</h3>
                    <p className="text-sm text-slate-600 mb-4 flex-1">{relatedProgram.description}</p>
                    <Link to={`/programs/${generateSlug(relatedProgram.name)}`}>
                      <Button size="sm" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
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

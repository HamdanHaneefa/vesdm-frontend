import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import {
  Eye,
  EyeOff,
  ChevronLeft,
  Shield,
  BookOpen,
  Users,
  Award,
  TrendingUp,
  GraduationCap,
  Loader2,
  AlertCircle
} from 'lucide-react';
import apiClient from '../../api/apiClient';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, user, loading } = useAuth();
  const infoSideRef = useRef(null);

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && isAuthenticated() && user) {
      navigate(`/portal/${user.role}`, { replace: true });
    }
  }, [loading, isAuthenticated, user, navigate]);

  // Check if user was logged out due to role change
  useEffect(() => {
    const roleChanged = localStorage.getItem('vesdm_role_changed');
    if (roleChanged) {
      setError('Your account role has been changed by an administrator. Please login again.');
      localStorage.removeItem('vesdm_role_changed');
    }
  }, []);

  // Floating animation for cards
  useEffect(() => {
    if (infoSideRef.current) {
      gsap.to('.floating-card', {
        y: -15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        stagger: 0.3
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await apiClient.post('/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = response.data;

      // Store token and user data using auth context
      login(token, user);

      // Navigate to the appropriate portal based on user role
      navigate(`/portal/${user.role}`, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      setError(
        err.response?.data?.msg || 
        err.response?.data?.message || 
        'Login failed. Please check your credentials and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const stats = [
    { icon: Users, label: 'Active Students', value: '10,000+', color: 'bg-emerald-500/20' },
    { icon: BookOpen, label: 'Programs Offered', value: '45+', color: 'bg-blue-500/20' },
    { icon: Award, label: 'Placement Rate', value: '92%', color: 'bg-purple-500/20' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-['Inter',sans-serif] overflow-hidden">
      {/* LEFT PANEL - Info Side */}
      <div
        ref={infoSideRef}
        className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#007ACC] to-[#0F172A] relative flex-col justify-center px-16 xl:px-24 text-white overflow-hidden"
      >
        {/* Grid Background */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              `linear-gradient(#fff 1px, transparent 1px),
               linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent pointer-events-none" />

        {/* Content */}
        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
              <GraduationCap size={28} />
            </div>
            <span className="text-2xl font-bold uppercase tracking-tight">
              VESD<span className="text-blue-300">M</span>
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl xl:text-6xl font-bold leading-tight mb-6">
            Your Gateway to
            <br />
            <span className="text-blue-300 italic">Success & Growth</span>
          </h1>

          <p className="text-blue-100 text-lg max-w-md mb-12 leading-relaxed">
            Access your personalized learning dashboard, track progress, and unlock your potential with industry-leading education.
          </p>

          {/* Floating Stats Cards */}
          <div className="space-y-5">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="floating-card w-72 bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-all"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-blue-300 tracking-wide font-semibold">{stat.label}</p>
                    <p className="text-xl font-bold">{stat.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Security Badge */}
          <div className="mt-12 flex items-center gap-3 text-sm text-blue-200">
            <Shield size={20} className="text-blue-300" />
            <span>Secure authentication with encrypted data transfer</span>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-[440px] space-y-8">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-[11px] font-bold uppercase text-slate-500 hover:text-[#007ACC] transition-colors"
          >
            <ChevronLeft size={16} /> Back to Home
          </Link>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-3">
              Portal Login
            </h2>
            <p className="text-slate-600 text-base">
              Enter your credentials to access your dashboard
            </p>
          </motion.header>

          {/* Login Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
<<<<<<< HEAD
            {/* Portal Type Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2.5 uppercase tracking-wide">
                Select Portal
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full border-2 border-slate-200 px-4 py-3.5 rounded-xl outline-none focus:border-[#007ACC] focus:ring-4 focus:ring-blue-50 transition-all bg-white text-slate-900 font-medium"
              >
                <option value="student">Student Portal</option>
                <option value="franchise">Franchise Portal</option>
                <option value="admin">Admin Portal</option>
              </select>
            </div>

=======
>>>>>>> 3a4cb86 (Connect authentication backend)
            {/* Email/Username */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2.5 uppercase tracking-wide">
                Email / Registration Number
              </label>
              <input
                type="text"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                placeholder="name@example.com or REG123"
                className="w-full border-2 border-slate-200 px-4 py-3.5 rounded-xl outline-none focus:border-[#007ACC] focus:ring-4 focus:ring-blue-50 transition-all bg-white"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2.5 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  placeholder="••••••••••"
                  className="w-full border-2 border-slate-200 px-4 py-3.5 rounded-xl outline-none focus:border-[#007ACC] focus:ring-4 focus:ring-blue-50 transition-all bg-white pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-4 bg-rose-50 border-2 border-rose-200 rounded-xl text-rose-800"
              >
                <AlertCircle size={18} className="flex-shrink-0" />
                <span className="text-sm font-medium">{error}</span>
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#007ACC] to-[#0F172A] text-white py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Authenticating...
                </>
              ) : (
                <>
                  LOGIN
                  <TrendingUp size={18} />
                </>
              )}
            </button>
          </motion.form>

          {/* Additional Links */}
          <div className="pt-6 border-t border-slate-200 space-y-3">
            <p className="text-center text-sm text-slate-600">
              Don't have an account?{' '}
              <Link to="/admissions" className="text-[#007ACC] font-semibold hover:underline">
                Apply for Admission
              </Link>
            </p>
            <p className="text-center text-sm text-slate-600">
              <Link to="/contact" className="text-slate-500 hover:text-[#007ACC] transition-colors">
                Need help? Contact Support
              </Link>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-xs text-slate-600 mb-2 font-semibold">Demo Credentials:</p>
            <p className="text-xs text-slate-600">Email: <span className="font-mono font-semibold">admin@vesdm.com</span></p>
            <p className="text-xs text-slate-600">Password: <span className="font-mono font-semibold">admin123</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import SEO from '../components/SEO';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SEO 
        title="404 - Page Not Found | VESDM"
        description="The page you're looking for doesn't exist. Return to VESDM homepage or explore our programs."
        canonical="/404"
      />
      <Header />
      
      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-2xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <motion.h1
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                className="text-[120px] md:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#007ACC] to-[#0F172A] leading-none"
              >
                404
              </motion.h1>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
            >
              Oops! Page Not Found
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-slate-600 mb-8 max-w-md mx-auto"
            >
              The page you're looking for doesn't exist or has been moved. Let's get you back on track!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/">
                <Button size="lg" icon={Home}>
                  Back to Home
                </Button>
              </Link>
              
              <Link to="/programs">
                <Button size="lg" variant="outline" icon={Search}>
                  Explore Programs
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 pt-8 border-t border-slate-200"
            >
              <p className="text-sm text-slate-500 mb-4">Quick Links:</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/about" className="text-[#007ACC] hover:underline text-sm">
                  About Us
                </Link>
                <Link to="/admissions" className="text-[#007ACC] hover:underline text-sm">
                  Admissions
                </Link>
                <Link to="/contact" className="text-[#007ACC] hover:underline text-sm">
                  Contact
                </Link>
                <Link to="/faqs" className="text-[#007ACC] hover:underline text-sm">
                  FAQs
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFoundPage;

import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import './App.css';
import useSmoothScroll from './hooks/useSmoothScroll';
import { ToastProvider } from './components/ToastProvider';
import ErrorBoundary from './components/ErrorBoundary';

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Force scroll to top with multiple attempts
    const forceScrollTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      const portalContent = document.querySelector('.portal-content-scroll');
      if (portalContent) {
        portalContent.scrollTop = 0;
      }
    };

    forceScrollTop();
    setTimeout(forceScrollTop, 0);
    setTimeout(forceScrollTop, 10);
    setTimeout(forceScrollTop, 50);
  }, [pathname]);

  return null;
}

// Smooth scroll wrapper
function SmoothScrollWrapper({ children }) {
  useSmoothScroll();
  return <>{children}</>;
}

// Public Pages
import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import ProgramsPage from './pages/public/ProgramsPage';
import ProgramDetailPage from './pages/public/ProgramDetailPage';
import AdmissionsPage from './pages/public/AdmissionsPage';
import FranchisePage from './pages/public/FranchisePage';
import StudentServicesPage from './pages/public/StudentServicesPage';
import GalleryPage from './pages/public/GalleryPage';
import ContactPage from './pages/public/ContactPage';
import CertificateVerificationPage from './pages/public/CertificateVerificationPage';
import FAQPage from './pages/public/FAQPage';
import NotFoundPage from './pages/NotFoundPage';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';

// Portal Pages
import StudentHub from './pages/portal/student/StudentHub';
import StudentDashboard from './pages/portal/student/StudentDashboard';
import StudentProfile from './pages/portal/student/StudentProfile';
import StudentCertificates from './pages/portal/student/StudentCertificates';
import StudentResults from './pages/portal/student/StudentResults';
import StudentResources from './pages/portal/student/StudentResources';

import FranchiseHub from './pages/portal/franchise/FranchiseHub';
import FranchiseDashboard from './pages/portal/franchise/FranchiseDashboard';
import RegisterStudent from './pages/portal/franchise/RegisterStudent';
import RegisterExam from './pages/portal/franchise/RegisterExam';
import PublishResults from './pages/portal/franchise/PublishResults';
import StudentsList from './pages/portal/franchise/StudentsList';
import FranchiseResources from './pages/portal/franchise/FranchiseResources';

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('vesdm_user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('vesdm_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('vesdm_user');
  };

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <ToastProvider>
          <BrowserRouter>
            <SmoothScrollWrapper>
              <ScrollToTop />
              <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/programs/:programId" element={<ProgramDetailPage />} />
          <Route path="/admissions" element={<AdmissionsPage />} />
          <Route path="/franchise" element={<FranchisePage />} />
          <Route path="/student-services" element={<StudentServicesPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/verify-certificate" element={<CertificateVerificationPage />} />
          <Route path="/faqs" element={<FAQPage />} />

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

        {/* Student Portal */}
        <Route path="/portal/student" element={<StudentHub currentUser={currentUser} onLogout={handleLogout} />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="certificates" element={<StudentCertificates />} />
          <Route path="results" element={<StudentResults />} />
          <Route path="resources" element={<StudentResources />} />
        </Route>

        {/* Franchise Portal */}
        <Route path="/portal/franchise" element={<FranchiseHub currentUser={currentUser} onLogout={handleLogout} />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<FranchiseDashboard />} />
          <Route path="register-student" element={<RegisterStudent />} />
          <Route path="register-exam" element={<RegisterExam />} />
          <Route path="publish-results" element={<PublishResults />} />
          <Route path="students" element={<StudentsList />} />
          <Route path="resources" element={<FranchiseResources />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </SmoothScrollWrapper>
    </BrowserRouter>
    </ToastProvider>
    </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
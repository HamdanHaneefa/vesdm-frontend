import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

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
    <BrowserRouter>
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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

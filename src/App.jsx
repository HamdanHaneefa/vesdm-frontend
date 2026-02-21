import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import './App.css';
import useSmoothScroll from './hooks/useSmoothScroll';
import { ToastProvider } from './components/ToastProvider';
import ErrorBoundary from './components/ErrorBoundary';
import PlaceholderPage from './components/PlaceholderPage';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

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
import StudentCourses from './pages/portal/student/StudentCourses';
import StudentCourseDetails from './pages/portal/student/StudentCourseDetails';
import StudentProfile from './pages/portal/student/StudentProfile';
import StudentCertificates from './pages/portal/student/StudentCertificates';
import StudentResults from './pages/portal/student/StudentResults';
import StudentResources from './pages/portal/student/StudentResources';

import FranchiseHub from './pages/portal/franchise/FranchiseHub';
import FranchiseDashboard from './pages/portal/franchise/FranchiseDashboard';
import CourseManagement from './pages/portal/franchise/CourseManagement';
import CourseDetails from './pages/portal/admin/CourseDetails';
import RegisterStudent from './pages/portal/franchise/RegisterStudent';
import PublishResults from './pages/portal/admin/PublishResults';
import StudentsList from './pages/portal/franchise/StudentsList';
import FranchiseResources from './pages/portal/admin/ResourceManagement';
import RegisterForExam from './pages/portal/franchise/RegisterForExam';
import PublishedExams from './pages/portal/franchise/PublishedExams';

import AdminHub from './pages/portal/admin/AdminHub';
import AdminDashboard from './pages/portal/admin/AdminDashboard';
import FranchiseManagement from './pages/portal/admin/FranchiseManagement';
import FranchiseDetails from './pages/portal/admin/FranchiseDetails';
import AdminCourseManagement from './pages/portal/admin/CourseManagement';
import AdminStudentManagement from './pages/portal/admin/StudentManagement';
import AdmissionManagement from './pages/portal/admin/AdmissionManagement';
import FranchiseRequests from './pages/portal/admin/FranchiseRequests';
import CertificatesAdmin from './pages/portal/admin/CertificatesAdmin';
import CreateExam from './pages/portal/admin/CreateExam';

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <ToastProvider>
          <BrowserRouter>
            <AuthProvider>
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
                  <Route path="/login" element={<LoginPage />} />

                  {/* Student Portal - Protected */}
                  <Route
                    path="/portal/student"
                    element={
                      <ProtectedRoute allowedRoles="student">
                        <StudentHub />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<StudentDashboard />} />
                    <Route path="courses" element={<StudentCourses />} />
                    <Route path="courses/:courseId" element={<StudentCourseDetails />} />
                    <Route path="profile" element={<StudentProfile />} />
                    <Route path="certificates" element={<StudentCertificates />} />
                    <Route path="results" element={<StudentResults />} />
                    <Route path="resources" element={<StudentResources />} />
                  </Route>

                  {/* Franchise Portal - Protected */}
                  <Route
                    path="/portal/franchise"
                    element={
                      <ProtectedRoute allowedRoles={['franchisee', 'admin']}>
                        <FranchiseHub />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<FranchiseDashboard />} />
                    <Route path="courses" element={<CourseManagement />} />
                    <Route path="courses/:courseId" element={<CourseDetails />} />
                    <Route path="register-student" element={<RegisterStudent />} />
                    <Route path="register-for-exam" element={<RegisterForExam />} />
                    <Route path="published-exams" element={<PublishedExams />} />
                    <Route path="students" element={<StudentsList />} />
                  </Route>

                  {/* Admin Portal - Protected */}
                  <Route
                    path="/portal/admin"
                    element={
                      <ProtectedRoute allowedRoles="admin">
                        <AdminHub />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="admissions" element={<AdmissionManagement />} />
                    <Route path="franchises" element={<FranchiseManagement />} />
                    <Route path="franchises/:franchiseId" element={<FranchiseDetails />} />
                    <Route path="students" element={<AdminStudentManagement />} />
                    <Route path="courses" element={<AdminCourseManagement />} />
                    <Route path="courses/:courseId" element={<CourseDetails />} />
                    <Route path="create-exam" element={<CreateExam />} />
                    <Route path="publish-results" element={<PublishResults />} />
                    <Route path="requests" element={<FranchiseRequests />} />
                    <Route path="resources" element={<FranchiseResources />} />
                    {/* Disabled features - Coming soon */}
                    <Route path="certificates" element={<CertificatesAdmin />} />
                    {/* <Route path="results" element={<PlaceholderPage />} /> */}
                    {/* <Route path="analytics" element={<PlaceholderPage />} /> */}
                    {/* <Route path="content" element={<PlaceholderPage />} /> */}
                    {/* <Route path="financial" element={<PlaceholderPage />} /> */}
                    {/* <Route path="communications" element={<PlaceholderPage />} /> */}
                    {/* <Route path="settings" element={<PlaceholderPage />} /> */}
                  </Route>

                  {/* Fallback */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </SmoothScrollWrapper>
            </AuthProvider>
          </BrowserRouter>
        </ToastProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
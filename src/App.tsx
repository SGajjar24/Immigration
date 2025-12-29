import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { AuthGuard } from './components/AuthGuard';

// Lazy load pages for commercial-grade performance (Code Splitting)
const HomePage = lazy(() => import('./pages/HomePage'));
const AssessmentPage = lazy(() => import('./pages/AssessmentPage'));
const CalculatorPage = lazy(() => import('./pages/CalculatorPage'));
const ExpressEntryHub = lazy(() => import('./features/ExpressEntry/ExpressEntryHub'));
const PathwayExplorer = lazy(() => import('./components/PathwayExplorer'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const DocumentChecklistPage = lazy(() => import('./pages/DocumentChecklistPage'));
const AboutContact = lazy(() => import('./pages/AboutContact'));
const UnderConstruction = lazy(() => import('./pages/UnderConstruction'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));

// Dashboard sub-pages
const OnboardingPage = lazy(() => import('./pages/OnboardingPage'));
const ProfilePage = lazy(() => import('./pages/dashboard/ProfilePage'));
const DocumentVaultPage = lazy(() => import('./pages/dashboard/DocumentVaultPage'));
const JobMatcherPage = lazy(() => import('./pages/dashboard/JobMatcherPage'));
const SettingsPage = lazy(() => import('./pages/dashboard/SettingsPage'));

// Simple Loading Fallback
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="size-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
  </div>
);

function App() {
  const { pathname } = useLocation();

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <MainLayout>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/express-entry" element={<ExpressEntryHub />} />
          <Route path="/pathway-explorer" element={<PathwayExplorer />} />
          <Route path="/pathways" element={<PathwayExplorer />} />
          <Route path="/checklist" element={<DocumentChecklistPage />} />
          <Route path="/documents" element={<DocumentChecklistPage />} />
          <Route path="/about" element={<AboutContact />} />
          <Route path="/contact" element={<AboutContact />} />

          {/* Legal Pages */}
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/cookies" element={<PrivacyPolicy />} />
          <Route path="/disclaimer" element={<TermsOfService />} />

          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={
            <AuthGuard>
              <DashboardPage />
            </AuthGuard>
          } />
          <Route path="/dashboard/onboarding" element={
            <AuthGuard>
              <OnboardingPage />
            </AuthGuard>
          } />
          <Route path="/dashboard/profile" element={
            <AuthGuard>
              <ProfilePage />
            </AuthGuard>
          } />
          <Route path="/dashboard/documents" element={
            <AuthGuard>
              <DocumentVaultPage />
            </AuthGuard>
          } />
          <Route path="/dashboard/jobs" element={
            <AuthGuard>
              <JobMatcherPage />
            </AuthGuard>
          } />
          <Route path="/dashboard/settings" element={
            <AuthGuard>
              <SettingsPage />
            </AuthGuard>
          } />

          {/* Fallback Routes */}
          <Route path="/login" element={<UnderConstruction pageName="Login" />} />
          <Route path="/resources" element={<UnderConstruction pageName="Resources" />} />
          <Route path="/blog" element={<UnderConstruction pageName="Blog" />} />
          <Route path="*" element={<UnderConstruction pageName="Page Not Found" />} />
        </Routes>
      </Suspense>
    </MainLayout>
  );
}

export default App;

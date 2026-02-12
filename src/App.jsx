import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import PageGuard from './components/PageGuard';
import LoadingFallback from './components/LoadingFallback';
import SkipToContent from './components/SkipToContent';
import useFavicon from './hooks/useFavicon';

// CRITICAL: Home page must NOT be lazy loaded to ensure FCP for Lighthouse
import Home from './pages/Home';

// Lazy load other pages for better performance
const Revista = lazy(() => import('./pages/revista/Revista'));
const Kids = lazy(() => import('./pages/revista/Kids'));
const Jovens = lazy(() => import('./pages/revista/Jovens'));
const LouvorRevista = lazy(() => import('./pages/revista/Louvor'));
const Mulheres = lazy(() => import('./pages/revista/Mulheres'));
const Homens = lazy(() => import('./pages/revista/Homens'));
const Lares = lazy(() => import('./pages/revista/Lares'));
const Retiros = lazy(() => import('./pages/revista/Retiros'));
const AcaoSocial = lazy(() => import('./pages/revista/AcaoSocial'));
const EBD = lazy(() => import('./pages/revista/EBD'));

// Lazy load Ministerios
const Lideranca = lazy(() => import('./pages/ministerios/Lideranca'));
const Casais = lazy(() => import('./pages/ministerios/Casais'));
const Infantil = lazy(() => import('./pages/ministerios/Infantil'));
const LouvorMinisterio = lazy(() => import('./pages/ministerios/Louvor'));
const Intercessao = lazy(() => import('./pages/ministerios/Intercessao'));
const EscolaBiblica = lazy(() => import('./pages/ministerios/EscolaBiblica'));
const HomensMinistry = lazy(() => import('./pages/Homem/Homem'));

// Lazy load Media
const Media = lazy(() => import('./pages/midia/Midia'));

// Lazy load Admin Panel
const PainelRoutes = lazy(() => import('./painel/PainelRoutes'));
const Login = lazy(() => import('./painel/pages/Login'));
import { AuthProvider } from './context/AuthContext';

function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <AppContent isDark={isDark} toggleTheme={toggleTheme} />
      </Router>
    </AuthProvider>
  );
}

const AppContent = ({ isDark, toggleTheme }) => {
  const { pathname } = useLocation();
  const isAdminPath = pathname.startsWith('/painel');

  // Update favicon dynamically based on logo settings
  useFavicon();

  return (
    <div className="min-h-screen bg-white dark:bg-church-dark transition-colors duration-300">
      <SkipToContent />
      {!isAdminPath && <Navbar isDark={isDark} toggleTheme={toggleTheme} />}
      <main id="main-content">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/revista" element={<Revista />} />

            {/* Revista Pages - Guarded */}
            <Route path="/revista/kids" element={<PageGuard slug="revista/kids"><Kids /></PageGuard>} />
            <Route path="/revista/jovens" element={<PageGuard slug="revista/jovens"><Jovens /></PageGuard>} />
            <Route path="/revista/louvor" element={<PageGuard slug="revista/louvor"><LouvorRevista /></PageGuard>} />
            <Route path="/revista/mulheres" element={<PageGuard slug="revista/mulheres"><Mulheres /></PageGuard>} />
            <Route path="/revista/homens" element={<PageGuard slug="revista/homens"><Homens /></PageGuard>} />
            <Route path="/revista/lares" element={<PageGuard slug="revista/lares"><Lares /></PageGuard>} />
            <Route path="/revista/retiros" element={<PageGuard slug="revista/retiros"><Retiros /></PageGuard>} />
            <Route path="/revista/acao-social" element={<PageGuard slug="revista/acao-social"><AcaoSocial /></PageGuard>} />
            <Route path="/revista/ebd" element={<PageGuard slug="revista/ebd"><EBD /></PageGuard>} />

            {/* Ministerios Pages - Guarded */}
            <Route path="/ministerios/lideranca" element={<PageGuard slug="ministerios/lideranca"><Lideranca /></PageGuard>} />
            <Route path="/ministerios/casais" element={<PageGuard slug="ministerios/casais"><Casais /></PageGuard>} />
            <Route path="/ministerios/infantil" element={<PageGuard slug="ministerios/infantil"><Infantil /></PageGuard>} />
            <Route path="/ministerios/louvor" element={<PageGuard slug="ministerios/louvor"><LouvorMinisterio /></PageGuard>} />
            <Route path="/ministerios/intercessao" element={<PageGuard slug="ministerios/intercessao"><Intercessao /></PageGuard>} />
            <Route path="/ministerios/ebd" element={<PageGuard slug="ministerios/ebd"><EscolaBiblica /></PageGuard>} />
            <Route path="/ministerios/homens" element={<PageGuard slug="ministerios/homens"><HomensMinistry /></PageGuard>} />

            {/* Media Page */}
            <Route path="/midia" element={<Media />} />

            {/* Direct Login and Panel Routes */}
            <Route path="/painel/login" element={<Login />} />
            <Route path="/painel/*" element={<PainelRoutes />} />
          </Routes>
        </Suspense>
      </main>
      {!isAdminPath && <Footer />}
    </div>
  );
};

export default App;

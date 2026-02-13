import { useState, useEffect, Suspense, lazy, Component } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import PageGuard from './components/PageGuard';
import LoadingFallback from './components/LoadingFallback';
import SkipToContent from './components/SkipToContent';
import useFavicon from './hooks/useFavicon';

import { AuthProvider } from './context/AuthContext';

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

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-white p-4 text-center z-[9999]">
          <div className="max-w-lg">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Algo deu errado</h2>
            <p className="mb-4 text-gray-600">Ocorreu um erro inesperado. Tente recarregar a página.</p>
            <div className="bg-gray-100 p-4 rounded text-left overflow-auto max-h-40 mb-4 text-xs font-mono text-red-500 border border-red-200">
              {this.state.error && this.state.error.toString()}
            </div>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Recarregar e Limpar Cache
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
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
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <AppContent isDark={isDark} toggleTheme={toggleTheme} />
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;

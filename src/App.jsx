import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import PageGuard from './components/PageGuard';

// Pages
import Home from './pages/Home';
import Revista from './pages/revista/Revista';
import Kids from './pages/revista/Kids';
import Jovens from './pages/revista/Jovens';
import LouvorRevista from './pages/revista/Louvor';
import Mulheres from './pages/revista/Mulheres';
import Homens from './pages/revista/Homens';
import Lares from './pages/revista/Lares';
import Retiros from './pages/revista/Retiros';
import AcaoSocial from './pages/revista/AcaoSocial';
import EBD from './pages/revista/EBD';

// Ministerios
import Lideranca from './pages/ministerios/Lideranca';
import Casais from './pages/ministerios/Casais';
import Infantil from './pages/ministerios/Infantil';
import LouvorMinisterio from './pages/ministerios/Louvor';
import Intercessao from './pages/ministerios/Intercessao';
import EscolaBiblica from './pages/ministerios/EscolaBiblica';

// Admin Panel
import PainelRoutes from './painel/PainelRoutes';
import Login from './painel/pages/Login';
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

  return (
    <div className="min-h-screen bg-white dark:bg-church-dark transition-colors duration-300">
      {!isAdminPath && <Navbar isDark={isDark} toggleTheme={toggleTheme} />}
      <main>
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

          {/* Direct Login and Panel Routes */}
          <Route path="/painel/login" element={<Login />} />
          <Route path="/painel/*" element={<PainelRoutes />} />
        </Routes>
      </main>
      {!isAdminPath && <Footer />}
    </div>
  );
};

export default App;

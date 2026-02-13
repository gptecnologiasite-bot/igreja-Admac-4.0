import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    LuLayoutDashboard,
    LuFileText,
    LuSettings,
    LuUsers,
    LuBadgeDollarSign,
    LuLogOut,
    LuX
} from 'react-icons/lu';
import dbService from '../../services/dbService';

const Sidebar = ({ isOpen, onClose }) => {
    const [settings, setSettings] = useState(dbService.getSettings());
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        const loadSettings = () => {
            setSettings(dbService.getSettings());
        };
        window.addEventListener('settingsUpdated', loadSettings);
        return () => window.removeEventListener('settingsUpdated', loadSettings);
    }, []);

    const handleLogout = () => {
        if (window.confirm('Tem certeza que deseja sair do painel?')) {
            logout();
            navigate('/');
        }
    };

    const menuItems = [
        { icon: LuLayoutDashboard, label: 'Dashboard', path: '/painel' },
        { icon: LuBadgeDollarSign, label: 'Financeiro', path: '/painel/financeiro' },
        { icon: LuFileText, label: 'Gerenciar Páginas', path: '/painel/paginas' },
        { icon: LuUsers, label: 'Usuários', path: '/painel/usuarios' },
        { icon: LuSettings, label: 'Configurações', path: '/painel/configuracoes' },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Container */}
            <aside className={`
        fixed top-0 left-0 z-50 h-screen w-64 bg-slate-900 text-white transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static
      `}>
                {/* Header */}
                <div className="flex items-center justify-between h-20 px-6 border-b border-slate-700/50">
                    <div className="flex items-center gap-3">
                        {settings.logoUrl ? (
                            <img
                                src={settings.logoUrl}
                                alt={settings.siteName}
                                className="h-8 w-auto object-contain"
                            />
                        ) : (
                            <span className="text-xl font-bold bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                                {settings.siteName}
                            </span>
                        )}
                    </div>
                    <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white">
                        <LuX size={24} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-2">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/painel'}
                            className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                ${isActive
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'}
              `}
                            onClick={() => window.innerWidth < 1024 && onClose()}
                        >
                            <item.icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* Footer */}
                <div className="absolute bottom-0 w-full p-4 border-t border-slate-700">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                    >
                        <LuLogOut size={20} />
                        <span className="font-medium">Sair</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;

import React, { useState, useEffect, useRef } from 'react';
import { LuMenu, LuX, LuChurch, LuChevronDown, LuLayoutDashboard } from 'react-icons/lu';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import dbService from '../services/dbService';

const Navbar = ({ isDark, toggleTheme }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isSticky, setIsSticky] = useState(false);
    const [mobileSubmenu, setMobileSubmenu] = useState(null);
    const [settings, setSettings] = useState({
        siteName: 'ADMAC',
        logoUrl: ''
    });
    const [ministries, setMinistries] = useState([]);
    const navRef = useRef(null);
    const location = useLocation();

    const isHomePage = location.pathname === '/';

    const loadMinistries = () => {
        const pages = dbService.getPages();
        const dynamicMinistries = pages
            .filter(p => p.slug && p.slug.startsWith('ministerios/'))
            .map(p => ({
                name: p.title,
                href: `/${p.slug}`
            }));

        const defaultMinistries = [
            { name: 'Liderança', href: '/ministerios/lideranca' },
            { name: 'Casais', href: '/ministerios/casais' },
            { name: 'Infantil', href: '/ministerios/infantil' },
            { name: 'Louvor', href: '/ministerios/louvor' },
            { name: 'Intercessão', href: '/ministerios/intercessao' },
            { name: 'Escola Bíblica', href: '/ministerios/ebd' },
            { name: 'Homens', href: '/ministerios/homens' }
        ];

        // Merge dynamic pages with defaults, avoiding duplicates by href
        const merged = [...dynamicMinistries];
        defaultMinistries.forEach(def => {
            if (!merged.find(m => m.href === def.href)) {
                merged.push(def);
            }
        });

        // Maintain a specific order if possible or just use merged
        setMinistries(merged);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setActiveDropdown(null);
                setIsSticky(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        const loadSettings = () => {
            const current = dbService.getSettings();
            setSettings(current);
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('settingsUpdated', loadSettings);
        window.addEventListener('contentUpdated', () => {
            loadMinistries();
        });
        loadSettings();
        loadMinistries();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('settingsUpdated', loadSettings);
            window.removeEventListener('contentUpdated', loadMinistries);
        };
    }, []);

    const menuItems = [
        { name: 'Início', href: isHomePage ? '#home' : '/' },
        {
            name: 'Ministérios',
            href: isHomePage ? '#ministries' : '/#ministries',
            submenu: ministries
        },
        {
            name: 'Revista',
            href: '/revista',
            submenu: [
                { name: 'Kids', href: '/revista/kids' },
                { name: 'Jovens', href: '/revista/jovens' },
                { name: 'Louvor', href: '/revista/louvor' },
                { name: 'Mulheres', href: '/revista/mulheres' },
                { name: 'Homens', href: '/revista/homens' },
                { name: 'Lares', href: '/revista/lares' },
                { name: 'Retiros', href: '/revista/retiros' },
                { name: 'Ação Social', href: '/revista/acao-social' },
                { name: 'EBD', href: '/revista/ebd' },
            ]
        },
        {
            name: 'Programação',
            href: isHomePage ? '#agenda' : '/#agenda',
            submenu: [
                { name: 'Domingo', href: isHomePage ? '#domingo' : '/#domingo' },
                { name: 'Terça-feira', href: isHomePage ? '#terca-feira' : '/#terca-feira' },
                { name: 'Quinta-feira', href: isHomePage ? '#quinta-feira' : '/#quinta-feira' },
                { name: 'Sábado', href: isHomePage ? '#sabado' : '/#sabado' },
            ]
        },
        {
            name: 'Mídia',
            href: '/midia'
        },
        { name: 'Contato', href: isHomePage ? '#contact' : '/#contact' },
    ];

    return (
        <nav ref={navRef} role="navigation" aria-label="Menu principal" className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white dark:bg-church-dark/95 shadow-md py-2 backdrop-blur-md' : 'bg-transparent py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        {settings.logoUrl ? (
                            <>
                                <img
                                    src={settings.logoUrl}
                                    alt={settings.siteName}
                                    className="h-10 md:h-12 w-auto object-contain"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div className="hidden p-2 bg-church-primary rounded-lg shadow-lg shadow-church-primary/20">
                                    <LuChurch className="w-8 h-8 text-white" />
                                </div>
                                <span className={`text-xl font-bold tracking-tight ${scrolled ? 'text-church-primary dark:text-white' : 'text-white'}`}>
                                    {settings.siteName}
                                </span>
                            </>
                        ) : (
                            <>
                                <div className="p-2 bg-church-primary rounded-lg shadow-lg shadow-church-primary/20">
                                    <LuChurch className="w-8 h-8 text-white" />
                                </div>
                                <span className={`text-xl font-bold tracking-tight ${scrolled ? 'text-church-primary dark:text-white' : 'text-white'}`}>
                                    {settings.siteName}
                                </span>
                            </>
                        )}
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {menuItems.map((item) => (
                            <div
                                key={item.name}
                                className="relative group"
                                onMouseEnter={() => {
                                    if (!isSticky && item.submenu) {
                                        setActiveDropdown(item.name);
                                    }
                                }}
                                onMouseLeave={() => {
                                    if (!isSticky) {
                                        setActiveDropdown(null);
                                    }
                                }}
                            >
                                {item.submenu ? (
                                    <Link
                                        to={item.href}
                                        onClick={() => {
                                            if (activeDropdown === item.name && isSticky) {
                                                setIsSticky(false);
                                                setActiveDropdown(null);
                                            } else {
                                                setIsSticky(true);
                                                setActiveDropdown(item.name);
                                            }
                                        }}
                                        className={`flex items-center gap-1 font-medium transition-colors hover:text-church-accent ${scrolled ? 'text-gray-700 dark:text-gray-200' : 'text-white'}`}
                                    >
                                        {item.name}
                                        <LuChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                                    </Link>
                                ) : (
                                    <Link
                                        to={item.href}
                                        className={`font-medium transition-colors hover:text-church-accent ${scrolled ? 'text-gray-700 dark:text-gray-200' : 'text-white'}`}
                                    >
                                        {item.name}
                                    </Link>
                                )}

                                {/* Desktop Dropdown Panel */}
                                {item.submenu && activeDropdown === item.name && (
                                    <div className="absolute top-full left-0 w-48 bg-white dark:bg-church-dark rounded-xl shadow-xl border border-gray-100 dark:border-white/10 overflow-hidden animate-fade-in py-2">
                                        <div className="absolute -top-4 left-0 w-full h-4 bg-transparent" />
                                        {item.submenu.map((sub) => (
                                            <Link
                                                key={sub.name}
                                                to={sub.href}
                                                onClick={() => {
                                                    setActiveDropdown(null);
                                                    setIsSticky(false);
                                                }}
                                                className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-church-light/50 dark:hover:bg-white/5 hover:text-church-primary dark:hover:text-church-accent transition-colors"
                                            >
                                                {sub.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        <Link
                            to="/painel"
                            className={`p-2 rounded-full transition-all ${scrolled ? 'bg-church-primary/10 text-church-primary dark:bg-emerald-500/10 dark:text-emerald-500' : 'bg-white/10 text-white'} hover:scale-110 active:scale-95`}
                            aria-label="Painel de Controle"
                            title="Painel de Controle"
                        >
                            <LuLayoutDashboard className="w-5 h-5" />
                        </Link>

                        <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
                    </div>

                    {/* Mobile Actions */}
                    <div className="md:hidden flex items-center gap-4">
                        <Link
                            to="/painel"
                            className={`p-2 rounded-full ${scrolled ? 'text-church-primary dark:text-emerald-500' : 'text-white'}`}
                            aria-label="Painel de Controle"
                        >
                            <LuLayoutDashboard className="w-5 h-5" />
                        </Link>
                        <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`${scrolled ? 'text-gray-700 dark:text-white' : 'text-white'} p-2`}
                            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
                            aria-expanded={isOpen}
                            aria-controls="mobile-menu"
                        >
                            {isOpen ? <LuX className="w-6 h-6" /> : <LuMenu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div id="mobile-menu" className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl animate-fade-in border-t border-gray-100" role="menu">
                    <div className="px-4 py-6 space-y-4">
                        {menuItems.map((item) => (
                            <div key={item.name} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Link
                                        to={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-church-primary dark:hover:text-church-accent transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                    {item.submenu && (
                                        <button
                                            onClick={() => setMobileSubmenu(mobileSubmenu === item.name ? null : item.name)}
                                            className="p-2 text-gray-500"
                                            aria-label={`${mobileSubmenu === item.name ? 'Fechar' : 'Abrir'} submenu de ${item.name}`}
                                            aria-expanded={mobileSubmenu === item.name}
                                        >
                                            <LuChevronDown className={`w-5 h-5 transition-transform duration-300 ${mobileSubmenu === item.name ? 'rotate-180' : ''}`} />
                                        </button>
                                    )}
                                </div>

                                {item.submenu && mobileSubmenu === item.name && (
                                    <div className="pl-4 space-y-3 animate-fade-in">
                                        {item.submenu.map((sub) => (
                                            <Link
                                                key={sub.name}
                                                to={sub.href}
                                                onClick={() => setIsOpen(false)}
                                                className="block text-gray-500 dark:text-gray-400 hover:text-church-primary transition-colors border-l-2 border-gray-100 dark:border-white/10 pl-4"
                                            >
                                                {sub.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

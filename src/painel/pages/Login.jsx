import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, User, Eye, EyeOff, Church, ArrowRight, ShieldCheck, X, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import dbService from '../../services/dbService';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    // Register Form State
    const [regForm, setRegForm] = useState({ name: '', username: '', password: '' });
    const [regError, setRegError] = useState('');
    const [regSuccess, setRegSuccess] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const settings = dbService.getSettings();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        setTimeout(() => {
            const result = login(username, password);
            if (result.success) {
                navigate('/painel');
            } else {
                setError(result.message);
                setIsLoading(false);
            }
        }, 800);
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setRegError('');

        if (regForm.password.length < 3) {
            setRegError('A senha deve ter pelo menos 3 caracteres');
            return;
        }

        const users = dbService.getUsers();
        if (users.find(u => u.username === regForm.username)) {
            setRegError('Este nome de usuário já existe');
            return;
        }

        dbService.upsertUser({
            ...regForm,
            role: 'editor',
            status: 'Ativo'
        });

        setRegSuccess(true);
        setTimeout(() => {
            setShowRegisterModal(false);
            setRegSuccess(false);
            setRegForm({ name: '', username: '', password: '' });
            setUsername(regForm.username); // Pre-fill login
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/10 blur-[120px] rounded-full" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Logo Area */}
                <div className="text-center mb-8">
                    {settings.logoUrl ? (
                        <div className="inline-flex p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 mb-4">
                            <img src={settings.logoUrl} alt={settings.siteName} className="h-12 w-auto object-contain" />
                        </div>
                    ) : (
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-tr from-blue-600 to-indigo-600 shadow-xl shadow-blue-600/20 mb-4">
                            <Church className="text-white w-8 h-8" />
                        </div>
                    )}
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">{settings.siteName} Dashboard</h1>
                    <p className="text-slate-400 mt-2">Acesse o sistema administrativo</p>
                </div>

                {/* Login Card */}
                <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm text-center"
                            >
                                {error}
                            </motion.div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-300 flex items-center gap-2 ml-1">
                                <User size={14} className="text-blue-500" />
                                Usuário
                            </label>
                            <div className="relative group">
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Digite seu usuário"
                                    className="w-full px-4 py-3.5 bg-slate-800/50 border border-white/5 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-white placeholder:text-slate-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-300 flex items-center gap-2 ml-1">
                                <Lock size={14} className="text-blue-500" />
                                Senha
                            </label>
                            <div className="relative group">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3.5 bg-slate-800/50 border border-white/5 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-white placeholder:text-slate-500"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3.5 text-slate-500 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm px-1">
                            <label className="flex items-center gap-2 text-slate-400 cursor-pointer hover:text-white transition-colors">
                                <input type="checkbox" className="rounded border-white/10 bg-slate-800 text-blue-600 focus:ring-blue-500/50" />
                                Lembrar-me
                            </label>
                            <button
                                type="button"
                                onClick={() => setShowRegisterModal(true)}
                                className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                            >
                                Criar conta
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-linear-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-gray-900 font-bold py-4 rounded-xl shadow-xl shadow-yellow-600/30 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 group border-2 border-yellow-300"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span>Entrar no Painel</span>
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-2 text-slate-500 text-xs">
                        <ShieldCheck size={14} />
                        Acesso Restrito e Monitorado
                    </div>
                </div>

                {/* Return Link */}
                <div className="text-center mt-6">
                    <button
                        onClick={() => navigate('/')}
                        className="text-slate-400 hover:text-white transition-colors text-sm"
                    >
                        Voltar para o site público
                    </button>
                </div>
            </motion.div>

            {/* Registration Modal */}
            <AnimatePresence>
                {showRegisterModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowRegisterModal(false)}
                            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-slate-900 border border-white/10 w-full max-w-sm rounded-3xl p-8 relative z-10 shadow-2xl"
                        >
                            <button
                                onClick={() => setShowRegisterModal(false)}
                                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-600/20 rounded-lg text-blue-500">
                                    <UserPlus size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white">Cadastrar Usuário</h3>
                            </div>

                            {regSuccess ? (
                                <div className="text-center py-8 space-y-4">
                                    <div className="w-16 h-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <ShieldCheck size={32} />
                                    </div>
                                    <h4 className="text-white font-bold text-lg">Sucesso!</h4>
                                    <p className="text-slate-400 text-sm">Sua conta foi criada. Redirecionando para o login...</p>
                                </div>
                            ) : (
                                <form onSubmit={handleRegister} className="space-y-4">
                                    {regError && (
                                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-xl text-xs text-center">
                                            {regError}
                                        </div>
                                    )}

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-400 ml-1">Seu Nome</label>
                                        <input
                                            type="text"
                                            required
                                            value={regForm.name}
                                            onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-800/50 border border-white/5 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
                                            placeholder="Nome completo"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-400 ml-1">Usuário</label>
                                        <input
                                            type="text"
                                            required
                                            value={regForm.username}
                                            onChange={(e) => setRegForm({ ...regForm, username: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-800/50 border border-white/5 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
                                            placeholder="Ex: joaosilva"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-400 ml-1">Senha</label>
                                        <input
                                            type="password"
                                            required
                                            value={regForm.password}
                                            onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-800/50 border border-white/5 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
                                            placeholder="••••••••"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-linear-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-gray-900 font-bold py-3.5 rounded-xl mt-4 transition-all active:scale-[0.98] shadow-xl shadow-yellow-600/30 border-2 border-yellow-300"
                                    >
                                        Confirmar Cadastro
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Login;

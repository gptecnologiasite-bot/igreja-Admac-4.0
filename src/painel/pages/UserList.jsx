import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LuUserPlus, LuSearch, LuFilter, LuPencil, LuTrash2, LuShield, LuUser, LuEye, LuEyeOff, LuCircleX } from 'react-icons/lu';
import dbService from '../../services/dbService';
import StatusToggle from '../../components/StatusToggle';

const UserList = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [visiblePasswords, setVisiblePasswords] = useState({});

    const togglePasswordVisibility = (id) => {
        setVisiblePasswords(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    useEffect(() => {
        setUsers(dbService.getUsers());
    }, []);

    const filteredUsers = users.filter(user =>
        (user.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.username || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.role || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id) => {
        if (id === 1) {
            alert('O administrador principal não pode ser excluído.');
            return;
        }
        if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
            const updated = dbService.deleteUser(id);
            setUsers(updated);
        }
    };

    const toggleUserStatus = (id) => {
        const user = dbService.getUserById(id);
        if (user) {
            const updated = dbService.upsertUser({
                ...user,
                status: user.status === 'Ativo' ? 'Inativo' : 'Ativo'
            });
            setUsers(updated);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Gerenciar Usuários</h1>
                    <p className="text-slate-500 dark:text-slate-400">Controle o acesso ao painel administrativo</p>
                </div>
                <Link
                    to="/painel/usuarios/novo"
                    className="flex items-center justify-center gap-2 bg-linear-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-gray-900 font-bold px-6 py-3 rounded-full transition-all shadow-xl shadow-yellow-600/30 border-2 border-yellow-300 hover:scale-105"
                >
                    <LuUserPlus size={20} />
                    <span>Novo Usuário</span>
                </Link>
            </div>

            {/* Filters and Search */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:w-96">
                    <LuSearch className="absolute left-3 top-2.5 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por nome, usuário ou cargo..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-10 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm('')}
                            className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        >
                            <LuCircleX size={18} />
                        </button>
                    )}
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                    <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors">
                        <LuFilter size={18} />
                        <span>Filtros</span>
                    </button>
                </div>
            </div>

            {/* User Table */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                                <th className="p-4 text-sm font-semibold text-slate-700 dark:text-slate-200">Usuário</th>
                                <th className="p-4 text-sm font-semibold text-slate-700 dark:text-slate-200">Senha</th>
                                <th className="p-4 text-sm font-semibold text-slate-700 dark:text-slate-200">Status</th>
                                <th className="p-4 text-sm font-semibold text-slate-700 dark:text-slate-200">Cargo</th>
                                <th className="p-4 text-sm font-semibold text-slate-700 dark:text-slate-200">Último Acesso</th>
                                <th className="p-4 text-sm font-semibold text-slate-700 dark:text-slate-200 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 overflow-hidden border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                                                {user.photo ? (
                                                    <img
                                                        src={user.photo}
                                                        alt={user.name}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = 'https://placehold.co/40x40?text=?';
                                                        }}
                                                    />
                                                ) : (
                                                    <LuUser size={20} />
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-medium text-slate-900 dark:text-slate-100">{user.name}</div>
                                                <div className="text-xs text-slate-500 underline">@{user.username}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                            <span className="font-mono text-sm min-w-[80px]">
                                                {visiblePasswords[user.id] ? user.password : '••••••••'}
                                            </span>
                                            <button
                                                onClick={() => togglePasswordVisibility(user.id)}
                                                className="p-1 hover:text-emerald-500 transition-colors"
                                                title={visiblePasswords[user.id] ? 'Ocultar' : 'Mostrar'}
                                            >
                                                {visiblePasswords[user.id] ? <LuEyeOff size={14} /> : <LuEye size={14} />}
                                            </button>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <StatusToggle
                                                status={user.status}
                                                onToggle={() => toggleUserStatus(user.id)}
                                            />
                                            <span className={`text-xs font-semibold uppercase tracking-wider ${user.status === 'Ativo' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'
                                                }`}>
                                                {user.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-1.5 text-sm text-slate-700 dark:text-slate-300">
                                            <LuShield size={14} className="text-emerald-500" />
                                            {user.role === 'admin' ? 'Administrador' : 'Editor'}
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-slate-600 dark:text-slate-400">
                                        {user.lastLogin}
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => navigate(`/painel/usuarios/editar/${user.id}`)}
                                                className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-colors"
                                                title="Editar"
                                            >
                                                <LuPencil size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                                title="Excluir"
                                            >
                                                <LuTrash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredUsers.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="p-12 text-center">
                                        <div className="flex flex-col items-center gap-2 text-slate-400">
                                            <LuSearch size={40} className="mb-2 opacity-20" />
                                            <p className="font-medium text-slate-500 dark:text-slate-400">Nenhum usuário encontrado</p>
                                            <p className="text-sm">Tente ajustar sua busca ou limpar os filtros.</p>
                                            {searchTerm && (
                                                <button
                                                    onClick={() => setSearchTerm('')}
                                                    className="mt-4 text-emerald-500 hover:underline text-sm font-medium"
                                                >
                                                    Limpar busca
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserList;

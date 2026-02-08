import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Edit, Trash2, Eye, CheckCircle, XCircle } from 'lucide-react';
import dbService from '../../services/dbService';
import StatusToggle from '../../components/StatusToggle';

const PageList = () => {
    const navigate = useNavigate();
    const [pages, setPages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setPages(dbService.getPages());
    }, []);

    const filteredPages = pages.filter(page =>
        page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        page.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id) => {
        if (window.confirm('Tem certeza que deseja excluir esta página?')) {
            const updated = dbService.deletePage(id);
            setPages(updated);
        }
    };

    const toggleStatus = (id) => {
        const page = dbService.getPageById(id);
        if (page) {
            const updated = dbService.upsertPage({
                ...page,
                status: page.status === 'Ativo' ? 'Inativo' : 'Ativo'
            });
            setPages(updated);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Gerenciar Páginas</h1>
                    <p className="text-slate-500 dark:text-slate-400">Crie, edite e gerencie as páginas do site</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            if (window.confirm('ATENÇÃO: Isso excluirá todas as alterações e restaurará as páginas originais. Deseja continuar?')) {
                                const defaults = dbService.resetToDefaults();
                                setPages(defaults);
                                alert('Banco de dados restaurado com sucesso!');
                            }
                        }}
                        className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-lg transition-colors border border-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200 dark:border-slate-600"
                    >
                        <Trash2 size={20} />
                        <span>Redefinir Tudo</span>
                    </button>
                    <Link
                        to="/painel/paginas/nova"
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-colors shadow-lg shadow-blue-600/20"
                    >
                        <Plus size={20} />
                        <span>Nova Página</span>
                    </Link>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por título ou slug..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-10 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm('')}
                            className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        >
                            <XCircle size={18} />
                        </button>
                    )}
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                    <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors">
                        <Filter size={18} />
                        <span>Filtros</span>
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                                <th className="p-4 text-sm font-semibold text-slate-700 dark:text-slate-200">Título</th>
                                <th className="p-4 text-sm font-semibold text-slate-700 dark:text-slate-200">Status</th>
                                <th className="p-4 text-sm font-semibold text-slate-700 dark:text-slate-200">Visitas</th>
                                <th className="p-4 text-sm font-semibold text-slate-700 dark:text-slate-200">Última Atualização</th>
                                <th className="p-4 text-sm font-semibold text-slate-700 dark:text-slate-200 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            {filteredPages.map((page) => (
                                <tr key={page.id} className="hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors group">
                                    <td className="p-4">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-slate-900 dark:text-slate-100">{page.title}</span>
                                            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">/{page.slug}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <StatusToggle
                                                status={page.status}
                                                onToggle={() => toggleStatus(page.id)}
                                            />
                                            <span className={`text-xs font-semibold uppercase tracking-wider ${page.status === 'Ativo' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'
                                                }`}>
                                                {page.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-slate-700 dark:text-slate-300 text-sm">
                                        {page.visits.toLocaleString()}
                                    </td>
                                    <td className="p-4 text-slate-600 dark:text-slate-400 text-sm">
                                        {new Date(page.lastUpdated).toLocaleDateString('pt-BR')}
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => window.open(page.slug === 'inicio' ? '/?preview=true' : `/${page.slug}?preview=true`, '_blank')}
                                                className={`p-2 rounded-lg transition-colors ${page.status === 'Ativo'
                                                    ? 'text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30'
                                                    : 'text-amber-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/30'
                                                    }`}
                                                title={page.status === 'Ativo' ? "Visualizar no site" : "Visualizar (Modo Preview)"}
                                            >
                                                <Eye size={18} />
                                            </button>
                                            <button
                                                onClick={() => navigate(`/painel/paginas/editar/${page.id}`)}
                                                className="p-2 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"
                                                title="Editar"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(page.id)}
                                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                                title="Excluir"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredPages.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="p-12 text-center">
                                        <div className="flex flex-col items-center gap-2 text-slate-400">
                                            <Search size={40} className="mb-2 opacity-20" />
                                            <p className="font-medium text-slate-500 dark:text-slate-400">Nenhuma página encontrada</p>
                                            <p className="text-sm">Tente ajustar sua busca ou limpar os filtros.</p>
                                            {searchTerm && (
                                                <button
                                                    onClick={() => setSearchTerm('')}
                                                    className="mt-4 text-blue-500 hover:underline text-sm font-medium"
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

export default PageList;

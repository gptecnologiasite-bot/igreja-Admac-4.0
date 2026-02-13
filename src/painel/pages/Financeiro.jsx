import { useState, useEffect, useCallback } from 'react';
import {
    LuPlus,
    LuSearch,
    LuCircleArrowUp,
    LuCircleArrowDown,
    LuDollarSign,
    LuFilter,
    LuDroplets,
    LuZap,
    LuWifi,
    LuHouse,
    LuWrench,
    LuTrash2,
    LuX
} from 'react-icons/lu';
import dbService from '../../services/dbService';

const Financeiro = () => {
    const [transactions, setTransactions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [filterPeriod, setFilterPeriod] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM
    const [categories] = useState(dbService.getCategories());

    // Form State
    const [formData, setFormData] = useState({
        type: 'despesa',
        category: '',
        description: '',
        value: '',
        dueDate: '',
        status: 'pendente'
    });

    const [stats, setStats] = useState({
        toReceive: 0,
        toPay: 0,
        balance: 0,
        overdue: 0
    });

    useEffect(() => {
        loadData();
    }, [loadData]);

    const loadData = useCallback(() => {
        const all = dbService.getTransactions() || [];

        // Validate transactions to prevent crashes
        const validTransactions = all.filter(t => t && typeof t === 'object' && t.dueDate && t.value);

        // Filter by period
        const filtered = validTransactions.filter(t => t.dueDate.startsWith(filterPeriod));

        // Sort by date desc
        filtered.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
        setTransactions(filtered);

        // Calculate Stats
        const calcStats = filtered.reduce((acc, curr) => {
            const val = parseFloat(curr.value) || 0;
            if (curr.type === 'receita') {
                acc.toReceive += val; // In a real app, check status
                acc.balance += val;
            } else {
                acc.toPay += val;
                acc.balance -= val;
            }
            return acc;
        }, { toReceive: 0, toPay: 0, balance: 0, overdue: 0 });

        setStats(calcStats);
    }, [filterPeriod]);

    const handleSave = (e) => {
        e.preventDefault();
        dbService.upsertTransaction(formData);
        setShowModal(false);
        setFormData({
            type: 'despesa',
            category: '',
            description: '',
            value: '',
            dueDate: '',
            status: 'pendente'
        });
        loadData();
    };

    const handleDelete = (id) => {
        if (confirm('Tem certeza que deseja excluir esta transação?')) {
            dbService.deleteTransaction(id);
            loadData();
        }
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'Água': return <LuDroplets size={18} className="text-blue-500" />;
            case 'Energia': return <LuZap size={18} className="text-yellow-500" />;
            case 'Internet': return <LuWifi size={18} className="text-indigo-500" />;
            case 'Aluguel': return <LuHouse size={18} className="text-purple-500" />;
            case 'Manutenção': return <LuWrench size={18} className="text-slate-500" />;
            default: return <LuDollarSign size={18} className="text-slate-400" />;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Financeiro</h1>
                    <p className="text-slate-500 dark:text-slate-400">Gestão completa de receitas e despesas</p>
                </div>
                <div className="flex items-center gap-2">
                    <input
                        type="month"
                        value={filterPeriod}
                        onChange={(e) => setFilterPeriod(e.target.value)}
                        className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm"
                    />
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <LuPlus size={20} />
                        Nova Transação
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Receitas</p>
                            <h3 className="text-2xl font-bold text-green-600 mt-1">R$ {stats.toReceive.toFixed(2)}</h3>
                        </div>
                        <div className="p-3 rounded-lg bg-green-100 text-green-600">
                            <LuCircleArrowUp size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Despesas</p>
                            <h3 className="text-2xl font-bold text-red-600 mt-1">R$ {stats.toPay.toFixed(2)}</h3>
                        </div>
                        <div className="p-3 rounded-lg bg-red-100 text-red-600">
                            <LuCircleArrowDown size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Saldo do Mês</p>
                            <h3 className={`text-2xl font-bold mt-1 ${stats.balance >= 0 ? 'text-blue-600' : 'text-red-500'}`}>
                                R$ {stats.balance.toFixed(2)}
                            </h3>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                            <LuDollarSign size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white">Transações</h3>
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Buscar transação..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                            <LuFilter size={20} />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-900/50">
                                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Data</th>
                                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Categoria</th>
                                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Descrição</th>
                                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Valor</th>
                                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            {transactions.length > 0 ? (
                                transactions.map((t) => (
                                    <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                        <td className="p-4 text-slate-600 dark:text-slate-300 font-medium">
                                            {new Date(t.dueDate).toLocaleDateString('pt-BR')}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                                    {getCategoryIcon(t.category)}
                                                </div>
                                                <span className="text-slate-700 dark:text-slate-200">{t.category}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-slate-600 dark:text-slate-400">
                                            {t.description}
                                        </td>
                                        <td className={`p-4 font-bold ${t.type === 'receita' ? 'text-green-600' : 'text-red-600'}`}>
                                            {t.type === 'despesa' ? '-' : '+'} R$ {parseFloat(t.value).toFixed(2)}
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${t.status === 'pago'
                                                ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                                                : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                }`}>
                                                {t.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleDelete(t.id)}
                                                    className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                                                >
                                                    <LuTrash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-slate-400">
                                        Nenhuma transação encontrada para este período.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Nova Transação</h3>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                                <LuX size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Tipo</label>
                                    <select
                                        value={formData.type}
                                        onChange={e => setFormData({ ...formData, type: e.target.value, category: '' })}
                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 text-sm"
                                    >
                                        <option value="receita">Receita</option>
                                        <option value="despesa">Despesa</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={e => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 text-sm"
                                    >
                                        <option value="pendente">Pendente</option>
                                        <option value="pago">Pago/Recebido</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase">Categoria</label>
                                <select
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 text-sm"
                                    required
                                >
                                    <option value="">Selecione...</option>
                                    {formData.type === 'receita'
                                        ? categories.receitas.map(c => <option key={c} value={c}>{c}</option>)
                                        : categories.despesas.map(c => <option key={c} value={c}>{c}</option>)
                                    }
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase">Descrição</label>
                                <input
                                    type="text"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 text-sm"
                                    placeholder="Ex: Conta de Luz"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Valor (R$)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={formData.value}
                                        onChange={e => setFormData({ ...formData, value: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 text-sm"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Vencimento</label>
                                    <input
                                        type="date"
                                        value={formData.dueDate}
                                        onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 text-sm"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Salvar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Financeiro;

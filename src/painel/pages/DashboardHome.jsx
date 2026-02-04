import React, { useState, useEffect } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts';
import { Users, FileText, Activity, Eye, ArrowUp, ArrowDown } from 'lucide-react';
import { visitData, distributionData } from '../../services/mockData';
import dbService from '../../services/dbService';

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">{value}</h3>
            </div>
            <div className={`p-3 rounded-lg ${color} text-white shadow-lg`}>
                <Icon size={24} />
            </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
            <span className={`flex items-center ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {trend >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                <span className="ml-1 font-medium">{Math.abs(trend)}%</span>
            </span>
            <span className="text-slate-400 ml-2">vs. mês anterior</span>
        </div>
    </div>
);

const DashboardHome = () => {
    const [counts, setCounts] = useState({
        pages: 0,
        activePages: 0,
        visits: 0,
        users: 0
    });
    const [topPages, setTopPages] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            const p = dbService.getPages();
            const u = dbService.getUsers();
            setCounts({
                pages: p.length,
                activePages: p.filter(x => x.status === 'Ativo').length,
                visits: p.reduce((acc, curr) => acc + (curr.visits || 0), 0),
                users: u.length
            });

            // Sort pages by visits and take top 5
            const sorted = [...p].sort((a, b) => (b.visits || 0) - (a.visits || 0)).slice(0, 5);
            setTopPages(sorted);
        };

        fetchData();
        const interval = setInterval(fetchData, 5000); // Atualiza a cada 5 segundos
        return () => clearInterval(interval);
    }, []);
    const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e'];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Dashboard</h1>
                    <p className="text-slate-500 dark:text-slate-400">Visão geral do sistema e métricas</p>
                </div>
                <div className="flex gap-2">
                    <select className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm">
                        <option>Últimos 7 dias</option>
                        <option>Últimos 30 dias</option>
                        <option>Este ano</option>
                    </select>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total de Páginas"
                    value={counts.pages}
                    icon={FileText}
                    color="bg-blue-500"
                    trend={12}
                />
                <StatCard
                    title="Páginas Ativas"
                    value={counts.activePages}
                    icon={Activity}
                    color="bg-green-500"
                    trend={5}
                />
                <StatCard
                    title="Total de Visitas"
                    value={counts.visits.toLocaleString()}
                    icon={Eye}
                    color="bg-purple-500"
                    trend={24}
                />
                <StatCard
                    title="Usuários"
                    value={counts.users}
                    icon={Users}
                    color="bg-indigo-500"
                    trend={0}
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Visitors Chart */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Visitas Mensais</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={visitData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                                <XAxis dataKey="name" stroke="#94a3b8" />
                                <YAxis stroke="#94a3b8" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="visits"
                                    stroke="#6366f1"
                                    strokeWidth={3}
                                    dot={{ r: 4, strokeWidth: 2 }}
                                    activeDot={{ r: 8 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Distribution Chart */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Dispositivos</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={distributionData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {distributionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Top Viewed Pages */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white">Páginas Mais Visitadas</h3>
                    <Eye className="text-slate-400" size={20} />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-900/50">
                                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Página</th>
                                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Visitas</th>
                                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Engajamento</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            {topPages.map((page, index) => (
                                <tr key={page.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
                                                {index + 1}
                                            </div>
                                            <span className="font-medium text-slate-700 dark:text-slate-200">{page.title}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-right">
                                        <span className="text-slate-600 dark:text-slate-400 font-mono">
                                            {(page.visits || 0).toLocaleString()}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${page.status === 'Ativo'
                                            ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                                            : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
                                            }`}>
                                            {page.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <div className="w-24 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-blue-500 rounded-full"
                                                    style={{ width: `${((page.visits || 0) / (topPages[0]?.visits || 1)) * 100}%` }}
                                                />
                                            </div>
                                            <span className="text-[10px] text-slate-400">
                                                {Math.round(((page.visits || 0) / (topPages[0]?.visits || 1)) * 100)}%
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;

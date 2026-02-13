import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden transition-colors">
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                <Topbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

                <main className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600">
                    <div className="max-w-7xl mx-auto w-full">
                        <Outlet />
                    </div>
                </main>

                <div className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 p-2 text-center text-xs text-slate-400 dark:text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Modo Banco Temporário (Salvo no Navegador)
                    </span>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;

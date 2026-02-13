import { LuMenu, LuBell, LuSearch, LuUser } from 'react-icons/lu';
import { useAuth } from '../../context/AuthContext';

const Topbar = ({ onMenuClick }) => {
    const { user } = useAuth();
    return (
        <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 flex items-center justify-between sticky top-0 z-30 transition-colors">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 lg:hidden text-slate-600 dark:text-slate-300"
                >
                    <LuMenu size={24} />
                </button>

                <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-900 rounded-lg w-64">
                    <LuSearch size={18} className="text-slate-400" />
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="bg-transparent border-none outline-none text-sm w-full text-slate-700 dark:text-slate-200"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors">
                    <LuBell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse border border-white dark:border-slate-800"></span>
                </button>

                <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                            {user?.name || 'Admin User'}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                            {user?.role === 'admin' ? 'Administrador' : 'Editor'}
                        </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 overflow-hidden flex items-center justify-center text-white shadow-lg shadow-blue-500/30 border border-white dark:border-slate-700">
                        {user?.photo ? (
                            <img
                                src={user.photo}
                                alt={user.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <LuUser size={20} />
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;

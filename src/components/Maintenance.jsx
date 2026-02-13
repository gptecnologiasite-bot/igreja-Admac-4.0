
import { LuSettings, LuClock, LuArrowLeft } from 'react-icons/lu';
import { Link } from 'react-router-dom';

const Maintenance = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-church-dark flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-8 p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-2xl">
                <div className="relative inline-block">
                    <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
                    <div className="relative p-6 bg-white dark:bg-church-dark rounded-full shadow-lg">
                        <LuSettings className="w-16 h-16 text-blue-600 dark:text-blue-400 animate-[spin_4s_linear_infinite]" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 p-3 bg-white dark:bg-church-dark rounded-full shadow-lg">
                        <LuClock className="w-8 h-8 text-church-accent" />
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-3xl font-bold text-church-primary dark:text-white">
                        Página em Manutenção
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                        Estamos fazendo algumas melhorias nesta página. Por favor, volte em breve!
                    </p>
                </div>

                <div className="pt-4">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-church-primary text-white font-bold hover:bg-church-secondary transition-all shadow-lg hover:scale-105 active:scale-95"
                    >
                        <LuArrowLeft size={20} />
                        Voltar ao Início
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Maintenance;

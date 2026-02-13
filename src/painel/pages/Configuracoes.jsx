import { useState, useEffect } from 'react';
import { LuSave, LuSettings, LuImage as LuImageIcon, LuGlobe } from 'react-icons/lu';
import dbService from '../../services/dbService';

const Configuracoes = () => {
    const [settings, setSettings] = useState({
        siteName: 'ADMAC',
        logoUrl: '',
        primaryColor: '#6366f1'
    });
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        const currentSettings = dbService.getSettings();
        setSettings(currentSettings);
    }, []);

    const handleReset = () => {
        if (window.confirm('ATENÇÃO: Isso apagará todas as suas edições e voltará ao conteúdo original. Deseja continuar?')) {
            dbService.resetToDefaults();
            setSettings(dbService.getSettings());
            setMessage({ type: 'success', text: 'Sistema restaurado aos padrões originais!' });
            setTimeout(() => window.location.reload(), 1500);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage({ type: '', text: '' });

        try {
            dbService.updateSettings(settings);
            setMessage({ type: 'success', text: 'Configurações salvas com sucesso!' });
            // Forçar atualização do logo em outros componentes (via evento customizado ou reload)
            window.dispatchEvent(new Event('settingsUpdated'));
        } catch (error) {
            setMessage({ type: 'error', text: 'Erro ao salvar configurações.' });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600/10 text-blue-600 rounded-lg">
                    <LuSettings size={24} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Configurações Gerais</h1>
                    <p className="text-slate-500 dark:text-slate-400">Gerencie a identidade visual e informações do sistema</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 md:p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {message.text && (
                                <div className={`p-4 rounded-lg text-sm font-medium ${message.type === 'success'
                                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                    : 'bg-red-50 text-red-600 border border-red-100'
                                    }`}>
                                    {message.text}
                                </div>
                            )}

                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                        <LuGlobe size={18} className="text-slate-400" />
                                        Nome da Igreja / Site
                                    </label>
                                    <input
                                        type="text"
                                        value={settings.siteName}
                                        onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                                        placeholder="Ex: ADMAC"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                        <LuImageIcon size={18} className="text-slate-400" />
                                        URL do Logo (Imagem)
                                    </label>
                                    <div className="space-y-1">
                                        <input
                                            type="text"
                                            value={settings.logoUrl}
                                            onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
                                            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                                            placeholder="https://exemplo.com/logo.png"
                                        />
                                        <p className="text-xs text-slate-400">Cole o link da imagem do seu logo. Se deixar vazio, o ícone padrão será usado.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-100 dark:border-slate-700 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition-all font-bold shadow-lg shadow-blue-600/20 active:scale-95 disabled:opacity-50"
                                >
                                    <LuSave size={20} />
                                    <span>{isSaving ? 'Salvando...' : 'Salvar Configurações'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Pré-visualização do Logo</h3>
                        <div className="p-8 bg-slate-900 rounded-xl flex items-center justify-center min-h-[160px] border border-slate-700/50">
                            {settings.logoUrl ? (
                                <img
                                    src={settings.logoUrl}
                                    alt="Preview Logo"
                                    className="max-h-24 max-w-full object-contain"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://placehold.co/200x80/1e293b/ffffff?text=Logo+Invalido';
                                    }}
                                />
                            ) : (
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/20">
                                        <LuSettings className="w-10 h-10 text-white" />
                                    </div>
                                    <span className="text-2xl font-bold text-white tracking-tight">{settings.siteName}</span>
                                </div>
                            )}
                        </div>
                        <p className="mt-4 text-xs text-slate-500 text-center">Assim é como o logo aparecerá nas páginas claras e escuras do sistema.</p>

                        {/* Favicon Preview */}
                        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Preview do Favicon</h4>
                            <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                                <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                                    {settings.logoUrl ? (
                                        <img
                                            src={settings.logoUrl}
                                            alt="Favicon Preview"
                                            className="w-4 h-4 object-contain"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = '/favicon.svg';
                                            }}
                                        />
                                    ) : (
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <circle cx="12" cy="12" r="10" strokeWidth="2" />
                                            <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    )}
                                    <span className="text-xs text-slate-600 dark:text-slate-400">Aba do Navegador</span>
                                </div>
                                <span className="text-xs text-slate-500">← Como aparecerá no navegador</span>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Backup & Dados</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                            Exporte os dados do sistema para segurança ou importe um backup anterior.
                        </p>

                        <div className="space-y-3">
                            <button
                                type="button"
                                onClick={() => {
                                    const data = dbService.backupData();
                                    if (data) {
                                        const blob = new Blob([data], { type: 'application/json' });
                                        const url = URL.createObjectURL(blob);
                                        const a = document.createElement('a');
                                        a.href = url;
                                        a.download = `backup-admac-${new Date().toISOString().split('T')[0]}.json`;
                                        document.body.appendChild(a);
                                        a.click();
                                        document.body.removeChild(a);
                                        URL.revokeObjectURL(url);
                                        setMessage({ type: 'success', text: 'Backup baixado com sucesso!' });
                                    } else {
                                        setMessage({ type: 'error', text: 'Erro ao gerar backup.' });
                                    }
                                }}
                                className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-white px-4 py-3 rounded-xl transition-all font-semibold"
                            >
                                <LuSave size={18} />
                                <span>Fazer Backup (Download)</span>
                            </button>

                            <label className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-500 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 px-4 py-3 rounded-xl transition-all font-semibold cursor-pointer">
                                <LuGlobe size={18} />
                                <span>Importar Dados</span>
                                <input
                                    type="file"
                                    accept=".json"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            if (window.confirm('ATENÇÃO: Importar dados irá substituir TODOS os dados atuais. Deseja continuar?')) {
                                                const reader = new FileReader();
                                                reader.onload = (event) => {
                                                    const result = dbService.restoreData(event.target.result);
                                                    setMessage({
                                                        type: result.success ? 'success' : 'error',
                                                        text: result.message
                                                    });
                                                    if (result.success) {
                                                        setTimeout(() => window.location.reload(), 1500);
                                                    }
                                                };
                                                reader.readAsText(file);
                                            }
                                        }
                                        e.target.value = null; // Reset input
                                    }}
                                />
                            </label>

                            <button
                                type="button"
                                onClick={handleReset}
                                className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-3 rounded-xl transition-all font-semibold border border-red-100"
                            >
                                <LuSettings size={18} className="rotate-90" />
                                <span>Restaurar Dados Originais</span>
                            </button>
                        </div>
                    </div>

                    <div className="bg-linear-to-br from-blue-600 to-indigo-700 rounded-xl p-6 text-white shadow-xl">
                        <h3 className="font-bold mb-2">Dica Pro</h3>
                        <p className="text-sm text-blue-100 leading-relaxed">
                            Para melhores resultados, use uma imagem em formato **PNG com fundo transparente** e altura de aproximadamente 100px.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Configuracoes;

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, User, Lock, Shield, Eye, EyeOff, Camera, Link as LinkIcon } from 'lucide-react';
import dbService from '../../services/dbService';

const UserEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        role: 'editor',
        status: 'Ativo',
        photo: ''
    });

    useEffect(() => {
        if (isEditing) {
            const user = dbService.getUserById(id);
            if (user) {
                setFormData({
                    name: user.name,
                    username: user.username,
                    password: user.password,
                    role: user.role,
                    status: user.status,
                    photo: user.photo || ''
                });
            }
        }
    }, [id, isEditing]);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                alert('A imagem é muito grande. Escolha uma foto com menos de 2MB.');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, photo: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.username || !formData.password) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const updatedUser = {
            ...formData,
            id: isEditing ? parseInt(id) : null
        };

        dbService.upsertUser(updatedUser);

        // Se o usuário editado for o mesmo logado, atualiza a sessão
        const loggedUser = JSON.parse(localStorage.getItem('admac_logged_user'));
        if (loggedUser && parseInt(loggedUser.id) === parseInt(updatedUser.id)) {
            const newSessionData = {
                ...loggedUser,
                name: updatedUser.name,
                username: updatedUser.username,
                role: updatedUser.role,
                photo: updatedUser.photo
            };
            localStorage.setItem('admac_logged_user', JSON.stringify(newSessionData));
            // Recarregar para atualizar o cabeçalho
            window.location.reload();
        } else {
            alert(`Usuário ${isEditing ? 'atualizado' : 'criado'} com sucesso!`);
            navigate('/painel/usuarios');
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/painel/usuarios')}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
                            {isEditing ? 'Editar Usuário' : 'Novo Usuário'}
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400">
                            {isEditing ? `Editando credenciais de ${formData.name}` : 'Cadastre um novo administrador ou editor'}
                        </p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Form Fields */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                <User size={16} className="text-emerald-500" />
                                Nome Completo
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Ex: João Silva"
                                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                    <User size={16} className="text-emerald-500" />
                                    Usuário (Login)
                                </label>
                                <input
                                    type="text"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value.toLowerCase().replace(/ /g, '') })}
                                    placeholder="Ex: joao.silva"
                                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                    <Lock size={16} className="text-emerald-500" />
                                    Senha
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        placeholder="Digite a senha"
                                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white pr-10"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-2.5 text-slate-400 hover:text-emerald-500 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                    <Camera size={16} className="text-emerald-500" />
                                    Foto de Perfil
                                </label>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    {/* Upload Button */}
                                    <div className="relative">
                                        <input
                                            type="file"
                                            id="photo-upload"
                                            accept="image/*"
                                            onChange={handleFileUpload}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor="photo-upload"
                                            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-lg hover:bg-emerald-500 hover:text-white transition-all cursor-pointer font-medium text-sm whitespace-nowrap"
                                        >
                                            <Camera size={18} />
                                            Selecionar Foto
                                        </label>
                                    </div>

                                    {/* URL Input */}
                                    <div className="relative flex-1">
                                        <div className="absolute left-3 top-2.5 text-slate-400">
                                            <LinkIcon size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            value={formData.photo?.startsWith('data:image') ? '' : formData.photo}
                                            onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                                            placeholder="Ou cole o link da foto..."
                                            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white text-sm"
                                        />
                                    </div>
                                </div>
                                <p className="text-xs text-slate-400">Tamanho máximo recomendado: 2MB. Formatos: JPG, PNG, WEBP.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Controls */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 space-y-6">
                        {/* Photo Preview */}
                        <div className="flex flex-col items-center gap-4 py-4 border-b border-slate-100 dark:border-slate-700">
                            <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-900 border-2 border-emerald-500/20 overflow-hidden flex items-center justify-center">
                                {formData.photo ? (
                                    <img
                                        src={formData.photo}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://placehold.co/100x100?text=?';
                                        }}
                                    />
                                ) : (
                                    <User size={40} className="text-slate-400" />
                                )}
                            </div>
                            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Preview do Avatar</span>
                        </div>
                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                <Shield size={16} className="text-emerald-500" />
                                Nível de Acesso
                            </label>
                            <select
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
                            >
                                <option value="admin">Administrador</option>
                                <option value="editor">Editor</option>
                            </select>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-lg shadow-emerald-600/20 active:scale-95"
                            >
                                <Save size={20} />
                                <span>{isEditing ? 'Salvar Alterações' : 'Cadastrar Usuário'}</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/painel/usuarios')}
                                className="w-full px-6 py-3 rounded-lg font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UserEditor;

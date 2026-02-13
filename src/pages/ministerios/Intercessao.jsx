import { useState, useEffect } from 'react';
import { LuShieldCheck, LuUsers, LuQuote, LuMessageCircle, LuPencil, LuCheck, LuFlame, LuCloudRain } from 'react-icons/lu';
import { motion } from 'framer-motion';
import dbService from '../../services/dbService';

const Intercessao = () => {


    // Get page data from central DB
    const [pageData, setPageData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [pastoralMessage, setPastoralMessage] = useState({
        text: "A intercessão é o combustível que mantém a chama da igreja acesa. Nosso ministério é um chamado para estar na brecha, clamando pela nossa nação, pelas famílias e pelo mover do Espírito Santo sobre a nossa comunidade.",
        author: "Ev. Roberto Silva",
        role: "Coordenador de Intercessão"
    });

    useEffect(() => {
        const page = dbService.getPages().find(p => p.slug === 'ministerios/intercessao');
        if (page && page.content) {
            try {
                const content = typeof page.content === 'string' ? JSON.parse(page.content) : page.content;
                if (content.pastoralMessage) {
                    setPastoralMessage(content.pastoralMessage);
                }
            } catch (e) {
                console.error("Error parsing page content", e);
            }
        }
        setPageData(page);
    }, []);

    // Temporary state while editing
    const [tempMessage, setTempMessage] = useState(pastoralMessage);

    const fallBackLeaders = [
        { name: 'Ev. Roberto Silva', role: 'Líder Geral', image: 'https://images.unsplash.com/photo-1540331547168-8b63109225b7?q=80&w=400&h=400&auto=format&fit=crop' },
        { name: 'Maria Helena', role: 'Líder de Sentinelas', image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=400&h=400&auto=format&fit=crop' },
        { name: 'Antônio Santos', role: 'Líder de Vigílias', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&auto=format&fit=crop' },
        { name: 'Lucinha Souza', role: 'Clamor por Saúde', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=400&auto=format&fit=crop' },
    ];

    const fallBackTestimonials = [
        {
            text: "Pedi oração em um momento de doença grave na minha família e creio que as orações desse ministério foram fundamentais para a cura milagrosa que recebemos.",
            author: "Beatriz Oliveira",
            role: "Membro ADMAC"
        },
        {
            text: "As sentinelas de oração são um refrigério. Saber que existem pessoas clamando por nós a todo tempo traz uma paz indescritível.",
            author: "João Mendes",
            role: "Pastor Visitante"
        },
        {
            text: "Vim em busca de libertação e encontrei um grupo que lutou ao meu lado em oração. Hoje sou livre para servir ao Senhor!",
            author: "Carla Ferreira",
            role: "Membro da Igreja"
        }
    ];

    const leaders = pageData?.content?.leaders || fallBackLeaders;
    const testimonials = pageData?.content?.testimonials || fallBackTestimonials;

    const handleSave = () => {
        setPastoralMessage(tempMessage);

        const currentContent = typeof pageData?.content === 'string'
            ? JSON.parse(pageData.content)
            : (pageData?.content || {});

        // Update central DB
        const updatedContent = {
            ...currentContent,
            pastoralMessage: tempMessage,
            leaders: leaders,
            testimonials: testimonials
        };

        dbService.upsertPage({
            ...pageData,
            slug: 'ministerios/intercessao',
            title: 'Intercessão',
            content: updatedContent
        });

        setIsEditing(false);
    };

    const handleCancel = () => {
        setTempMessage(pastoralMessage);
        setIsEditing(false);
    };

    return (
        <div className="pt-24 pb-20 min-h-screen bg-white dark:bg-church-dark transition-colors duration-300">
            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center overflow-hidden mb-20">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-linear-to-r from-church-dark to-transparent z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1445023086979-7244a12345a8?q=80&w=2000&auto=format&fit=crop"
                        alt="Intercessão Admac"
                        className="w-full h-full object-cover opacity-60 dark:opacity-40"
                    />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="max-w-3xl"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-blue-600/20 backdrop-blur-md rounded-xl border border-white/10">
                                <LuShieldCheck className="w-8 h-8 text-blue-400" />
                            </div>
                            <span className="text-blue-400 font-bold text-xs tracking-widest uppercase">Sentinelas de Clamor</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-tight uppercase">
                            Guerreiros de <span className="text-blue-400">Oração</span>
                        </h1>
                        <p className="text-xl text-gray-200 mb-8 italic font-medium border-l-4 border-blue-400 pl-6">
                            &quot;A oração de um justo é poderosa e eficaz.&quot;
                            <span className="block not-italic text-sm font-bold text-blue-400 mt-2 text-right">Tiago 5:16</span>
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl leading-relaxed mb-16 font-medium">
                        O motor da nossa igreja. O ministério de intercessão é responsável por sustentar a obra de Deus através da oração, clamando pelas famílias, pela cidade e pelas nações.
                    </p>

                    {/* Leaders Section - Standardized "Nossa Equipe" */}
                    <section className="mb-32">
                        <div className="flex flex-col items-center mb-16">
                            <div className="p-3 bg-blue-600/10 rounded-2xl text-blue-400 mb-4">
                                <LuUsers size={32} />
                            </div>
                            <h2 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Nossa Equipe</h2>
                            <div className="w-16 h-1.5 bg-blue-500 rounded-full mt-4"></div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-12 max-w-6xl mx-auto">
                            {leaders.map((leader, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group text-center w-full sm:w-[280px]"
                                >
                                    <div className="relative mb-6 mx-auto w-48 h-48">
                                        {/* Decorative Glow */}
                                        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl group-hover:bg-blue-500/40 transition-colors duration-500"></div>

                                        {/* Circle Frame */}
                                        <div className="relative w-full h-full rounded-full border-4 border-white dark:border-slate-800 overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3">
                                            <img
                                                src={leader.image}
                                                alt={leader.name}
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                            />
                                        </div>
                                    </div>
                                    <h4 className="text-2xl font-black text-gray-900 dark:text-white mb-1 group-hover:text-blue-500 transition-colors">
                                        {leader.name}
                                    </h4>
                                    <p className="text-blue-500 dark:text-blue-400 font-black text-xs tracking-widest uppercase">
                                        {leader.role}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="p-10 rounded-[2.5rem] bg-blue-700 text-white space-y-4 shadow-xl">
                            <LuFlame className="w-12 h-12 text-blue-300" />
                            <h2 className="text-3xl font-bold">Vigílias e Orações</h2>
                            <p className="text-white/80 leading-relaxed text-lg">
                                Mantemos uma agenda constante de clamor e busca, pois acreditamos que nada acontece no Reino sem o poder da oração persistente.
                            </p>
                        </div>
                        <div className="p-10 rounded-[2.5rem] border-2 border-dashed border-gray-200 dark:border-white/10 flex flex-col justify-center text-center space-y-4">
                            <LuCloudRain className="w-12 h-12 text-blue-600 mx-auto" />
                            <h2 className="text-3xl font-bold text-church-primary dark:text-white tracking-tight">Nosso Alvo</h2>
                            <p className="text-gray-500 dark:text-gray-400 text-lg italic">
                                &quot;A oração de um justo é poderosa e eficaz.&quot; — Tiago 5:16. Cremos no poder transformador do clamor do justo.
                            </p>
                        </div>
                    </div>

                    {/* Palavra Pastoral Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-20 p-8 md:p-12 rounded-4xl bg-linear-to-br from-[#1a1c23] to-[#252733] border border-white/5 relative overflow-hidden group shadow-2xl"
                    >
                        <div className="absolute top-0 right-0 p-12 opacity-5">
                            <LuMessageCircle className="w-64 h-64 text-white" />
                        </div>

                        {/* Edit Button */}
                        <button
                            onClick={() => !isEditing && setIsEditing(true)}
                            className={`absolute top-6 right-6 z-20 flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-white border border-blue-600/40 transition-all duration-300 ${isEditing ? 'hidden' : 'flex'}`}
                        >
                            <LuPencil size={18} />
                            <span className="text-sm font-bold uppercase tracking-wider">Editar Chamado</span>
                        </button>

                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                <LuMessageCircle className="text-blue-500" />
                                Visão da Intercessão
                            </h2>

                            {isEditing ? (
                                <div className="space-y-6 mb-8 bg-black/30 p-6 rounded-3xl border border-blue-500/30 animate-in fade-in zoom-in duration-300">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-blue-500 uppercase tracking-widest ml-1">Mensagem de Clamor</label>
                                        <textarea
                                            value={tempMessage.text}
                                            onChange={(e) => setTempMessage({ ...tempMessage, text: e.target.value })}
                                            className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none h-48 text-lg leading-relaxed"
                                            placeholder="Escreva a visão para a intercessão..."
                                            autoFocus
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-blue-500 uppercase tracking-widest ml-1">Autoria</label>
                                            <input
                                                type="text"
                                                value={tempMessage.author}
                                                onChange={(e) => setTempMessage({ ...tempMessage, author: e.target.value })}
                                                className="w-full bg-white/5 border-2 border-white/10 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                                                placeholder="Nome do Líder"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-blue-500 uppercase tracking-widest ml-1">Cargo</label>
                                            <input
                                                type="text"
                                                value={tempMessage.role}
                                                onChange={(e) => setTempMessage({ ...tempMessage, role: e.target.value })}
                                                className="w-full bg-white/5 border-2 border-white/10 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                                                placeholder="Função"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-4 justify-end pt-4 border-t border-white/5">
                                        <button
                                            onClick={handleCancel}
                                            className="px-6 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all font-medium"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-xl shadow-blue-600/20 hover:scale-105 active:scale-95"
                                        >
                                            <LuCheck size={20} />
                                            Publicar Agora
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <blockquote className="text-xl md:text-2xl text-gray-300 leading-relaxed italic border-l-4 border-blue-500 pl-6 mb-8 min-h-[100px] whitespace-pre-wrap">
                                    &quot;{pastoralMessage.text}&quot;
                                </blockquote>
                            )}

                            <div className="flex items-center gap-4">
                                <img
                                    src="https://images.unsplash.com/photo-1540331547168-8b63109225b7?q=80&w=100&h=100&auto=format&fit=crop"
                                    alt="Líder"
                                    className="w-12 h-12 rounded-full ring-2 ring-blue-500"
                                />
                                <div>
                                    <p className="text-white font-bold">{pastoralMessage.author}</p>
                                    <p className="text-blue-500 text-sm">{pastoralMessage.role}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Testimonials Section */}
                    <div className="mt-20">
                        <h2 className="text-3xl font-bold text-center text-church-primary dark:text-white mb-12">
                            Respostas de Oração
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {testimonials.map((testimony, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-8 rounded-4xl bg-white dark:bg-[#1a1c23] shadow-lg border border-gray-100 dark:border-white/5 relative"
                                >
                                    <LuQuote className="w-10 h-10 text-blue-600/20 mb-4 absolute top-8 right-8" />
                                    <p className="text-gray-600 dark:text-gray-300 italic mb-6 relative z-10">
                                        &quot;{testimony.text}&quot;
                                    </p>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-church-primary dark:text-white">{testimony.author}</span>
                                        <span className="text-sm text-blue-600">{testimony.role}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Intercessao;

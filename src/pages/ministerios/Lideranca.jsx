import { useState, useEffect } from 'react';
import { LuUsers, LuShield, LuStar, LuQuote, LuMessageCircle, LuPencil, LuCheck } from 'react-icons/lu';
import { motion } from 'framer-motion';
import dbService from '../../services/dbService';

const Lideranca = () => {


    // Get page data from central DB
    const [page, setPage] = useState(null);
    const [content, setContent] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [pastoralMessage, setPastoralMessage] = useState({
        text: "Nossa liderança não é sobre posição, é sobre serviço. Cada líder nesta igreja está comprometido em servir você e sua família, orando e intercedendo para que o Reino de Deus flua através de nós.",
        author: "Pr. João Silva",
        role: "Pastor Presidente"
    });

    const loadContent = () => {
        const pageData = dbService.getPages().find(p => p.slug === 'ministerios/lideranca');
        if (pageData) {
            setPage(pageData);
            try {
                const parsedContent = typeof pageData.content === 'string' ? JSON.parse(pageData.content) : (pageData.content || {});
                setContent(parsedContent);
                if (parsedContent.pastoralMessage) {
                    setPastoralMessage(parsedContent.pastoralMessage);
                    setTempMessage(parsedContent.pastoralMessage);
                }
            } catch (e) {
                console.error("Error parsing page content", e);
                setContent({});
            }
        }
    };

    useEffect(() => {
        loadContent();
        window.addEventListener('contentUpdated', loadContent);
        return () => window.removeEventListener('contentUpdated', loadContent);
    }, []);

    // Temporary state while editing
    const [tempMessage, setTempMessage] = useState(pastoralMessage);

    const fallBackLeaders = [
        { name: 'Pr. João Silva', role: 'Pastor Presidente', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&auto=format&fit=crop' },
        { name: 'Pra. Maria Silva', role: 'Pastora Vice-Presidente', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=400&auto=format&fit=crop' },
        { name: 'Pr. Carlos Oliveira', role: 'Pastor Auxiliar', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=400&auto=format&fit=crop' },
        { name: 'Ev. Ricardo Santos', role: 'Líder de Jovens', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&h=400&auto=format&fit=crop' },
        { name: 'Diác. André Souza', role: 'Líder de Missões', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&h=400&auto=format&fit=crop' },
        { name: 'Pra. Ana Oliveira', role: 'Líder de Mulheres', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&h=400&auto=format&fit=crop' },
    ];

    const fallBackTestimonials = [
        {
            text: "A liderança desta igreja tem sido um exemplo de integridade e amor. Sinto-me cuidado e pastoreado de verdade.",
            author: "Carlos Mendes",
            role: "Membro há 5 anos"
        },
        {
            text: "Agradeço a Deus pela vida dos nossos pastores. Palavras de sabedoria que têm transformado minha família.",
            author: "Ana Clara",
            role: "Líder do Ministério Infantil"
        },
        {
            text: "Ver a dedicação dos obreiros em cada culto me inspira a servir mais ao Senhor. Uma igreja viva!",
            author: "Roberto Souza",
            role: "Membro há 2 anos"
        }
    ];

    const leaders = Array.isArray(content.leaders) ? content.leaders : fallBackLeaders;
    const testimonials = Array.isArray(content.testimonials) ? content.testimonials : fallBackTestimonials;

    const handleSave = () => {
        setPastoralMessage(tempMessage);

        // Update central DB
        const updatedContent = {
            ...content,
            pastoralMessage: tempMessage,
            leaders: leaders,
            testimonials: testimonials
        };

        dbService.upsertPage({
            ...page,
            slug: 'ministerios/lideranca',
            title: page?.title || 'Liderança',
            content: updatedContent
        });

        setIsEditing(false);
    };

    const obreiros = content.obreiros || {
        title: "Corpo de Obreiros",
        text: "Além do ministério pastoral, contamos com uma equipe dedicada de diáconos, presbíteros e evangelistas que auxiliam no andamento da obra."
    };

    const chamado = content.chamado || {
        title: "Nosso Chamado",
        text: "Apascentai o rebanho de Deus, que está entre vós, tendo cuidado dele... de boa vontade.",
        reference: "1 Pedro 5:2"
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
                        src="https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=2000&auto=format&fit=crop"
                        alt="Liderança Admac"
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
                            <div className="p-3 bg-church-primary/20 backdrop-blur-md rounded-xl border border-white/10">
                                <LuShield className="w-8 h-8 text-church-accent" />
                            </div>
                            <span className="text-church-accent font-bold text-xs tracking-widest uppercase">Corpo de Líderes</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-tight uppercase">
                            {page?.title || 'Nossa Liderança'}
                        </h1>
                        <p className="text-xl text-gray-200 mb-8 italic font-medium border-l-4 border-church-primary pl-6">
                            &quot;Apascentai o rebanho de Deus, que está entre vós, tendo cuidado dele... de boa vontade.&quot;
                            <span className="block not-italic text-sm font-bold text-church-primary mt-2">1 Pedro 5:2</span>
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
                        Na ADMAC, cremos que a liderança é um chamado sagrado de serviço. Conheça os homens e mulheres que dedicam suas vidas para apascentar e guiar nossa comunidade com temor e amor ao Senhor.
                    </p>

                    {/* Leaders Section - Standardized "Nossa Equipe" */}
                    <section className="mb-32">
                        <div className="flex flex-col items-center mb-16">
                            <div className="p-3 bg-church-primary/10 rounded-2xl text-church-primary mb-4">
                                <LuUsers size={32} />
                            </div>
                            <h2 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Nossa Equipe</h2>
                            <div className="w-16 h-1.5 bg-church-primary rounded-full mt-4"></div>
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
                                        <div className="absolute inset-0 bg-church-primary/20 rounded-full blur-2xl group-hover:bg-church-primary/40 transition-colors duration-500"></div>

                                        {/* Circle Frame */}
                                        <div className="relative w-full h-full rounded-full border-4 border-white dark:border-slate-800 overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3">
                                            <img
                                                src={leader.image}
                                                alt={leader.name}
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = 'https://placehold.co/400x400/1a365d/ffffff?text=' + encodeURIComponent(leader.name);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <h4 className="text-2xl font-black text-gray-900 dark:text-white mb-1 group-hover:text-church-primary transition-colors">
                                        {leader.name}
                                    </h4>
                                    <p className="text-church-primary dark:text-church-accent font-black text-xs tracking-widest uppercase">
                                        {leader.role}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="p-10 rounded-3xl bg-church-primary text-white space-y-4 shadow-xl">
                            <LuUsers className="w-12 h-12 text-white/50" />
                            <h2 className="text-3xl font-black">{obreiros.title}</h2>
                            <p className="text-white/80 leading-relaxed text-lg font-medium">
                                {obreiros.text}
                            </p>
                        </div>
                        <div className="p-10 rounded-3xl border-2 border-dashed border-gray-200 dark:border-white/10 flex flex-col justify-center text-center space-y-4">
                            <LuStar className="w-12 h-12 text-church-primary dark:text-church-accent mx-auto" />
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">{chamado.title}</h2>
                            <p className="text-gray-500 dark:text-gray-400 text-lg italic">
                                &quot;{chamado.text}&quot; <br />
                                <span className="font-black not-italic text-church-primary dark:text-church-accent mt-2 block uppercase text-sm tracking-widest">{chamado.reference}</span>
                            </p>
                        </div>
                    </div>

                    {/* Palavra Pastoral Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-20 p-8 md:p-12 rounded-3xl bg-linear-to-br from-gray-50 to-gray-100 dark:from-[#1a1c23] dark:to-[#252733] border border-gray-100 dark:border-white/5 relative overflow-hidden group shadow-xl"
                    >
                        <div className="absolute top-0 right-0 p-12 opacity-5">
                            <LuMessageCircle className="w-64 h-64 text-church-primary dark:text-white" />
                        </div>

                        {/* Edit Button */}
                        <button
                            onClick={() => !isEditing && setIsEditing(true)}
                            className={`absolute top-6 right-6 z-20 items-center gap-2 px-4 py-2 rounded-xl bg-church-primary/10 dark:bg-church-accent/20 hover:bg-church-primary dark:hover:bg-church-accent text-church-primary dark:text-white border border-church-primary/20 dark:border-church-accent/40 transition-all duration-300 ${isEditing ? 'hidden' : 'flex'}`}
                        >
                            <LuPencil size={18} />
                            <span className="text-sm font-bold uppercase tracking-wider">Editar Mensagem</span>
                        </button>

                        <div className="relative z-10">
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                                <LuMessageCircle className="text-church-primary dark:text-church-accent" />
                                Palavra Pastoral
                            </h2>

                            {isEditing ? (
                                <div className="space-y-6 mb-8 bg-white/50 dark:bg-black/30 p-6 rounded-3xl border border-church-primary/30 dark:border-church-accent/30 animate-in fade-in zoom-in duration-300">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-church-primary dark:text-church-accent uppercase tracking-widest ml-1">Mensagem do Pastor</label>
                                        <textarea
                                            value={tempMessage.text}
                                            onChange={(e) => setTempMessage({ ...tempMessage, text: e.target.value })}
                                            className="w-full bg-white dark:bg-white/5 border-2 border-gray-100 dark:border-white/10 rounded-2xl p-4 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-church-primary dark:focus:border-church-accent focus:ring-1 focus:ring-church-primary dark:focus:ring-church-accent transition-all resize-none h-48 text-lg leading-relaxed"
                                            placeholder="Escreva aqui a mensagem para a igreja..."
                                            autoFocus
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-church-primary dark:text-church-accent uppercase tracking-widest ml-1">Nome</label>
                                            <input
                                                type="text"
                                                value={tempMessage.author}
                                                onChange={(e) => setTempMessage({ ...tempMessage, author: e.target.value })}
                                                className="w-full bg-white dark:bg-white/5 border-2 border-gray-100 dark:border-white/10 rounded-xl p-3 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-church-primary dark:focus:border-church-accent"
                                                placeholder="Ex: Pr. João Silva"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-church-primary dark:text-church-accent uppercase tracking-widest ml-1">Cargo/Função</label>
                                            <input
                                                type="text"
                                                value={tempMessage.role}
                                                onChange={(e) => setTempMessage({ ...tempMessage, role: e.target.value })}
                                                className="w-full bg-white dark:bg-white/5 border-2 border-gray-100 dark:border-white/10 rounded-xl p-3 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-church-primary dark:focus:border-church-accent"
                                                placeholder="Ex: Pastor Presidente"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-4 justify-end pt-4 border-t border-gray-100 dark:border-white/5">
                                        <button
                                            onClick={handleCancel}
                                            className="px-6 py-2.5 rounded-xl text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-all font-medium"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-church-primary dark:bg-church-accent hover:opacity-90 text-white font-bold transition-all shadow-xl shadow-church-primary/20 dark:shadow-church-accent/20 hover:scale-105 active:scale-95"
                                        >
                                            <LuCheck size={20} />
                                            Publicar Agora
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <blockquote className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed italic border-l-4 border-church-primary dark:border-church-accent pl-6 mb-8 min-h-[100px] whitespace-pre-wrap font-medium">
                                    &quot;{pastoralMessage.text}&quot;
                                </blockquote>
                            )}

                            <div className="flex items-center gap-4">
                                <img
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&auto=format&fit=crop"
                                    alt="Pastor Presidente"
                                    className="w-12 h-12 rounded-full ring-2 ring-church-primary dark:ring-church-accent shadow-lg"
                                />
                                <div>
                                    <p className="text-gray-900 dark:text-white font-black">{pastoralMessage.author}</p>
                                    <p className="text-church-primary dark:text-church-accent text-sm font-bold uppercase tracking-wider">{pastoralMessage.role}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Testimonials Section */}
                    <div className="mt-20">
                        <div className="flex flex-col items-center mb-12">
                            <h2 className="text-3xl font-black text-center text-gray-900 dark:text-white">
                                O Que Dizem Nossos Membros
                            </h2>
                            <div className="w-12 h-1.5 bg-church-primary rounded-full mt-4"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {testimonials.map((testimony, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-8 rounded-3xl bg-gray-50 dark:bg-[#1a1c23] shadow-lg border border-gray-100 dark:border-white/5 relative group hover:bg-white dark:hover:bg-slate-900 transition-all duration-300"
                                >
                                    <LuQuote className="w-10 h-10 text-church-primary/10 dark:text-church-accent/10 mb-4 absolute top-8 right-8 group-hover:text-church-primary/20 transition-colors" />
                                    <p className="text-gray-600 dark:text-gray-300 italic mb-6 relative z-10 font-medium">
                                        &quot;{testimony.text}&quot;
                                    </p>
                                    <div className="flex flex-col">
                                        <span className="font-black text-gray-900 dark:text-white">{testimony.author}</span>
                                        <span className="text-sm text-church-primary dark:text-church-accent font-bold uppercase tracking-widest text-[10px]">{testimony.role}</span>
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

export default Lideranca;

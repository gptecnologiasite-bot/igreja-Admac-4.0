import { useRef, useState, useEffect } from 'react';
import { Users, Shield, Star, ChevronLeft, ChevronRight, Quote, MessageCircle, Edit2, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import dbService from '../../services/dbService';

const Lideranca = () => {
    const carouselRef = useRef(null);

    // Get page data from central DB
    const [pageData, setPageData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [pastoralMessage, setPastoralMessage] = useState({
        text: "Nossa liderança não é sobre posição, é sobre serviço. Cada líder nesta igreja está comprometido em servir você e sua família, orando e intercedendo para que o Reino de Deus flua através de nós.",
        author: "Pr. João Silva",
        role: "Pastor Presidente"
    });

    useEffect(() => {
        const page = dbService.getPages().find(p => p.slug === 'ministerios/lideranca');
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

    const handleSave = () => {
        setPastoralMessage(tempMessage);

        // Update central DB
        const updatedContent = {
            ...(pageData?.content || {}),
            pastoralMessage: tempMessage
        };

        dbService.upsertPage({
            ...pageData,
            slug: 'ministerios/lideranca',
            title: 'Liderança',
            content: updatedContent
        });

        setIsEditing(false);
    };

    // Use dynamic data or fallback
    const leaders = pageData?.content?.leaders || [
        { name: 'Pr. João Silva', role: 'Pastor Presidente', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&auto=format&fit=crop' },
        { name: 'Pra. Maria Silva', role: 'Pastora Vice-Presidente', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=400&auto=format&fit=crop' },
        { name: 'Pr. Carlos Oliveira', role: 'Pastor Auxiliar', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=400&auto=format&fit=crop' },
        { name: 'Ev. Ricardo Santos', role: 'Líder de Jovens', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&h=400&auto=format&fit=crop' },
        { name: 'Diác. André Souza', role: 'Líder de Missões', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&h=400&auto=format&fit=crop' },
        { name: 'Pra. Ana Oliveira', role: 'Líder de Mulheres', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&h=400&auto=format&fit=crop' },
    ];

    const testimonials = pageData?.content?.testimonials || [
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

    const obreiros = pageData?.content?.obreiros || {
        title: "Corpo de Obreiros",
        text: "Além do ministério pastoral, contamos com uma equipe dedicada de diáconos, presbíteros e evangelistas que auxiliam no andamento da obra."
    };

    const chamado = pageData?.content?.chamado || {
        title: "Nosso Chamado",
        text: "Apascentai o rebanho de Deus, que está entre vós, tendo cuidado dele... de boa vontade.",
        reference: "1 Pedro 5:2"
    };

    const scroll = (direction) => {
        if (carouselRef.current) {
            const { current } = carouselRef;
            const scrollAmount = direction === 'left' ? -340 : 340;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const handleCancel = () => {
        setTempMessage(pastoralMessage);
        setIsEditing(false);
    };

    return (
        <div className="pt-24 pb-16 min-h-screen bg-white dark:bg-church-dark transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-church-primary/10 dark:bg-church-accent/10 rounded-xl">
                            <Shield className="w-8 h-8 text-church-primary dark:text-church-accent" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-church-primary dark:text-white">
                            {pageData?.title || 'Nossa Liderança'}
                        </h1>
                    </div>

                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed mb-16">
                        Conheça os homens e mulheres chamados por Deus para conduzir e cuidar do rebanho da ADMAC com amor, integridade e sabedoria.
                    </p>

                    {/* Carousel Container */}
                    <div className="relative group">
                        {/* Navigation Buttons */}
                        <button
                            onClick={() => scroll('left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-12 z-20 p-3 rounded-full bg-white dark:bg-[#1a1c23] shadow-lg border border-gray-100 dark:border-white/10 text-church-primary dark:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 disabled:opacity-0"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        <button
                            onClick={() => scroll('right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-12 z-20 p-3 rounded-full bg-white dark:bg-[#1a1c23] shadow-lg border border-gray-100 dark:border-white/10 text-church-primary dark:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        <div
                            ref={carouselRef}
                            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-12 -mx-4 px-4 md:-mx-8 md:px-8 scrollbar-hide"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {leaders.map((leader, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="snap-center min-w-[280px] md:min-w-[320px] shrink-0 group/card p-8 rounded-4xl bg-[#1a1c23] border border-white/5 hover:border-church-accent/30 hover:shadow-2xl hover:shadow-church-accent/10 transition-all duration-300 text-center select-none"
                                >
                                    <div className="relative w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-[#252733] group-hover/card:ring-church-accent transition-all duration-300 shadow-xl">
                                        <img
                                            src={leader.image}
                                            alt={leader.name}
                                            className="w-full h-full object-cover pointer-events-none transform group-hover/card:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-3">{leader.name}</h3>
                                    <span className="inline-block px-4 py-1.5 rounded-xl bg-church-accent/10 text-church-accent font-bold text-xs tracking-widest uppercase border border-church-accent/20">
                                        {leader.role}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="p-10 rounded-[2.5rem] bg-church-primary text-white space-y-4">
                            <Users className="w-12 h-12 text-church-accent" />
                            <h2 className="text-3xl font-bold">{obreiros.title}</h2>
                            <p className="text-white/80 leading-relaxed text-lg">
                                {obreiros.text}
                            </p>
                        </div>
                        <div className="p-10 rounded-[2.5rem] border-2 border-dashed border-gray-200 dark:border-white/10 flex flex-col justify-center text-center space-y-4">
                            <Star className="w-12 h-12 text-church-primary dark:text-church-accent mx-auto" />
                            <h2 className="text-3xl font-bold text-church-primary dark:text-white tracking-tight">{chamado.title}</h2>
                            <p className="text-gray-500 dark:text-gray-400 text-lg">
                                &quot;{chamado.text}&quot; <br />
                                <span className="font-bold">{chamado.reference}</span>
                            </p>
                        </div>
                    </div>

                    {/* Palavra Pastoral Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-20 p-8 md:p-12 rounded-4xl bg-linear-to-br from-[#1a1c23] to-[#252733] border border-white/5 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-12 opacity-5">
                            <MessageCircle className="w-64 h-64 text-white" />
                        </div>

                        {/* Edit Button - Always visible for discoverability */}
                        <button
                            onClick={() => !isEditing && setIsEditing(true)}
                            className={`absolute top-6 right-6 z-20 flex items-center gap-2 px-4 py-2 rounded-xl bg-church-accent/20 hover:bg-church-accent text-white border border-church-accent/40 transition-all duration-300 ${isEditing ? 'hidden' : 'flex'}`}
                        >
                            <Edit2 size={18} />
                            <span className="text-sm font-bold uppercase tracking-wider">Editar Mensagem</span>
                        </button>

                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                <MessageCircle className="text-church-accent" />
                                Palavra Pastoral
                            </h2>

                            {isEditing ? (
                                <div className="space-y-6 mb-8 bg-black/30 p-6 rounded-3xl border border-church-accent/30 animate-in fade-in zoom-in duration-300">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-church-accent uppercase tracking-widest ml-1">Mensagem do Pastor</label>
                                        <textarea
                                            value={tempMessage.text}
                                            onChange={(e) => setTempMessage({ ...tempMessage, text: e.target.value })}
                                            className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-church-accent focus:ring-1 focus:ring-church-accent transition-all resize-none h-48 text-lg leading-relaxed"
                                            placeholder="Escreva aqui a mensagem para a igreja..."
                                            autoFocus
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-church-accent uppercase tracking-widest ml-1">Nome</label>
                                            <input
                                                type="text"
                                                value={tempMessage.author}
                                                onChange={(e) => setTempMessage({ ...tempMessage, author: e.target.value })}
                                                className="w-full bg-white/5 border-2 border-white/10 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-church-accent"
                                                placeholder="Ex: Pr. João Silva"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-church-accent uppercase tracking-widest ml-1">Cargo/Função</label>
                                            <input
                                                type="text"
                                                value={tempMessage.role}
                                                onChange={(e) => setTempMessage({ ...tempMessage, role: e.target.value })}
                                                className="w-full bg-white/5 border-2 border-white/10 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-church-accent"
                                                placeholder="Ex: Pastor Presidente"
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
                                            className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-church-accent hover:bg-church-accent/80 text-white font-bold transition-all shadow-xl shadow-church-accent/20 hover:scale-105 active:scale-95"
                                        >
                                            <Check size={20} />
                                            Publicar Agora
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <blockquote className="text-xl md:text-2xl text-gray-300 leading-relaxed italic border-l-4 border-church-accent pl-6 mb-8 min-h-[100px] whitespace-pre-wrap">
                                    &quot;{pastoralMessage.text}&quot;
                                </blockquote>
                            )}

                            <div className="flex items-center gap-4">
                                <img
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&auto=format&fit=crop"
                                    alt="Pastor Presidente"
                                    className="w-12 h-12 rounded-full ring-2 ring-church-accent"
                                />
                                <div>
                                    <p className="text-white font-bold">{pastoralMessage.author}</p>
                                    <p className="text-church-accent text-sm">{pastoralMessage.role}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Testimonials Section */}
                    <div className="mt-20">
                        <h2 className="text-3xl font-bold text-center text-church-primary dark:text-white mb-12">
                            O Que Dizem Nossos Membros
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
                                    <Quote className="w-10 h-10 text-church-accent/20 mb-4 absolute top-8 right-8" />
                                    <p className="text-gray-600 dark:text-gray-300 italic mb-6 relative z-10">
                                        &quot;{testimony.text}&quot;
                                    </p>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-church-primary dark:text-white">{testimony.author}</span>
                                        <span className="text-sm text-church-accent">{testimony.role}</span>
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

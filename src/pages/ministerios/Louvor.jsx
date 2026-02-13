import { useState, useEffect } from 'react';
import { LuMusic, LuUsers, LuStar, LuQuote, LuMessageCircle, LuPencil, LuCheck, LuMic, LuGuitar, LuRadio, LuDisc, LuX, LuExternalLink, LuCopy, LuChevronRight } from 'react-icons/lu';
import { motion, AnimatePresence } from 'framer-motion';
import dbService from '../../services/dbService';

const Louvor = () => {
    // Get page data from central DB
    const [pageData, setPageData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [pastoralMessage, setPastoralMessage] = useState({
        text: "O louvor é a expressão máxima do nosso amor e gratidão ao Criador. Nossa visão é conduzir a igreja a um nível mais profundo de adoração, onde cada instrumento e cada voz sejam ferramentas para manifestar a glória de Deus.",
        author: "Pr. Carlos Oliveira",
        role: "Pastor de Adoração"
    });

    const [raffle, setRaffle] = useState(null);
    const [productPromotion, setProductPromotion] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [testimonials, setTestimonials] = useState([]);
    const [copiedPix, setCopiedPix] = useState(false);

    const handleCopyPix = (pixKey) => {
        navigator.clipboard.writeText(pixKey);
        setCopiedPix(true);
        setTimeout(() => setCopiedPix(false), 2000);
    };

    useEffect(() => {
        const page = dbService.getPages().find(p => p.slug === 'ministerios/louvor');
        if (page && page.content) {
            try {
                const content = typeof page.content === 'string' ? JSON.parse(page.content) : page.content;
                if (content.pastoralMessage) {
                    setPastoralMessage(content.pastoralMessage);
                }
                if (content.raffle) {
                    if (content.raffle.useDemo) {
                        setRaffle({
                            title: "Sorteio da Panela Elétrica (Exemplo)",
                            description: "Exemplo: Participe deste sorteio para ganhar uma incrível panela elétrica. Este é um conteúdo demonstrativo.",
                            image: "https://images.unsplash.com/photo-1546241072-48010ad2862c?q=80&w=800&auto=format&fit=crop",
                            pix: "00.000.000/0001-99",
                            link: "#",
                            useDemo: true
                        });
                    } else if (content.raffle.title || content.raffle.description) {
                        setRaffle(content.raffle);
                    }
                }
                if (content.productPromotion && (content.productPromotion.title || content.productPromotion.description)) {
                    setProductPromotion(content.productPromotion);
                }
                if (content.testimonials) {
                    setTestimonials(content.testimonials);
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
        { name: 'Pr. Carlos Oliveira', role: 'Ministro de Louvor', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=400&auto=format&fit=crop' },
        { name: 'Sandra Santos', role: 'Líder de Backing', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=400&auto=format&fit=crop' },
        { name: 'Ricardo Lima', role: 'Diretor Musical', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&h=400&auto=format&fit=crop' },
        { name: 'Daniel Souza', role: 'Líder de Sonoplastia', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&h=400&auto=format&fit=crop' },
    ];

    const fallBackTestimonials = [
        {
            text: "O louvor da ADMAC me ajuda a focar inteiramente em Deus. É um momento de entrega genuína e profunda.",
            author: "Fabio Mendes",
            role: "Membro da Igreja"
        },
        {
            text: "Excelência técnica e espiritualidade andam juntas nesse ministério. Sinto-me edificado a cada culto.",
            author: "Lucia Ferreira",
            role: "Líder de Pequeno Grupo"
        },
        {
            text: "Minha família foi impactada pelas ministrações. Os cânticos ficam em nossa mente durante toda a semana.",
            author: "Mateus Castro",
            role: "Membro da Igreja"
        }
    ];

    const leaders = pageData?.content?.leaders || fallBackLeaders;

    const handleCancel = () => {
        setTempMessage(pastoralMessage);
        setIsEditing(false);
    };
    const handleSave = () => {
        setPastoralMessage(tempMessage);

        const currentContent = typeof pageData?.content === 'string'
            ? JSON.parse(pageData.content)
            : (pageData?.content || {});

        // Update central DB
        const updatedContent = {
            ...currentContent,
            pastoralMessage: tempMessage,
            raffle: raffle,
            productPromotion: productPromotion,
            leaders: leaders,
            testimonials: testimonials
        };

        dbService.upsertPage({
            ...pageData,
            slug: 'ministerios/louvor',
            title: 'Louvor',
            content: updatedContent
        });

        setIsEditing(false);
    };

    return (
        <div className="pt-24 pb-20 min-h-screen bg-white dark:bg-church-dark transition-colors duration-300">
            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center overflow-hidden mb-20">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-linear-to-r from-church-dark to-transparent z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1514525253361-bee8a187499b?q=80&w=2000&auto=format&fit=crop"
                        alt="Ministério de Louvor Admac"
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
                                <LuMusic className="w-8 h-8 text-church-accent" />
                            </div>
                            <span className="text-church-accent font-bold text-xs tracking-widest uppercase">Adoração e Louvor</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-tight uppercase">
                            Exaltando ao <span className="text-church-accent">Rei</span>
                        </h1>
                        <p className="text-xl text-gray-200 mb-8 italic font-medium border-l-4 border-church-accent pl-6">
                            &quot;Cantai-lhe um cântico novo; tocai bem e com júbilo.&quot;
                            <span className="block not-italic text-sm font-bold text-church-accent mt-2 text-right">Salmos 33:3</span>
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
                        Adorando ao Rei através da música e das artes. Nosso objetivo é conduzir a igreja a um encontro genuíno com a presença de Deus através da adoração congregacional unida à excelência técnica.
                    </p>

                    {/* Leaders Section - Standardized "Nossa Equipe" */}
                    <section className="mb-32">
                        <div className="flex flex-col items-center mb-16">
                            <div className="p-3 bg-church-accent/10 rounded-2xl text-church-accent mb-4">
                                <LuUsers size={32} />
                            </div>
                            <h2 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Nossa Equipe</h2>
                            <div className="w-16 h-1.5 bg-church-accent rounded-full mt-4"></div>
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
                                        <div className="absolute inset-0 bg-church-accent/20 rounded-full blur-2xl group-hover:bg-church-accent/40 transition-colors duration-500"></div>

                                        {/* Circle Frame */}
                                        <div className="relative w-full h-full rounded-full border-4 border-white dark:border-slate-800 overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3">
                                            <img
                                                src={leader.image}
                                                alt={leader.name}
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                            />
                                        </div>
                                    </div>
                                    <h4 className="text-2xl font-black text-gray-900 dark:text-white mb-1 group-hover:text-church-accent transition-colors">
                                        {leader.name}
                                    </h4>
                                    <p className="text-church-accent dark:text-church-accent font-black text-xs tracking-widest uppercase">
                                        {leader.role}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="p-10 rounded-[2.5rem] bg-church-primary text-white space-y-4 shadow-xl">
                            <LuMic className="w-12 h-12 text-church-accent" />
                            <h2 className="text-3xl font-bold">Vossa Excelência</h2>
                            <p className="text-white/80 leading-relaxed text-lg italic">
                                &quot;Cantai-lhe um cântico novo; tocai bem e com júbilo.&quot; — Salmos 33:3. Buscamos sempre a excelência técnica unida à unção espiritual.
                            </p>
                        </div>
                        <div className="p-10 rounded-[2.5rem] border-2 border-dashed border-gray-200 dark:border-white/10 flex flex-col justify-center text-center space-y-4">
                            <LuDisc className="w-12 h-12 text-church-primary dark:text-church-accent mx-auto" />
                            <h2 className="text-3xl font-bold text-church-primary dark:text-white tracking-tight">Vocal & Instrumental</h2>
                            <p className="text-gray-500 dark:text-gray-400 text-lg">
                                Unindo talentos para compor uma única harmonia em adoração ao nosso Rei.
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
                            className={`absolute top-6 right-6 z-20 flex items-center gap-2 px-4 py-2 rounded-xl bg-church-accent/20 hover:bg-church-accent text-white border border-church-accent/40 transition-all duration-300 ${isEditing ? 'hidden' : 'flex'}`}
                        >
                            <LuPencil size={18} />
                            <span className="text-sm font-bold uppercase tracking-wider">Editar Mensagem</span>
                        </button>

                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                <LuMessageCircle className="text-church-accent" />
                                Visão do Ministério
                            </h2>

                            {isEditing ? (
                                <div className="space-y-6 mb-8 bg-black/30 p-6 rounded-3xl border border-church-accent/30 animate-in fade-in zoom-in duration-300">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-church-accent uppercase tracking-widest ml-1">Ementa de Adoração</label>
                                        <textarea
                                            value={tempMessage.text}
                                            onChange={(e) => setTempMessage({ ...tempMessage, text: e.target.value })}
                                            className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-church-accent focus:ring-1 focus:ring-church-accent transition-all resize-none h-48 text-lg leading-relaxed"
                                            placeholder="Escreva a visão para o louvor..."
                                            autoFocus
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-church-accent uppercase tracking-widest ml-1">Autoria</label>
                                            <input
                                                type="text"
                                                value={tempMessage.author}
                                                onChange={(e) => setTempMessage({ ...tempMessage, author: e.target.value })}
                                                className="w-full bg-white/5 border-2 border-white/10 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-church-accent"
                                                placeholder="Nome do Pastor/Líder"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-church-accent uppercase tracking-widest ml-1">Cargo</label>
                                            <input
                                                type="text"
                                                value={tempMessage.role}
                                                onChange={(e) => setTempMessage({ ...tempMessage, role: e.target.value })}
                                                className="w-full bg-white/5 border-2 border-white/10 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-church-accent"
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
                                            className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-church-accent hover:bg-church-accent/80 text-white font-bold transition-all shadow-xl shadow-church-accent/20 hover:scale-105 active:scale-95"
                                        >
                                            <LuCheck size={20} />
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
                                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&h=100&auto=format&fit=crop"
                                    alt="Líder"
                                    className="w-12 h-12 rounded-full ring-2 ring-church-accent"
                                />
                                <div>
                                    <p className="text-white font-bold">{pastoralMessage.author}</p>
                                    <p className="text-church-accent text-sm">{pastoralMessage.role}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Raffle & Products Section */}
                    {(raffle || productPromotion) && (
                        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
                            {raffle && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="p-8 rounded-4xl bg-linear-to-br from-church-accent/10 to-church-accent/5 border border-church-accent/20 relative overflow-hidden group"
                                >
                                    <LuStar className="absolute -right-4 -top-4 w-24 h-24 text-church-accent/10 rotate-12 group-hover:scale-110 transition-transform duration-500" />

                                    {raffle.image && (
                                        <div className="relative h-48 mb-6 rounded-2xl overflow-hidden shadow-lg border border-church-accent/10">
                                            <img
                                                src={raffle.image}
                                                alt={raffle.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                    )}

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-church-accent rounded-lg">
                                                <LuStar className="w-5 h-5 text-white" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-church-primary dark:text-white">Sorteio Especial</h3>
                                        </div>
                                        <h4 className="text-xl font-bold text-church-accent mb-2">{raffle.title}</h4>
                                        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                            {raffle.description}
                                        </p>
                                        {raffle.link && (
                                            <button
                                                onClick={() => setSelectedItem({ ...raffle, type: 'raffle' })}
                                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-church-accent hover:bg-church-accent/80 text-white font-bold transition-all shadow-lg shadow-church-accent/20 hover:scale-105 active:scale-95"
                                            >
                                                Participar Agora
                                                <LuChevronRight size={18} />
                                            </button>
                                        )}
                                        {raffle.pix && (
                                            <button
                                                onClick={() => handleCopyPix(raffle.pix)}
                                                className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-church-accent/10 text-church-accent font-bold hover:bg-church-accent/20 transition-all border border-church-accent/20"
                                            >
                                                {copiedPix ? <LuCheck size={18} /> : <LuCopy size={18} />}
                                                {copiedPix ? 'Chave Pix Copiada!' : 'Copiar Chave Pix'}
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {productPromotion && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="col-span-1 md:col-span-2 overflow-hidden rounded-[2.5rem] bg-white dark:bg-[#1a1c23] border border-gray-100 dark:border-white/5 shadow-2xl flex flex-col md:flex-row group"
                                >
                                    {productPromotion.image && (
                                        <div className="md:w-[40%] min-h-[300px] relative overflow-hidden">
                                            <img
                                                src={productPromotion.image}
                                                alt={productPromotion.title}
                                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>
                                    )}
                                    <div className={`p-8 md:p-12 flex flex-col justify-center ${productPromotion.image ? 'md:w-[60%]' : 'w-full'}`}>
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="p-2.5 bg-church-primary rounded-xl shadow-lg shadow-church-primary/20">
                                                <LuMusic className="w-6 h-6 text-white" />
                                            </div>
                                            <h3 className="text-xl font-bold text-church-primary dark:text-white uppercase tracking-widest">
                                                Destaque do Ministério
                                            </h3>
                                        </div>

                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                                            <h4 className="text-3xl md:text-4xl font-extrabold text-church-primary dark:text-white leading-tight">
                                                {productPromotion.title}
                                            </h4>
                                            {productPromotion.price && (
                                                <div className="shrink-0 px-6 py-2 rounded-full bg-church-primary/10 text-church-primary dark:text-church-accent font-black text-xl border border-church-primary/20">
                                                    {productPromotion.price}
                                                </div>
                                            )}
                                        </div>

                                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                                            {productPromotion.description}
                                        </p>

                                        {productPromotion.link && (
                                            <div className="flex items-center gap-6">
                                                <button
                                                    onClick={() => setSelectedItem({ ...productPromotion, type: 'product' })}
                                                    className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-church-primary text-white font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-xl shadow-church-primary/20"
                                                >
                                                    Confira Agora
                                                    <LuRadio size={20} className="animate-pulse" />
                                                </button>
                                                <div className="hidden sm:block text-right">
                                                    <p className="text-xs text-gray-400 uppercase tracking-tighter font-bold">Lançamento</p>
                                                    <span className="text-sm text-gray-400 font-medium">Exclusivo ADMAC</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    )}

                    {/* Detail Modal */}
                    <AnimatePresence>
                        {selectedItem && (
                            <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                    className="bg-white dark:bg-church-dark w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl relative"
                                >
                                    {/* Close Button */}
                                    <button
                                        onClick={() => setSelectedItem(null)}
                                        className="absolute top-6 right-6 z-10 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-all backdrop-blur-md"
                                    >
                                        <LuX size={24} />
                                    </button>

                                    {/* Modal Content */}
                                    <div className="flex flex-col">
                                        {selectedItem.image && (
                                            <div className="h-48 sm:h-64 relative overflow-hidden bg-gray-900">
                                                <img
                                                    src={selectedItem.image}
                                                    alt={selectedItem.title}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                        )}

                                        <div className="p-8 sm:p-12">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className={`p-2 rounded-lg ${selectedItem.type === 'raffle' ? 'bg-church-accent' : 'bg-church-primary'}`}>
                                                    {selectedItem.type === 'raffle' ? <LuStar className="text-white w-5 h-5" /> : <LuMusic className="text-white w-5 h-5" />}
                                                </div>
                                                <span className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                                                    {selectedItem.type === 'raffle' ? 'Sorteio Especial' : 'Destaque do Ministério'}
                                                </span>
                                            </div>

                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                                <h2 className="text-3xl font-black text-church-primary dark:text-white">
                                                    {selectedItem.title}
                                                </h2>
                                                {selectedItem.price && (
                                                    <span className="px-4 py-1.5 rounded-xl bg-church-primary/10 text-church-primary dark:text-church-accent font-black text-xl">
                                                        {selectedItem.price}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="prose dark:prose-invert max-w-none">
                                                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                                                    {selectedItem.description}
                                                </p>
                                            </div>

                                            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100 dark:border-white/5">
                                                <a
                                                    href={selectedItem.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg text-white transition-all hover:scale-105 active:scale-95 shadow-xl ${selectedItem.type === 'raffle' ? 'bg-church-accent shadow-church-accent/20' : 'bg-church-primary shadow-church-primary/20'}`}
                                                >
                                                    {selectedItem.type === 'raffle' ? 'Participar Agora' : 'Ir para Link'}
                                                    <LuExternalLink size={20} />
                                                </a>
                                                {selectedItem.pix && (
                                                    <button
                                                        onClick={() => handleCopyPix(selectedItem.pix)}
                                                        className="px-8 py-4 rounded-2xl bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-200 font-bold hover:bg-gray-200 dark:hover:bg-white/10 transition-all border border-gray-200 dark:border-white/10 flex items-center gap-2"
                                                    >
                                                        {copiedPix ? <LuCheck size={20} className="text-green-500" /> : <LuCopy size={20} />}
                                                        {copiedPix ? 'Copiado!' : 'Pix'}
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => setSelectedItem(null)}
                                                    className="px-8 py-4 rounded-2xl border-2 border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 font-bold hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
                                                >
                                                    Fechar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>

                    {/* Testimonials Section */}
                    {testimonials && testimonials.length > 0 && (
                        <div className="mt-20">
                            <h2 className="text-3xl font-bold text-center text-church-primary dark:text-white mb-12">
                                Impacto da Adoração
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
                                        <LuQuote className="w-10 h-10 text-church-accent/20 mb-4 absolute top-8 right-8" />
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
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Louvor;

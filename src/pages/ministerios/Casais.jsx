import { useRef, useState, useEffect } from 'react';
import { Heart, Users, Star, ChevronLeft, ChevronRight, Quote, MessageCircle, Edit2, Check, Radio, ExternalLink, X, Gift, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import dbService from '../../services/dbService';

const Casais = () => {
    const carouselRef = useRef(null);

    // Get page data from central DB
    const [pageData, setPageData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [pastoralMessage, setPastoralMessage] = useState({
        text: "O casamento é um projeto de Deus para a felicidade do ser humano e a formação de famílias que glorifiquem o Seu nome. Nosso ministério existe para caminhar ao seu lado nesta jornada de amor, perdão e crescimento mútuo.",
        author: "Pr. João Silva",
        role: "Pastor Presidente"
    });

    const [raffle, setRaffle] = useState(null);
    const [productPromotion, setProductPromotion] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [copiedPix, setCopiedPix] = useState(false);

    const handleCopyPix = (pixKey) => {
        navigator.clipboard.writeText(pixKey);
        setCopiedPix(true);
        setTimeout(() => setCopiedPix(false), 2000);
    };

    useEffect(() => {
        const page = dbService.getPages().find(p => p.slug === 'ministerios/casais');
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
                        setRaffle({
                            ...content.raffle,
                            pix: content.raffle.pix // Maintain user's pix if present
                        });
                    }
                }
                if (content.productPromotion && (content.productPromotion.title || content.productPromotion.description)) {
                    setProductPromotion(content.productPromotion);
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
        { name: 'Pr. João & Pra. Maria', role: 'Coordenação Geral', image: 'https://images.unsplash.com/photo-1516589174184-c68526674fd6?q=80&w=400&h=400&auto=format&fit=crop' },
        { name: 'Carlos & Ana', role: 'Líderes de Recepção', image: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=400&h=400&auto=format&fit=crop' },
        { name: 'Ricardo & Sandra', role: 'Líderes de Eventos', image: 'https://images.unsplash.com/photo-1517841905240-472988bad197?q=80&w=400&h=400&auto=format&fit=crop' },
        { name: 'André & Roberta', role: 'Aconselhamento', image: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=400&h=400&auto=format&fit=crop' },
    ];

    const fallBackTestimonials = [
        {
            text: "Participar do ministério de casais salvou nosso casamento. Encontramos amigos e mentores que nos guiaram no caminho de Deus.",
            author: "Marcos & Fernanda",
            role: "Casados há 12 anos"
        },
        {
            text: "Os retiros são momentos inesquecíveis. É quando paramos tudo para focar apenas no nosso relacionamento e em Deus.",
            author: "Julio & Patrícia",
            role: "Casados há 4 anos"
        },
        {
            text: "Aprender sobre finanças e educação de filhos sob a ótica bíblica transformou nosso lar. Somos muito gratos!",
            author: "Ricardo & Aline",
            role: "Membros da ADMAC"
        }
    ];

    const leaders = pageData?.content?.leaders || fallBackLeaders;
    const testimonials = pageData?.content?.testimonials || fallBackTestimonials;

    const scroll = (direction) => {
        if (carouselRef.current) {
            const { current } = carouselRef;
            const scrollAmount = direction === 'left' ? -340 : 340;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const handleSave = () => {
        setPastoralMessage(tempMessage);

        // Update central DB
        const updatedContent = {
            ...(pageData?.content || {}),
            pastoralMessage: tempMessage,
            raffle: raffle,
            productPromotion: productPromotion,
            leaders: leaders,
            testimonials: testimonials
        };

        dbService.upsertPage({
            ...pageData,
            slug: 'ministerios/casais',
            title: 'Casais',
            content: updatedContent
        });

        setIsEditing(false);
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
                        <div className="p-3 bg-pink-500/10 rounded-xl">
                            <Heart className="w-8 h-8 text-pink-500" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-church-primary dark:text-white">
                            Ministério de Casais
                        </h1>
                    </div>

                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed mb-16">
                        Fortalecendo famílias através de princípios bíblicos, comunhão e apoio mútuo. Acreditamos que casamentos saudáveis constroem uma igreja forte.
                    </p>

                    {/* Carousel Container */}
                    <div className="relative group mb-20">
                        {/* Navigation Buttons */}
                        <button
                            onClick={() => scroll('left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-12 z-20 p-3 rounded-full bg-white dark:bg-[#1a1c23] shadow-lg border border-gray-100 dark:border-white/10 text-church-primary dark:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
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
                                    key={leader.name}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="snap-center min-w-[280px] md:min-w-[320px] shrink-0 group/card p-8 rounded-4xl bg-white dark:bg-[#1a1c23] border border-gray-100 dark:border-white/5 hover:border-pink-500/30 hover:shadow-2xl hover:shadow-pink-500/10 transition-all duration-300 text-center select-none"
                                >
                                    <div className="relative w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-gray-100 dark:ring-[#252733] group-hover/card:ring-pink-500 transition-all duration-300 shadow-xl">
                                        <img
                                            src={leader.image}
                                            alt={leader.name}
                                            className="w-full h-full object-cover pointer-events-none transform group-hover/card:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <h3 className="text-2xl font-bold text-church-primary dark:text-white mb-3">{leader.name}</h3>
                                    <span className="inline-block px-4 py-1.5 rounded-xl bg-pink-500/10 text-pink-500 font-bold text-xs tracking-widest uppercase border border-pink-500/20">
                                        {leader.role}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="p-10 rounded-[2.5rem] bg-pink-600 text-white space-y-4">
                            <Users className="w-12 h-12 text-pink-100" />
                            <h2 className="text-3xl font-bold">Comunhão Familiar</h2>
                            <p className="text-white/80 leading-relaxed text-lg">
                                Realizamos jantares, palestras e retiros exclusivos para casais, criando um ambiente saudável para o crescimento da vida a dois.
                            </p>
                        </div>
                        <div className="p-10 rounded-[2.5rem] border-2 border-dashed border-gray-200 dark:border-white/10 flex flex-col justify-center text-center space-y-4">
                            <Star className="w-12 h-12 text-pink-600 dark:text-pink-400 mx-auto" />
                            <h2 className="text-3xl font-bold text-church-primary dark:text-white tracking-tight">Nosso Propósito</h2>
                            <p className="text-gray-500 dark:text-gray-400 text-lg">
                                &quot;Portanto deixará o homem o seu pai e a sua mãe, e apegar-se-á à sua mulher, e serão ambos uma carne.&quot; <br />
                                <span className="font-bold text-pink-600">Gênesis 2:24</span>
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
                            <MessageCircle className="w-64 h-64 text-white" />
                        </div>

                        {/* Edit Button */}
                        <button
                            onClick={() => !isEditing && setIsEditing(true)}
                            className={`absolute top-6 right-6 z-20 flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-500/20 hover:bg-pink-500 text-white border border-pink-500/40 transition-all duration-300 ${isEditing ? 'hidden' : 'flex'}`}
                        >
                            <Edit2 size={18} />
                            <span className="text-sm font-bold uppercase tracking-wider">Editar Mensagem</span>
                        </button>

                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                <MessageCircle className="text-pink-500" />
                                Mensagem aos Casais
                            </h2>

                            {isEditing ? (
                                <div className="space-y-6 mb-8 bg-black/30 p-6 rounded-3xl border border-pink-500/30 animate-in fade-in zoom-in duration-300">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-pink-500 uppercase tracking-widest ml-1">Mensagem Pastoral</label>
                                        <textarea
                                            value={tempMessage.text}
                                            onChange={(e) => setTempMessage({ ...tempMessage, text: e.target.value })}
                                            className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all resize-none h-48 text-lg leading-relaxed"
                                            placeholder="Escreva a mensagem para os casais..."
                                            autoFocus
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-pink-500 uppercase tracking-widest ml-1">Autoria</label>
                                            <input
                                                type="text"
                                                value={tempMessage.author}
                                                onChange={(e) => setTempMessage({ ...tempMessage, author: e.target.value })}
                                                className="w-full bg-white/5 border-2 border-white/10 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
                                                placeholder="Nome do Pastor/Líder"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-pink-500 uppercase tracking-widest ml-1">Cargo</label>
                                            <input
                                                type="text"
                                                value={tempMessage.role}
                                                onChange={(e) => setTempMessage({ ...tempMessage, role: e.target.value })}
                                                className="w-full bg-white/5 border-2 border-white/10 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
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
                                            className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold transition-all shadow-xl shadow-pink-500/20 hover:scale-105 active:scale-95"
                                        >
                                            <Check size={20} />
                                            Publicar Agora
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <blockquote className="text-xl md:text-2xl text-gray-300 leading-relaxed italic border-l-4 border-pink-500 pl-6 mb-8 min-h-[100px] whitespace-pre-wrap">
                                    &quot;{pastoralMessage.text}&quot;
                                </blockquote>
                            )}

                            <div className="flex items-center gap-4">
                                <img
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&auto=format&fit=crop"
                                    alt="Pastor"
                                    className="w-12 h-12 rounded-full ring-2 ring-pink-500"
                                />
                                <div>
                                    <p className="text-white font-bold">{pastoralMessage.author}</p>
                                    <p className="text-pink-500 text-sm">{pastoralMessage.role}</p>
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
                                    className="p-8 rounded-4xl bg-linear-to-br from-pink-500/10 to-pink-500/5 border border-pink-500/20 relative overflow-hidden group"
                                >
                                    <Star className="absolute -right-4 -top-4 w-24 h-24 text-pink-500/10 rotate-12 group-hover:scale-110 transition-transform duration-500" />

                                    {raffle.image && (
                                        <div className="relative h-48 mb-6 rounded-2xl overflow-hidden shadow-lg border border-pink-500/10">
                                            <img
                                                src={raffle.image}
                                                alt={raffle.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                    )}

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-pink-500 rounded-lg">
                                                <Star className="w-5 h-5 text-white" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-church-primary dark:text-white">Sorteio Especial</h3>
                                        </div>
                                        <h4 className="text-xl font-bold text-pink-500 mb-2">{raffle.title}</h4>
                                        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                            {raffle.description}
                                        </p>
                                        <button
                                            onClick={() => setSelectedItem({ ...raffle, type: 'raffle' })}
                                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold transition-all shadow-lg shadow-pink-500/20 hover:scale-105 active:scale-95"
                                        >
                                            Participar Agora
                                            <ChevronRight size={18} />
                                        </button>
                                        {raffle.pix && (
                                            <button
                                                onClick={() => handleCopyPix(raffle.pix)}
                                                className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-pink-500/10 text-pink-500 font-bold hover:bg-pink-500/20 transition-all border border-pink-500/20"
                                            >
                                                {copiedPix ? <Check size={18} /> : <Copy size={18} />}
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
                                                <Gift className="w-6 h-6 text-white" />
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
                                                <div className="shrink-0 px-6 py-2 rounded-full bg-pink-500/10 text-pink-500 font-black text-xl border border-pink-500/20">
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
                                                    <Radio size={20} className="animate-pulse" />
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
                                        <X size={24} />
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
                                                <div className={`p-2 rounded-lg ${selectedItem.type === 'raffle' ? 'bg-pink-500' : 'bg-church-primary'}`}>
                                                    {selectedItem.type === 'raffle' ? <Star className="text-white w-5 h-5" /> : <Gift className="text-white w-5 h-5" />}
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
                                                    <span className="px-4 py-1.5 rounded-xl bg-pink-500/10 text-pink-500 font-black text-xl">
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
                                                    className={`flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg text-white transition-all hover:scale-105 active:scale-95 shadow-xl ${selectedItem.type === 'raffle' ? 'bg-pink-500 shadow-pink-500/20' : 'bg-church-primary shadow-church-primary/20'}`}
                                                >
                                                    {selectedItem.type === 'raffle' ? 'Participar Agora' : 'Ir para Link'}
                                                    <ExternalLink size={20} />
                                                </a>
                                                {selectedItem.pix && (
                                                    <button
                                                        onClick={() => handleCopyPix(selectedItem.pix)}
                                                        className="px-8 py-4 rounded-2xl bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-200 font-bold hover:bg-gray-200 dark:hover:bg-white/10 transition-all border border-gray-200 dark:border-white/10 flex items-center gap-2"
                                                    >
                                                        {copiedPix ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
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
                    <div className="mt-20">
                        <h2 className="text-3xl font-bold text-center text-church-primary dark:text-white mb-12">
                            Depoimentos de Famílias
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
                                    <Quote className="w-10 h-10 text-pink-500/20 mb-4 absolute top-8 right-8" />
                                    <p className="text-gray-600 dark:text-gray-300 italic mb-6 relative z-10">
                                        &quot;{testimony.text}&quot;
                                    </p>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-church-primary dark:text-white">{testimony.author}</span>
                                        <span className="text-sm text-pink-500">{testimony.role}</span>
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

export default Casais;

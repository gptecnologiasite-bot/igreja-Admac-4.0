import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuBookOpen, LuGraduationCap, LuBookmark, LuAward, LuX, LuCalendar, LuUser, LuBook, LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import dbService from '../../services/dbService';

const EBD = () => {
    const [selectedArticle, setSelectedArticle] = useState(null);
    const carouselRef = useRef(null);

    const [articles, setArticles] = useState([
        {
            id: 1,
            icon: <LuBookOpen className="w-6 h-6" />,
            iconColor: 'bg-indigo-500/10 text-indigo-500',
            title: 'Fundamentos da Fé Cristã',
            excerpt: 'Explorando as doutrinas essenciais que sustentam nossa fé e prática cristã.',
            author: 'Pr. Carlos Mendes',
            date: '26 Jan 2026',
            image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=800',
            content: `
                <h2>Fundamentos da Fé Cristã: Alicerces Inabaláveis</h2>
                
                <p>A fé cristã não é construída sobre areia movediça, mas sobre fundamentos sólidos e eternos. Neste estudo, exploraremos as doutrinas essenciais que sustentam nossa caminhada com Cristo.</p>
                
                <h3>1. A Autoridade das Escrituras</h3>
                <p>A Bíblia é a Palavra inspirada de Deus, inerrante e suficiente para nos guiar em toda verdade. Como afirmou o apóstolo Paulo:</p>
                
                <blockquote>"Toda a Escritura é inspirada por Deus e útil para o ensino, para a repreensão, para a correção e para a instrução na justiça." - 2 Timóteo 3:16</blockquote>
                
                <h3>2. A Trindade</h3>
                <p>Creemos em um único Deus que existe eternamente em três pessoas: Pai, Filho e Espírito Santo. Cada pessoa da Trindade é plenamente Deus, coigual e coeterna.</p>
                
                <ul>
                    <li><strong>Deus Pai:</strong> O Criador soberano de todas as coisas</li>
                    <li><strong>Deus Filho:</strong> Jesus Cristo, encarnado para nossa salvação</li>
                    <li><strong>Deus Espírito Santo:</strong> Nosso consolador e guia</li>
                </ul>
                
                <h3>3. A Salvação pela Graça</h3>
                <p>Não somos salvos por obras, mas pela graça de Deus mediante a fé em Jesus Cristo. Esta é a mensagem central do Evangelho:</p>
                
                <blockquote>"Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus. Não vem das obras, para que ninguém se glorie." - Efésios 2:8-9</blockquote>
                
                <h3>4. A Segunda Vinda de Cristo</h3>
                <p>Jesus prometeu que voltaria para buscar Sua igreja e estabelecer Seu reino eterno. Esta esperança nos motiva a viver em santidade e vigilância.</p>
                
                <h3>Aplicação Prática:</h3>
                <ul>
                    <li>Estude as Escrituras diariamente</li>
                    <li>Compartilhe sua fé com outros</li>
                    <li>Viva em santidade, aguardando a volta de Cristo</li>
                    <li>Participe ativamente da comunhão da igreja</li>
                </ul>
                
                <p><strong>Conclusão:</strong> Estes fundamentos não são apenas teoria teológica, mas verdades transformadoras que devem moldar nossa vida diária. Que possamos estar firmados na rocha que é Cristo!</p>
            `
        },
        {
            id: 2,
            icon: <LuGraduationCap className="w-6 h-6" />,
            iconColor: 'bg-blue-500/10 text-blue-500',
            title: 'Hermenêutica Bíblica',
            excerpt: 'Princípios para interpretar corretamente as Escrituras e aplicá-las à vida contemporânea.',
            author: 'Profª Márcia Santos',
            date: '19 Jan 2026',
            image: 'https://images.unsplash.com/photo-1519791883288-dc8bd696e667?q=80&w=800',
            content: `... (content omitted for brevity)...`
        },
        {
            id: 3,
            icon: <LuAward className="w-6 h-6" />,
            iconColor: 'bg-purple-500/10 text-purple-500',
            title: 'Teologia Sistemática',
            excerpt: 'Uma visão organizada das principais doutrinas cristãs e sua aplicação prática.',
            author: 'Pr. Roberto Alves',
            date: '12 Jan 2026',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800',
            content: `... (content omitted for brevity)...`
        }
    ]);

    useEffect(() => {
        const page = dbService.getPages().find(p => p.slug === 'revista/ebd');
        if (page && page.content) {
            try {
                const content = typeof page.content === 'string' ? JSON.parse(page.content) : page.content;
                if (content.articles && content.articles.length > 0) {
                    const articlesWithIcons = content.articles.map((art, index) => ({
                        ...art,
                        icon: index === 0 ? <LuBookOpen className="w-6 h-6" /> : (index === 1 ? <LuGraduationCap className="w-6 h-6" /> : <LuAward className="w-6 h-6" />)
                    }));
                    setArticles(articlesWithIcons);
                }
            } catch (e) { console.error(e); }
        }
        const handleUpdate = () => {
            const updatedPage = dbService.getPages().find(p => p.slug === 'revista/ebd');
            if (updatedPage && updatedPage.content) {
                try {
                    const content = typeof updatedPage.content === 'string' ? JSON.parse(updatedPage.content) : updatedPage.content;
                    if (content.articles && content.articles.length > 0) {
                        const articlesWithIcons = content.articles.map((art, index) => ({
                            ...art,
                            icon: index === 0 ? <LuBookOpen className="w-6 h-6" /> : (index === 1 ? <LuGraduationCap className="w-6 h-6" /> : <LuAward className="w-6 h-6" />)
                        }));
                        setArticles(articlesWithIcons);
                    }
                } catch (e) { console.error(e); }
            }
        };
        window.addEventListener('contentUpdated', handleUpdate);
        return () => window.removeEventListener('contentUpdated', handleUpdate);
    }, []);

    const scroll = (direction) => {
        if (carouselRef.current) {
            const { current } = carouselRef;
            const scrollAmount = direction === 'left' ? -340 : 340;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="pt-24 pb-16 min-h-screen bg-white dark:bg-church-dark transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 1, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-20">
                        <div className="flex-1">
                            <span className="text-church-primary dark:text-church-accent font-bold uppercase tracking-widest text-sm mb-4 block">Conhecimento que Liberta</span>
                            <h1 className="text-6xl md:text-9xl font-black text-church-primary dark:text-white uppercase tracking-tighter leading-none mb-6">
                                REVISTA <span className="italic">EBD</span>
                            </h1>
                            <p className="text-2xl text-gray-500 dark:text-gray-400 font-medium">Aprofundamento teológico e aplicação prática das Escrituras em cada lição semanal.</p>
                        </div>
                        <div className="shrink-0 p-10 bg-church-light/50 dark:bg-white/5 rounded-[4rem] border-2 border-dashed border-gray-200 dark:border-white/10 hidden lg:block">
                            <LuBookOpen className="w-32 h-32 text-church-primary dark:text-church-accent" />
                        </div>
                    </div>

                    {/* Articles Grid / Carousel */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold text-church-primary dark:text-white mb-8 flex items-center gap-3">
                            <LuBook className="w-8 h-8 text-church-accent" />
                            Estudos Bíblicos desta Edição
                        </h2>

                        {/* Carousel Container */}
                        <div className="relative group -mx-4 px-4 md:-mx-8 md:px-8">
                            {/* Navigation Buttons */}
                            <button
                                onClick={() => scroll('left')}
                                className="absolute left-0 top-1/2 -translate-y-1/2 ml-4 z-20 p-2 rounded-full bg-white dark:bg-[#1a1c23] shadow-lg border border-gray-100 dark:border-white/10 text-church-primary dark:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 disabled:opacity-0 hidden md:block"
                                aria-label="Previous slide"
                            >
                                <LuChevronLeft className="w-5 h-5" />
                            </button>

                            <button
                                onClick={() => scroll('right')}
                                className="absolute right-0 top-1/2 -translate-y-1/2 mr-4 z-20 p-2 rounded-full bg-white dark:bg-[#1a1c23] shadow-lg border border-gray-100 dark:border-white/10 text-church-primary dark:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hidden md:block"
                                aria-label="Next slide"
                            >
                                <LuChevronRight className="w-5 h-5" />
                            </button>

                            <div
                                ref={carouselRef}
                                className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                {articles.map((article) => (
                                    <motion.div
                                        key={article.id}
                                        whileHover={{ y: -5 }}
                                        className="snap-center min-w-[300px] md:min-w-[400px] shrink-0 cursor-pointer group/card h-full"
                                        onClick={() => setSelectedArticle(article)}
                                    >
                                        <div className="bg-white dark:bg-white/5 rounded-3xl overflow-hidden border border-gray-100 dark:border-white/10 hover:border-church-accent/50 dark:hover:border-church-accent/50 transition-all hover:shadow-xl h-full flex flex-col">
                                            {/* Article Image */}
                                            <div className="relative h-48 overflow-hidden shrink-0">
                                                <img
                                                    src={article.image}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                                                <div className={`absolute top-4 right-4 w-12 h-12 rounded-xl ${article.iconColor} flex items-center justify-center backdrop-blur-sm border border-white/20`}>
                                                    {article.icon}
                                                </div>
                                            </div>

                                            {/* Article Content */}
                                            <div className="p-6 flex flex-col grow">
                                                <h3 className="text-xl font-bold text-church-primary dark:text-white mb-2 group-hover/card:text-church-accent transition-colors">
                                                    {article.title}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 grow">
                                                    {article.excerpt}
                                                </p>
                                                <div className="flex items-center gap-3 text-xs text-gray-400 mb-3 mt-auto">
                                                    <span className="flex items-center gap-1">
                                                        <LuUser className="w-3 h-3" />
                                                        {article.author}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <LuCalendar className="w-3 h-3" />
                                                        {article.date}
                                                    </span>
                                                </div>
                                                <span className="inline-block text-sm font-semibold text-church-accent group-hover/card:underline">
                                                    Ler estudo completo →
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Classes Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                        <div className="group p-12 rounded-[3.5rem] bg-church-primary text-white space-y-6 hover:shadow-2xl transition-all shadow-church-primary/20">
                            <LuGraduationCap className="w-12 h-12 text-church-accent" />
                            <h3 className="text-3xl font-bold">Classe de Adultos</h3>
                            <p className="text-white/70 text-lg leading-relaxed">Estudos apologéticos sobre os desafios da fé cristã na pós-modernidade e fundamentos da doutrina reformada.</p>
                        </div>
                        <div className="group p-12 rounded-[3.5rem] bg-church-light/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 space-y-6 hover:bg-white dark:hover:bg-white/10 transition-all">
                            <LuAward className="w-12 h-12 text-church-primary dark:text-church-accent" />
                            <h3 className="text-3xl font-bold text-church-primary dark:text-white">Formação de Líderes</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">Módulos especiais para aqueles que sentem o chamado para o ensino da Palavra e pastoreio de ovelhas.</p>
                        </div>
                    </div>

                    {/* Featured Quote */}
                    <div className="relative p-16 md:p-24 rounded-[4.5rem] border-2 border-church-accent/30 dark:border-church-accent/20 text-center overflow-hidden">
                        <LuBookmark className="absolute -bottom-10 -right-10 w-48 h-48 text-church-accent/5" />
                        <h2 className="text-4xl md:text-5xl font-bold text-church-primary dark:text-white leading-tight italic max-w-4xl mx-auto">
                            &quot;A Escritura não pode ser quebrada; o que ela diz, Deus diz.&quot;
                        </h2>
                        <div className="mt-10 inline-block px-6 py-3 bg-church-accent text-church-primary font-bold rounded-full">
                            Toda Edição de Domingo às 09h00
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Article Modal */}
            <AnimatePresence>
                {selectedArticle && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto"
                        onClick={() => setSelectedArticle(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white dark:bg-gray-900 rounded-3xl max-w-4xl w-full my-8 overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header with Image */}
                            <div className="relative h-64 md:h-96">
                                <img
                                    src={selectedArticle.image}
                                    alt={selectedArticle.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
                                <button
                                    onClick={() => setSelectedArticle(null)}
                                    className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                                >
                                    <LuX className="w-6 h-6" />
                                </button>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                                        {selectedArticle.title}
                                    </h2>
                                    <div className="flex items-center gap-4 text-white/80 text-sm">
                                        <span className="flex items-center gap-2">
                                            <LuUser className="w-4 h-4" />
                                            {selectedArticle.author}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <LuCalendar className="w-4 h-4" />
                                            {selectedArticle.date}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Content */}
                            <div className="p-8 md:p-12 max-h-[60vh] overflow-y-auto">
                                <div
                                    className="prose prose-lg dark:prose-invert max-w-none
                                        prose-headings:text-church-primary dark:prose-headings:text-white
                                        prose-h2:text-3xl prose-h2:font-bold prose-h2:mb-4 prose-h2:mt-8
                                        prose-h3:text-xl prose-h3:font-bold prose-h3:mb-3 prose-h3:mt-6
                                        prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
                                        prose-blockquote:border-l-4 prose-blockquote:border-church-accent prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-church-primary dark:prose-blockquote:text-church-accent
                                        prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
                                        prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2
                                        prose-li:text-gray-600 dark:prose-li:text-gray-300
                                        prose-strong:text-church-primary dark:prose-strong:text-church-accent"
                                    dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default EBD;

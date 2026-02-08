import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Headphones, MessageSquare, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import dbService from '../../services/dbService';

const Jovens = () => {
    const carouselRef = useRef(null);
    const [items, setItems] = useState([
        {
            icon: <Globe className="w-5 h-5 text-church-accent" />,
            subtitle: "TENDÊNCIAS",
            title: "Identidade Digital",
            desc: "Como manter os valores do Reino no ambiente digital.",
            className: "bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10"
        },
        {
            icon: <Headphones className="w-5 h-5 text-church-primary" />,
            subtitle: "PLAYLIST",
            title: "Worship do Mês",
            desc: "As músicas que estão tocando na nossa playlist.",
            className: "bg-church-accent text-church-primary"
        },
        {
            icon: <MessageSquare className="w-5 h-5 text-church-primary dark:text-church-accent" />,
            subtitle: "FALA AÍ",
            title: "Perguntas & Respostas",
            desc: "Envie sua dúvida para a próxima edição.",
            className: "bg-church-light/50 dark:bg-white/5 border border-gray-100 dark:border-white/10"
        }
    ]);

    useEffect(() => {
        const page = dbService.getPages().find(p => p.slug === 'revista/jovens');
        if (page && page.content) {
            try {
                const content = typeof page.content === 'string' ? JSON.parse(page.content) : page.content;
                if (content.articles && content.articles.length > 0) {
                    setItems(content.articles);
                }
            } catch (e) {
                console.error("Error loading Jovens articles", e);
            }
        }
        const handleUpdate = () => {
            const updatedPage = dbService.getPages().find(p => p.slug === 'revista/jovens');
            if (updatedPage && updatedPage.content) {
                try {
                    const content = typeof updatedPage.content === 'string' ? JSON.parse(updatedPage.content) : updatedPage.content;
                    if (content.articles && content.articles.length > 0) setItems(content.articles);
                } catch (e) { }
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
                    initial={{ opacity: 1, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Header */}
                    <div className="relative py-20 px-8 rounded-[3rem] bg-linear-to-br from-church-primary to-church-secondary overflow-hidden mb-16">
                        <Zap className="absolute -top-10 -right-10 w-64 h-64 text-white/5 rotate-12" />
                        <div className="relative z-10">
                            <h1 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter">
                                REVISTA <span className="text-church-accent">JOVENS</span>
                            </h1>
                            <p className="text-xl text-white/80 max-w-xl mt-4">
                                Conectando nossa geração à essência do Evangelho. Relevância, verdade e impacto para o jovem cristão hoje.
                            </p>
                        </div>
                    </div>

                    {/* Carousel Section */}
                    <div className="relative group mb-20 -mx-4 px-4 md:-mx-8 md:px-8">
                        {/* Navigation Buttons */}
                        <button
                            onClick={() => scroll('left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 ml-4 z-20 p-3 rounded-full bg-white dark:bg-[#1a1c23] shadow-lg border border-gray-100 dark:border-white/10 text-church-primary dark:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 disabled:opacity-0 hidden md:block"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        <button
                            onClick={() => scroll('right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 mr-4 z-20 p-3 rounded-full bg-white dark:bg-[#1a1c23] shadow-lg border border-gray-100 dark:border-white/10 text-church-primary dark:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hidden md:block"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        <div
                            ref={carouselRef}
                            className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-12 scrollbar-hide"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {items.map((item, i) => (
                                <div key={i} className={`snap-center min-w-[300px] md:min-w-[400px] shrink-0 p-10 rounded-3xl space-y-4 ${item.className}`}>
                                    <div className="flex items-center gap-2 mb-2">
                                        {item.icon}
                                        <span className={`text-sm font-bold uppercase tracking-wider opacity-60 ${item.className.includes('bg-church-accent') ? 'text-church-primary' : 'text-gray-500 dark:text-gray-400'}`}>
                                            {item.subtitle}
                                        </span>
                                    </div>
                                    <h3 className={`text-2xl font-bold ${item.className.includes('bg-church-accent') ? 'text-church-primary' : 'text-church-primary dark:text-white'}`}>
                                        {item.title}
                                    </h3>
                                    <p className={`text-lg ${item.className.includes('bg-church-accent') ? 'text-church-primary/80' : 'text-gray-500 dark:text-gray-400'}`}>
                                        {item.desc}
                                    </p>
                                    <button className={`mt-4 font-bold hover:underline ${item.className.includes('bg-church-accent') ? 'text-church-primary' : 'text-church-primary dark:text-church-accent'}`}>
                                        Ver mais →
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Jovens;

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LuMusic, LuMic, LuStar, LuPlay, LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import dbService from '../../services/dbService';

const Louvor = () => {
    const carouselRef = useRef(null);
    const [items, setItems] = useState([
        {
            icon: <LuMic className="w-8 h-8 text-church-primary dark:text-church-accent mb-4" />,
            title: "Técnica Vocal",
            desc: "Dicas para cuidar da voz e melhorar a performance no altar."
        },
        {
            icon: <LuMusic className="w-8 h-8 text-church-primary dark:text-church-accent mb-4" />,
            title: "Novos Acordes",
            desc: "Harmonias e arranjos para as músicas mais tocadas."
        }
    ]);

    useEffect(() => {
        const page = dbService.getPages().find(p => p.slug === 'revista/louvor');
        if (page && page.content) {
            try {
                const content = typeof page.content === 'string' ? JSON.parse(page.content) : page.content;
                if (content.articles && content.articles.length > 0) setItems(content.articles);
            } catch (e) { }
        }
        const handleUpdate = () => {
            const updatedPage = dbService.getPages().find(p => p.slug === 'revista/louvor');
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
                    initial={{ opacity: 1, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Header */}
                    <div className="text-center mb-20">
                        <h1 className="text-5xl md:text-8xl font-black text-church-primary dark:text-white uppercase tracking-tighter mb-4">
                            REVISTA <span className="text-church-accent italic">LOUVOR</span>
                        </h1>
                        <div className="h-2 w-24 bg-church-accent mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                        <div className="space-y-8">
                            <h2 className="text-3xl font-bold text-church-primary dark:text-white">Bastidores da Adoração</h2>
                            <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed">
                                Entrevistas exclusivas com nossos músicos, dicas de técnica vocal e instrumental, e o mais importante: o coração por trás da canção.
                            </p>

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
                                    {items.map((item, i) => (
                                        <div key={i} className="snap-center min-w-[200px] md:min-w-[250px] shrink-0 p-6 rounded-2xl bg-church-light/50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                            {item.icon}
                                            <h3 className="font-bold text-lg dark:text-white">{item.title}</h3>
                                            <p className="text-sm text-gray-500 mt-2">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="relative group rounded-[3rem] overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1514320296741-251317cb5b9f?q=80&w=800"
                                alt="Fundo Louvor"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-church-primary/40 group-hover:bg-transparent transition-colors" />
                            <button className="absolute inset-0 flex items-center justify-center">
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                                    <LuPlay className="w-8 h-8 text-church-primary fill-church-primary" />
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Featured Quote */}
                    <div className="p-16 rounded-[4rem] bg-church-light/30 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-center relative overflow-hidden">
                        <LuStar className="absolute top-10 right-10 w-20 h-20 text-church-accent/10 animate-pulse" />
                        <h3 className="text-4xl md:text-5xl font-bold text-church-primary dark:text-white leading-tight italic">
                            "A adoração não é o que fazemos, é quem somos diante de Deus."
                        </h3>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Louvor;

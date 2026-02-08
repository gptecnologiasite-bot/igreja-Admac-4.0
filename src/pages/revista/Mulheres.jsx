import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Flower, Coffee, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import dbService from '../../services/dbService';

const Mulheres = () => {
    const carouselRef = useRef(null);
    const [items, setItems] = useState([
        { icon: <Heart />, title: "Família", desc: "Equilíbrio emocional no lar." },
        { icon: <Users />, title: "Comunhão", desc: "O valor da amizade cristã." },
        { icon: <Coffee />, title: "Devocional", desc: "Sua hora especial com Deus." },
        { icon: <Flower />, title: "Propósito", desc: "Descobrindo o plano divino." }
    ]);

    useEffect(() => {
        const page = dbService.getPages().find(p => p.slug === 'revista/mulheres');
        if (page && page.content) {
            try {
                const content = typeof page.content === 'string' ? JSON.parse(page.content) : page.content;
                if (content.articles && content.articles.length > 0) setItems(content.articles);
            } catch (e) { }
        }
        const handleUpdate = () => {
            const updatedPage = dbService.getPages().find(p => p.slug === 'revista/mulheres');
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
                    initial={{ opacity: 1, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
                        <div className="flex-1">
                            <h1 className="text-6xl md:text-8xl font-black text-pink-600 dark:text-pink-500 tracking-tighter uppercase leading-none mb-6">
                                REVISTA <br /> <span className="text-church-primary dark:text-white">MULHERES</span>
                            </h1>
                            <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">
                                Edificando o lar com sabedoria, graça e força. Histórias de superação e conselhos bíblicos para a mulher cristã moderna.
                            </p>
                        </div>
                        <div className="shrink-0 w-64 h-64 rounded-full bg-pink-100 dark:bg-pink-900/20 flex items-center justify-center p-8 border-4 border-white dark:border-white/10 shadow-xl">
                            <Flower className="w-full h-full text-pink-500" />
                        </div>
                    </div>

                    {/* Carousel Container */}
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
                                <div key={i} className="snap-center min-w-[280px] md:min-w-[300px] shrink-0 p-8 rounded-3xl bg-pink-50 dark:bg-pink-900/10 hover:bg-pink-100 transition-colors text-center border border-pink-100 dark:border-pink-900/20">
                                    <div className="w-12 h-12 mx-auto mb-4 text-pink-500">{item.icon}</div>
                                    <h3 className="text-xl font-bold text-church-primary dark:text-white mb-2">{item.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Featured Article */}
                    <div className="p-12 rounded-[3rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 flex flex-col md:flex-row items-center gap-12">
                        <div className="shrink-0 w-full md:w-80 aspect-rectangle rounded-2xl overflow-hidden shadow-lg">
                            <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=400" alt="Mulheres orando" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <span className="text-pink-500 font-bold uppercase text-sm tracking-widest">Destaque</span>
                            <h2 className="text-3xl font-bold text-church-primary dark:text-white mt-2 mb-4">Marta ou Maria?</h2>
                            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-6">
                                Como encontrar o descanso na presença de Jesus em meio à correria do cotidiano e às múltiplas tarefas da mulher atual.
                            </p>
                            <button className="bg-pink-500 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all shadow-pink-200">Ler Agora</button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Mulheres;

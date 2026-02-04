import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Home, Coffee, Users, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

const Lares = () => {
    const carouselRef = useRef(null);

    const items = [
        {
            icon: <Home className="w-8 h-8" />,
            title: "Aberto a Todos",
            desc: "Um lugar seguro para fazer perguntas e criar amizades verdadeiras.",
            className: "bg-church-accent/10 text-church-primary dark:text-church-accent"
        },
        {
            icon: <Coffee className="w-8 h-8 text-orange-500" />,
            title: "Papo & Café",
            desc: "Momentos de partilha informal e descontração.",
            className: "bg-church-light/50 dark:bg-white/5 border border-gray-100 dark:border-white/10"
        },
        {
            icon: <Users className="w-8 h-8 text-blue-500" />,
            title: "Comunhão",
            desc: "Crescimento mútuo através da vida compartilhada.",
            className: "bg-church-light/50 dark:bg-white/5 border border-gray-100 dark:border-white/10"
        }
    ];

    const scroll = (direction) => {
        if (carouselRef.current) {
            const { current } = carouselRef;
            const scrollAmount = direction === 'left' ? -300 : 300;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="pt-24 pb-16 min-h-screen bg-white dark:bg-church-dark transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 1, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Hero Section */}
                    <div className="relative h-[400px] rounded-[3rem] overflow-hidden mb-16 shadow-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1200"
                            alt="Igreja nos Lares"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-r from-church-primary/90 to-transparent flex items-center p-12 md:p-20">
                            <div className="max-w-xl">
                                <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-4">
                                    REVISTA <span className="text-church-accent italic">LARES</span>
                                </h1>
                                <p className="text-xl text-white/80">Onde a igreja se torna família. A beleza da comunhão nas casas e nos Pequenos Grupos.</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-20">
                        <h2 className="text-4xl font-bold text-church-primary dark:text-white tracking-tight leading-tight mb-8">
                            Uma Igreja Fora das Quatro Paredes
                        </h2>

                        {/* Carousel Container */}
                        <div className="relative group -mx-4 px-4 md:-mx-8 md:px-8">
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
                                    <div key={i} className={`snap-center min-w-[280px] md:min-w-[320px] shrink-0 p-8 rounded-3xl text-center flex flex-col items-center justify-center ${item.className}`}>
                                        <div className="mb-4 text-church-primary dark:text-church-accent">
                                            {item.icon}
                                        </div>
                                        <h3 className="font-bold text-xl dark:text-white mb-2">{item.title}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="bg-church-primary rounded-[3rem] p-12 md:p-16 text-center text-white">
                        <Heart className="w-12 h-12 text-church-accent mx-auto mb-6" />
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 italic tracking-tight">Quer abrir as portas do seu lar?</h2>
                        <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">Saiba como iniciar um Pequeno Grupo de Oração e Estudo Bíblico na sua vizinhança.</p>
                        <button className="bg-white text-church-primary px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-2xl">Mais Informações</button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Lares;

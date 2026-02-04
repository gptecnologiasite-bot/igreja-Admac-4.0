import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Anchor, Users, ChevronLeft, ChevronRight } from 'lucide-react';

const Homens = () => {
    const carouselRef = useRef(null);

    const items = [
        {
            icon: <Shield className="w-10 h-10 text-church-accent" />,
            title: "O Sacerdote do Lar",
            desc: "O papel do homem na condução espiritual da sua família sob a luz das Escrituras.",
            className: "bg-church-primary text-white shadow-xl shadow-church-primary/20"
        },
        {
            icon: <Target className="w-10 h-10 text-church-primary dark:text-church-accent" />,
            title: "Foco & Missão",
            desc: "Como lidar com as pressões do mundo profissional sem perder o alvo da excelência cristã.",
            className: "bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10"
        },
        {
            icon: <Users className="w-10 h-10 text-church-primary dark:text-church-accent" />,
            title: "Mentorias",
            desc: "O valor do discipulado e da troca de experiências entre diferentes gerações de homens.",
            className: "bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10"
        }
    ];

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
                    initial={{ opacity: 1, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Header */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-20">
                        <div>
                            <h1 className="text-6xl md:text-9xl font-black text-church-primary dark:text-white uppercase tracking-tighter leading-none">
                                REVISTA <br /> <span className="text-gray-400 dark:text-gray-600">HOMENS</span>
                            </h1>
                        </div>
                        <div className="pb-4">
                            <p className="text-2xl font-bold text-church-primary dark:text-church-accent italic mb-2 tracking-tight">
                                "Sede fortes, portai-vos como homens."
                            </p>
                            <p className="text-gray-500 dark:text-gray-400">
                                Liderança bíblica, paternidade e integridade no mercado de trabalho e no lar.
                            </p>
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
                                <div key={i} className={`snap-center min-w-[300px] md:min-w-[350px] shrink-0 p-10 rounded-3xl space-y-4 ${item.className}`}>
                                    {item.icon}
                                    <h3 className={`text-2xl font-bold ${item.className.includes('text-white') ? 'text-white' : 'text-church-primary dark:text-white'}`}>{item.title}</h3>
                                    <p className={item.className.includes('text-white') ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'}>
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Featured Section */}
                    <div className="relative p-12 md:p-20 rounded-[4rem] bg-gray-100 dark:bg-white/5 overflow-hidden text-center">
                        <Anchor className="absolute top-10 left-10 w-24 h-24 text-church-primary/5 -rotate-12" />
                        <h2 className="text-4xl md:text-5xl font-bold text-church-primary dark:text-white mb-8 tracking-tight">
                            Integridade em Meio à Crise
                        </h2>
                        <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
                            Um estudo profundo sobre a vida de José no Egito e como ele manteve sua pureza e fé inabaláveis em território hostil.
                        </p>
                        <button className="bg-church-primary text-white px-10 py-4 rounded-full font-bold hover:bg-church-secondary transition-all shadow-xl shadow-church-primary/20">
                            Acessar Estudo
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Homens;

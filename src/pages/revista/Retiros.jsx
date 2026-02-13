import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LuCompass, LuSun, LuStar, LuMapPin } from 'react-icons/lu';
import dbService from '../../services/dbService';

const Retiros = () => {
    const [pageData, setPageData] = useState(null);

    useEffect(() => {
        const page = dbService.getPages().find(p => p.slug === 'revista/retiros');
        if (page && page.content) {
            try {
                const content = typeof page.content === 'string' ? JSON.parse(page.content) : page.content;
                setPageData(content);
            } catch (e) { }
        }
        const handleUpdate = () => {
            const updatedPage = dbService.getPages().find(p => p.slug === 'revista/retiros');
            if (updatedPage && updatedPage.content) {
                try {
                    const content = typeof updatedPage.content === 'string' ? JSON.parse(updatedPage.content) : updatedPage.content;
                    setPageData(content);
                } catch (e) { }
            }
        };
        window.addEventListener('contentUpdated', handleUpdate);
        return () => window.removeEventListener('contentUpdated', handleUpdate);
    }, []);
    return (
        <div className="pt-24 pb-16 min-h-screen bg-white dark:bg-church-dark transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 1, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-bold uppercase tracking-widest">
                            <LuCompass className="w-4 h-4" />
                            Novos Ares
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-church-primary dark:text-white tracking-tighter uppercase italic leading-none">
                            REVISTA <span className="text-emerald-500">RETIROS</span>
                        </h1>
                        <p className="mt-8 text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            Momentos de pausa, reflexão e renovação espiritual em meio à natureza. Deixe o barulho do mundo para trás para ouvir a voz de Deus.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                        <div className="group relative h-96 rounded-[3rem] overflow-hidden shadow-xl">
                            <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600" alt="Montanhas Retiro" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent p-10 flex flex-col justify-end">
                                <h3 className="text-2xl font-bold text-white mb-2">Campo de Jovens</h3>
                                <p className="text-white/70 text-sm">Fins de semana intensos na montanha.</p>
                            </div>
                        </div>
                        <div className="group relative h-96 rounded-[3rem] overflow-hidden shadow-xl">
                            <img src="https://images.unsplash.com/photo-1533633017441-df07159784f1?q=80&w=600" alt="Fogueira Retiro" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent p-10 flex flex-col justify-end">
                                <h3 className="text-2xl font-bold text-white mb-2">Casais & Família</h3>
                                <p className="text-white/70 text-sm">Descanso e fortalecimento de laços.</p>
                            </div>
                        </div>
                        <div className="group relative h-96 rounded-[3rem] overflow-hidden shadow-xl">
                            <img src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=600" alt="Lago Retiro" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent p-10 flex flex-col justify-end">
                                <h3 className="text-2xl font-bold text-white mb-2">Oração Presbiteral</h3>
                                <p className="text-white/70 text-sm">Buscando direção divina em paz.</p>
                            </div>
                        </div>
                    </div>

                    {/* Info Card */}
                    <div className="p-12 rounded-[4rem] bg-emerald-500 text-white flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="space-y-4 text-center md:text-left">
                            <div className="flex items-center gap-3 justify-center md:justify-start">
                                <LuMapPin className="w-6 h-6 text-emerald-200" />
                                <span className="font-bold uppercase tracking-widest text-sm text-emerald-200">Próximo Local</span>
                            </div>
                            <h2 className="text-4xl font-bold tracking-tight">Sítio águas de Lindoia</h2>
                            <p className="text-emerald-100 text-lg">Inscrições abertas para o Retiro de Carnaval 2026.</p>
                        </div>
                        <button className="bg-white text-emerald-600 px-12 py-4 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-xl shadow-emerald-700/20">
                            Inscrever-se
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Retiros;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LuHeart, LuGift, LuUsers, LuGlobe } from 'react-icons/lu';
import dbService from '../../services/dbService';

const AcaoSocial = () => {
    const [pageData, setPageData] = useState(null);

    useEffect(() => {
        const page = dbService.getPages().find(p => p.slug === 'revista/acao-social');
        if (page && page.content) {
            try {
                const content = typeof page.content === 'string' ? JSON.parse(page.content) : page.content;
                setPageData(content);
            } catch (e) { console.error(e); }
        }
        const handleUpdate = () => {
            const updatedPage = dbService.getPages().find(p => p.slug === 'revista/acao-social');
            if (updatedPage && updatedPage.content) {
                try {
                    const content = typeof updatedPage.content === 'string' ? JSON.parse(updatedPage.content) : updatedPage.content;
                    setPageData(content);
                } catch (e) { console.error(e); }
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
                    <div className="mb-16">
                        <h1 className="text-6xl md:text-9xl font-black text-church-primary dark:text-white uppercase tracking-tighter italic leading-none mb-6">
                            AÇÃO <span className="text-red-500">SOCIAL</span>
                        </h1>
                        <p className="text-2xl text-gray-500 dark:text-gray-400 font-medium max-w-3xl leading-relaxed">
                            Amando o próximo em ações e em verdade. Nossos projetos buscam restaurar a dignidade e levar esperança para aqueles que mais precisam.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
                        <div className="space-y-8">
                            <div className="flex gap-6 items-start">
                                <div className="shrink-0 p-4 bg-red-500/10 rounded-2xl text-red-500">
                                    <LuHeart className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-church-primary dark:text-white mb-2">Amor Prático</h3>
                                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-lg">Ajudando com alimentos, roupas e assistência em momentos de necessidade extrema.</p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-start">
                                <div className="shrink-0 p-4 bg-blue-500/10 rounded-2xl text-blue-500">
                                    <LuGift className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-church-primary dark:text-white mb-2">Doações Recorrentes</h3>
                                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-lg">Central de arrecadação aberta nos dias de culto para doações de itens básicos de higiene e vestuário.</p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-start">
                                <div className="shrink-0 p-4 bg-green-500/10 rounded-2xl text-green-500">
                                    <LuGlobe className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-church-primary dark:text-white mb-2">Impacto Local</h3>
                                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-lg">Parcerias com a comunidade para melhoria de espaços públicos e apoio a instituições vizinhas.</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 h-[500px]">
                            <div className="rounded-[4rem] overflow-hidden shadow-xl">
                                <img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=400" alt="Cesta básica" className="w-full h-full object-cover" />
                            </div>
                            <div className="rounded-[4rem] overflow-hidden shadow-xl mt-12">
                                <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=400" alt="Crianças ajudadas" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>

                    <div className="p-12 rounded-[5rem] bg-church-primary text-center">
                        <LuUsers className="w-16 h-16 text-church-accent mx-auto mb-6" />
                        <h2 className="text-4xl md:text-5xl font-bold text-white italic tracking-tight mb-8">Como você pode ser voluntário?</h2>
                        <button className="bg-church-accent text-church-primary px-12 py-4 rounded-full font-bold text-xl hover:scale-105 transition-transform">
                            Quero Ajudar
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AcaoSocial;

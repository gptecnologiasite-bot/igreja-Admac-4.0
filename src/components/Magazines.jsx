import React, { useState, useEffect, cloneElement } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LuBook, LuBaby, LuUsers, LuMusic, LuHeart, LuShield, LuHouse, LuCompass, LuGraduationCap, LuStar } from 'react-icons/lu';
import dbService from '../services/dbService';

const Magazines = () => {
    const [magazinesData, setMagazinesData] = useState({
        title: 'Nossa Revista Digital',
        description: 'Conteúdo exclusivo dividido por áreas de interesse. Clique e mergulhe em estudos, notícias e inspiração.',
        items: [
            { icon: <LuBaby />, title: 'Kids', color: 'text-yellow-500', href: '/revista/kids' },
            { icon: <LuUsers />, title: 'Jovens', color: 'text-blue-500', href: '/revista/jovens' },
            { icon: <LuMusic />, title: 'Louvor', color: 'text-purple-500', href: '/revista/louvor' },
            { icon: <LuHeart />, title: 'Mulheres', color: 'text-pink-500', href: '/revista/mulheres' },
            { icon: <LuShield />, title: 'Homens', color: 'text-gray-500', href: '/revista/homens' },
            { icon: <LuHouse />, title: 'Lares', color: 'text-orange-500', href: '/revista/lares' },
            { icon: <LuCompass />, title: 'Retiros', color: 'text-emerald-500', href: '/revista/retiros' },
            { icon: <LuHeart />, title: 'Ação Social', color: 'text-red-500', href: '/revista/acao-social' },
            { icon: <LuGraduationCap />, title: 'EBD', color: 'text-indigo-500', href: '/revista/ebd' }
        ]
    });

    // useEffect(() => {
    //     const loadMagazines = () => {
    //         try {
    //             const page = dbService.getPageBySlug('inicio');
    //             if (page && page.content) {
    //                 const content = typeof page.content === 'string' ? JSON.parse(page.content) : page.content;
    //                 if (content.magazines) {
    //                     setMagazinesData(content.magazines);
    //                 }
    //             }
    //         } catch (error) {
    //             console.error("Error loading magazines:", error);
    //         }
    //     };

    //     loadMagazines();
    //     window.addEventListener('contentUpdated', loadMagazines);
    //     return () => window.removeEventListener('contentUpdated', loadMagazines);
    // }, []);

    const getIcon = (title) => {
        const t = title.toLowerCase();
        if (t.includes('kids') || t.includes('infantil')) return <LuBaby />;
        if (t.includes('jovens') || t.includes('adolescentes')) return <LuUsers />;
        if (t.includes('louvor') || t.includes('música')) return <LuMusic />;
        if (t.includes('mulher')) return <LuHeart className="text-pink-500" />;
        if (t.includes('homem')) return <LuShield />;
        if (t.includes('lar') || t.includes('casa')) return <LuHouse />;
        if (t.includes('retiro')) return <LuCompass />;
        if (t.includes('social')) return <LuHeart className="text-red-500" />;
        if (t.includes('ebd') || t.includes('bíblia')) return <LuGraduationCap />;
        return <LuStar />;
    };

    return (
        <section id="magazine" className="py-24 bg-church-light/30 dark:bg-church-dark transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-church-primary dark:text-white mb-4">
                            {magazinesData.title}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-2xl text-lg">
                            {magazinesData.description}
                        </p>
                    </div>
                    <Link
                        to="/revista"
                        className="inline-flex items-center gap-2 text-church-primary dark:text-church-accent font-bold hover:underline"
                    >
                        Ver todas as edições <LuBook className="w-5 h-5" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {magazinesData.items.map((mag, index) => (
                        <motion.div
                            key={mag.title + index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link
                                to={mag.href}
                                className="group flex flex-col items-center p-8 rounded-3xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-church-accent/50 dark:hover:border-church-accent/50 hover:shadow-xl transition-all h-full"
                            >
                                <div className={`w-14 h-14 rounded-2xl bg-church-light dark:bg-white/10 flex items-center justify-center mb-4 ${mag.color || 'text-church-primary dark:text-church-accent'} group-hover:scale-110 transition-transform`}>
                                    {cloneElement(getIcon(mag.title), { className: 'w-7 h-7' })}
                                </div>
                                <h3 className="font-bold text-church-primary dark:text-white text-lg">{mag.title}</h3>
                                <div className="mt-2 w-0 group-hover:w-8 h-1 bg-church-accent transition-all duration-300 rounded-full" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Magazines;

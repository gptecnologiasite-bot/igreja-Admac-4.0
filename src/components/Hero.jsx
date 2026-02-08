import React, { useState, useEffect } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import dbService from '../services/dbService';

const Hero = () => {
    const [content, setContent] = useState({
        badge: 'Bem-vindo à ADMAC',
        title: 'Uma Família para Pertencer',
        subtitle: 'Nós acreditamos no amor que transforma e na fé que renova. Venha fazer parte de uma comunidade apaixonada por Deus e comprometida com as pessoas.'
    });

    useEffect(() => {
        const pages = dbService.getPages();
        const homePage = pages.find(p => p.slug === 'inicio');
        if (homePage && homePage.content) {
            try {
                const parsed = typeof homePage.content === 'string' ? JSON.parse(homePage.content) : homePage.content;
                if (parsed.hero) {
                    setContent(prev => ({
                        ...prev,
                        ...parsed.hero
                    }));
                }
            } catch (e) {
                console.error("Error loading home content", e);
            }
        }
    }, []);

    // Helper to render title with colored span
    const renderTitle = (title) => {
        if (title.includes('Pertencer')) {
            const parts = title.split('Pertencer');
            return (
                <>
                    {parts[0]}
                    {' '}<span className="text-church-accent">Pertencer</span>
                    {parts[1]}
                </>
            );
        }
        return title;
    };

    return (
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background with Overlay */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1544427928-c49cdfebf494?q=80&w=2000&auto=format&fit=crop"
                    alt="Church Worship"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-r from-church-dark/90 via-church-dark/70 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl"
                >
                    <span className="inline-block px-4 py-1.5 bg-church-accent/20 text-church-accent rounded-full text-sm font-semibold mb-6 backdrop-blur-sm border border-church-accent/30">
                        {content.badge}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        {renderTitle(content.title)}
                    </h1>
                    <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                        {content.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a href="#agenda" className="btn-primary flex items-center justify-center gap-2 group">
                            Ver Programação
                            <Calendar className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a href="#about" className="px-8 py-3 rounded-full border border-white/30 font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2 group">
                            Quem Somos
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform opacity-60 group-hover:opacity-100" />
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40"
            >
                <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
                    <div className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;

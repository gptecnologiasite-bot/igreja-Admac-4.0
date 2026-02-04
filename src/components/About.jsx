import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Heart } from 'lucide-react';
import dbService from '../services/dbService';

const About = () => {
    const [content, setContent] = useState({
        title: 'Quem Somos',
        text1: 'A ADMAC (Assembléia de Deus Ministério Aliança Comunitária) é mais do que uma igreja, é um lugar onde você encontra propósito, esperança e uma família de fé.',
        text2: 'Fundada com o objetivo de ser um farol de luz em nossa comunidade, temos nos dedicado ao ensino das escrituras e ao cuidado mútuo, sempre buscando a presença de Deus em tudo o que fazemos.',
        mission: 'Levar a mensagem do evangelho a todas as nações, transformando vidas através do amor de Cristo.',
        vision: 'Ser uma igreja relevante, acolhedora e referencia na pregação da palavra e serviço social.',
        values: 'Amor incondicional, integridade, serviço ao próximo, adoração genuína e fidelidade bíblica.'
    });

    useEffect(() => {
        const pages = dbService.getPages();
        const homePage = pages.find(p => p.slug === 'inicio');
        if (homePage && homePage.content) {
            try {
                const parsed = typeof homePage.content === 'string' ? JSON.parse(homePage.content) : homePage.content;
                if (parsed.about) {
                    setContent(prev => ({
                        ...prev,
                        ...parsed.about
                    }));
                }
            } catch (e) {
                console.error("Error loading about content", e);
            }
        }
    }, []);

    const values = [
        {
            icon: <Target className="w-6 h-6" />,
            title: 'Missão',
            desc: content.mission
        },
        {
            icon: <Eye className="w-6 h-6" />,
            title: 'Visão',
            desc: content.vision
        },
        {
            icon: <Heart className="w-6 h-6" />,
            title: 'Valores',
            desc: content.values
        }
    ];

    return (
        <section id="about" className="section-container bg-church-light/50 dark:bg-white/2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl font-bold text-church-primary dark:text-white mb-6">{content.title}</h2>
                    <div className="space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                        <p>{content.text1}</p>
                        <p>{content.text2}</p>
                    </div>

                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {values.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white dark:bg-white/5 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/10 hover:shadow-md transition-shadow"
                            >
                                <div className="w-12 h-12 bg-church-primary/10 dark:bg-church-accent/10 text-church-primary dark:text-church-accent rounded-xl flex items-center justify-center mb-4">
                                    {item.icon}
                                </div>
                                <h3 className="font-bold text-church-primary dark:text-white mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-snug">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Image Display */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <div className="aspect-4/5 rounded-3xl overflow-hidden shadow-2xl relative z-10">
                        <img
                            src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1000&auto=format&fit=crop"
                            alt="Church Interior"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute -top-6 -right-6 w-32 h-32 bg-church-accent opacity-20 rounded-full blur-3xl z-0"></div>
                    <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-church-primary opacity-10 rounded-full blur-3xl z-0"></div>
                    <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-church-accent rounded-tl-3xl opacity-50 z-20"></div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;

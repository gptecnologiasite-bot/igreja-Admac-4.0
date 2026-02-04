import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Heart, Star, Music, Book, Camera, Baby } from 'lucide-react';
import dbService from '../services/dbService';

const FeaturedActivities = () => {
    // ... (state and useEffect remain same, just updating the icon logic)
    const [activitiesData, setActivitiesData] = useState({
        title: 'Atividades em Destaque',
        description: 'Veja o que está acontecendo na igreja',
        items: [
            {
                title: 'Distribuição de Cestas Básicas',
                desc: 'Ajudando famílias em situação de vulnerabilidade em nossa comunidade.',
                tag: 'Último Sábado do Mês',
                image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop',
                icon: 'Heart'
            },
            {
                title: 'Sopa Solidária',
                desc: 'Servindo refeições nutritivas e amor para pessoas em situação de rua.',
                tag: 'Toda Quarta-feira',
                image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop',
                icon: 'Users'
            },
            {
                title: 'Ensaio de Louvor',
                desc: 'Preparação técnica e espiritual da nossa equipe de música e artes.',
                tag: 'Toda Quinta-feira',
                image: 'https://images.unsplash.com/photo-1514320296741-251317cb5b9f?q=80&w=800&auto=format&fit=crop',
                icon: 'Music'
            }
        ]
    });

    useEffect(() => {
        const loadActivities = () => {
            try {
                const page = dbService.getPageBySlug('inicio');
                if (page && page.content) {
                    const content = typeof page.content === 'string' ? JSON.parse(page.content) : page.content;
                    if (content.activities) {
                        setActivitiesData(content.activities);
                    }
                }
            } catch (error) {
                console.error("Error loading activities:", error);
            }
        };

        loadActivities();
        window.addEventListener('contentUpdated', loadActivities);
        window.addEventListener('storage', (e) => {
            if (e.key === 'admac_pages_db') loadActivities();
        });
        return () => {
            window.removeEventListener('contentUpdated', loadActivities);
            window.removeEventListener('storage', loadActivities);
        };
    }, []);

    const getIcon = (activity) => {
        // Use chosen icon if exists
        if (activity.icon) {
            switch (activity.icon) {
                case 'Calendar': return <Calendar className="w-5 h-5" />;
                case 'Users': return <Users className="w-5 h-5" />;
                case 'Heart': return <Heart className="w-5 h-5" />;
                case 'Star': return <Star className="w-5 h-5" />;
                case 'Music': return <Music className="w-5 h-5" />;
                case 'Book': return <Book className="w-5 h-5" />;
                case 'Camera': return <Camera className="w-5 h-5" />;
                case 'Baby': return <Baby className="w-5 h-5" />;
                default: break;
            }
        }

        // Fallback to title-based guessing
        const t = activity.title.toLowerCase();
        if (t.includes('sopa') || t.includes('comida')) return <Users className="w-5 h-5" />;
        if (t.includes('cesta') || t.includes('social') || t.includes('doação')) return <Heart className="w-5 h-5" />;
        return <Calendar className="w-5 h-5" />;
    };

    return (
        <section className="py-24 bg-white dark:bg-church-dark transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-church-accent mb-4"
                    >
                        {activitiesData.title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-500 dark:text-gray-400 text-lg"
                    >
                        {activitiesData.description}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {activitiesData.items.map((activity, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group relative flex flex-col bg-church-light/30 dark:bg-white/5 rounded-3xl overflow-hidden border border-gray-100 dark:border-white/10"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={activity.image || 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=800&auto=format&fit=crop'}
                                    alt={activity.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-church-primary/80 to-transparent" />
                                <div className="absolute top-4 right-4 bg-church-accent text-church-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    {activity.tag}
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="flex items-center gap-2 text-church-accent mb-4">
                                    {getIcon(activity)}
                                    <span className="text-sm font-semibold uppercase tracking-widest">Atividade</span>
                                </div>
                                <h3 className="text-2xl font-bold text-church-primary dark:text-white mb-3 group-hover:text-church-accent transition-colors">
                                    {activity.title}
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                                    {activity.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedActivities;

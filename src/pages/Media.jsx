import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Share2, Youtube, Instagram, Facebook, Video, Play } from 'lucide-react';
import dbService from '../services/dbService';

const platformIcons = {
    'YouTube': Youtube,
    'Instagram': Instagram,
    'Facebook': Facebook,
    'Videos': Video
};

const Media = () => {
    const [page, setPage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPage = () => {
            const data = dbService.getPageBySlug('midia');
            setPage(data);
            setLoading(false);
        };

        loadPage();
        window.addEventListener('contentUpdated', loadPage);
        return () => window.removeEventListener('contentUpdated', loadPage);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen pt-24 flex justify-center items-center bg-white dark:bg-church-dark">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-church-primary"></div>
            </div>
        );
    }

    // Default content if page exists but has no content structure yet
    const content = page?.content || {};
    const socialLinks = content.social || [
        { platform: 'YouTube', url: 'https://youtube.com', icon: 'Youtube' },
        { platform: 'Instagram', url: 'https://instagram.com', icon: 'Instagram' },
        { platform: 'Facebook', url: 'https://facebook.com', icon: 'Facebook' }
    ];
    const gallery = content.gallery || [];

    return (
        <div className="pt-24 pb-16 min-h-screen bg-white dark:bg-church-dark transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-2 mb-4 text-church-primary dark:text-church-accent opacity-80">
                        <Share2 size={24} />
                        <span className="uppercase tracking-widest text-sm font-bold">Nossas Mídias</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
                        Conecte-se Conosco
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Acompanhe nossos cultos, eventos e conteúdos exclusivos em nossas redes sociais.
                    </p>
                </motion.div>

                {/* Social Links Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    {socialLinks?.map((link, index) => {
                        const Icon = platformIcons[link.platform] || platformIcons[link.icon] || Share2;
                        return (
                            <motion.a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-3xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                            >
                                <div className="p-4 bg-white dark:bg-church-dark rounded-full shadow-lg mb-4 group-hover:scale-110 transition-transform">
                                    <Icon className="w-8 h-8 text-church-primary dark:text-church-accent" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{link.platform}</h3>
                                <span className="text-church-primary dark:text-church-accent font-medium text-sm px-4 py-1 bg-church-primary/10 dark:bg-church-accent/10 rounded-full">
                                    Seguir Agora
                                </span>
                            </motion.a>
                        );
                    })}
                </div>

                {/* Video Gallery */}
                <div className="space-y-12">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-xl">
                            <Video className="w-6 h-6 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Últimos Vídeos</h2>
                            <p className="text-gray-500 dark:text-gray-400">Assista aos nossos cultos e mensagens</p>
                        </div>
                    </div>

                    {gallery?.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {gallery.map((video, index) => (
                                <motion.a
                                    key={video.id || index}
                                    href={video.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 + (index * 0.1) }}
                                    className="group relative aspect-video rounded-2xl overflow-hidden bg-black shadow-lg"
                                >
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-300"
                                    />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-white">
                                            <Play className="w-8 h-8 fill-current" />
                                        </div>
                                        <h3 className="text-white font-bold text-lg text-center drop-shadow-md">
                                            {video.title}
                                        </h3>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-200 dark:border-white/10">
                            <Video className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                            <p className="text-gray-500 dark:text-gray-400">Nenhum vídeo adicionado à galeria ainda.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Media;

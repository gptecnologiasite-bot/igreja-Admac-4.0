import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Youtube, Instagram, Facebook, PlayCircle, ExternalLink, MessageCircle } from 'lucide-react';
import dbService from '../services/dbService';

const Media = () => {
    const [mediaData, setMediaData] = useState({
        platforms: {
            youtube: 'https://youtube.com',
            instagram: 'https://instagram.com',
            facebook: 'https://facebook.com',
            whatsapp: 'https://wa.me/'
        },
        featuredVideo: {
            title: 'Esperança em Tempos Difíceis - Pr. Elias Santos',
            tag: 'ÚLTIMA MENSAGEM',
            image: 'https://images.unsplash.com/photo-1510003343711-64353896504a?q=80&w=1600&auto=format&fit=crop',
            videoUrl: '#'
        }
    });

    useEffect(() => {
        const loadMedia = () => {
            try {
                const page = dbService.getPageBySlug('inicio');
                if (page && page.content) {
                    const content = typeof page.content === 'string' ? JSON.parse(page.content) : page.content;
                    if (content.media) {
                        setMediaData(content.media);
                    }
                }
            } catch (error) {
                console.error("Error loading media:", error);
            }
        };

        loadMedia();
        window.addEventListener('contentUpdated', loadMedia);
        // Sync across tabs
        window.addEventListener('storage', (e) => {
            if (e.key === 'admac_pages_db') {
                loadMedia();
            }
        });

        return () => {
            window.removeEventListener('contentUpdated', loadMedia);
            window.removeEventListener('storage', loadMedia);
        };
    }, []);

    const handleVideoClick = () => {
        const url = mediaData.featuredVideo.videoUrl;
        if (!url || url === '#') return;

        // Ensure protocol
        let finalUrl = url.trim();
        if (!finalUrl.startsWith('http')) {
            finalUrl = 'https://' + finalUrl;
        }

        window.open(finalUrl, '_blank', 'noopener,noreferrer');
    };

    const socialPlatforms = [
        {
            name: 'YouTube',
            icon: <Youtube className="w-8 h-8" />,
            color: 'bg-[#FF0000]',
            desc: 'Assista nossos cultos ao vivo e mensagens gravadas.',
            link: mediaData.platforms.youtube,
            action: 'Inscrever-se'
        },
        {
            name: 'Instagram',
            icon: <Instagram className="w-8 h-8" />,
            color: 'bg-linear-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]',
            desc: 'Acompanhe nosso dia a dia e avisos importantes.',
            link: mediaData.platforms.instagram,
            action: 'Seguir'
        },
        {
            name: 'Facebook',
            icon: <Facebook className="w-8 h-8" />,
            color: 'bg-[#1877F2]',
            desc: 'Fique por dentro das novidades e eventos da comunidade.',
            link: mediaData.platforms.facebook,
            action: 'Curtir Página'
        },
        {
            name: 'WhatsApp',
            icon: <MessageCircle className="w-8 h-8" />,
            color: 'bg-[#25D366]',
            desc: 'Fale diretamente conosco pelo WhatsApp.',
            link: mediaData.platforms.whatsapp,
            action: 'Conversar'
        }
    ];

    return (
        <section id="media" className="section-container bg-church-light/30 dark:bg-white/2 transition-colors duration-300">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-church-primary dark:text-white mb-4">Nossa Mídia</h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                    Conecte-se conosco através das redes sociais e não perca nenhum momento importante da nossa caminhada.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {socialPlatforms.map((platform, index) => (
                    <motion.div
                        key={platform.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="card group overflow-hidden bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10"
                    >
                        <div className={`h-24 ${platform.color} flex items-center justify-center text-white -mx-6 -mt-6 mb-6 group-hover:scale-105 transition-transform duration-500`}>
                            {platform.icon}
                        </div>
                        <h3 className="text-xl font-bold dark:text-white mb-3">{platform.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                            {platform.desc}
                        </p>
                        <a
                            href={platform.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-bold text-church-primary dark:text-church-accent border-2 border-church-primary/10 dark:border-church-accent/10 hover:bg-church-primary dark:hover:bg-church-accent hover:text-white dark:hover:text-church-dark transition-all"
                        >
                            {platform.action}
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </motion.div>
                ))}
            </div>

            {/* Featured Video */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative aspect-video max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl group cursor-pointer"
                onClick={handleVideoClick}
            >
                <img
                    src={mediaData.featuredVideo.image || 'https://images.unsplash.com/photo-1510003343711-64353896504a?q=80&w=1600&auto=format&fit=crop'}
                    alt={mediaData.featuredVideo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                        <PlayCircle className="w-12 h-12 text-white" />
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-8 bg-linear-to-t from-black/80 to-transparent">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="px-3 py-1 bg-church-accent text-church-dark text-xs font-bold rounded-full mb-2 inline-block">
                                {mediaData.featuredVideo.tag}
                            </span>
                            <h4 className="text-2xl font-bold text-white">{mediaData.featuredVideo.title}</h4>
                        </div>
                        <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all">
                            <ExternalLink className="w-5 h-5 text-white" />
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Media;

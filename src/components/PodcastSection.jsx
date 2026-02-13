import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LuHeadphones } from 'react-icons/lu';
import dbService from '../services/dbService';

const PodcastSection = () => {
    const [podcastData, setPodcastData] = useState({
        badge: 'Podcast ADMAC',
        title: 'Ouça Nossas Mensagens em Qualquer Lugar',
        description: 'Fique por dentro das últimas pregações, estudos bíblicos e conversas inspiradoras. Nosso podcast está disponível para você levar a Palavra de Deus onde quer que vá.',
        spotifyUrl: 'https://open.spotify.com/show/6vf8aTHBG3ms8DGo5jCsAG',
        spotifyEmbed: 'https://open.spotify.com/embed/episode/6vf8aTHBG3ms8DGo5jCsAG?utm_source=generator&theme=0'
    });

    useEffect(() => {
        const loadPodcast = () => {
            try {
                const page = dbService.getPageBySlug('inicio');
                if (page && page.content) {
                    const content = typeof page.content === 'string' ? JSON.parse(page.content) : page.content;
                    if (content.podcast) {
                        setPodcastData(content.podcast);
                    }
                }
            } catch (error) {
                console.error("Error loading podcast:", error);
            }
        };

        loadPodcast();
        window.addEventListener('contentUpdated', loadPodcast);
        return () => window.removeEventListener('contentUpdated', loadPodcast);
    }, []);

    return (
        <section className="py-24 bg-church-light/50 dark:bg-church-dark transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="flex-1 space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-church-accent/20 text-church-primary dark:text-church-accent rounded-full text-sm font-bold uppercase tracking-widest">
                            <LuHeadphones className="w-4 h-4" />
                            {podcastData.badge}
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-church-primary dark:text-white leading-tight">
                            {podcastData.title}
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                            {podcastData.description}
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <a
                                href={podcastData.spotifyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-[#1DB954] text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform"
                            >
                                <LuHeadphones className="w-5 h-5" />
                                Ouvir no Spotify
                            </a>
                        </div>
                    </motion.div>

                    {/* Spotify Embed */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="w-full lg:w-[500px] bg-white dark:bg-white/5 p-4 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-white/10"
                    >
                        <iframe
                            style={{ borderRadius: '24px' }}
                            src={podcastData.spotifyEmbed}
                            width="100%"
                            height="352"
                            frameBorder="0"
                            allowFullScreen=""
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                        ></iframe>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default PodcastSection;

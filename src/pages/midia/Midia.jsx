import React, { useState, useEffect } from "react";
import {
    LuVideo,
    LuMusic,
    LuImage,
    LuPlay,
    LuHeadphones,
    LuMaximize2,
    LuCalendar,
    LuUser,
    LuQuote,
    LuUsers
} from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";
import dbService from "../../services/dbService";
import VideoModal from "../../components/VideoModal";

const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

const Midia = () => {
    const [mediaPage, setMediaPage] = useState(null);
    const [activeTab, setActiveTab] = useState("videos");
    const [loading, setLoading] = useState(true);
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        const loadContent = () => {
            const data = dbService.getPageBySlug('midia');
            setMediaPage(data);
            setLoading(false);
        };

        loadContent();
        window.addEventListener('contentUpdated', loadContent);
        return () => window.removeEventListener('contentUpdated', loadContent);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen pt-24 flex justify-center items-center bg-white dark:bg-church-dark">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-church-primary"></div>
            </div>
        );
    }

    const content = mediaPage?.content || {};
    const videos = Array.isArray(content.videos) ? content.videos : [
        { titulo: 'Culto de Adoração', url: 'https://www.youtube.com/embed/WPK4mDhKGx8?si=OWo8FBcLTho9OoO2' }
    ];
    const audios = Array.isArray(content.audios) ? content.audios : [];
    const photos = Array.isArray(content.photos) ? content.photos : [];

    const tabs = [
        { id: "videos", label: "Vídeos", icon: <LuVideo className="w-4 h-4" /> },
        { id: "audios", label: "Áudios", icon: <LuMusic className="w-4 h-4" /> },
        { id: "photos", label: "Fotos", icon: <LuImage className="w-4 h-4" /> },
    ];

    return (
        <div className="pt-24 pb-16 min-h-screen bg-gray-50 dark:bg-church-dark transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="text-center mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4"
                    >
                        Central de Mídia
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto italic font-medium"
                    >
                        Acompanhe nossos cultos, louvores e registros especiais.
                    </motion.p>
                </div>

                {/* Custom Tabs */}
                <div className="mb-12">
                    <div className="flex justify-center p-1.5 bg-gray-200/50 dark:bg-white/5 rounded-2xl w-fit mx-auto backdrop-blur-sm border border-gray-200 dark:border-white/10">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`relative flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === tab.id
                                    ? "text-white shadow-lg"
                                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                    }`}
                            >
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="activeTabBg"
                                        className="absolute inset-0 bg-church-primary dark:bg-church-accent rounded-xl"
                                        initial={false}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{tab.icon}</span>
                                <span className="relative z-10">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="min-h-[400px]"
                    >
                        {activeTab === "videos" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {videos.length > 0 ? videos.map((v, i) => {
                                    const youtubeId = getYouTubeId(v.url);
                                    const thumbUrl = youtubeId ? `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg` : "";

                                    return (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.05 }}
                                            onClick={() => setSelectedVideo({ url: v.url, title: v.titulo })}
                                            className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-white/5 hover:shadow-church-primary/20 transition-all duration-500 cursor-pointer"
                                        >
                                            <div className="relative aspect-video bg-black rounded-t-3xl overflow-hidden">
                                                <img
                                                    src={thumbUrl}
                                                    alt={v.titulo}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                {/* Play Button Overlay */}
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/50 transition-colors z-10">
                                                    <div className="w-16 h-16 rounded-full bg-yellow-500 text-white flex items-center justify-center shadow-2xl transform scale-90 group-hover:scale-100 transition-all duration-300">
                                                        <LuPlay size={32} fill="currentColor" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-6">
                                                <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-church-primary dark:group-hover:text-church-accent transition-colors line-clamp-2">
                                                    {v.titulo}
                                                </h3>
                                            </div>
                                        </motion.div>
                                    );
                                }) : <EmptyState message="Nenhum vídeo disponível no momento." />}
                            </div>
                        )}

                        {activeTab === "audios" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                                {audios.length > 0 ? audios.map((a, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-md border border-gray-100 dark:border-white/5 group hover:bg-church-primary/5 transition-colors"
                                    >
                                        <div className="w-14 h-14 bg-church-primary/10 dark:bg-church-accent/10 rounded-xl flex items-center justify-center text-church-primary dark:text-church-accent group-hover:scale-110 transition-transform">
                                            <LuHeadphones size={24} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-gray-900 dark:text-white truncate">{a.titulo}</p>
                                            <audio controls className="w-full h-8 mt-2 custom-audio-player">
                                                <source src={a.url} />
                                            </audio>
                                        </div>
                                    </motion.div>
                                )) : <EmptyState message="Nenhum áudio disponível no momento." />}
                            </div>
                        )}

                        {activeTab === "photos" && (
                            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                                {photos.length > 0 ? photos.map((f, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        className="relative group rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-white/5 cursor-pointer"
                                    >
                                        <img
                                            src={f}
                                            alt="Galeria de fotos"
                                            className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <LuMaximize2 className="text-white w-8 h-8 scale-50 group-hover:scale-100 transition-transform" />
                                        </div>
                                    </motion.div>
                                )) : <EmptyState message="Nenhuma foto disponível no momento." />}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* New Integrated Sections */}
                <div className="mt-24 space-y-24">
                    <TestimonialsSection />
                    <TeamSection />
                </div>

                <VideoModal
                    isOpen={!!selectedVideo}
                    onClose={() => setSelectedVideo(null)}
                    videoUrl={selectedVideo?.url}
                    videoTitle={selectedVideo?.title}
                />
            </div>
        </div>
    );
};

const TestimonialsSection = () => {
    const testimonials = [
        {
            name: "Ana Silva",
            role: "Membro",
            text: "A equipe de mídia é incrível! A qualidade das transmissões nos aproxima da igreja mesmo quando não podemos estar presentes."
        },
        {
            name: "Carlos Souza",
            role: "Colaborador",
            text: "Um trabalho impecável e feito com muito amor. Ver as fotos e vídeos nos motiva a participar ainda mais das atividades."
        },
        {
            name: "Mariana Costa",
            role: "Visitante",
            text: "Superou todas as expectativas. O acolhimento virtual através das mídias é humano e muito eficiente."
        }
    ];

    return (
        <section className="relative py-12">
            <div className="flex flex-col items-center mb-12">
                <div className="p-3 bg-church-primary/10 rounded-2xl text-church-primary mb-4">
                    <LuQuote size={32} />
                </div>
                <h2 className="text-3xl font-black text-gray-900 dark:text-white">Depoimentos</h2>
                <div className="w-12 h-1.5 bg-church-primary rounded-full mt-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-white/5 shadow-xl relative group"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-church-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-t-3xl"></div>
                        <p className="text-gray-600 dark:text-gray-400 italic mb-6 leading-relaxed">
                            “{item.text}”
                        </p>
                        <div className="flex flex-col">
                            <strong className="text-gray-900 dark:text-white font-bold">{item.name}</strong>
                            <span className="text-sm text-church-primary dark:text-church-accent font-medium">{item.role}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

const TeamSection = () => {
    const team = [
        { name: "João Silva", role: "Coordenação", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop" },
        { name: "Paula Oliveira", role: "Design & Social Media", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop" },
        { name: "Ricardo Santos", role: "Transmissão", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop" }
    ];

    return (
        <section className="relative py-12">
            <div className="flex flex-col items-center mb-12">
                <div className="p-3 bg-church-primary/10 rounded-2xl text-church-primary mb-4">
                    <LuUsers size={32} />
                </div>
                <h2 className="text-3xl font-black text-gray-900 dark:text-white">Nossa Equipe</h2>
                <div className="w-12 h-1.5 bg-church-primary rounded-full mt-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                {team.map((member, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="group text-center"
                    >
                        <div className="relative mb-6 mx-auto w-48 h-48">
                            {/* Decorative Glow */}
                            <div className="absolute inset-0 bg-church-primary/20 rounded-full blur-2xl group-hover:bg-church-primary/40 transition-colors duration-500"></div>

                            {/* Circle Frame */}
                            <div className="relative w-full h-full rounded-full border-4 border-white dark:border-slate-800 overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3">
                                <img
                                    src={member.photo}
                                    alt={member.name}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-church-primary dark:group-hover:text-church-accent transition-colors">
                            {member.name}
                        </h4>
                        <p className="text-church-primary dark:text-church-accent font-semibold text-sm tracking-wide uppercase">
                            {member.role}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

const EmptyState = ({ message }) => (
    <div className="flex flex-col items-center justify-center py-20 text-gray-500 dark:text-gray-400 bg-white/50 dark:bg-white/5 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700">
        <LuImage size={48} className="mb-4 opacity-20" />
        <p className="text-lg font-medium">{message}</p>
    </div>
);

export default Midia;

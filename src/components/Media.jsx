import React, { useState, useEffect } from 'react';
import { FaYoutube, FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { LuPlay, LuVideo } from 'react-icons/lu';
import dbService from '../services/dbService';
import VideoModal from './VideoModal';

const Media = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeVideoIndex, setActiveVideoIndex] = useState(0);
    const [videos, setVideos] = useState([]);
    const [platforms, setPlatforms] = useState({
        youtube: '#',
        instagram: '#',
        facebook: '#',
        whatsapp: '#'
    });

    useEffect(() => {
        const loadMedia = () => {
            try {
                // Load platform URLs from inicio page
                const inicioPage = dbService.getPageBySlug('inicio');
                if (inicioPage && inicioPage.content) {
                    const content = typeof inicioPage.content === 'string' ? JSON.parse(inicioPage.content) : inicioPage.content;
                    if (content.media && content.media.platforms) {
                        setPlatforms(prev => ({ ...prev, ...content.media.platforms }));
                    }
                }

                // Load videos from midia page
                const midiaPage = dbService.getPageBySlug('midia');
                if (midiaPage && midiaPage.content) {
                    const content = typeof midiaPage.content === 'string' ? JSON.parse(midiaPage.content) : midiaPage.content;
                    const rawVideos = content.gallery || content.videos || [];

                    if (rawVideos.length > 0) {
                        // Take first 3 videos for the gallery
                        const videoList = rawVideos.slice(0, 3).map(v => ({
                            title: v.title || v.titulo || 'Culto',
                            url: v.url || '',
                            thumbnail: v.thumbnail || getYouTubeThumbnail(getYouTubeId(v.url))
                        }));
                        setVideos(videoList);
                    }
                }
            } catch (err) {
                console.error("Error loading media data:", err);
            }
        };

        loadMedia();
        window.addEventListener('contentUpdated', loadMedia);
        return () => window.removeEventListener('contentUpdated', loadMedia);
    }, []);

    const getYouTubeId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const getYouTubeThumbnail = (videoId) => {
        return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200";
    };

    const handleVideoClick = (index) => {
        setActiveVideoIndex(index);
        setIsModalOpen(true);
    };

    const cards = [
        {
            icon: <FaYoutube size={28} />,
            title: "YouTube",
            text: "Assista nossos cultos ao vivo e mensagens gravadas.",
            btn: "Inscrever-se",
            color: "#ff0000",
            link: platforms.youtube
        },
        {
            icon: <FaInstagram size={28} />,
            title: "Instagram",
            text: "Acompanhe nosso dia a dia e avisos importantes.",
            btn: "Seguir",
            color: "linear-gradient(45deg,#f58529,#dd2a7b,#8134af,#515bd4)",
            link: platforms.instagram
        },
        {
            icon: <FaFacebookF size={28} />,
            title: "Facebook",
            text: "Fique por dentro das novidades e eventos.",
            btn: "Curtir Página",
            color: "#1877f2",
            link: platforms.facebook
        },
        {
            icon: <FaWhatsapp size={28} />,
            title: "WhatsApp",
            text: "Fale diretamente conosco pelo WhatsApp.",
            btn: "Conversar",
            color: "#25d366",
            link: platforms.whatsapp
        }
    ];

    return (
        <div id="media" style={{ padding: "80px 30px", background: "#0f172a" }}>
            {/* TITLE */}
            <div style={{ textAlign: "center", marginBottom: 50 }}>
                <h2 style={{
                    fontSize: 42,
                    fontWeight: "bold",
                    color: "#fff",
                    marginBottom: 10
                }}>
                    Central de Mídia
                </h2>
                <p style={{
                    fontSize: 16,
                    color: "#94a3b8",
                    maxWidth: 600,
                    margin: "0 auto"
                }}>
                    Acompanhe nossos cultos, louvores e registros especiais.
                </p>
            </div>

            {/* VIDEO GALLERY */}
            {videos.length > 0 && (
                <div style={{ maxWidth: 1100, margin: "0 auto 60px" }}>
                    {/* Main Video Preview */}
                    <div style={{ marginBottom: 30 }}>
                        <div
                            onClick={() => handleVideoClick(activeVideoIndex)}
                            className="group"
                            style={{
                                position: "relative",
                                paddingTop: "56.25%",
                                borderRadius: 20,
                                overflow: "hidden",
                                boxShadow: "0 10px 30px rgba(0,0,0,.4)",
                                cursor: "pointer",
                                background: "#000"
                            }}
                        >
                            {/* Thumbnail Image */}
                            <img
                                src={videos[activeVideoIndex]?.thumbnail}
                                alt={videos[activeVideoIndex]?.title}
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    transition: "transform 0.5s ease"
                                }}
                                className="group-hover:scale-105"
                            />

                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors z-10">
                                <div className="w-20 h-20 rounded-full bg-yellow-500 text-white flex items-center justify-center shadow-2xl transform transition-all duration-300 group-hover:scale-110">
                                    <LuPlay size={40} fill="currentColor" />
                                </div>
                            </div>

                            {/* Title Banner */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/90 via-black/40 to-transparent z-20 pointer-events-none">
                                <div className="flex items-center gap-3 drop-shadow-lg">
                                    <LuVideo size={18} className="text-yellow-500" fill="currentColor" />
                                    <h3 className="text-white font-bold text-lg tracking-tight">
                                        {videos[activeVideoIndex]?.title}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Video Thumbnails */}
                    <div style={{
                        display: "flex",
                        gap: 20,
                        justifyContent: "center",
                        flexWrap: "wrap"
                    }}>
                        {videos.map((video, index) => (
                            <div
                                key={index}
                                onClick={() => setActiveVideoIndex(index)}
                                style={{
                                    width: 260,
                                    cursor: "pointer",
                                    background: "#1e293b",
                                    borderRadius: 20,
                                    padding: 12,
                                    transition: "all 0.3s ease",
                                    border: activeVideoIndex === index
                                        ? "2px solid #facc15"
                                        : "2px solid transparent",
                                    transform: activeVideoIndex === index ? "scale(1.02)" : "scale(1)"
                                }}
                                className="hover:shadow-xl"
                            >
                                <div style={{ position: "relative" }}>
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        style={{
                                            width: "100%",
                                            height: 150,
                                            objectFit: "cover",
                                            borderRadius: 14
                                        }}
                                    />
                                    {activeVideoIndex === index && (
                                        <div style={{
                                            position: "absolute",
                                            top: "50%",
                                            left: "50%",
                                            transform: "translate(-50%, -50%)",
                                            width: 40,
                                            height: 40,
                                            borderRadius: "50%",
                                            background: "#facc15",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}>
                                            <LuPlay size={20} fill="white" color="white" />
                                        </div>
                                    )}
                                </div>
                                <p style={{
                                    marginTop: 10,
                                    fontSize: 14,
                                    color: "#fff",
                                    lineHeight: 1.4
                                }}>
                                    {video.title}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* VIDEO MODAL */}
            <VideoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                videoUrl={videos[activeVideoIndex]?.url || ''}
                videoTitle={videos[activeVideoIndex]?.title || ''}
            />

            {/* CARDS */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
                gap: 20,
                maxWidth: 1100,
                margin: "auto"
            }}>
                {cards.map((c, i) => (
                    <div key={i} style={{
                        background: "#f3f4f6", // Slightly lighter than e5e7eb for better contrast
                        borderRadius: 16,
                        overflow: "hidden",
                        textAlign: "center",
                        boxShadow: "0 6px 18px rgba(0,0,0,.2)"
                    }}>

                        {/* HEADER */}
                        <div style={{
                            background: c.color,
                            padding: 20,
                            color: "#fff",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            {c.icon}
                        </div>

                        {/* BODY */}
                        <div style={{ padding: 20 }}>
                            <h3 style={{ fontWeight: 'bold', marginBottom: 10, color: '#1e293b' }}>{c.title}</h3>
                            <p style={{ fontSize: 14, marginBottom: 20, color: '#475569' }}>{c.text}</p>

                            <a href={c.link} target="_blank" rel="noopener noreferrer">
                                <button style={{
                                    padding: "10px 20px",
                                    borderRadius: 10,
                                    border: "1px solid #d1a954",
                                    background: "transparent",
                                    color: "#d1a954",
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                    transition: "all 0.3s ease"
                                }}>
                                    {c.btn}
                                </button>
                            </a>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default Media;

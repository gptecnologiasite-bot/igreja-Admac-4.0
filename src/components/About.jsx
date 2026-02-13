import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Eye, Heart } from 'lucide-react';
import dbService from '../services/dbService';

const About = () => {
    const [currentImage, setCurrentImage] = useState(0);

    // Default images for the carousel
    const defaultImages = [
        "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1000&auto=format&fit=crop", // Worship/Hall
        "https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=1000&auto=format&fit=crop", // Hands raised
        "https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?q=80&w=1000&auto=format&fit=crop", // Bible study/Group
        "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=1000&auto=format&fit=crop"  // Community/Coffee
    ];

    const [content, setContent] = useState({
        title: 'Quem Somos',
        text1: 'A ADMAC (Assembléia de Deus Ministério Aliança Comunitária) é mais do que uma igreja, é um lugar onde você encontra propósito, esperança e uma família de fé.',
        text2: 'Fundada com o objetivo de ser um farol de luz em nossa comunidade, temos nos dedicado ao ensino das escrituras e ao cuidado mútuo, sempre buscando a presença de Deus em tudo o que fazemos.',
        mission: 'Levar a mensagem do evangelho a todas as nações, transformando vidas através do amor de Cristo.',
        vision: 'Ser uma igreja relevante, acolhedora e referencia na pregação da palavra e serviço social.',
        values: 'Amor incondicional, integridade, serviço ao próximo, adoração genuína e fidelidade bíblica.',
        images: defaultImages
    });

    useEffect(() => {
        const timer = setInterval(() => {
            if (content.images && content.images.length > 0) {
                setCurrentImage((prev) => (prev + 1) % content.images.length);
            }
        }, 5000);
        return () => clearInterval(timer);
    }, [content.images]);

    useEffect(() => {
        const pages = dbService.getPages();
        const homePage = pages.find(p => p.slug === 'inicio');
        if (homePage && homePage.content) {
            try {
                const parsed = typeof homePage.content === 'string' ? JSON.parse(homePage.content) : homePage.content;
                if (parsed.about) {
                    setContent(prev => ({
                        ...prev,
                        ...parsed.about,
                        images: (parsed.about.images && parsed.about.images.length > 0) ? parsed.about.images : defaultImages
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
        <section className="section-container bg-white dark:bg-church-dark py-20 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-church-primary dark:text-white mb-8">
                            {content.title}
                        </h2>
                        <div className="space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed text-lg text-justify">
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
                                    className="bg-slate-50 dark:bg-white/5 p-6 rounded-2xl border border-slate-100 dark:border-white/10 hover:border-church-accent/50 transition-colors group"
                                >
                                    <div className="w-12 h-12 bg-church-primary/10 dark:bg-church-accent/10 text-church-primary dark:text-church-accent rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </div>
                                    <h3 className="font-bold text-church-primary dark:text-white mb-2">{item.title}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-snug">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Image Carousel Display */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="aspect-4/5 rounded-tl-[100px] rounded-br-[100px] rounded-tr-3xl rounded-bl-3xl overflow-hidden shadow-2xl relative z-10 border-4 border-white dark:border-white/5 bg-gray-100 dark:bg-gray-800">
                            <AnimatePresence mode="wait">
                                {(() => {
                                    const currentItem = (content.images || [])[currentImage];
                                    if (!currentItem) return null; // Skip if no item

                                    const isObj = typeof currentItem === 'object';
                                    const imgUrl = isObj ? currentItem.url : currentItem;
                                    const link = isObj ? currentItem.link : null;
                                    const buttonText = isObj ? currentItem.buttonText : null;

                                    return (
                                        <motion.div
                                            key={currentImage}
                                            initial={{ opacity: 0, scale: 1.1 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 1.5 }}
                                            className="absolute inset-0 w-full h-full"
                                        >
                                            <img
                                                src={imgUrl}
                                                alt="Church Life"
                                                className="w-full h-full object-cover"
                                            />
                                            {/* Link/Button Overlay */}
                                            {link && (
                                                <a
                                                    href={link}
                                                    className="absolute inset-0 z-30"
                                                    aria-label={buttonText || "Saiba mais"}
                                                >
                                                    <span className="sr-only">{buttonText || "Saiba mais"}</span>
                                                </a>
                                            )}

                                            {buttonText && (
                                                <div className="absolute bottom-12 left-0 right-0 z-20 flex justify-center pointer-events-none">
                                                    <span className="bg-church-accent text-church-primary px-6 py-2 rounded-full font-bold uppercase text-sm tracking-wider shadow-lg transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-300">
                                                        {buttonText}
                                                    </span>
                                                </div>
                                            )}
                                        </motion.div>
                                    );
                                })()}
                            </AnimatePresence>

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent z-20 pointer-events-none"></div>

                            {/* Carousel Indicators */}
                            <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-2">
                                {(content.images || []).map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImage(idx)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentImage
                                            ? 'bg-church-accent w-6'
                                            : 'bg-white/50 hover:bg-white'
                                            }`}
                                        aria-label={`View image ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-church-accent opacity-20 rounded-full blur-3xl z-0"></div>
                        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-church-primary opacity-10 rounded-full blur-3xl z-0"></div>

                        {/* Floating Badge */}
                        <div className="absolute top-10 right-10 bg-white/90 dark:bg-black/80 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-lg z-20 flex flex-col items-center text-center transform rotate-6 hover:rotate-0 transition-transform cursor-default">
                            <div className="text-3xl font-black text-church-accent">70+</div>
                            <div className="text-xs font-bold uppercase tracking-wider text-church-primary dark:text-white">Anos de<br />História</div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;

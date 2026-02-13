import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LuHeart, LuFlower, LuCoffee, LuUsers, LuChevronLeft, LuChevronRight, LuStar, LuMusic, LuBook } from 'react-icons/lu';
import dbService from '../services/dbService';

const HomeCarousel = () => {
    const carouselRef = useRef(null);
    const [title, setTitle] = useState('Destaques');
    const [items, setItems] = useState([
        { icon: <LuHeart />, title: "Família", desc: "Equilíbrio emocional no lar.", color: "text-pink-500", bg: "bg-pink-50 dark:bg-pink-900/10" },
        { icon: <LuUsers />, title: "Comunhão", desc: "O valor da amizade cristã.", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/10" },
        { icon: <LuCoffee />, title: "Devocional", desc: "Sua hora especial com Deus.", color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/10" },
        { icon: <LuFlower />, title: "Propósito", desc: "Descobrindo o plano divino.", color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/10" }
    ]);

    useEffect(() => {
        const loadContent = () => {
            const page = dbService.getPages().find(p => p.slug === 'inicio');
            if (page && page.content) {
                try {
                    const content = typeof page.content === 'string' ? JSON.parse(page.content) : page.content;

                    if (content.carouselTitle) setTitle(content.carouselTitle);

                    if (content.carousel && content.carousel.length > 0) {
                        setItems(content.carousel);
                    }
                } catch (e) {
                    console.error("Error loading home carousel", e);
                }
            }
        };

        loadContent();
        window.addEventListener('contentUpdated', loadContent);
        return () => window.removeEventListener('contentUpdated', loadContent);
    }, []);

    const scroll = (direction) => {
        if (carouselRef.current) {
            const { current } = carouselRef;
            const scrollAmount = direction === 'left' ? -340 : 340;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const getIcon = (iconName) => {
        switch (iconName) {
            case 'Heart': return <LuHeart />;
            case 'Users': return <LuUsers />;
            case 'Coffee': return <LuCoffee />;
            case 'Flower': return <LuFlower />;
            case 'Star': return <LuStar />;
            case 'Music': return <LuMusic />;
            case 'Book': return <LuBook />;
            default: return <LuStar />;
        }
    };

    return (
        <section className="py-16 bg-white dark:bg-church-dark transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-church-primary dark:text-white">
                            {title}
                        </h2>
                        <div className="flex gap-2">
                            <button
                                onClick={() => scroll('left')}
                                className="p-2 rounded-full bg-gray-100 dark:bg-white/10 text-church-primary dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
                                aria-label="Previous slide"
                            >
                                <LuChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                className="p-2 rounded-full bg-gray-100 dark:bg-white/10 text-church-primary dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
                                aria-label="Next slide"
                            >
                                <LuChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    <div
                        ref={carouselRef}
                        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 scrollbar-hide"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {items.map((item, i) => (
                            <div key={i} className={`snap-center min-w-[280px] md:min-w-[320px] shrink-0 rounded-3xl ${item.bg || 'bg-gray-50 dark:bg-white/5'} hover:shadow-lg transition-all border border-gray-100 dark:border-white/10 overflow-hidden group`}>
                                {item.image ? (
                                    <div className="w-full h-48 overflow-hidden relative">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                            <span className="text-white font-medium text-sm">Ver mais</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={`w-full h-40 flex items-center justify-center ${item.color || 'text-church-primary'}`}>
                                        <div className="w-16 h-16 transform group-hover:scale-110 transition-transform duration-300">
                                            {typeof item.icon === 'string' ? getIcon(item.icon) : item.icon}
                                        </div>
                                    </div>
                                )}
                                <div className="p-6">
                                    <h3 className={`text-xl font-bold ${item.color || 'text-church-primary dark:text-white'} mb-2`}>{item.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HomeCarousel;

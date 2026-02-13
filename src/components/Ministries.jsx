import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LuUsers, LuBookOpen, LuMusic, LuHeart, LuBaby, LuShieldCheck, LuStar, LuActivity, LuCompass, LuGraduationCap, LuHouse } from 'react-icons/lu';
import dbService from '../services/dbService';

const Ministries = () => {
    // ... (ministriesData and useEffect remain same)
    const [ministriesData, setMinistriesData] = useState({
        title: 'Nossos Ministérios',
        description: 'Há um lugar para você servir e crescer. Conheça as áreas de atuação da nossa igreja e envolva-se.',
        items: [
            { title: 'Liderança', desc: 'Formação e apoio aos líderes que conduzem nossa comunidade.', href: '/ministerios/lideranca', icon: 'Users' },
            { title: 'Casais', desc: 'Fortalecendo casamentos através de princípios bíblicos e comunhão.', href: '/ministerios/casais', icon: 'Heart' },
            { title: 'Infantil', desc: 'Educação cristã lúdica e segura para nossas crianças.', href: '/ministerios/infantil', icon: 'Baby' },
            { title: 'Louvor', desc: 'Adoração através da música e das artes em todos os nossos cultos.', href: '/ministerios/louvor', icon: 'Music' },
            { title: 'Intercessão', desc: 'Grupo dedicado à oração e clamor pelas famílias e nações.', href: '/ministerios/intercessao', icon: 'ShieldCheck' },
            { title: 'Escola Bíblica', desc: 'Aprofundamento no conhecimento da Palavra de Deus para todas as idades.', href: '/ministerios/ebd', icon: 'BookOpen' }
        ]
    });

    useEffect(() => {
        const loadMinistries = () => {
            try {
                const page = dbService.getPageBySlug('inicio');
                if (page && page.content) {
                    const content = typeof page.content === 'string' ? JSON.parse(page.content) : page.content;
                    if (content.ministries) {
                        setMinistriesData(content.ministries);
                    }
                }
            } catch (error) {
                console.error("Error loading ministries:", error);
            }
        };

        loadMinistries();
        window.addEventListener('contentUpdated', loadMinistries);
        window.addEventListener('storage', (e) => {
            if (e.key === 'admac_pages_db') loadMinistries();
        });
        return () => {
            window.removeEventListener('contentUpdated', loadMinistries);
            window.removeEventListener('storage', loadMinistries);
        };
    }, []);

    const getIcon = (item) => {
        if (item.icon) {
            switch (item.icon) {
                case 'Users': return <LuUsers className="w-8 h-8" />;
                case 'Heart': return <LuHeart className="w-8 h-8" />;
                case 'Baby': return <LuBaby className="w-8 h-8" />;
                case 'Music': return <LuMusic className="w-8 h-8" />;
                case 'ShieldCheck':
                case 'Shield': return <LuShieldCheck className="w-8 h-8" />;
                case 'BookOpen':
                case 'Book': return <LuBookOpen className="w-8 h-8" />;
                case 'Activity': return <LuActivity className="w-8 h-8" />;
                case 'Compass': return <LuCompass className="w-8 h-8" />;
                case 'GraduationCap': return <LuGraduationCap className="w-8 h-8" />;
                case 'Home': return <LuHouse className="w-8 h-8" />;
                case 'Star': return <LuStar className="w-8 h-8" />;
                default: break;
            }
        }

        const t = item.title.toLowerCase();
        if (t.includes('lider')) return <LuUsers className="w-8 h-8" />;
        if (t.includes('casal') || t.includes('família')) return <LuHeart className="w-8 h-8" />;
        if (t.includes('infantil') || t.includes('criança')) return <LuBaby className="w-8 h-8" />;
        if (t.includes('louvor') || t.includes('música')) return <LuMusic className="w-8 h-8" />;
        if (t.includes('intercessão') || t.includes('oração')) return <LuShieldCheck className="w-8 h-8" />;
        if (t.includes('escola') || t.includes('bíblia') || t.includes('ebd')) return <LuBookOpen className="w-8 h-8" />;
        return <LuStar className="w-8 h-8" />;
    };

    return (
        <section id="ministries" className="section-container">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-church-primary dark:text-white mb-4">{ministriesData.title}</h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                    {ministriesData.description}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ministriesData.items.map((min, index) => (
                    <motion.div
                        key={min.title + index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group p-8 rounded-3xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-church-primary/20 dark:hover:border-church-accent/20 hover:shadow-xl hover:shadow-church-primary/5 transition-all"
                    >
                        <div className="w-16 h-16 bg-church-light dark:bg-white/10 text-church-primary dark:text-church-accent rounded-2xl flex items-center justify-center mb-6 group-hover:bg-church-primary dark:group-hover:bg-church-accent group-hover:text-white dark:group-hover:text-church-dark transition-colors">
                            {getIcon(min)}
                        </div>
                        <h3 className="text-xl font-bold text-church-primary dark:text-white mb-3">{min.title}</h3>
                        <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{min.desc}</p>
                        {min.href ? (
                            <Link to={min.href} className="mt-6 text-church-primary dark:text-church-accent font-semibold flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                                Saiba mais <span className="text-lg">→</span>
                            </Link>
                        ) : (
                            <button className="mt-6 text-church-primary dark:text-church-accent font-semibold flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                                Saiba mais <span className="text-lg">→</span>
                            </button>
                        )}
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Ministries;

import { cloneElement } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LuBook, LuBaby, LuUsers, LuMusic, LuHeart, LuShield, LuHouse, LuCompass, LuGraduationCap, LuChevronRight } from 'react-icons/lu';

const categories = [
    {
        icon: <LuBaby />,
        title: 'Kids',
        color: 'text-yellow-500',
        bg: 'bg-yellow-500/10',
        href: '/revista/kids',
        cover: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=800&auto=format&fit=crop',
        summary: 'Histórias bíblicas ilustradas, atividades criativas e lições sobre valores cristãos para crianças de 3 a 10 anos.',
        edition: 'Edição Janeiro 2026'
    },
    {
        icon: <LuUsers />,
        title: 'Jovens',
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
        href: '/revista/jovens',
        cover: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop',
        summary: 'Conteúdo relevante sobre fé, relacionamentos, propósito e desafios da juventude cristã contemporânea.',
        edition: 'Edição Janeiro 2026'
    },
    {
        icon: <LuMusic />,
        title: 'Louvor',
        color: 'text-purple-500',
        bg: 'bg-purple-500/10',
        href: '/revista/louvor',
        cover: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=800&auto=format&fit=crop',
        summary: 'Estudos sobre adoração, testemunhos de músicos, cifras de hinos e reflexões sobre a música na igreja.',
        edition: 'Edição Janeiro 2026'
    },
    {
        icon: <LuHeart />,
        title: 'Mulheres',
        color: 'text-pink-500',
        bg: 'bg-pink-500/10',
        href: '/revista/mulheres',
        cover: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
        summary: 'Edificação espiritual, sabedoria para o lar, maternidade e o papel da mulher virtuosa segundo as Escrituras.',
        edition: 'Edição Janeiro 2026'
    },
    {
        icon: <LuShield />,
        title: 'Homens',
        color: 'text-gray-500',
        bg: 'bg-gray-500/10',
        href: '/revista/homens',
        cover: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop',
        summary: 'Liderança cristã, integridade, paternidade e o chamado masculino para ser cabeça do lar e servo de Deus.',
        edition: 'Edição Janeiro 2026'
    },
    {
        icon: <LuHouse />,
        title: 'Lares',
        color: 'text-orange-500',
        bg: 'bg-orange-500/10',
        href: '/revista/lares',
        cover: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop',
        summary: 'Dinâmicas, estudos bíblicos e testemunhos para fortalecer a comunhão nos Pequenos Grupos e células.',
        edition: 'Edição Janeiro 2026'
    },
    {
        icon: <LuCompass />,
        title: 'Retiros',
        color: 'text-emerald-500',
        bg: 'bg-emerald-500/10',
        href: '/revista/retiros',
        cover: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop',
        summary: 'Guias devocionais, roteiros de retiros espirituais e reflexões para momentos de renovação com Deus.',
        edition: 'Edição Janeiro 2026'
    },
    {
        icon: <LuHeart />,
        title: 'Ação Social',
        color: 'text-red-500',
        bg: 'bg-red-500/10',
        href: '/revista/acao-social',
        cover: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800&auto=format&fit=crop',
        summary: 'Projetos comunitários, testemunhos de transformação e como viver o amor de Cristo através de ações práticas.',
        edition: 'Edição Janeiro 2026'
    },
    {
        icon: <LuGraduationCap />,
        title: 'EBD',
        color: 'text-indigo-500',
        bg: 'bg-indigo-500/10',
        href: '/revista/ebd',
        cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=800&auto=format&fit=crop',
        summary: 'Lições da Escola Bíblica Dominical com estudos aprofundados, comentários e aplicações práticas da Palavra.',
        edition: 'Edição Janeiro 2026'
    }
];

const Revista = () => {
    return (
        <div className="pt-24 pb-16 min-h-screen bg-white dark:bg-church-dark transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Hero Section */}
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-church-primary/10 text-church-primary dark:text-church-accent rounded-full text-sm font-bold uppercase tracking-widest mb-6">
                            <LuBook className="w-4 h-4" />
                            Publicações ADMAC
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black text-church-primary dark:text-white uppercase tracking-tighter mb-6 leading-none">
                            Revista <span className="text-church-accent italic"> Digital</span>
                        </h1>
                        <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                            Mantenha-se alimentado com conteúdo de qualidade, estudos bíblicos e notícias de nossa comunidade, tudo em um só lugar.
                        </p>
                    </div>

                    {/* Grid de Categorias */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories.map((cat, index) => (
                            <motion.div
                                key={cat.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Link
                                    to={cat.href}
                                    className="group block bg-white dark:bg-white/5 rounded-3xl overflow-hidden border border-gray-100 dark:border-white/10 hover:border-church-accent/50 dark:hover:border-church-accent/50 transition-all hover:shadow-2xl shadow-gray-200/50 dark:shadow-none"
                                >
                                    {/* Cover Image */}
                                    <div className="relative aspect-3/4 overflow-hidden bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                                        <img
                                            src={cat.cover}
                                            alt={`Capa ${cat.title}`}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {/* Overlay gradient */}
                                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                                        {/* Icon badge */}
                                        <div className={`absolute top-4 right-4 w-12 h-12 rounded-xl ${cat.bg} ${cat.color} flex items-center justify-center backdrop-blur-sm border border-white/20`}>
                                            {cloneElement(cat.icon, { className: 'w-6 h-6' })}
                                        </div>

                                        {/* Title on cover */}
                                        <div className="absolute bottom-0 left-0 right-0 p-6">
                                            <div className="text-xs text-white/70 font-semibold uppercase tracking-wider mb-2">
                                                {cat.edition}
                                            </div>
                                            <h3 className="text-3xl font-black text-white mb-1 flex items-center gap-2">
                                                {cat.title}
                                                <LuChevronRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Summary */}
                                    <div className="p-6">
                                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                                            {cat.summary}
                                        </p>
                                        <div className="mt-4 flex items-center gap-2 text-church-primary dark:text-church-accent font-semibold text-sm">
                                            Ler edição
                                            <LuChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Footer Info */}
                    <div className="mt-24 p-12 rounded-[3.5rem] bg-church-primary text-center text-white relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-radial-glow from-white/10 to-transparent" />
                        <h2 className="text-3xl font-bold mb-4 relative z-10 tracking-tight">Novidades toda semana!</h2>
                        <p className="text-white/70 max-w-xl mx-auto relative z-10">
                            Nossas revistas são atualizadas regularmente com novos estudos e reflexões. Favorite esta página e volte sempre.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Revista;

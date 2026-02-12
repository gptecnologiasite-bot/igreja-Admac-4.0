import { useState, useEffect } from 'react';
import { Baby, Users, Star, Quote, MessageCircle, Edit2, Check, Palette, Music, BookOpen, Sun, X, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import dbService from '../../services/dbService';

const Infantil = () => {
    // Get page data from central DB
    const [pageData, setPageData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [pastoralMessage, setPastoralMessage] = useState({
        text: "Ensinar a uma criança sobre o amor de Jesus é plantar uma semente que dará frutos para a eternidade. Nosso compromisso é criar um ambiente seguro, lúdico e cheio da presença de Deus para que cada pequeno descubra sua identidade em Cristo.",
        author: "Pra. Ana Oliveira",
        role: "Líder do Ministério Infantil"
    });

    useEffect(() => {
        const page = dbService.getPages().find(p => p.slug === 'ministerios/infantil');
        setPageData(page);

        if (page && page.content) {
            try {
                const content = typeof page.content === 'string' ? JSON.parse(page.content) : page.content;
                if (content.pastoralMessage) {
                    setPastoralMessage(content.pastoralMessage);
                    setTempMessage(content.pastoralMessage);
                }
            } catch (e) {
                console.error("Error parsing page content", e);
            }
        }
    }, []);

    // Derived data from pageData with fallbacks
    const content = typeof pageData?.content === 'string' ? JSON.parse(pageData.content) : (pageData?.content || {});

    const teachers = (content.teachers && content.teachers.length > 0) ? content.teachers : [
        { name: 'Pra. Ana Oliveira', role: 'Coordenação Geral', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&h=400&auto=format&fit=crop' },
        { name: 'Tia Carla', role: 'Ensino Bíblico', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&h=400&auto=format&fit=crop' },
    ];

    const kidsStaff = (content.kidsStaff && content.kidsStaff.length > 0) ? content.kidsStaff : [
        { name: 'Tia Bete', role: 'Líder Berçário', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=400&auto=format&fit=crop' },
        { name: 'Tio Paulo', role: 'Musicalização', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=400&auto=format&fit=crop' },
    ];

    const testimonialsData = content.testimonials || [
        {
            text: "Meus filhos amam vir para a igreja por causa do ministério infantil. Eles aprendem a Bíblia de um jeito que realmente entendem.",
            author: "Fernanda Lima",
            role: "Mãe do Theo e da Alice"
        },
        {
            text: "Excelente equipe e ambiente extremamente seguro. Posso participar do culto tranquila sabendo que eles estão sendo bem cuidados.",
            author: "Juliana Silva",
            role: "Mãe da Sofia"
        },
        {
            text: "O material didático é incrível. Eles chegam em casa contando as histórias e cantando as músicas o dia todo!",
            author: "Roberto Junior",
            role: "Pai do Lucas"
        }
    ];

    const handleSave = () => {
        setPastoralMessage(tempMessage);

        // Update central DB
        const currentContent = typeof pageData?.content === 'string' ? JSON.parse(pageData.content) : (pageData?.content || {});

        const updatedContent = {
            ...currentContent,
            pastoralMessage: tempMessage,
            teachers: teachers,
            kidsStaff: kidsStaff,
            testimonials: testimonialsData
        };

        dbService.upsertPage({
            ...pageData,
            slug: 'ministerios/infantil',
            title: 'Infantil',
            content: updatedContent
        });

        setIsEditing(false);
    };

    const handleCancel = () => {
        setTempMessage(pastoralMessage);
        setIsEditing(false);
    };

    return (
        <div className="pt-24 pb-20 min-h-screen bg-white dark:bg-church-dark transition-colors duration-300">
            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center overflow-hidden mb-20">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-linear-to-r from-church-dark to-transparent z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1481132821932-6f9e31535497?q=80&w=2000&auto=format&fit=crop"
                        alt="Ministério Infantil Admac"
                        className="w-full h-full object-cover opacity-60 dark:opacity-40"
                    />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="max-w-3xl"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-yellow-400/20 backdrop-blur-md rounded-xl border border-white/10">
                                <Baby className="w-8 h-8 text-yellow-500" />
                            </div>
                            <span className="text-yellow-500 font-bold text-xs tracking-widest uppercase">Pequenos Discípulos</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-tight uppercase">
                            Cuidando do <span className="text-yellow-400">Futuro</span>
                        </h1>
                        <p className="text-xl text-gray-200 mb-8 italic font-medium border-l-4 border-yellow-400 pl-6">
                            &quot;Ensina a criança no caminho em que deve andar...&quot;
                            <span className="block not-italic text-sm font-bold text-yellow-400 mt-2 text-right">Provérbios 22:6</span>
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >

                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl leading-relaxed mb-16 font-medium">
                        Na ADMAC, o Ministério Infantil foca em apresentar o amor de Deus de forma lúdica, segura e cheia de alegria. Cremos que ensinar a criança no caminho do Senhor é o maior investimento que podemos fazer.
                    </p>

                    {/* Teachers Section */}
                    <section className="mb-32">
                        <div className="flex flex-col items-center mb-16">
                            <div className="p-3 bg-yellow-400/10 rounded-2xl text-yellow-600 mb-4">
                                <Users size={32} />
                            </div>
                            <h2 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter text-center">Nossos Professores</h2>
                            <div className="w-16 h-1.5 bg-yellow-400 rounded-full mt-4"></div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-12 max-w-6xl mx-auto">
                            {teachers.map((leader, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group text-center w-full sm:w-[280px]"
                                >
                                    <div className="relative mb-6 mx-auto w-48 h-48">
                                        {/* Decorative Glow */}
                                        <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-2xl group-hover:bg-yellow-400/40 transition-colors duration-500"></div>

                                        {/* Circle Frame */}
                                        <div className="relative w-full h-full rounded-full border-4 border-white dark:border-slate-800 overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3">
                                            <img
                                                src={leader.image}
                                                alt={leader.name}
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = 'https://placehold.co/400x400/1a365d/ffffff?text=' + encodeURIComponent(leader.name);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <h4 className="text-2xl font-black text-gray-900 dark:text-white mb-1 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                                        {leader.name}
                                    </h4>
                                    <p className="text-yellow-600 dark:text-yellow-400 font-black text-xs tracking-widest uppercase">
                                        {leader.role}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Kids Support Team Section */}
                    <section className="mb-32">
                        <div className="flex flex-col items-center mb-16">
                            <div className="p-3 bg-yellow-400/10 rounded-2xl text-yellow-600 mb-4">
                                <Baby size={32} />
                            </div>
                            <h2 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter text-center">Equipe para Crianças</h2>
                            <div className="w-16 h-1.5 bg-yellow-400 rounded-full mt-4"></div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-12 max-w-6xl mx-auto">
                            {kidsStaff.map((leader, index) => (
                                <motion.div
                                    key={index + '_support'}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group text-center w-full sm:w-[280px]"
                                >
                                    <div className="relative mb-6 mx-auto w-48 h-48">
                                        <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-2xl group-hover:bg-yellow-400/40 transition-colors duration-500"></div>
                                        <div className="relative w-full h-full rounded-full border-4 border-white dark:border-slate-800 overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3">
                                            <img
                                                src={leader.image}
                                                alt={leader.name}
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = 'https://placehold.co/400x400/1a365d/ffffff?text=' + encodeURIComponent(leader.name);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <h4 className="text-2xl font-black text-gray-900 dark:text-white mb-1 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                                        {leader.name}
                                    </h4>
                                    <p className="text-yellow-600 dark:text-yellow-400 font-black text-xs tracking-widest uppercase">
                                        {leader.role}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="p-10 rounded-[2.5rem] bg-yellow-400 text-church-primary space-y-4">
                            <Star className="w-12 h-12 text-yellow-700" />
                            <h2 className="text-3xl font-bold">Base do Ensino</h2>
                            <p className="text-yellow-900/80 leading-relaxed text-lg font-medium">
                                Usamos recursos lúdicos, música e teatro para que a palavra de Deus seja compreendida de forma leve e profunda por cada faixa etária.
                            </p>
                        </div>
                        <div className="p-10 rounded-[2.5rem] border-2 border-dashed border-gray-200 dark:border-white/10 flex flex-col justify-center text-center space-y-4">
                            <Sun className="w-12 h-12 text-yellow-500 mx-auto" />
                            <h2 className="text-3xl font-bold text-church-primary dark:text-white tracking-tight">Nosso Versículo</h2>
                            <p className="text-gray-500 dark:text-gray-400 text-lg">
                                &quot;Ensina a criança no caminho em que deve andar, e, ainda quando for velho, não se desviará dele.&quot; <br />
                                <span className="font-bold text-yellow-500">Provérbios 22:6</span>
                            </p>
                        </div>
                    </div>

                    {/* Palavra Pastoral Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-20 p-8 md:p-12 rounded-4xl bg-linear-to-br from-[#1a1c23] to-[#252733] border border-white/5 relative overflow-hidden group shadow-2xl"
                    >
                        <div className="absolute top-0 right-0 p-12 opacity-5">
                            <MessageCircle className="w-64 h-64 text-white" />
                        </div>

                        {/* Edit Button */}
                        <button
                            onClick={() => !isEditing && setIsEditing(true)}
                            className={`absolute top-6 right-6 z-20 flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-400/20 hover:bg-yellow-400 text-white border border-yellow-400/40 transition-all duration-300 ${isEditing ? 'hidden' : 'flex'}`}
                        >
                            <Edit2 size={18} />
                            <span className="text-sm font-bold uppercase tracking-wider">Editar Mensagem</span>
                        </button>

                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                <MessageCircle className="text-yellow-400" />
                                Mensagem aos Pais
                            </h2>

                            {isEditing ? (
                                <div className="space-y-6 mb-8 bg-black/30 p-6 rounded-3xl border border-yellow-400/30 animate-in fade-in zoom-in duration-300">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-yellow-400 uppercase tracking-widest ml-1">Mensagem Editorial</label>
                                        <textarea
                                            value={tempMessage.text}
                                            onChange={(e) => setTempMessage({ ...tempMessage, text: e.target.value })}
                                            className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all resize-none h-48 text-lg leading-relaxed"
                                            placeholder="Escreva a mensagem para os pais e crianças..."
                                            autoFocus
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-yellow-400 uppercase tracking-widest ml-1">Autoria</label>
                                            <input
                                                type="text"
                                                value={tempMessage.author}
                                                onChange={(e) => setTempMessage({ ...tempMessage, author: e.target.value })}
                                                className="w-full bg-white/5 border-2 border-white/10 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400"
                                                placeholder="Nome do Pastor/Líder"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-yellow-400 uppercase tracking-widest ml-1">Cargo</label>
                                            <input
                                                type="text"
                                                value={tempMessage.role}
                                                onChange={(e) => setTempMessage({ ...tempMessage, role: e.target.value })}
                                                className="w-full bg-white/5 border-2 border-white/10 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400"
                                                placeholder="Função"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-4 justify-end pt-4 border-t border-white/5">
                                        <button
                                            onClick={handleCancel}
                                            className="px-6 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all font-medium"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-church-primary font-bold transition-all shadow-xl shadow-yellow-400/20 hover:scale-105 active:scale-95"
                                        >
                                            <Check size={20} />
                                            Publicar Agora
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <blockquote className="text-xl md:text-2xl text-gray-300 leading-relaxed italic border-l-4 border-yellow-400 pl-6 mb-8 min-h-[100px] whitespace-pre-wrap">
                                    &quot;{pastoralMessage.text}&quot;
                                </blockquote>
                            )}

                            <div className="flex items-center gap-4">
                                <img
                                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&h=100&auto=format&fit=crop"
                                    alt="Líder"
                                    className="w-12 h-12 rounded-full ring-2 ring-yellow-400"
                                />
                                <div>
                                    <p className="text-white font-bold">{pastoralMessage.author}</p>
                                    <p className="text-yellow-400 text-sm">{pastoralMessage.role}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Testimonials Section */}
                    <div className="mt-20">
                        <h2 className="text-3xl font-bold text-center text-church-primary dark:text-white mb-12">
                            O Que os Pais Dizem
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {testimonialsData.map((testimony, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-8 rounded-4xl bg-white dark:bg-[#1a1c23] shadow-lg border border-gray-100 dark:border-white/5 relative"
                                >
                                    <Quote className="w-10 h-10 text-yellow-400/20 mb-4 absolute top-8 right-8" />
                                    <p className="text-gray-600 dark:text-gray-300 italic mb-6 relative z-10">
                                        &quot;{testimony.text}&quot;
                                    </p>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-church-primary dark:text-white">{testimony.author}</span>
                                        <span className="text-sm text-yellow-600 dark:text-yellow-400">{testimony.role}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Infantil;

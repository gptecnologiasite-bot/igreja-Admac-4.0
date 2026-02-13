import { useState, useEffect } from 'react';
import { LuBookOpen, LuUsers, LuStar, LuQuote, LuMessageCircle, LuPencil, LuCheck, LuGraduationCap, LuBookmark, LuBook, LuLibrary, LuDownload, LuFileText, LuPresentation, LuExternalLink, LuVideo, LuCalendar } from 'react-icons/lu';
import { motion } from 'framer-motion';
import dbService from '../../services/dbService';

const EscolaBiblica = () => {
    // Get page data from central DB
    const [pageData, setPageData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const [pastoralMessage, setPastoralMessage] = useState({
        text: "A Escola Bíblica é o coração da igreja. Aqui não apenas aprendemos sobre a Bíblia, mas somos transformados pelo conhecimento da Verdade. Convido você a mergulhar conosco neste trimestre de aprendizado profundo.",
        author: "Presb. Marcos André",
        role: "Superintendente da EBD"
    });

    useEffect(() => {
        const page = dbService.getPages().find(p => p.slug === 'ministerios/ebd');
        if (page) {
            let processedPage = { ...page };
            if (page.content && typeof page.content === 'string') {
                try {
                    processedPage.content = JSON.parse(page.content);
                } catch (e) {
                    console.error("Error parsing page content", e);
                }
            }

            if (processedPage.content?.pastoralMessage) {
                setPastoralMessage(processedPage.content.pastoralMessage);
            }
            setPageData(processedPage);
        }
    }, []);

    // Temporary state while editing
    const [tempMessage, setTempMessage] = useState(pastoralMessage);

    const fallBackClasses = [
        {
            title: "Classe Adultos",
            theme: "As Epístolas de Paulo",
            teacher: "Prof. Cláudio Santos",
            time: "Domingo, 09:00",
            icon: <LuBook className="w-6 h-6 text-emerald-500" />
        },
        // ... (truncated for brevity, I'll keep the others too)
        {
            title: "Classe Casais",
            theme: "Fundamentos do Lar Cristão",
            teacher: "Pr. João & Pra. Maria",
            time: "Domingo, 09:00",
            icon: <LuUsers className="w-6 h-6 text-pink-500" />
        },
        {
            title: "Classe Juvenis",
            theme: "Identidade em Cristo",
            teacher: "Prof. Débora Lima",
            time: "Domingo, 09:00",
            icon: <LuStar className="w-6 h-6 text-yellow-500" />
        },
        {
            title: "Classe Infantil",
            theme: "Heróis da Fé",
            teacher: "Tia Rose & Equipe",
            time: "Domingo, 09:00",
            icon: <LuGraduationCap className="w-6 h-6 text-orange-500" />
        }
    ];

    const classes = (pageData?.content?.classes || fallBackClasses).map(cls => ({
        ...cls,
        icon: cls.icon || <LuBook className="w-6 h-6 text-emerald-500" />
    }));

    const fallBackProfessors = [
        { name: 'Presb. Marcos André', role: 'Superintendente', bio: 'Especialista em Teologia Bíblica e Liderança.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&h=400&auto=format&fit=crop' },
        { name: 'Prof. Cláudio Santos', role: 'Classe Adultos', bio: 'Bacharel em Teologia com foco em Novos Testamento.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=400&auto=format&fit=crop' },
        { name: 'Prof. Débora Lima', role: 'Classe Juvenis', bio: 'Pedagoga e entusiasta do ensino criativo.', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&h=400&auto=format&fit=crop' },
        { name: 'Tia Rose', role: 'Classe Infantil', bio: 'Dedicação ao ensino lúdico para crianças.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=400&auto=format&fit=crop' },
    ];

    const professors = pageData?.content?.leaders || fallBackProfessors;

    const fallBackVideos = [
        { title: 'Doutrina de Deus - Aula 01', url: 'https://www.youtube.com/watch?v=kYI9g82P8f0', date: '2024-03-10' },
        { title: 'Bibliologia - Aula 02', url: 'https://www.youtube.com/watch?v=kYI9g82P8f0', date: '2024-03-17' }
    ];

    const lessonVideos = (pageData?.content?.lessonVideos && pageData.content.lessonVideos.length > 0)
        ? pageData.content.lessonVideos
        : fallBackVideos;



    const handleSave = () => {
        setPastoralMessage(tempMessage);

        const currentContent = typeof pageData?.content === 'string'
            ? JSON.parse(pageData.content)
            : (pageData?.content || {});

        // Update central DB
        const updatedContent = {
            ...currentContent,
            pastoralMessage: tempMessage,
            leaders: professors,
            classes: classes,
            lessonVideos: lessonVideos
        };

        dbService.upsertPage({
            ...pageData,
            slug: 'ministerios/ebd',
            title: 'Escola Bíblica',
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
                        src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2000&auto=format&fit=crop"
                        alt="Escola Bíblica Admac"
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
                            <div className="p-3 bg-emerald-600/20 backdrop-blur-md rounded-xl border border-white/10">
                                <LuLibrary className="w-8 h-8 text-emerald-400" />
                            </div>
                            <span className="text-emerald-400 font-bold text-xs tracking-widest uppercase">Portal do Conhecimento</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-tight uppercase">
                            Escola <span className="text-emerald-400">Bíblica</span>
                        </h1>
                        <p className="text-xl text-gray-200 mb-8 italic font-medium border-l-4 border-emerald-400 pl-6">
                            &quot;O conhecimento da Verdade é o fundamento da liberdade.&quot;
                            <span className="block not-italic text-sm font-bold text-emerald-400 mt-2 text-right">João 8:32</span>
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
                        Um espaço dedicado ao estudo sistemático, crescimento espiritual e maturidade cristã. Na ADMAC, a Palavra de Deus é a nossa única regra de fé e prática, e a EBD é onde mergulhamos em Seus ensinos.
                    </p>

                    {/* Classes Grid - NEW SPECIAL SECTION */}
                    <div className="mb-32">
                        <div className="flex items-center gap-3 mb-10">
                            <LuBookOpen className="text-emerald-500 w-8 h-8" />
                            <h2 className="text-4xl font-black text-church-primary dark:text-white uppercase tracking-tighter">Nossas Classes</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {classes.map((cls, idx) => (
                                <motion.div
                                    key={cls.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="p-8 rounded-[2.5rem] bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-emerald-500/30 hover:shadow-2xl transition-all group"
                                >
                                    <div className="p-3 rounded-2xl bg-white dark:bg-white/5 w-fit mb-6 group-hover:scale-110 transition-transform shadow-sm">
                                        {cls.icon}
                                    </div>
                                    <h3 className="text-2xl font-black text-church-primary dark:text-white mb-2 tracking-tight">{cls.title}</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1">Tema Atual</p>
                                            <p className="text-gray-600 dark:text-gray-400 font-bold leading-tight">{cls.theme}</p>
                                        </div>
                                        <div className="pt-4 border-t border-gray-200 dark:border-white/10">
                                            <p className="text-sm text-gray-500 dark:text-gray-500 flex items-center gap-2 font-medium">
                                                <LuUsers size={14} className="text-emerald-500" />
                                                {cls.teacher}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Standardized "Nossa Equipe" (Corpo Docente) */}
                    <section className="mb-32">
                        <div className="flex flex-col items-center mb-16">
                            <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-500 mb-4">
                                <LuUsers size={32} />
                            </div>
                            <h2 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Nossa Equipe</h2>
                            <div className="w-16 h-1.5 bg-emerald-500 rounded-full mt-4"></div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-12 max-w-6xl mx-auto">
                            {professors.map((prof, index) => (
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
                                        <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl group-hover:bg-emerald-500/40 transition-colors duration-500"></div>

                                        {/* Circle Frame */}
                                        <div className="relative w-full h-full rounded-full border-4 border-white dark:border-slate-800 overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3">
                                            <img
                                                src={prof.image}
                                                alt={prof.name}
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                            />
                                        </div>
                                    </div>
                                    <h4 className="text-2xl font-black text-gray-900 dark:text-white mb-1 group-hover:text-emerald-500 transition-colors">
                                        {prof.name}
                                    </h4>
                                    <p className="text-emerald-500 dark:text-emerald-400 font-black text-xs tracking-widest uppercase">
                                        {prof.role}
                                    </p>
                                    <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 line-clamp-2 px-4 group-hover:text-gray-400 transition-colors">
                                        {prof.bio}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Vídeos das Lições - NEW VIDEO SECTION */}
                    <div className="mb-32">
                        <div className="flex items-center gap-3 mb-10">
                            <LuVideo className="text-emerald-500 w-8 h-8" />
                            <h2 className="text-4xl font-black text-church-primary dark:text-white uppercase tracking-tighter">Vídeos das Lições</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {lessonVideos.map((video, idx) => {
                                // Extract youtube ID for thumbnail
                                const videoId = video.url.includes('v=') ? video.url.split('v=')[1]?.split('&')[0] : video.url.split('/').pop();

                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        className="rounded-3xl overflow-hidden bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-emerald-500/30 transition-all group"
                                    >
                                        <div className="relative aspect-video">
                                            <img
                                                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                                                alt={video.title}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop';
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <a
                                                    href={video.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-4 rounded-full bg-emerald-500 text-white shadow-xl hover:scale-110 transition-transform"
                                                >
                                                    <LuExternalLink size={24} />
                                                </a>
                                            </div>
                                            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                                                <LuCalendar size={12} className="text-emerald-400" />
                                                {video.date ? new Date(video.date).toLocaleDateString('pt-BR') : 'Data Indisponível'}
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-church-primary dark:text-white mb-4 line-clamp-1">{video.title}</h3>
                                            <a
                                                href={video.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 font-bold hover:bg-emerald-500 hover:text-white transition-all group-hover:shadow-lg"
                                            >
                                                <LuVideo size={18} /> Assistir Aula
                                            </a>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Biblioteca de Recursos - NEW DOWNLOAD SECTION */}
                    <div className="mb-24">
                        <div className="flex items-center gap-3 mb-10">
                            <LuLibrary className="text-emerald-500 w-6 h-6" />
                            <h2 className="text-3xl font-bold text-church-primary dark:text-white">Biblioteca de Recursos</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { title: "Revista Trimestral", type: "PDF", size: "4.2 MB", icon: <LuFileText className="text-emerald-500" /> },
                                { title: "Esboço da Lição Atual", type: "DOCX", size: "1.2 MB", icon: <LuFileText className="text-blue-500" /> },
                                { title: "Slides: Visão Geral", type: "PPTX", size: "8.5 MB", icon: <LuPresentation className="text-orange-500" /> }
                            ].map((item, idx) => (
                                <div key={idx} className="p-6 rounded-3xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 flex items-center justify-between group hover:bg-emerald-500/5 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-2xl bg-white dark:bg-white/5 shadow-sm">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-church-primary dark:text-white">{item.title}</h4>
                                            <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">{item.type} • {item.size}</p>
                                        </div>
                                    </div>
                                    <button className="p-3 rounded-xl bg-emerald-600 text-white hover:scale-110 active:scale-95 transition-all shadow-lg shadow-emerald-600/20">
                                        <LuDownload size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mural do Aluno - NEW MURAL SECTION */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
                        <div className="lg:col-span-2 p-10 rounded-[3rem] bg-linear-to-br from-emerald-600 to-emerald-700 text-white shadow-2xl relative overflow-hidden">
                            <LuQuote className="absolute -bottom-4 -right-4 w-40 h-40 text-white/10" />
                            <div className="relative z-10">
                                <div className="p-2 bg-white/20 rounded-lg w-fit mb-6">
                                    <LuBookmark className="w-6 h-6" />
                                </div>
                                <h2 className="text-4xl font-black mb-6">Mural de Estudos</h2>
                                <div className="space-y-6">
                                    <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                                        <p className="text-xs font-bold uppercase tracking-widest mb-2 opacity-60">Dica de hoje</p>
                                        <p className="text-xl font-medium">&ldquo;O estudo da palavra exige tempo, silêncio e um coração ensinável. Deixe o autor do livro falar com você.&rdquo;</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-1 p-4 rounded-xl bg-black/10">
                                            <p className="text-sm font-bold opacity-60">Versículo Chave</p>
                                            <p className="font-bold">2 Timóteo 2:15</p>
                                        </div>
                                        <div className="flex-1 p-4 rounded-xl bg-black/10">
                                            <p className="text-sm font-bold opacity-60">Próxima Leitura</p>
                                            <p className="font-bold">Eclesiastes 3</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center space-y-8 bg-gray-50 dark:bg-white/5 p-10 rounded-[3rem] border border-gray-100 dark:border-white/5">
                            <h3 className="text-3xl font-bold text-church-primary dark:text-white text-center">Por que participar?</h3>
                            <div className="space-y-6">
                                {[
                                    { icon: <LuCheck className="text-emerald-500" />, text: "Fundamento bíblico sólido" },
                                    { icon: <LuCheck className="text-emerald-500" />, text: "Espaço para tirar dúvidas" },
                                    { icon: <LuCheck className="text-emerald-500" />, text: "Comunhão com outros alunos" },
                                    { icon: <LuCheck className="text-emerald-500" />, text: "Materiais exclusivos" }
                                ].map((item, id) => (
                                    <div key={id} className="flex items-center gap-4 text-gray-600 dark:text-gray-300 font-medium">
                                        <div className="p-1 rounded-full bg-emerald-500/10 shrink-0">
                                            {item.icon}
                                        </div>
                                        {item.text}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Palavra Pastoral Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="p-8 md:p-12 rounded-[2.5rem] bg-linear-to-br from-[#1a1c23] to-[#252733] border border-white/5 relative overflow-hidden group shadow-2xl"
                    >
                        {/* Edit Button */}
                        <button
                            onClick={() => !isEditing && setIsEditing(true)}
                            className={`absolute top-6 right-6 z-20 flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-white border border-emerald-600/40 transition-all duration-300 ${isEditing ? 'hidden' : 'flex'}`}
                        >
                            <LuPencil size={18} />
                            <span className="text-sm font-bold uppercase tracking-wider">Editar Visão</span>
                        </button>

                        <div className="relative z-10 max-w-4xl mx-auto text-center">
                            <LuMessageCircle className="text-emerald-500 w-12 h-12 mx-auto mb-8" />
                            <h2 className="text-3xl font-bold text-white mb-10 tracking-tight">
                                Palavra da Superintendência
                            </h2>

                            {isEditing ? (
                                <div className="space-y-6 mb-8 bg-black/30 p-8 rounded-3xl border border-emerald-500/30">
                                    <textarea
                                        value={tempMessage.text}
                                        onChange={(e) => setTempMessage({ ...tempMessage, text: e.target.value })}
                                        className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 h-48 text-lg"
                                        placeholder="Mensagem aos alunos..."
                                    />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            value={tempMessage.author}
                                            onChange={(e) => setTempMessage({ ...tempMessage, author: e.target.value })}
                                            className="w-full bg-white/5 border-2 border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500"
                                            placeholder="Nome"
                                        />
                                        <input
                                            type="text"
                                            value={tempMessage.role}
                                            onChange={(e) => setTempMessage({ ...tempMessage, role: e.target.value })}
                                            className="w-full bg-white/5 border-2 border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500"
                                            placeholder="Cargo"
                                        />
                                    </div>
                                    <div className="flex gap-4 justify-center">
                                        <button onClick={handleCancel} className="px-6 py-2 text-gray-400 font-bold">Cancelar</button>
                                        <button onClick={handleSave} className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-emerald-600 text-white font-bold">
                                            <LuCheck size={20} /> Publicar
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <blockquote className="text-2xl md:text-4xl text-gray-200 font-serif mb-12 italic leading-snug">
                                    &quot;{pastoralMessage.text}&quot;
                                </blockquote>
                            )}

                            <div className="flex flex-col items-center">
                                <img
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&h=100&auto=format&fit=crop"
                                    alt="Superintendente"
                                    className="w-16 h-16 rounded-full ring-2 ring-emerald-500 mb-4"
                                />
                                <p className="text-white font-bold text-xl">{pastoralMessage.author}</p>
                                <p className="text-emerald-500 font-bold uppercase tracking-widest text-xs">{pastoralMessage.role}</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default EscolaBiblica;

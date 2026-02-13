import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUp, ArrowDown, Save, Activity, Calendar, Users, Heart, Star, Music, Book, Camera, MapPin, Phone, Mail, Clock, Baby, Trash2, Plus, MessageCircle, Share2, Video, X, Image as ImageIcon } from 'lucide-react';
import dbService from '../../services/dbService';

const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

const getYouTubeThumbnail = (id) => {
    return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
};

const extractUrlFromIframe = (input) => {
    if (!input) return input;
    if (input.trim().startsWith('<iframe')) {
        const match = input.match(/src="([^"]+)"/);
        return match ? match[1] : input;
    }
    return input;
};

const PageEditor = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = !!id;

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        status: 'Ativo',
        content: ''
    });

    const [pastoralMessage, setPastoralMessage] = useState({
        text: '',
        author: '',
        role: ''
    });

    const [raffle, setRaffle] = useState({
        title: '',
        description: '',
        link: '',
        image: '',
        pix: '',
        useDemo: false
    });

    const [productPromotion, setProductPromotion] = useState({
        title: '',
        description: '',
        price: '',
        link: '',
        image: ''
    });

    const [testimonials, setTestimonials] = useState([]);
    const [classes, setClasses] = useState([]);
    const [magazineArticles, setMagazineArticles] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [kidsStaff, setKidsStaff] = useState([]);
    const [lessonVideos, setLessonVideos] = useState([]);
    const [homensGallery, setHomensGallery] = useState([]);

    const [magazineFeatured, setMagazineFeatured] = useState({
        title: '',
        description: '',
        image: '',
        link: '',
        buttonText: 'Ler Agora'
    });

    const [kidsGalleryPreview, setKidsGalleryPreview] = useState({
        title: 'O que rolou na última EBF',
        buttonText: 'Ver Galeria Completa',
        link: ''
    });

    const [leadershipContent, setLeadershipContent] = useState({
        leaders: [],
        obreiros: {
            title: 'Corpo de Obreiros',
            text: 'Além do ministério pastoral, contamos com uma equipe dedicada de diáconos, presbíteros e evangelistas que auxiliam no andamento da obra.'
        },
        chamado: {
            title: 'Nosso Chamado',
            text: 'Apascentai o rebanho de Deus, que está entre vós, tendo cuidado dele... de boa vontade.',
            reference: '1 Pedro 5:2'
        }
    });

    const [homeHero, setHomeHero] = useState({
        badge: 'Bem-vindo à ADMAC',
        title: 'Uma Família para Pertencer',
        subtitle: 'Nós acreditamos no amor que transforma e na fé que renova.'
    });



    const [homeAgenda, setHomeAgenda] = useState({
        title: 'Programação',
        description: 'Nossa programação semanal é pensada para que você e sua família possam desfrutar de momentos de comunhão e aprendizado.',
        nextEvent: {
            title: 'Conferência de Família - Março 15',
            label: 'Próximo Evento Especial'
        },
        events: [
            {
                day: 'Domingo',
                sessions: [
                    { time: '09:00', title: 'Escola Bíblica Dominical', type: 'Ensino' },
                    { time: '18:00', title: 'Culto de Celebração', type: 'Celebração' }
                ]
            },
            {
                day: 'Terça-feira',
                sessions: [
                    { time: '19:30', title: 'Culto de Ensino & Oração', type: 'Oração' }
                ]
            }
        ]
    });

    const [homeCarousel, setHomeCarousel] = useState([]);

    const [homeAbout, setHomeAbout] = useState({
        title: 'Quem Somos',
        text1: 'A ADMAC (Assembléia de Deus Ministério Aliança Comunitária) é mais do que uma igreja, é um lugar onde você encontra propósito, esperança e uma família de fé.',
        text2: 'Fundada com o objetivo de ser um farol de luz em nossa comunidade, temos nos dedicado ao ensino das escrituras e ao cuidado mútuo, sempre buscando a presença de Deus em tudo o que fazemos.',
        mission: 'Levar a mensagem do evangelho a todas as nações, transformando vidas através do amor de Cristo.',
        vision: 'Ser uma igreja relevante, acolhedora e referencia na pregação da palavra e serviço social.',
        values: 'Amor incondicional, integridade, serviço ao próximo, adoração genuína e fidelidade bíblica.',
        images: [
            "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=1000&auto=format&fit=crop"
        ]
    });

    const [homeMinistries, setHomeMinistries] = useState({
        title: 'Nossos Ministérios',
        description: 'Há um lugar para você servir e crescer. Conheça as áreas de atuação da nossa igreja e envolva-se.',
        items: [] // Will be populated from current static data or fallback
    });


    const [homePodcast, setHomePodcast] = useState({
        badge: 'Podcast ADMAC',
        title: 'Ouça Nossas Mensagens em Qualquer Lugar',
        description: 'Fique por dentro das últimas pregações, estudos bíblicos e conversas inspiradoras.',
        spotifyUrl: 'https://open.spotify.com/show/6vf8aTHBG3ms8DGo5jCsAG',
        spotifyEmbed: 'https://open.spotify.com/embed/episode/6vf8aTHBG3ms8DGo5jCsAG?utm_source=generator&theme=0'
    });

    const [homeMagazines, setHomeMagazines] = useState({
        title: 'Nossa Revista Digital',
        description: 'Conteúdo exclusivo dividido por áreas de interesse. Clique e mergulhe em estudos, notícias e inspiração.',
        items: []
    });

    const [homeMedia, setHomeMedia] = useState({
        title: 'Nossa Mídia',
        description: 'Conecte-se conosco através das redes sociais e não perca nenhum momento importante da nossa caminhada.',
        platforms: {
            youtube: 'https://youtube.com',
            instagram: 'https://instagram.com',
            facebook: 'https://facebook.com',
            whatsapp: 'https://wa.me/5511999999999'
        },
        featuredVideo: {
            title: 'Esperança em Tempos Difíceis - Pr. Elias Santos',
            tag: 'ÚLTIMA MENSAGEM',
            image: 'https://images.unsplash.com/photo-1510003343711-64353896504a?q=80&w=1600&auto=format&fit=crop',
            videoUrl: ''
        }
    });

    const [homeContact, setHomeContact] = useState({
        title: 'Fale Conosco',
        description: 'Tem alguma dúvida, pedido de oração ou quer nos visitar? Entre em contato conosco.',
        address: 'Rua da Igreja, 123, Centro\nCidade - UF, 00000-000',
        phone: '(00) 1234-5678\n(00) 98765-4321',
        email: 'contato@admac.com.br\nsecretaria@admac.com.br',
        hours: 'Segunda a Sexta\n09:00 - 17:00'
    });

    // Media Page State
    const [mediaPageContent, setMediaPageContent] = useState({
        videos: [],
        audios: [],
        photos: [],
        social: []
    });

    useEffect(() => {
        if (isEditing) {
            const page = dbService.getPageById(id);
            if (page) {
                const isMinistry = page.slug?.startsWith('ministerios/');
                let content = page.content || '';

                if (isMinistry && content) {
                    try {
                        const parsedContent = typeof content === 'string' ? JSON.parse(content) : content;
                        if (parsedContent.pastoralMessage) {
                            setPastoralMessage(parsedContent.pastoralMessage);
                        }
                        if (parsedContent.raffle) {
                            setRaffle(parsedContent.raffle);
                        }
                        if (parsedContent.productPromotion) {
                            setProductPromotion(parsedContent.productPromotion);
                        }
                        if (parsedContent.testimonials) {
                            setTestimonials(parsedContent.testimonials);
                        }
                        if (parsedContent.classes) {
                            setClasses(parsedContent.classes);
                        }
                        if (parsedContent.lessonVideos) {
                            setLessonVideos(parsedContent.lessonVideos);
                        } else if (page.slug === 'ministerios/ebd') {
                            setLessonVideos([
                                { title: 'Doutrina de Deus - Aula 01', url: 'https://www.youtube.com/watch?v=kYI9g82P8f0', date: '2024-03-10' },
                                { title: 'Bibliologia - Aula 02', url: 'https://www.youtube.com/watch?v=kYI9g82P8f0', date: '2024-03-17' }
                            ]);
                        }
                        if (parsedContent.leaders || parsedContent.obreiros || parsedContent.chamado) {
                            setLeadershipContent({
                                leaders: parsedContent.leaders || [],
                                obreiros: parsedContent.obreiros || leadershipContent.obreiros,
                                chamado: parsedContent.chamado || leadershipContent.chamado
                            });
                        }
                        if (parsedContent.teachers && parsedContent.teachers.length > 0) {
                            setTeachers(parsedContent.teachers);
                        } else if (page.slug === 'ministerios/infantil') {
                            setTeachers([
                                { name: 'Pra. Ana Oliveira', role: 'Coordenação Geral', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&h=400&auto=format&fit=crop' },
                                { name: 'Tia Carla', role: 'Ensino Bíblico', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&h=400&auto=format&fit=crop' },
                            ]);
                        }

                        if (parsedContent.kidsStaff && parsedContent.kidsStaff.length > 0) {
                            setKidsStaff(parsedContent.kidsStaff);
                        } else if (page.slug === 'ministerios/infantil') {
                            setKidsStaff([
                                { name: 'Tia Bete', role: 'Líder Berçário', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=400&auto=format&fit=crop' },
                                { name: 'Tio Paulo', role: 'Musicalização', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=400&auto=format&fit=crop' },
                            ]);
                        }

                        if (parsedContent.gallery && page.slug === 'ministerios/homens') {
                            setHomensGallery(parsedContent.gallery);
                        } else if (page.slug === 'ministerios/homens') {
                            setHomensGallery([
                                { url: "https://images.unsplash.com/photo-1510003343711-64353896504a?q=80&w=600", caption: "Culto de Homens" },
                                { url: "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=600", caption: "Comunhão" },
                                { url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600", caption: "Liderança" },
                                { url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600", caption: "Evento Especial" }
                            ]);
                        }
                    } catch (e) {
                        console.error("Error parsing ministry content", e);
                    }
                }

                if ((page.slug === 'inicio' || page.slug === 'contato') && content) {
                    try {
                        const parsedContent = typeof content === 'string' ? JSON.parse(content) : content;
                        if (parsedContent.hero) {
                            setHomeHero(parsedContent.hero);
                        }
                        if (parsedContent.carousel) {
                            setHomeCarousel(parsedContent.carousel);
                        }
                        if (parsedContent.about) {
                            setHomeAbout(prev => ({
                                ...prev,
                                ...parsedContent.about,
                                images: (parsedContent.about.images && parsedContent.about.images.length > 0)
                                    ? parsedContent.about.images
                                    : prev.images
                            }));
                        }
                        if (parsedContent.agenda) {
                            setHomeAgenda(parsedContent.agenda);
                        }
                        if (parsedContent.ministries) {
                            setHomeMinistries(parsedContent.ministries);
                        }
                        if (parsedContent.podcast) {
                            setHomePodcast(parsedContent.podcast);
                        }
                        if (parsedContent.magazines) {
                            setHomeMagazines(parsedContent.magazines);
                        }
                        if (parsedContent.media) {
                            setHomeMedia(parsedContent.media);
                        }
                        if (parsedContent.contact) {
                            setHomeContact(parsedContent.contact);
                        }
                    } catch (e) {
                        console.error("Error parsing home content", e);
                    }
                }

                // Magazine pages
                if (page.slug.startsWith('revista/') && content) {
                    try {
                        const parsedContent = typeof content === 'string' ? JSON.parse(content) : content;
                        if (parsedContent.articles) {
                            setMagazineArticles(parsedContent.articles);
                        }
                        if (parsedContent.featured) {
                            setMagazineFeatured(parsedContent.featured);
                        }
                        if (parsedContent.galleryPreview && page.slug === 'revista/kids') {
                            setKidsGalleryPreview(parsedContent.galleryPreview);
                        }
                    } catch (e) {
                        console.error("Error parsing magazine content", e);
                    }
                }

                // Media page
                if (page.slug === 'midia' && content) {
                    try {
                        const parsedContent = typeof content === 'string' ? JSON.parse(content) : content;
                        setMediaPageContent({
                            videos: Array.isArray(parsedContent.videos) ? parsedContent.videos : [],
                            audios: Array.isArray(parsedContent.audios) ? parsedContent.audios : [],
                            photos: Array.isArray(parsedContent.photos) ? parsedContent.photos : [],
                            social: Array.isArray(parsedContent.social) ? parsedContent.social : []
                        });
                    } catch (e) {
                        console.error("Error parsing media content", e);
                    }
                }

                setFormData({
                    title: page.title,
                    slug: page.slug || page.title.toLowerCase().replace(/ /g, '-'),
                    status: page.status,
                    content: typeof content === 'object' ? JSON.stringify(content, null, 2) : content
                });
            }
        }
    }, [id, isEditing]);

    const handleSubmit = (e) => {
        e.preventDefault();

        let finalContent = formData.content;
        const savedSlug = formData.slug?.trim();
        const checkSlug = savedSlug?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const isMinistry = checkSlug?.startsWith('ministerios/');

        if (isMinistry) {
            let existingContent = {};
            try {
                existingContent = typeof formData.content === 'string' && formData.content ? JSON.parse(formData.content) : (typeof formData.content === 'object' ? formData.content : {});
            } catch (e) { }

            finalContent = {
                ...existingContent,
                pastoralMessage: pastoralMessage,
                leaders: leadershipContent.leaders,
                teachers: checkSlug === 'ministerios/infantil' ? teachers : existingContent.teachers,
                kidsStaff: checkSlug === 'ministerios/infantil' ? kidsStaff : existingContent.kidsStaff,
                testimonials: testimonials,
                classes: checkSlug === 'ministerios/ebd' ? classes : undefined,
                lessonVideos: checkSlug === 'ministerios/ebd' ? lessonVideos : undefined,
                gallery: checkSlug === 'ministerios/homens' ? homensGallery : existingContent.gallery
            };

            if (checkSlug === 'ministerios/lideranca') {
                finalContent = {
                    ...finalContent,
                    obreiros: leadershipContent.obreiros,
                    chamado: leadershipContent.chamado
                };
            }
        }

        else if (checkSlug === 'inicio' || checkSlug === 'contato') {
            let existingContent = {};
            try {
                existingContent = typeof formData.content === 'string' && formData.content ? JSON.parse(formData.content) : (typeof formData.content === 'object' ? formData.content : {});
            } catch (e) { }

            finalContent = {
                ...existingContent,
                hero: homeHero,
                carousel: homeCarousel,
                about: homeAbout,
                agenda: homeAgenda,
                ministries: homeMinistries,
                podcast: homePodcast,
                magazines: homeMagazines,
                media: homeMedia,
                contact: homeContact
            };
        } else if (checkSlug === 'midia') {
            let existingContent = {};
            try {
                existingContent = typeof formData.content === 'string' && formData.content ? JSON.parse(formData.content) : (typeof formData.content === 'object' ? formData.content : {});
            } catch (e) { }

            finalContent = {
                ...existingContent,
                videos: mediaPageContent.videos,
                gallery: mediaPageContent.videos.map(v => ({
                    id: v.id,
                    title: v.titulo,
                    url: v.url,
                    thumbnail: v.thumbnail
                })),
                audios: mediaPageContent.audios,
                photos: mediaPageContent.photos,
                social: mediaPageContent.social
            };

            // AUTO-SYNC: Update Home Page Featured Video with the first video from the gallery
            if (mediaPageContent.videos && mediaPageContent.videos.length > 0) {
                const latestVideo = mediaPageContent.videos[0];
                const inicioPage = dbService.getPageBySlug('inicio');
                if (inicioPage && inicioPage.content) {
                    const inicioContent = typeof inicioPage.content === 'string' ? JSON.parse(inicioPage.content) : inicioPage.content;
                    if (inicioContent.media) {
                        inicioContent.media.featuredVideo = {
                            ...inicioContent.media.featuredVideo,
                            title: latestVideo.titulo,
                            videoUrl: latestVideo.url,
                            image: latestVideo.thumbnail || getYouTubeThumbnail(getYouTubeId(latestVideo.url))
                        };
                        dbService.upsertPage({
                            ...inicioPage,
                            content: inicioContent
                        });
                    }
                }
            }
        } else if (checkSlug?.startsWith('revista/')) {
            let existingContent = {};
            try {
                existingContent = typeof formData.content === 'string' && formData.content ? JSON.parse(formData.content) : (typeof formData.content === 'object' ? formData.content : {});
            } catch (e) { }

            finalContent = {
                ...existingContent,
                articles: magazineArticles,
                featured: magazineFeatured,
                galleryPreview: checkSlug === 'revista/kids' ? kidsGalleryPreview : undefined
            };
        }

        dbService.upsertPage({
            ...formData,
            slug: savedSlug,
            id: isEditing ? parseInt(id) : null,
            content: finalContent
        });
        alert(`Página ${isEditing ? 'atualizada' : 'criada'} com sucesso!`);
        navigate('/painel/paginas');
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/painel/paginas')}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300 transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
                        {isEditing ? 'Editar Página' : 'Nova Página'}
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400">
                        {isEditing ? 'Atualize as informações da página' : 'Preencha os dados para criar uma nova página'}
                    </p>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Título da Página</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                                placeholder="Ex: Quem Somos"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Slug (URL)</label>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                                placeholder="Ex: quem-somos"
                            />
                        </div>
                    </div>

                    {/* Ministry Specific Section */}
                    {formData.slug?.startsWith('ministerios/') && (
                        <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/30 space-y-6">
                            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                                <Save size={20} />
                                <h3 className="font-bold">Conteúdo do Ministério: Palavra Pastoral</h3>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Mensagem</label>
                                <textarea
                                    value={pastoralMessage.text}
                                    onChange={(e) => setPastoralMessage({ ...pastoralMessage, text: e.target.value })}
                                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
                                    rows={4}
                                    placeholder="Escreva a mensagem pastoral/visão..."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Autor</label>
                                    <input
                                        type="text"
                                        value={pastoralMessage.author}
                                        onChange={(e) => setPastoralMessage({ ...pastoralMessage, author: e.target.value })}
                                        className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
                                        placeholder="Nome do Pastor/Líder"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Cargo</label>
                                    <input
                                        type="text"
                                        value={pastoralMessage.role}
                                        onChange={(e) => setPastoralMessage({ ...pastoralMessage, role: e.target.value })}
                                        className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
                                        placeholder="Ex: Pastor Titular"
                                    />
                                </div>
                            </div>

                            <div className="pt-6 border-t border-emerald-100 dark:border-emerald-800/20 space-y-6">
                                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                                    <Star size={20} />
                                    <h3 className="font-bold">Sorteio / Promoção Especial</h3>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Modo Demonstração</span>
                                    <button
                                        onClick={() => setRaffle({ ...raffle, useDemo: !raffle.useDemo })}
                                        className={`w-12 h-6 rounded-full transition-colors relative ${raffle.useDemo ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`}
                                    >
                                        <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${raffle.useDemo ? 'left-7' : 'left-1'}`} />
                                    </button>
                                </div>

                                {raffle.useDemo && (
                                    <div className="p-4 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-xl text-sm mb-4">
                                        <strong>Modo Demonstração Ativo:</strong> O site exibirá automaticamente o sorteio da "Panela Elétrica" como exemplo. Os campos abaixo ficarão bloqueados.
                                    </div>
                                )}

                                <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${raffle.useDemo ? 'opacity-50 pointer-events-none' : ''}`}>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Título do Sorteio</label>
                                        <input
                                            type="text"
                                            value={raffle.useDemo ? "Sorteio da Panela Elétrica (Exemplo)" : raffle.title}
                                            onChange={(e) => setRaffle({ ...raffle, title: e.target.value })}
                                            className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
                                            placeholder="Ex: Sorteio de Bíblia de Estudos"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Link para Participar</label>
                                        <input
                                            type="text"
                                            value={raffle.useDemo ? "#" : raffle.link}
                                            onChange={(e) => setRaffle({ ...raffle, link: e.target.value })}
                                            className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
                                            placeholder="https://..."
                                        />
                                    </div>
                                    <div className="col-span-1 md:col-span-2 space-y-2">
                                        <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Chave Pix (Opcional)</label>
                                        <input
                                            type="text"
                                            value={raffle.useDemo ? "00.000.000/0001-99" : (raffle.pix || '')}
                                            onChange={(e) => setRaffle({ ...raffle, pix: e.target.value })}
                                            className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white font-mono"
                                            placeholder="CNPJ, E-mail, Telefone ou Chave Aleatória"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">URL da Imagem do Sorteio</label>
                                    <input
                                        type="text"
                                        value={raffle.useDemo ? "https://images.unsplash.com/photo-1546241072-48010ad2862c?q=80&w=800&auto=format&fit=crop" : raffle.image}
                                        onChange={(e) => setRaffle({ ...raffle, image: e.target.value })}
                                        className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
                                        placeholder="https://link-da-imagem.com/foto.jpg"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Descrição do Sorteio</label>
                                    <textarea
                                        value={raffle.useDemo ? "Exemplo: Participe deste sorteio para ganhar uma incrível panela elétrica. Este é um conteúdo demonstrativo." : raffle.description}
                                        onChange={(e) => setRaffle({ ...raffle, description: e.target.value })}
                                        className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
                                        rows={2}
                                        placeholder="Regras ou descrição do prêmio..."
                                    />
                                </div>
                            </div>




                            <div className="pt-6 border-t border-emerald-100 dark:border-emerald-800/20 space-y-6">
                                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                                    <Music size={20} />
                                    <h3 className="font-bold">Divulgação de Produto do Ministério</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Nome do Produto</label>
                                        <input
                                            type="text"
                                            value={productPromotion.title}
                                            onChange={(e) => setProductPromotion({ ...productPromotion, title: e.target.value })}
                                            className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
                                            placeholder="Ex: Camiseta Louvor ADMAC"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Preço / Valor</label>
                                        <input
                                            type="text"
                                            value={productPromotion.price}
                                            onChange={(e) => setProductPromotion({ ...productPromotion, price: e.target.value })}
                                            className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
                                            placeholder="Ex: R$ 45,90"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Link de Compra / Informações</label>
                                    <input
                                        type="text"
                                        value={productPromotion.link}
                                        onChange={(e) => setProductPromotion({ ...productPromotion, link: e.target.value })}
                                        className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
                                        placeholder="https://..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">URL da Imagem do Produto</label>
                                    <input
                                        type="text"
                                        value={productPromotion.image}
                                        onChange={(e) => setProductPromotion({ ...productPromotion, image: e.target.value })}
                                        className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
                                        placeholder="https://link-da-imagem.com/produto.jpg"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Descrição do Produto</label>
                                    <textarea
                                        value={productPromotion.description}
                                        onChange={(e) => setProductPromotion({ ...productPromotion, description: e.target.value })}
                                        className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
                                        rows={2}
                                        placeholder="Detalhes do produto..."
                                    />
                                </div>
                            </div>
                            {/* Gestão de Testemunhos / Comentários */}
                            <div className="pt-6 border-t border-emerald-100 dark:border-emerald-800/20 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                                        <MessageCircle size={20} />
                                        <h3 className="font-bold">Testemunhos / Comentários (Impacto)</h3>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setTestimonials([...testimonials, { text: '', author: '', role: 'Membro da Igreja' }])}
                                        className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500 text-white rounded-lg text-sm font-bold hover:bg-emerald-600 transition-all"
                                    >
                                        <Plus size={16} />
                                        Adicionar Comentário
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {testimonials.length === 0 && (
                                        <div className="text-sm text-slate-500 dark:text-slate-400 text-center py-8 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                                            Nenhum comentário cadastrado. Use o botão acima para adicionar.
                                        </div>
                                    )}
                                    {testimonials.map((testimony, index) => (
                                        <div key={index} className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Autor</label>
                                                        <input
                                                            type="text"
                                                            value={testimony.author}
                                                            onChange={(e) => {
                                                                const newTestimonials = [...testimonials];
                                                                newTestimonials[index].author = e.target.value;
                                                                setTestimonials(newTestimonials);
                                                            }}
                                                            className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
                                                            placeholder="Nome da pessoa"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Função / Cargo</label>
                                                        <input
                                                            type="text"
                                                            value={testimony.role}
                                                            onChange={(e) => {
                                                                const newTestimonials = [...testimonials];
                                                                newTestimonials[index].role = e.target.value;
                                                                setTestimonials(newTestimonials);
                                                            }}
                                                            className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
                                                            placeholder="Ex: Membro da Igreja"
                                                        />
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newTestimonials = [...testimonials];
                                                        newTestimonials.splice(index, 1);
                                                        setTestimonials(newTestimonials);
                                                    }}
                                                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Texto do Comentário</label>
                                                <textarea
                                                    value={testimony.text}
                                                    onChange={(e) => {
                                                        const newTestimonials = [...testimonials];
                                                        newTestimonials[index].text = e.target.value;
                                                        setTestimonials(newTestimonials);
                                                    }}
                                                    className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
                                                    rows={3}
                                                    placeholder="Escreva o testemunho ou comentário aqui..."
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Gestão de Equipe / Líderes */}
                            {formData?.slug !== 'ministerios/infantil' && (
                                <div className="pt-6 border-t border-emerald-100 dark:border-emerald-800/20 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                                            <Users size={20} />
                                            <h3 className="font-bold">Equipe / Líderes do Ministério</h3>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setLeadershipContent({
                                                ...leadershipContent,
                                                leaders: [...leadershipContent.leaders, { name: '', role: '', image: '' }]
                                            })}
                                            className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500 text-white rounded-lg text-sm font-bold hover:bg-emerald-600 transition-all"
                                        >
                                            <Plus size={16} />
                                            Adicionar Líder
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {leadershipContent.leaders.length === 0 && (
                                            <div className="col-span-full text-sm text-slate-500 dark:text-slate-400 text-center py-8 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                                                Nenhum líder cadastrado. Use o botão acima para adicionar.
                                            </div>
                                        )}
                                        {leadershipContent.leaders.map((leader, index) => (
                                            <div key={index} className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm relative group">
                                                <div className="flex gap-4">
                                                    <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border-2 border-emerald-500/20">
                                                        {leader.image ? (
                                                            <img src={leader.image} alt={leader.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                                                                <Users size={24} />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 space-y-3">
                                                        <div className="space-y-1">
                                                            <label className="text-[10px] font-bold text-slate-500 uppercase">Nome Completo</label>
                                                            <input
                                                                type="text"
                                                                value={leader.name}
                                                                onChange={(e) => {
                                                                    const newLeaders = [...leadershipContent.leaders];
                                                                    newLeaders[index].name = e.target.value;
                                                                    setLeadershipContent({ ...leadershipContent, leaders: newLeaders });
                                                                }}
                                                                className="w-full px-3 py-1 bg-slate-50 dark:bg-slate-800 border-b border-transparent focus:border-emerald-500 outline-none text-sm transition-all"
                                                                placeholder="Ex: Pra. Ana Oliveira"
                                                            />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <label className="text-[10px] font-bold text-slate-500 uppercase">Cargo / Função</label>
                                                            <input
                                                                type="text"
                                                                value={leader.role}
                                                                onChange={(e) => {
                                                                    const newLeaders = [...leadershipContent.leaders];
                                                                    newLeaders[index].role = e.target.value;
                                                                    setLeadershipContent({ ...leadershipContent, leaders: newLeaders });
                                                                }}
                                                                className="w-full px-3 py-1 bg-slate-50 dark:bg-slate-800 border-b border-transparent focus:border-emerald-500 outline-none text-sm transition-all"
                                                                placeholder="Ex: Coordenação Geral"
                                                            />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <label className="text-[10px] font-bold text-slate-500 uppercase">URL da Imagem</label>
                                                            <input
                                                                type="text"
                                                                value={leader.image}
                                                                onChange={(e) => {
                                                                    const newLeaders = [...leadershipContent.leaders];
                                                                    newLeaders[index].image = e.target.value;
                                                                    setLeadershipContent({ ...leadershipContent, leaders: newLeaders });
                                                                }}
                                                                className="w-full px-3 py-1 bg-slate-50 dark:bg-slate-800 border-b border-transparent focus:border-emerald-500 outline-none text-[10px] transition-all"
                                                                placeholder="https://images.unsplash.com/..."
                                                            />
                                                        </div>

                                                        <div className="flex gap-2 pt-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    const newLeaders = [...leadershipContent.leaders];
                                                                    newLeaders.splice(index + 1, 0, { ...leader });
                                                                    setLeadershipContent({ ...leadershipContent, leaders: newLeaders });
                                                                }}
                                                                className="flex-1 flex items-center justify-center gap-1 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-lg border border-blue-100 dark:border-blue-900/30 hover:bg-blue-600 hover:text-white transition-all"
                                                            >
                                                                <Save size={12} />
                                                                Duplicar
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    const newLeaders = [...leadershipContent.leaders];
                                                                    newLeaders.splice(index, 1);
                                                                    setLeadershipContent({ ...leadershipContent, leaders: newLeaders });
                                                                }}
                                                                className="px-3 py-1 bg-red-50 dark:bg-red-500/10 text-red-500 text-xs font-bold rounded-lg border border-red-100 dark:border-red-900/30 hover:bg-red-600 hover:text-white transition-all"
                                                            >
                                                                <Trash2 size={12} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Special Sections for Infantil Page: Teachers and Kids Staff */}
                            {formData?.slug === 'ministerios/infantil' && (
                                <>
                                    {/* Teachers Section */}
                                    <div className="pt-6 border-t border-emerald-100 dark:border-emerald-800/20 space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                                                <Users size={20} />
                                                <h3 className="font-bold">Nossos Professores</h3>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setTeachers([...teachers, { name: '', role: '', image: '' }])}
                                                className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500 text-white rounded-lg text-sm font-bold hover:bg-emerald-600 transition-all"
                                            >
                                                <Plus size={16} />
                                                Adicionar Professor
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {teachers.length === 0 && (
                                                <div className="col-span-full text-sm text-slate-500 dark:text-slate-400 text-center py-8 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                                                    Nenhum professor cadastrado.
                                                </div>
                                            )}
                                            {teachers.map((teacher, index) => (
                                                <div key={index} className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm relative group">
                                                    <div className="flex gap-4">
                                                        <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border-2 border-emerald-500/20">
                                                            {teacher.image ? (
                                                                <img src={teacher.image} alt={teacher.name} className="w-full h-full object-cover" />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-slate-400">
                                                                    <Users size={24} />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="flex-1 space-y-3">
                                                            <div className="space-y-1">
                                                                <label className="text-[10px] font-bold text-slate-500 uppercase">Nome Completo</label>
                                                                <input
                                                                    type="text"
                                                                    value={teacher.name}
                                                                    onChange={(e) => {
                                                                        const newTeachers = [...teachers];
                                                                        newTeachers[index].name = e.target.value;
                                                                        setTeachers(newTeachers);
                                                                    }}
                                                                    className="w-full px-3 py-1 bg-slate-50 dark:bg-slate-800 border-b border-transparent focus:border-emerald-500 outline-none text-sm transition-all"
                                                                />
                                                            </div>
                                                            <div className="space-y-1">
                                                                <label className="text-[10px] font-bold text-slate-500 uppercase">Cargo / Função</label>
                                                                <input
                                                                    type="text"
                                                                    value={teacher.role}
                                                                    onChange={(e) => {
                                                                        const newTeachers = [...teachers];
                                                                        newTeachers[index].role = e.target.value;
                                                                        setTeachers(newTeachers);
                                                                    }}
                                                                    className="w-full px-3 py-1 bg-slate-50 dark:bg-slate-800 border-b border-transparent focus:border-emerald-500 outline-none text-sm transition-all"
                                                                />
                                                            </div>
                                                            <div className="space-y-1">
                                                                <label className="text-[10px] font-bold text-slate-500 uppercase">URL da Imagem</label>
                                                                <input
                                                                    type="text"
                                                                    value={teacher.image}
                                                                    onChange={(e) => {
                                                                        const newTeachers = [...teachers];
                                                                        newTeachers[index].image = e.target.value;
                                                                        setTeachers(newTeachers);
                                                                    }}
                                                                    className="w-full px-3 py-1 bg-slate-50 dark:bg-slate-800 border-b border-transparent focus:border-emerald-500 outline-none text-[10px] transition-all"
                                                                />
                                                            </div>
                                                            <div className="flex gap-2 pt-2">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        const newTeachers = [...teachers];
                                                                        newTeachers.splice(index, 1);
                                                                        setTeachers(newTeachers);
                                                                    }}
                                                                    className="px-3 py-1 bg-red-50 dark:bg-red-500/10 text-red-500 text-xs font-bold rounded-lg border border-red-100 dark:border-red-900/30 hover:bg-red-600 hover:text-white transition-all w-full flex items-center justify-center gap-2"
                                                                >
                                                                    <Trash2 size={12} /> Remover
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Kids Staff Section */}
                                    <div className="pt-6 border-t border-emerald-100 dark:border-emerald-800/20 space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-violet-700 dark:text-violet-400">
                                                <Baby size={20} />
                                                <h3 className="font-bold">Equipe para Crianças</h3>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setKidsStaff([...kidsStaff, { name: '', role: '', image: '' }])}
                                                className="flex items-center gap-2 px-3 py-1.5 bg-violet-500 text-white rounded-lg text-sm font-bold hover:bg-violet-600 transition-all"
                                            >
                                                <Plus size={16} />
                                                Adicionar Apoio
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {kidsStaff.length === 0 && (
                                                <div className="col-span-full text-sm text-slate-500 dark:text-slate-400 text-center py-8 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                                                    Nenhum membro da equipe de apoio cadastrado.
                                                </div>
                                            )}
                                            {kidsStaff.map((staff, index) => (
                                                <div key={index} className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm relative group">
                                                    <div className="flex gap-4">
                                                        <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border-2 border-violet-500/20">
                                                            {staff.image ? (
                                                                <img src={staff.image} alt={staff.name} className="w-full h-full object-cover" />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-slate-400">
                                                                    <Baby size={24} />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="flex-1 space-y-3">
                                                            <div className="space-y-1">
                                                                <label className="text-[10px] font-bold text-slate-500 uppercase">Nome Completo</label>
                                                                <input
                                                                    type="text"
                                                                    value={staff.name}
                                                                    onChange={(e) => {
                                                                        const newStaff = [...kidsStaff];
                                                                        newStaff[index].name = e.target.value;
                                                                        setKidsStaff(newStaff);
                                                                    }}
                                                                    className="w-full px-3 py-1 bg-slate-50 dark:bg-slate-800 border-b border-transparent focus:border-violet-500 outline-none text-sm transition-all"
                                                                />
                                                            </div>
                                                            <div className="space-y-1">
                                                                <label className="text-[10px] font-bold text-slate-500 uppercase">Cargo / Função</label>
                                                                <input
                                                                    type="text"
                                                                    value={staff.role}
                                                                    onChange={(e) => {
                                                                        const newStaff = [...kidsStaff];
                                                                        newStaff[index].role = e.target.value;
                                                                        setKidsStaff(newStaff);
                                                                    }}
                                                                    className="w-full px-3 py-1 bg-slate-50 dark:bg-slate-800 border-b border-transparent focus:border-violet-500 outline-none text-sm transition-all"
                                                                />
                                                            </div>
                                                            <div className="space-y-1">
                                                                <label className="text-[10px] font-bold text-slate-500 uppercase">URL da Imagem</label>
                                                                <input
                                                                    type="text"
                                                                    value={staff.image}
                                                                    onChange={(e) => {
                                                                        const newStaff = [...kidsStaff];
                                                                        newStaff[index].image = e.target.value;
                                                                        setKidsStaff(newStaff);
                                                                    }}
                                                                    className="w-full px-3 py-1 bg-slate-50 dark:bg-slate-800 border-b border-transparent focus:border-violet-500 outline-none text-[10px] transition-all"
                                                                />
                                                            </div>
                                                            <div className="flex gap-2 pt-2">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        const newStaff = [...kidsStaff];
                                                                        newStaff.splice(index, 1);
                                                                        setKidsStaff(newStaff);
                                                                    }}
                                                                    className="px-3 py-1 bg-red-50 dark:bg-red-500/10 text-red-500 text-xs font-bold rounded-lg border border-red-100 dark:border-red-900/30 hover:bg-red-600 hover:text-white transition-all w-full flex items-center justify-center gap-2"
                                                                >
                                                                    <Trash2 size={12} /> Remover
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}

                            {formData?.slug === 'ministerios/lideranca' && (
                                <div className="pt-6 border-t border-emerald-100 dark:border-emerald-800/20 space-y-6">
                                    <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                                        <MessageCircle size={20} />
                                        <h3 className="font-bold">Conteúdo Extra: Liderança Geral</h3>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Título Obreiros</label>
                                        <input
                                            type="text"
                                            value={leadershipContent.obreiros.title}
                                            onChange={(e) => setLeadershipContent({
                                                ...leadershipContent,
                                                obreiros: { ...leadershipContent.obreiros, title: e.target.value }
                                            })}
                                            className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Texto Obreiros</label>
                                        <textarea
                                            value={leadershipContent.obreiros.text}
                                            onChange={(e) => setLeadershipContent({
                                                ...leadershipContent,
                                                obreiros: { ...leadershipContent.obreiros, text: e.target.value }
                                            })}
                                            className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
                                            rows={3}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Título Chamado</label>
                                            <input
                                                type="text"
                                                value={leadershipContent.chamado.title}
                                                onChange={(e) => setLeadershipContent({
                                                    ...leadershipContent,
                                                    chamado: { ...leadershipContent.chamado, title: e.target.value }
                                                })}
                                                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Referência Bíblica</label>
                                            <input
                                                type="text"
                                                value={leadershipContent.chamado.reference}
                                                onChange={(e) => setLeadershipContent({
                                                    ...leadershipContent,
                                                    chamado: { ...leadershipContent.chamado, reference: e.target.value }
                                                })}
                                                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Texto Chamado</label>
                                        <textarea
                                            value={leadershipContent.chamado.text}
                                            onChange={(e) => setLeadershipContent({
                                                ...leadershipContent,
                                                chamado: { ...leadershipContent.chamado, text: e.target.value }
                                            })}
                                            className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
                                            rows={2}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* EBD Specific: Classes and Videos */}
                            {formData?.slug === 'ministerios/ebd' && (
                                <div className="space-y-8">
                                    {/* Classes Section */}
                                    <div className="pt-6 border-t border-emerald-100 dark:border-emerald-800/20 space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                                                <Book size={20} />
                                                <h3 className="font-bold">Classes da EBD</h3>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setClasses([...classes, { title: '', theme: '', teacher: '', time: '09:00' }])}
                                                className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500 text-white rounded-lg text-sm font-bold hover:bg-emerald-600 transition-all"
                                            >
                                                <Plus size={16} />
                                                Adicionar Classe
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 gap-4">
                                            {classes.length === 0 && (
                                                <div className="text-sm text-slate-500 dark:text-slate-400 text-center py-8 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                                                    Nenhuma classe cadastrada. Use o botão acima para adicionar.
                                                </div>
                                            )}
                                            {classes.map((cls, index) => (
                                                <div key={index} className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-4">
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                                            <div className="space-y-1">
                                                                <label className="text-[10px] font-bold text-slate-500 uppercase">Título da Classe</label>
                                                                <input
                                                                    type="text"
                                                                    value={cls.title}
                                                                    onChange={(e) => {
                                                                        const newClasses = [...classes];
                                                                        newClasses[index].title = e.target.value;
                                                                        setClasses(newClasses);
                                                                    }}
                                                                    className="w-full px-3 py-1 bg-slate-50 dark:bg-slate-800 border-b border-transparent focus:border-emerald-500 outline-none text-sm transition-all"
                                                                    placeholder="Ex: Classe Adultos"
                                                                />
                                                            </div>
                                                            <div className="space-y-1">
                                                                <label className="text-[10px] font-bold text-slate-500 uppercase">Tema Atual</label>
                                                                <input
                                                                    type="text"
                                                                    value={cls.theme}
                                                                    onChange={(e) => {
                                                                        const newClasses = [...classes];
                                                                        newClasses[index].theme = e.target.value;
                                                                        setClasses(newClasses);
                                                                    }}
                                                                    className="w-full px-3 py-1 bg-slate-50 dark:bg-slate-800 border-b border-transparent focus:border-emerald-500 outline-none text-sm transition-all"
                                                                    placeholder="Ex: As Epístolas de Paulo"
                                                                />
                                                            </div>
                                                            <div className="space-y-1">
                                                                <label className="text-[10px] font-bold text-slate-500 uppercase">Professor(a)</label>
                                                                <input
                                                                    type="text"
                                                                    value={cls.teacher}
                                                                    onChange={(e) => {
                                                                        const newClasses = [...classes];
                                                                        newClasses[index].teacher = e.target.value;
                                                                        setClasses(newClasses);
                                                                    }}
                                                                    className="w-full px-3 py-1 bg-slate-50 dark:bg-slate-800 border-b border-transparent focus:border-emerald-500 outline-none text-sm transition-all"
                                                                    placeholder="Ex: Prof. Cláudio Santos"
                                                                />
                                                            </div>
                                                            <div className="space-y-1">
                                                                <label className="text-[10px] font-bold text-slate-500 uppercase">Horário</label>
                                                                <input
                                                                    type="text"
                                                                    value={cls.time}
                                                                    onChange={(e) => {
                                                                        const newClasses = [...classes];
                                                                        newClasses[index].time = e.target.value;
                                                                        setClasses(newClasses);
                                                                    }}
                                                                    className="w-full px-3 py-1 bg-slate-50 dark:bg-slate-800 border-b border-transparent focus:border-emerald-500 outline-none text-sm transition-all"
                                                                    placeholder="Ex: Domingo, 09:00"
                                                                />
                                                            </div>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const newClasses = [...classes];
                                                                newClasses.splice(index, 1);
                                                                setClasses(newClasses);
                                                            }}
                                                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all"
                                                        >
                                                            <Trash2 size={20} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Videos Section */}
                                    <div className="pt-6 border-t border-emerald-100 dark:border-emerald-800/20 space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                                                <Video size={20} />
                                                <h3 className="font-bold">Vídeos das Lições (EBD)</h3>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setLessonVideos([...lessonVideos, { title: '', url: '', date: new Date().toISOString().split('T')[0] }])}
                                                className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500 text-white rounded-lg text-sm font-bold hover:bg-emerald-600 transition-all"
                                            >
                                                <Plus size={16} />
                                                Adicionar Vídeo
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 gap-4">
                                            {lessonVideos.length === 0 && (
                                                <div className="text-sm text-slate-500 dark:text-slate-400 text-center py-8 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                                                    Nenhum vídeo cadastrado. Use o botão acima para adicionar.
                                                </div>
                                            )}
                                            {lessonVideos.map((video, index) => (
                                                <div key={index} className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-4">
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                                                            <div className="space-y-1">
                                                                <label className="text-[10px] font-bold text-slate-500 uppercase">Título da Aula</label>
                                                                <input
                                                                    type="text"
                                                                    value={video.title}
                                                                    onChange={(e) => {
                                                                        const newVideos = [...lessonVideos];
                                                                        newVideos[index].title = e.target.value;
                                                                        setLessonVideos(newVideos);
                                                                    }}
                                                                    className="w-full px-3 py-1 bg-slate-50 dark:bg-slate-800 border-b border-transparent focus:border-emerald-500 outline-none text-sm transition-all"
                                                                    placeholder="Ex: Aula 01 - Doutrina de Deus"
                                                                />
                                                            </div>
                                                            <div className="space-y-1">
                                                                <label className="text-[10px] font-bold text-slate-500 uppercase">URL do Vídeo (Youtube)</label>
                                                                <input
                                                                    type="text"
                                                                    value={video.url}
                                                                    onChange={(e) => {
                                                                        const newVideos = [...lessonVideos];
                                                                        newVideos[index].url = e.target.value;
                                                                        setLessonVideos(newVideos);
                                                                    }}
                                                                    className="w-full px-3 py-1 bg-slate-50 dark:bg-slate-800 border-b border-transparent focus:border-emerald-500 outline-none text-sm transition-all"
                                                                    placeholder="https://www.youtube.com/watch?v=..."
                                                                />
                                                            </div>
                                                            <div className="space-y-1">
                                                                <label className="text-[10px] font-bold text-slate-500 uppercase">Data</label>
                                                                <input
                                                                    type="date"
                                                                    value={video.date}
                                                                    onChange={(e) => {
                                                                        const newVideos = [...lessonVideos];
                                                                        newVideos[index].date = e.target.value;
                                                                        setLessonVideos(newVideos);
                                                                    }}
                                                                    className="w-full px-3 py-1 bg-slate-50 dark:bg-slate-800 border-b border-transparent focus:border-emerald-500 outline-none text-sm transition-all"
                                                                />
                                                            </div>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const newVideos = [...lessonVideos];
                                                                newVideos.splice(index, 1);
                                                                setLessonVideos(newVideos);
                                                            }}
                                                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all"
                                                        >
                                                            <Trash2 size={20} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* Homens Specific: Gallery */}
                            {formData?.slug === 'ministerios/homens' && (
                                <div className="pt-6 border-t border-emerald-100 dark:border-emerald-800/20 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                                            <Camera size={20} />
                                            <h3 className="font-bold">Galeria de Fotos (Homens)</h3>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setHomensGallery([...homensGallery, { url: '', caption: '' }])}
                                            className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500 text-white rounded-lg text-sm font-bold hover:bg-emerald-600 transition-all"
                                        >
                                            <Plus size={16} />
                                            Adicionar Foto
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {homensGallery.length === 0 && (
                                            <div className="col-span-full text-sm text-slate-500 dark:text-slate-400 text-center py-8 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                                                Nenhuma foto na galeria.
                                            </div>
                                        )}
                                        {homensGallery.map((photo, index) => (
                                            <div key={index} className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-3 relative group">
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-bold text-slate-500 uppercase">URL da Imagem</label>
                                                    <input
                                                        type="text"
                                                        value={photo.url}
                                                        onChange={(e) => {
                                                            const newGallery = [...homensGallery];
                                                            newGallery[index].url = e.target.value;
                                                            setHomensGallery(newGallery);
                                                        }}
                                                        className="w-full px-3 py-1 bg-slate-50 dark:bg-slate-800 border-b border-transparent focus:border-emerald-500 outline-none text-sm transition-all"
                                                        placeholder="https://images.unsplash.com/..."
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-bold text-slate-500 uppercase">Legenda</label>
                                                    <input
                                                        type="text"
                                                        value={photo.caption}
                                                        onChange={(e) => {
                                                            const newGallery = [...homensGallery];
                                                            newGallery[index].caption = e.target.value;
                                                            setHomensGallery(newGallery);
                                                        }}
                                                        className="w-full px-3 py-1 bg-slate-50 dark:bg-slate-800 border-b border-transparent focus:border-emerald-500 outline-none text-sm transition-all"
                                                        placeholder="Ex: Culto de Homens"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newGallery = [...homensGallery];
                                                        newGallery.splice(index, 1);
                                                        setHomensGallery(newGallery);
                                                    }}
                                                    className="absolute top-2 right-2 p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Media Specific Section */}
                    {
                        formData?.slug === 'midia' && (
                            <div className="space-y-8">
                                {/* Videos Section */}
                                <div className="p-6 rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800/30 space-y-6">
                                    <div className="p-4 bg-red-100/50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-xl text-sm border border-red-200 dark:border-red-800/30">
                                        <strong>💡 Dica:</strong> O primeiro vídeo da lista abaixo será automaticamente exibido como o <strong>Vídeo em Destaque</strong> na Página Inicial (Home).
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                                            <Video size={20} />
                                            <h3 className="font-bold uppercase tracking-wider text-sm">Galeria de Vídeos</h3>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setMediaPageContent(prev => ({
                                                ...prev,
                                                videos: [...(prev.videos || []), { id: Date.now(), titulo: '', url: '', thumbnail: '' }]
                                            }))}
                                            className="px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 transition-colors flex items-center gap-1"
                                        >
                                            <Plus size={14} /> Adicionar Vídeo
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {(mediaPageContent?.videos || []).map((video, vIdx) => (
                                            <div key={video.id || vIdx} className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 relative group/item">
                                                <div className="absolute top-2 right-8 flex gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity z-10">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            if (vIdx > 0) {
                                                                setMediaPageContent(prev => {
                                                                    const newVideos = [...prev.videos];
                                                                    [newVideos[vIdx], newVideos[vIdx - 1]] = [newVideos[vIdx - 1], newVideos[vIdx]];
                                                                    return { ...prev, videos: newVideos };
                                                                });
                                                            }
                                                        }}
                                                        className="w-6 h-6 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full flex items-center justify-center shadow-md hover:text-red-500 transition-all"
                                                        title="Subir"
                                                    >
                                                        <ArrowUp size={12} />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            if (vIdx < mediaPageContent.videos.length - 1) {
                                                                setMediaPageContent(prev => {
                                                                    const newVideos = [...prev.videos];
                                                                    [newVideos[vIdx], newVideos[vIdx + 1]] = [newVideos[vIdx + 1], newVideos[vIdx]];
                                                                    return { ...prev, videos: newVideos };
                                                                });
                                                            }
                                                        }}
                                                        className="w-6 h-6 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full flex items-center justify-center shadow-md hover:text-red-500 transition-all"
                                                        title="Baixar"
                                                    >
                                                        <ArrowDown size={12} />
                                                    </button>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => setMediaPageContent(prev => ({
                                                        ...prev,
                                                        videos: prev.videos.filter((_, i) => i !== vIdx)
                                                    }))}
                                                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity shadow-lg z-10"
                                                >
                                                    <X size={12} />
                                                </button>

                                                <div className="aspect-video w-full rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                                                    {video.thumbnail || (video.url && getYouTubeId(video.url)) ? (
                                                        <img
                                                            src={video.thumbnail || getYouTubeThumbnail(getYouTubeId(video.url))}
                                                            alt="Preview"
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                            <Video size={32} />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase">Título do Vídeo</label>
                                                    <input
                                                        type="text"
                                                        value={video.titulo}
                                                        onChange={(e) => {
                                                            setMediaPageContent(prev => {
                                                                const newVideos = [...prev.videos];
                                                                newVideos[vIdx].titulo = e.target.value;
                                                                return { ...prev, videos: newVideos };
                                                            });
                                                        }}
                                                        className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border-none rounded outline-none focus:ring-1 focus:ring-red-500"
                                                        placeholder="Ex: Culto de Domingo"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase">URL / Iframe (YouTube)</label>
                                                    <input
                                                        type="text"
                                                        value={video.url}
                                                        onChange={(e) => {
                                                            const rawValue = e.target.value;
                                                            const cleanUrl = extractUrlFromIframe(rawValue);
                                                            const youtubeId = getYouTubeId(cleanUrl);

                                                            setMediaPageContent(prev => {
                                                                const newVideos = [...prev.videos];
                                                                newVideos[vIdx].url = cleanUrl;
                                                                if (youtubeId) {
                                                                    newVideos[vIdx].thumbnail = getYouTubeThumbnail(youtubeId);
                                                                }
                                                                return { ...prev, videos: newVideos };
                                                            });
                                                        }}
                                                        className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border-none rounded outline-none focus:ring-1 focus:ring-red-500 font-mono"
                                                        placeholder="Cole a URL ou o iframe"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    {
                        (formData?.slug === 'inicio' || formData?.slug === 'contato') && (
                            <div className="space-y-6">
                                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                                    <Activity size={20} />
                                    <h3 className="font-bold">Conteúdo da Home: Destaque (Hero)</h3>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Texto do Selo (Badge)</label>
                                    <input
                                        type="text"
                                        value={homeHero.badge}
                                        onChange={(e) => setHomeHero({ ...homeHero, badge: e.target.value })}
                                        className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                                        placeholder="Ex: Bem-vindo à ADMAC"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Título Principal</label>
                                    <input
                                        type="text"
                                        value={homeHero.title}
                                        onChange={(e) => setHomeHero({ ...homeHero, title: e.target.value })}
                                        className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                                        placeholder="Ex: Uma Família para Pertencer"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Subtítulo / Descrição</label>
                                    <textarea
                                        value={homeHero.subtitle}
                                        onChange={(e) => setHomeHero({ ...homeHero, subtitle: e.target.value })}
                                        className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                                        rows={3}
                                        placeholder="Descreva sua igreja..."
                                    />
                                </div>

                                {/* Carousel Destaque */}
                                <div className="pt-6 border-t border-blue-100 dark:border-blue-800/20">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                                            <Star size={20} />
                                            <h3 className="font-bold">Carrossel de Destaques</h3>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setHomeCarousel([...homeCarousel, {
                                                title: 'Novo Destaque',
                                                desc: '',
                                                image: '',
                                                icon: 'Star',
                                                color: 'text-blue-500',
                                                bg: 'bg-blue-50 dark:bg-blue-900/10'
                                            }])}
                                            className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-600 hover:text-white transition-all flex items-center gap-1"
                                        >
                                            <Plus size={14} />
                                            Adicionar Item
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {homeCarousel.map((item, idx) => (
                                            <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-900/80 rounded-xl border border-slate-100 dark:border-slate-700 space-y-3 group">
                                                <div className="flex items-center justify-between">
                                                    <input
                                                        type="text"
                                                        value={item.title}
                                                        onChange={(e) => {
                                                            const newItems = [...homeCarousel];
                                                            newItems[idx].title = e.target.value;
                                                            setHomeCarousel(newItems);
                                                        }}
                                                        className="bg-transparent font-bold text-slate-800 dark:text-white outline-none w-full"
                                                        placeholder="Título do Item"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setHomeCarousel(homeCarousel.filter((_, i) => i !== idx))}
                                                        className="text-red-400 hover:text-red-600 transition-colors"
                                                    >
                                                        &times;
                                                    </button>
                                                </div>

                                                <textarea
                                                    value={item.desc}
                                                    onChange={(e) => {
                                                        const newItems = [...homeCarousel];
                                                        newItems[idx].desc = e.target.value;
                                                        setHomeCarousel(newItems);
                                                    }}
                                                    className="w-full p-2 text-xs bg-white dark:bg-slate-800 border dark:border-slate-700 rounded resize-none"
                                                    placeholder="Descrição curta..."
                                                    rows="2"
                                                />

                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-bold text-slate-500 uppercase">Imagem de Fundo (Opcional)</label>
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="text"
                                                            value={item.image || ''}
                                                            onChange={(e) => {
                                                                const newItems = [...homeCarousel];
                                                                newItems[idx].image = e.target.value;
                                                                setHomeCarousel(newItems);
                                                            }}
                                                            className="flex-1 px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border dark:border-slate-700 rounded"
                                                            placeholder="URL da Imagem"
                                                        />
                                                    </div>
                                                </div>

                                                {!item.image && (
                                                    <div className="flex flex-col gap-2">
                                                        <label className="text-[10px] font-bold text-slate-500 uppercase">Ícone (Se não houver imagem)</label>
                                                        <div className="flex gap-2 p-1 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded overflow-x-auto">
                                                            {['Heart', 'Users', 'Coffee', 'Flower', 'Star', 'Music', 'Book'].map(iconName => (
                                                                <button
                                                                    key={iconName}
                                                                    type="button"
                                                                    onClick={() => {
                                                                        const newItems = [...homeCarousel];
                                                                        newItems[idx].icon = iconName;
                                                                        setHomeCarousel(newItems);
                                                                    }}
                                                                    className={`p-1.5 rounded transition-all ${item.icon === iconName ? 'bg-blue-600 text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500'}`}
                                                                    title={iconName}
                                                                >
                                                                    {iconName === 'Heart' && <Heart size={12} />}
                                                                    {iconName === 'Users' && <Users size={12} />}
                                                                    {iconName === 'Coffee' && <Coffee size={12} />}
                                                                    {iconName === 'Flower' && <Flower size={12} />}
                                                                    {iconName === 'Star' && <Star size={12} />}
                                                                    {iconName === 'Music' && <Music size={12} />}
                                                                    {iconName === 'Book' && <Book size={12} />}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-blue-100 dark:border-blue-800/20">
                                    <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 mb-4">
                                        <h3 className="font-bold">Seção Quem Somos</h3>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Imagens do Carrossel</label>
                                            <div className="space-y-4">
                                                {(homeAbout.images || []).map((img, idx) => {
                                                    const isObj = typeof img === 'object' && img !== null;
                                                    const url = isObj ? img.url : (img || '');
                                                    const link = isObj ? img.link || '' : '';
                                                    const buttonText = isObj ? img.buttonText || '' : '';

                                                    const updateImage = (field, value) => {
                                                        const newImages = [...(homeAbout.images || [])];
                                                        const current = newImages[idx];
                                                        const currentObj = (typeof current === 'object' && current !== null)
                                                            ? { ...current }
                                                            : { url: (current || ''), link: '', buttonText: '' };

                                                        if (field === 'url') currentObj.url = value;
                                                        else if (field === 'link') currentObj.link = value;
                                                        else if (field === 'buttonText') currentObj.buttonText = value;

                                                        newImages[idx] = currentObj;
                                                        setHomeAbout({ ...homeAbout, images: newImages });
                                                    };

                                                    return (
                                                        <div key={idx} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50 space-y-3">
                                                            <div className="flex gap-2">
                                                                <div className="flex-1 space-y-3">
                                                                    <div className="space-y-1">
                                                                        <label className="text-xs font-semibold text-slate-500 uppercase">URL da Imagem</label>
                                                                        <div className="flex gap-2">
                                                                            <input
                                                                                type="text"
                                                                                value={url}
                                                                                onChange={(e) => updateImage('url', e.target.value)}
                                                                                className="flex-1 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 dark:text-white text-sm"
                                                                                placeholder="https://..."
                                                                            />
                                                                            <label className="cursor-pointer">
                                                                                <input
                                                                                    type="file"
                                                                                    accept="image/*"
                                                                                    className="hidden"
                                                                                    onChange={(e) => {
                                                                                        const file = e.target.files[0];
                                                                                        if (file) {
                                                                                            const reader = new FileReader();
                                                                                            reader.onloadend = () => {
                                                                                                updateImage('url', reader.result);
                                                                                            };
                                                                                            reader.readAsDataURL(file);
                                                                                        }
                                                                                    }}
                                                                                />
                                                                                <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2 h-full whitespace-nowrap">
                                                                                    <ImageIcon size={18} />
                                                                                    <span className="text-sm font-medium">Subir Foto</span>
                                                                                </div>
                                                                            </label>
                                                                        </div>
                                                                        {url && (
                                                                            <div className="mt-2 relative h-32 w-full rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900">
                                                                                <img
                                                                                    src={url}
                                                                                    alt="Preview"
                                                                                    className="w-full h-full object-cover"
                                                                                    onError={(e) => e.target.style.display = 'none'}
                                                                                />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <div className="grid grid-cols-2 gap-3">
                                                                        <div className="space-y-1">
                                                                            <label className="text-xs font-semibold text-slate-500 uppercase">Link de Destino</label>
                                                                            <input
                                                                                type="text"
                                                                                value={link}
                                                                                onChange={(e) => updateImage('link', e.target.value)}
                                                                                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 dark:text-white text-sm"
                                                                                placeholder="Ex: /ministerios/infantil (opcional)"
                                                                            />
                                                                        </div>
                                                                        <div className="space-y-1">
                                                                            <label className="text-xs font-semibold text-slate-500 uppercase">Texto do Botão</label>
                                                                            <input
                                                                                type="text"
                                                                                value={buttonText}
                                                                                onChange={(e) => updateImage('buttonText', e.target.value)}
                                                                                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 dark:text-white text-sm"
                                                                                placeholder="Ex: Saiba Mais (opcional)"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        const newImages = (homeAbout.images || []).filter((_, i) => i !== idx);
                                                                        setHomeAbout({ ...homeAbout, images: newImages });
                                                                    }}
                                                                    className="self-start p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                                    title="Remover imagem"
                                                                >
                                                                    <Trash2 className="w-5 h-5" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                                <button
                                                    type="button"
                                                    onClick={() => setHomeAbout({ ...homeAbout, images: [...(homeAbout.images || []), { url: '', link: '', buttonText: '' }] })}
                                                    className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                                                >
                                                    <Plus className="w-4 h-4" /> Adicionar Imagem
                                                </button>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Título</label>
                                            <input
                                                type="text"
                                                value={homeAbout.title}
                                                onChange={(e) => setHomeAbout({ ...homeAbout, title: e.target.value })}
                                                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Parágrafo 1</label>
                                                <textarea
                                                    value={homeAbout.text1}
                                                    onChange={(e) => setHomeAbout({ ...homeAbout, text1: e.target.value })}
                                                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                                                    rows={3}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Parágrafo 2</label>
                                                <textarea
                                                    value={homeAbout.text2}
                                                    onChange={(e) => setHomeAbout({ ...homeAbout, text2: e.target.value })}
                                                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                                                    rows={3}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-slate-600 dark:text-slate-400 uppercase text-xs font-bold">Missão</label>
                                                <textarea
                                                    value={homeAbout.mission}
                                                    onChange={(e) => setHomeAbout({ ...homeAbout, mission: e.target.value })}
                                                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white text-sm"
                                                    rows={3}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-slate-600 dark:text-slate-400 uppercase text-xs font-bold">Visão</label>
                                                <textarea
                                                    value={homeAbout.vision}
                                                    onChange={(e) => setHomeAbout({ ...homeAbout, vision: e.target.value })}
                                                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white text-sm"
                                                    rows={3}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-slate-600 dark:text-slate-400 uppercase text-xs font-bold">Valores</label>
                                                <textarea
                                                    value={homeAbout.values}
                                                    onChange={(e) => setHomeAbout({ ...homeAbout, values: e.target.value })}
                                                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white text-sm"
                                                    rows={3}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-blue-100 dark:border-blue-800/20">
                                    <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 mb-4">
                                        <h3 className="font-bold">Seção Programação (Agenda)</h3>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Título da Seção</label>
                                                <input
                                                    type="text"
                                                    value={homeAgenda.title}
                                                    onChange={(e) => setHomeAgenda({ ...homeAgenda, title: e.target.value })}
                                                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Descrição</label>
                                                <input
                                                    type="text"
                                                    value={homeAgenda.description}
                                                    onChange={(e) => setHomeAgenda({ ...homeAgenda, description: e.target.value })}
                                                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white/50 dark:bg-slate-900/50 rounded-xl border border-blue-100 dark:border-blue-900/30">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Evento Especial (Título)</label>
                                                <input
                                                    type="text"
                                                    value={homeAgenda.nextEvent?.title || ''}
                                                    onChange={(e) => setHomeAgenda({ ...homeAgenda, nextEvent: { ...homeAgenda.nextEvent, title: e.target.value } })}
                                                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Evento Especial (Data/Rótulo)</label>
                                                <input
                                                    type="text"
                                                    value={homeAgenda.nextEvent?.label || ''}
                                                    onChange={(e) => setHomeAgenda({ ...homeAgenda, nextEvent: { ...homeAgenda.nextEvent, label: e.target.value } })}
                                                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <label className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Dias e Horários</label>
                                                <button
                                                    type="button"
                                                    onClick={() => setHomeAgenda({ ...homeAgenda, events: [...homeAgenda.events, { day: 'Novo Dia', sessions: [] }] })}
                                                    className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-600 hover:text-white transition-all"
                                                >
                                                    + Adicionar Dia
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {homeAgenda.events.map((event, idx) => (
                                                    <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-900/80 rounded-xl border border-slate-100 dark:border-slate-700 space-y-3">
                                                        <div className="flex items-center justify-between gap-2">
                                                            <input
                                                                type="text"
                                                                value={event.day}
                                                                onChange={(e) => {
                                                                    const newEvents = [...homeAgenda.events];
                                                                    newEvents[idx].day = e.target.value;
                                                                    setHomeAgenda({ ...homeAgenda, events: newEvents });
                                                                }}
                                                                className="bg-transparent font-bold text-blue-600 dark:text-blue-400 outline-none w-full"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => setHomeAgenda({ ...homeAgenda, events: homeAgenda.events.filter((_, i) => i !== idx) })}
                                                                className="text-red-400 hover:text-red-600 p-1"
                                                            >
                                                                &times;
                                                            </button>
                                                        </div>

                                                        <div className="space-y-2">
                                                            {event.sessions.map((session, sIdx) => (
                                                                <div key={sIdx} className="flex items-center gap-2 text-xs">
                                                                    <input
                                                                        type="text"
                                                                        value={session.time}
                                                                        onChange={(e) => {
                                                                            const newEvents = [...homeAgenda.events];
                                                                            newEvents[idx].sessions[sIdx].time = e.target.value;
                                                                            setHomeAgenda({ ...homeAgenda, events: newEvents });
                                                                        }}
                                                                        className="w-16 px-2 py-1 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded"
                                                                        placeholder="00:00"
                                                                    />
                                                                    <input
                                                                        type="text"
                                                                        value={session.title}
                                                                        onChange={(e) => {
                                                                            const newEvents = [...homeAgenda.events];
                                                                            newEvents[idx].sessions[sIdx].title = e.target.value;
                                                                            setHomeAgenda({ ...homeAgenda, events: newEvents });
                                                                        }}
                                                                        className="flex-1 px-2 py-1 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded"
                                                                        placeholder="Título"
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            const newEvents = [...homeAgenda.events];
                                                                            newEvents[idx].sessions = newEvents[idx].sessions.filter((_, i) => i !== sIdx);
                                                                            setHomeAgenda({ ...homeAgenda, events: newEvents });
                                                                        }}
                                                                        className="text-red-400"
                                                                    >
                                                                        &times;
                                                                    </button>
                                                                </div>
                                                            ))}
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    const newEvents = [...homeAgenda.events];
                                                                    newEvents[idx].sessions.push({ time: '19:00', title: 'Novo Culto', type: 'Culto' });
                                                                    setHomeAgenda({ ...homeAgenda, events: newEvents });
                                                                }}
                                                                className="text-[10px] text-blue-500 font-bold hover:underline"
                                                            >
                                                                + Adicionar Horário
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Ministérios */}
                                <div className="pt-6 border-t border-blue-100 dark:border-blue-800/20">
                                    <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 mb-4">
                                        <h3 className="font-bold">Seção Ministérios</h3>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Título</label>
                                                <input
                                                    type="text"
                                                    value={homeMinistries.title}
                                                    onChange={(e) => setHomeMinistries({ ...homeMinistries, title: e.target.value })}
                                                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Descrição</label>
                                                <input
                                                    type="text"
                                                    value={homeMinistries.description}
                                                    onChange={(e) => setHomeMinistries({ ...homeMinistries, description: e.target.value })}
                                                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <label className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Itens de Ministérios</label>
                                                <button
                                                    type="button"
                                                    onClick={() => setHomeMinistries({ ...homeMinistries, items: [...homeMinistries.items, { title: 'Novo Ministério', desc: '', href: '' }] })}
                                                    className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-600 hover:text-white transition-all"
                                                >
                                                    + Adicionar Item
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {homeMinistries.items.map((item, idx) => (
                                                    <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-900/80 rounded-xl border border-slate-100 dark:border-slate-700 space-y-3 group">
                                                        <div className="flex items-center justify-between">
                                                            <input
                                                                type="text"
                                                                value={item.title}
                                                                onChange={(e) => {
                                                                    const newItems = [...homeMinistries.items];
                                                                    newItems[idx].title = e.target.value;
                                                                    setHomeMinistries({ ...homeMinistries, items: newItems });
                                                                }}
                                                                className="bg-transparent font-bold text-slate-800 dark:text-white outline-none w-full"
                                                                placeholder="Título do Ministério"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => setHomeMinistries({ ...homeMinistries, items: homeMinistries.items.filter((_, i) => i !== idx) })}
                                                                className="text-red-400 hover:text-red-600 transition-colors"
                                                            >
                                                                &times;
                                                            </button>
                                                        </div>

                                                        <div className="flex flex-col gap-2">
                                                            <label className="text-[10px] font-bold text-slate-500 uppercase">Ícone</label>
                                                            <div className="flex gap-2 p-1 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded overflow-x-auto">
                                                                {['Activity', 'Users', 'Heart', 'Music', 'Book', 'GraduationCap', 'Shield', 'Home', 'Compass', 'Baby', 'Star'].map(iconName => (
                                                                    <button
                                                                        key={iconName}
                                                                        type="button"
                                                                        onClick={() => {
                                                                            const newItems = [...homeMinistries.items];
                                                                            newItems[idx].icon = iconName;
                                                                            setHomeMinistries({ ...homeMinistries, items: newItems });
                                                                        }}
                                                                        className={`p-1.5 rounded transition-all ${item.icon === iconName ? 'bg-blue-600 text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500'}`}
                                                                        title={iconName}
                                                                    >
                                                                        {iconName === 'Activity' && <Activity size={12} />}
                                                                        {iconName === 'Users' && <Users size={12} />}
                                                                        {iconName === 'Heart' && <Heart size={12} />}
                                                                        {iconName === 'Music' && <Music size={12} />}
                                                                        {iconName === 'Book' && <Book size={12} />}
                                                                        {iconName === 'GraduationCap' && <Book size={12} />} {/* Use Book as GraduationCap if not available, or I'll add it to imports */}
                                                                        {iconName === 'Shield' && <Star size={12} />}
                                                                        {iconName === 'Home' && <Activity size={12} />}
                                                                        {iconName === 'Compass' && <Activity size={12} />}
                                                                        {iconName === 'Baby' && <Baby size={12} />}
                                                                        {iconName === 'Star' && <Star size={12} />}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <textarea
                                                            value={item.desc}
                                                            onChange={(e) => {
                                                                const newItems = [...homeMinistries.items];
                                                                newItems[idx].desc = e.target.value;
                                                                setHomeMinistries({ ...homeMinistries, items: newItems });
                                                            }}
                                                            className="w-full p-2 text-xs bg-white dark:bg-slate-800 border dark:border-slate-700 rounded resize-none"
                                                            placeholder="Descrição curta..."
                                                            rows="2"
                                                        />
                                                        <input
                                                            type="text"
                                                            value={item.href}
                                                            onChange={(e) => {
                                                                const newItems = [...homeMinistries.items];
                                                                newItems[idx].href = e.target.value;
                                                                setHomeMinistries({ ...homeMinistries, items: newItems });
                                                            }}
                                                            className="w-full px-2 py-1 text-[10px] bg-white dark:bg-slate-800 border dark:border-slate-700 rounded"
                                                            placeholder="/link-do-ministerio"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                {/* Podcast */}
                                <div className="pt-6 border-t border-blue-100 dark:border-blue-800/20">
                                    <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 mb-4">
                                        <h3 className="font-bold">Seção Podcast</h3>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Título</label>
                                                <input
                                                    type="text"
                                                    value={homePodcast.title}
                                                    onChange={(e) => setHomePodcast({ ...homePodcast, title: e.target.value })}
                                                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Rótulo (Badge)</label>
                                                <input
                                                    type="text"
                                                    value={homePodcast.badge}
                                                    onChange={(e) => setHomePodcast({ ...homePodcast, badge: e.target.value })}
                                                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Descrição</label>
                                            <textarea
                                                value={homePodcast.description}
                                                onChange={(e) => setHomePodcast({ ...homePodcast, description: e.target.value })}
                                                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                                                rows="2"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">URL Spotify (Botão)</label>
                                                <input
                                                    type="text"
                                                    value={homePodcast.spotifyUrl}
                                                    onChange={(e) => setHomePodcast({ ...homePodcast, spotifyUrl: e.target.value })}
                                                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">URL Embed Spotify (Player)</label>
                                                <input
                                                    type="text"
                                                    value={homePodcast.spotifyEmbed}
                                                    onChange={(e) => setHomePodcast({ ...homePodcast, spotifyEmbed: e.target.value })}
                                                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Revista */}
                                <div className="pt-6 border-t border-blue-100 dark:border-blue-800/20">
                                    <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 mb-4">
                                        <h3 className="font-bold">Seção Revista Digital</h3>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Título</label>
                                                <input
                                                    type="text"
                                                    value={homeMagazines.title}
                                                    onChange={(e) => setHomeMagazines({ ...homeMagazines, title: e.target.value })}
                                                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Descrição</label>
                                                <input
                                                    type="text"
                                                    value={homeMagazines.description}
                                                    onChange={(e) => setHomeMagazines({ ...homeMagazines, description: e.target.value })}
                                                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <label className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Categorias da Revista</label>
                                                <button
                                                    type="button"
                                                    onClick={() => setHomeMagazines({ ...homeMagazines, items: [...homeMagazines.items, { title: 'Nova Categoria', color: 'text-blue-500', href: '#' }] })}
                                                    className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-600 hover:text-white transition-all"
                                                >
                                                    + Adicionar Categoria
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                {homeMagazines.items.map((item, idx) => (
                                                    <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-900/80 rounded-xl border border-slate-100 dark:border-slate-700 space-y-2 group">
                                                        <div className="flex items-center justify-between">
                                                            <input
                                                                type="text"
                                                                value={item.title}
                                                                onChange={(e) => {
                                                                    const newItems = [...homeMagazines.items];
                                                                    newItems[idx].title = e.target.value;
                                                                    setHomeMagazines({ ...homeMagazines, items: newItems });
                                                                }}
                                                                className="bg-transparent font-bold text-xs text-slate-800 dark:text-white outline-none w-full"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => setHomeMagazines({ ...homeMagazines, items: homeMagazines.items.filter((_, i) => i !== idx) })}
                                                                className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                &times;
                                                            </button>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            value={item.href}
                                                            onChange={(e) => {
                                                                const newItems = [...homeMagazines.items];
                                                                newItems[idx].href = e.target.value;
                                                                setHomeMagazines({ ...homeMagazines, items: newItems });
                                                            }}
                                                            className="w-full px-2 py-1 text-[8px] bg-white dark:bg-slate-800 border dark:border-slate-700 rounded"
                                                            placeholder="/link"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Mídia e Redes Sociais */}
                                <div className="pt-6 border-t border-blue-100 dark:border-blue-800/20">
                                    <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 mb-4">
                                        <h3 className="font-bold">Seção Mídia e Redes Sociais</h3>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Título da Seção</label>
                                                <input
                                                    type="text"
                                                    value={homeMedia.title || ''}
                                                    onChange={(e) => setHomeMedia({ ...homeMedia, title: e.target.value })}
                                                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                                                    placeholder="Nossa Mídia"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Descrição</label>
                                                <input
                                                    type="text"
                                                    value={homeMedia.description || ''}
                                                    onChange={(e) => setHomeMedia({ ...homeMedia, description: e.target.value })}
                                                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                                                    placeholder="Descrição da seção..."
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold text-slate-500 uppercase">YouTube</label>
                                                <input
                                                    type="text"
                                                    value={homeMedia.platforms.youtube}
                                                    onChange={(e) => setHomeMedia({ ...homeMedia, platforms: { ...homeMedia.platforms, youtube: e.target.value } })}
                                                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold text-slate-500 uppercase">Instagram</label>
                                                <input
                                                    type="text"
                                                    value={homeMedia.platforms.instagram}
                                                    onChange={(e) => setHomeMedia({ ...homeMedia, platforms: { ...homeMedia.platforms, instagram: e.target.value } })}
                                                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold text-slate-500 uppercase">Facebook</label>
                                                <input
                                                    type="text"
                                                    value={homeMedia.platforms.facebook}
                                                    onChange={(e) => setHomeMedia({ ...homeMedia, platforms: { ...homeMedia.platforms, facebook: e.target.value } })}
                                                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold text-green-500 uppercase">WhatsApp</label>
                                                <input
                                                    type="text"
                                                    value={homeMedia.platforms.whatsapp || ''}
                                                    onChange={(e) => setHomeMedia({ ...homeMedia, platforms: { ...homeMedia.platforms, whatsapp: e.target.value } })}
                                                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg"
                                                    placeholder="https://wa.me/..."
                                                />
                                            </div>
                                        </div>

                                        <div className="p-4 bg-slate-50 dark:bg-slate-900/80 rounded-xl border border-slate-100 dark:border-slate-700 space-y-3">
                                            <label className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Vídeo em Destaque</label>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <input
                                                        type="text"
                                                        value={homeMedia.featuredVideo.title}
                                                        onChange={(e) => setHomeMedia({ ...homeMedia, featuredVideo: { ...homeMedia.featuredVideo, title: e.target.value } })}
                                                        className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border dark:border-slate-700 rounded"
                                                        placeholder="Título do Vídeo"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={homeMedia.featuredVideo.tag}
                                                        onChange={(e) => setHomeMedia({ ...homeMedia, featuredVideo: { ...homeMedia.featuredVideo, tag: e.target.value } })}
                                                        className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border dark:border-slate-700 rounded"
                                                        placeholder="Tag (ex: ÚLTIMA MENSAGEM)"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <input
                                                        type="text"
                                                        value={homeMedia.featuredVideo.image}
                                                        onChange={(e) => setHomeMedia({ ...homeMedia, featuredVideo: { ...homeMedia.featuredVideo, image: e.target.value } })}
                                                        className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border dark:border-slate-700 rounded"
                                                        placeholder="URL da Imagem de Capa"
                                                    />
                                                    {homeMedia.featuredVideo.image && (
                                                        <div className="relative aspect-video w-32 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                                                            <img
                                                                src={homeMedia.featuredVideo.image}
                                                                alt="Preview"
                                                                className="w-full h-full object-cover"
                                                                onError={(e) => e.target.style.display = 'none'}
                                                            />
                                                        </div>
                                                    )}
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="text"
                                                            value={homeMedia.featuredVideo.videoUrl}
                                                            onChange={(e) => {
                                                                let newUrl = e.target.value;
                                                                // Check if it's an iframe code
                                                                newUrl = extractUrlFromIframe(newUrl);

                                                                const newFeatured = { ...homeMedia.featuredVideo, videoUrl: newUrl };

                                                                // Auto-generate thumbnail for Home Featured Video
                                                                const videoId = getYouTubeId(newUrl);
                                                                if (videoId) {
                                                                    newFeatured.image = getYouTubeThumbnail(videoId);
                                                                }

                                                                setHomeMedia({ ...homeMedia, featuredVideo: newFeatured });
                                                            }}
                                                            className="flex-1 px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border dark:border-slate-700 rounded"
                                                            placeholder="URL do Vídeo (ou código iframe)"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const url = homeMedia.featuredVideo.videoUrl;
                                                                if (url && url !== '#') {
                                                                    let finalUrl = url.trim();
                                                                    if (!finalUrl.startsWith('http')) finalUrl = 'https://' + finalUrl;
                                                                    window.open(finalUrl, '_blank');
                                                                } else {
                                                                    alert('Por favor, insira uma URL válida primeiro.');
                                                                }
                                                            }}
                                                            className="px-3 py-1.5 text-[10px] bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-600 hover:text-white transition-all font-bold uppercase"
                                                        >
                                                            Testar
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Contato */}
                                <div className="pt-6 border-t border-blue-100 dark:border-blue-800/20">
                                    <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 mb-4">
                                        <h3 className="font-bold">Seção Contato e Localização</h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Endereço</label>
                                            <textarea
                                                value={homeContact.address}
                                                onChange={(e) => setHomeContact({ ...homeContact, address: e.target.value })}
                                                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white text-xs"
                                                rows="2"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Telefones</label>
                                            <textarea
                                                value={homeContact.phone}
                                                onChange={(e) => setHomeContact({ ...homeContact, phone: e.target.value })}
                                                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white text-xs"
                                                rows="2"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-600 dark:text-slate-400">E-mails</label>
                                            <textarea
                                                value={homeContact.email}
                                                onChange={(e) => setHomeContact({ ...homeContact, email: e.target.value })}
                                                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white text-xs"
                                                rows="2"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Horário da Secretaria</label>
                                            <textarea
                                                value={homeContact.hours}
                                                onChange={(e) => setHomeContact({ ...homeContact, hours: e.target.value })}
                                                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white text-xs"
                                                rows="2"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Status</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="status"
                                    value="Ativo"
                                    checked={formData.status === 'Ativo'}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <span className="text-slate-700 dark:text-slate-300">Ativo</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="status"
                                    value="Inativo"
                                    checked={formData.status === 'Inativo'}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <span className="text-slate-700 dark:text-slate-300">Inativo</span>
                            </label>
                        </div>
                    </div>

                    {/* Magazine Articles Editor */}
                    {
                        formData.slug?.startsWith('revista/') && (
                            <div className="pt-6 border-t border-purple-100 dark:border-purple-800/20">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400">
                                        <Book size={20} />
                                        <h3 className="font-bold">Artigos da Revista</h3>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setMagazineArticles([...magazineArticles, {
                                            id: Date.now(),
                                            title: 'Novo Artigo',
                                            excerpt: '',
                                            author: '',
                                            date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
                                            image: '',
                                            content: '',
                                            iconColor: 'bg-blue-500/10 text-blue-500'
                                        }])}
                                        className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-600 px-3 py-1 rounded-full hover:bg-purple-600 hover:text-white transition-all flex items-center gap-1"
                                    >
                                        <Plus size={14} />
                                        Adicionar Artigo
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-4">
                                        {magazineArticles.map((article, idx) => (
                                            // ... existing article editor code ...
                                            <div key={article.id || idx} className="p-6 bg-slate-50 dark:bg-slate-900/80 rounded-xl border border-slate-100 dark:border-slate-700 space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <input
                                                        type="text"
                                                        value={article.title}
                                                        onChange={(e) => {
                                                            const newArticles = [...magazineArticles];
                                                            newArticles[idx].title = e.target.value;
                                                            setMagazineArticles(newArticles);
                                                        }}
                                                        className="bg-transparent font-bold text-lg text-slate-800 dark:text-white outline-none flex-1"
                                                        placeholder="Título do Artigo"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setMagazineArticles(magazineArticles.filter((_, i) => i !== idx))}
                                                        className="text-red-400 hover:text-red-600 transition-colors p-2"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold text-slate-500 uppercase">Autor</label>
                                                        <input
                                                            type="text"
                                                            value={article.author}
                                                            onChange={(e) => {
                                                                const newArticles = [...magazineArticles];
                                                                newArticles[idx].author = e.target.value;
                                                                setMagazineArticles(newArticles);
                                                            }}
                                                            className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border dark:border-slate-700 rounded"
                                                            placeholder="Nome do Autor"
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold text-slate-500 uppercase">Data</label>
                                                        <input
                                                            type="text"
                                                            value={article.date}
                                                            onChange={(e) => {
                                                                const newArticles = [...magazineArticles];
                                                                newArticles[idx].date = e.target.value;
                                                                setMagazineArticles(newArticles);
                                                            }}
                                                            className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border dark:border-slate-700 rounded"
                                                            placeholder="15 Jan 2026"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-slate-500 uppercase">Resumo</label>
                                                    <textarea
                                                        value={article.excerpt}
                                                        onChange={(e) => {
                                                            const newArticles = [...magazineArticles];
                                                            newArticles[idx].excerpt = e.target.value;
                                                            setMagazineArticles(newArticles);
                                                        }}
                                                        className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border dark:border-slate-700 rounded resize-none"
                                                        placeholder="Breve resumo do artigo..."
                                                        rows="2"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-slate-500 uppercase">Imagem do Artigo</label>
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="text"
                                                            value={article.image}
                                                            onChange={(e) => {
                                                                const newArticles = [...magazineArticles];
                                                                newArticles[idx].image = e.target.value;
                                                                setMagazineArticles(newArticles);
                                                            }}
                                                            className="flex-1 px-3 py-2 text-sm bg-white dark:bg-slate-800 border dark:border-slate-700 rounded"
                                                            placeholder="Cole a URL da imagem ou use o botão ao lado"
                                                        />
                                                        <label className="cursor-pointer">
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                className="hidden"
                                                                onChange={(e) => {
                                                                    const file = e.target.files[0];
                                                                    if (file) {
                                                                        const reader = new FileReader();
                                                                        reader.onloadend = () => {
                                                                            const newArticles = [...magazineArticles];
                                                                            newArticles[idx].image = reader.result;
                                                                            setMagazineArticles(newArticles);
                                                                        };
                                                                        reader.readAsDataURL(file);
                                                                    }
                                                                }}
                                                            />
                                                            <div className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded hover:bg-purple-600 hover:text-white transition-all flex items-center gap-2 h-full">
                                                                <ImageIcon size={16} />
                                                                <span className="text-sm font-medium">Subir Foto</span>
                                                            </div>
                                                        </label>
                                                    </div>
                                                    {article.image && (
                                                        <div className="mt-2 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                                                            <img
                                                                src={article.image}
                                                                alt="Preview"
                                                                className="w-full h-48 object-cover"
                                                                onError={(e) => {
                                                                    e.target.style.display = 'none';
                                                                }}
                                                            />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-slate-500 uppercase">Conteúdo HTML</label>
                                                    <textarea
                                                        value={article.content}
                                                        onChange={(e) => {
                                                            const newArticles = [...magazineArticles];
                                                            newArticles[idx].content = e.target.value;
                                                            setMagazineArticles(newArticles);
                                                        }}
                                                        className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border dark:border-slate-700 rounded resize-none font-mono"
                                                        placeholder="<h2>Título</h2><p>Conteúdo...</p>"
                                                        rows="4"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-purple-100 dark:border-purple-800/20">
                                    <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400 mb-4">
                                        <Star size={20} />
                                        <h3 className="font-bold">Destaque da Revista</h3>
                                    </div>
                                    <div className="p-6 bg-purple-50 dark:bg-purple-900/10 rounded-xl border border-purple-100 dark:border-purple-800/30 space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Título do Destaque</label>
                                            <input
                                                type="text"
                                                value={magazineFeatured.title}
                                                onChange={(e) => setMagazineFeatured({ ...magazineFeatured, title: e.target.value })}
                                                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
                                                placeholder="Ex: Pequenos Missionários / Marta ou Maria?"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Descrição</label>
                                            <textarea
                                                value={magazineFeatured.description}
                                                onChange={(e) => setMagazineFeatured({ ...magazineFeatured, description: e.target.value })}
                                                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
                                                rows="3"
                                                placeholder="Breve descrição do destaque..."
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Link do Botão</label>
                                                <input
                                                    type="text"
                                                    value={magazineFeatured.link}
                                                    onChange={(e) => setMagazineFeatured({ ...magazineFeatured, link: e.target.value })}
                                                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
                                                    placeholder="#"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Texto do Botão</label>
                                                <input
                                                    type="text"
                                                    value={magazineFeatured.buttonText}
                                                    onChange={(e) => setMagazineFeatured({ ...magazineFeatured, buttonText: e.target.value })}
                                                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
                                                    placeholder="Ler Agora"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Imagem de Destaque</label>
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={magazineFeatured.image}
                                                    onChange={(e) => setMagazineFeatured({ ...magazineFeatured, image: e.target.value })}
                                                    className="flex-1 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
                                                    placeholder="URL da imagem..."
                                                />
                                                <label className="cursor-pointer">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => {
                                                            const file = e.target.files[0];
                                                            if (file) {
                                                                const reader = new FileReader();
                                                                reader.onloadend = () => {
                                                                    setMagazineFeatured({ ...magazineFeatured, image: reader.result });
                                                                };
                                                                reader.readAsDataURL(file);
                                                            }
                                                        }}
                                                    />
                                                    <div className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-600 hover:text-white transition-all flex items-center gap-2 h-full whitespace-nowrap">
                                                        <ImageIcon size={18} />
                                                        <span className="text-sm font-medium">Subir Foto</span>
                                                    </div>
                                                </label>
                                            </div>
                                            {magazineFeatured.image && (
                                                <div className="mt-2 h-48 w-full rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900">
                                                    <img
                                                        src={magazineFeatured.image}
                                                        alt="Preview"
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => e.target.style.display = 'none'}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {formData.slug === 'revista/kids' && (
                                    <div className="pt-6 border-t border-purple-100 dark:border-purple-800/20">
                                        <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400 mb-4">
                                            <Camera size={20} />
                                            <h3 className="font-bold">Preview da Galeria (Kids)</h3>
                                        </div>
                                        <div className="p-6 bg-yellow-50 dark:bg-yellow-900/10 rounded-xl border border-yellow-100 dark:border-yellow-800/30 space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Título da Seção</label>
                                                <input
                                                    type="text"
                                                    value={kidsGalleryPreview.title}
                                                    onChange={(e) => setKidsGalleryPreview({ ...kidsGalleryPreview, title: e.target.value })}
                                                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 dark:text-white"
                                                    placeholder="Ex: O que rolou na última EBF"
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Link do Botão</label>
                                                    <input
                                                        type="text"
                                                        value={kidsGalleryPreview.link}
                                                        onChange={(e) => setKidsGalleryPreview({ ...kidsGalleryPreview, link: e.target.value })}
                                                        className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 dark:text-white"
                                                        placeholder="Link para a galeria completa"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Texto do Botão</label>
                                                    <input
                                                        type="text"
                                                        value={kidsGalleryPreview.buttonText}
                                                        onChange={(e) => setKidsGalleryPreview({ ...kidsGalleryPreview, buttonText: e.target.value })}
                                                        className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 dark:text-white"
                                                        placeholder="Ver Galeria Completa"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    }

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Raw JSON Content (Avançado)</label>
                        <textarea
                            rows={6}
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white font-mono text-sm"
                            placeholder="Dados extras da página em formato JSON..."
                        />
                    </div>

                    <div className="pt-6 border-t border-slate-100 dark:border-slate-700 flex justify-end">
                        <button
                            type="submit"
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition-all font-bold shadow-lg shadow-blue-600/20 active:scale-95"
                        >
                            <Save size={20} />
                            <span>Salvar Alterações</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PageEditor;

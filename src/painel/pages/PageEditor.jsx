import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Activity, Calendar, Users, Heart, Star, Music, Book, Camera, MapPin, Phone, Mail, Clock, Baby, Trash2, Plus, MessageCircle } from 'lucide-react';
import dbService from '../../services/dbService';

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

    const [homeAbout, setHomeAbout] = useState({
        title: 'Quem Somos',
        text1: 'A ADMAC (Assembléia de Deus Ministério Aliança Comunitária) é mais do que uma igreja, é um lugar onde você encontra propósito, esperança e uma família de fé.',
        text2: 'Fundada com o objetivo de ser um farol de luz em nossa comunidade, temos nos dedicado ao ensino das escrituras e ao cuidado mútuo.',
        mission: 'Levar a mensagem do evangelho a todas as nações, transformando vidas através do amor de Cristo.',
        vision: 'Ser uma igreja relevante, acolhedora e referencia na pregação da palavra e serviço social.',
        values: 'Amor incondicional, integridade, serviço ao próximo, adoração genuína e fidelidade bíblica.'
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

    const [homeMinistries, setHomeMinistries] = useState({
        title: 'Nossos Ministérios',
        description: 'Há um lugar para você servir e crescer. Conheça as áreas de atuação da nossa igreja e envolva-se.',
        items: [] // Will be populated from current static data or fallback
    });

    const [homeActivities, setHomeActivities] = useState({
        title: 'Atividades em Destaque',
        description: 'Veja o que está acontecendo na igreja',
        items: []
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
                        if (parsedContent.leaders || parsedContent.obreiros || parsedContent.chamado) {
                            setLeadershipContent({
                                leaders: parsedContent.leaders || [],
                                obreiros: parsedContent.obreiros || leadershipContent.obreiros,
                                chamado: parsedContent.chamado || leadershipContent.chamado
                            });
                        }
                    } catch (e) {
                        console.error("Error parsing ministry content", e);
                    }
                }

                if (page.slug === 'inicio' && content) {
                    try {
                        const parsedContent = typeof content === 'string' ? JSON.parse(content) : content;
                        if (parsedContent.hero) {
                            setHomeHero(parsedContent.hero);
                        }
                        if (parsedContent.about) {
                            setHomeAbout(parsedContent.about);
                        }
                        if (parsedContent.agenda) {
                            setHomeAgenda(parsedContent.agenda);
                        }
                        if (parsedContent.ministries) {
                            setHomeMinistries(parsedContent.ministries);
                        }
                        if (parsedContent.activities) {
                            setHomeActivities(parsedContent.activities);
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
        const isMinistry = formData.slug?.startsWith('ministerios/');

        if (isMinistry) {
            let existingContent = {};
            try {
                existingContent = typeof formData.content === 'string' && formData.content ? JSON.parse(formData.content) : (typeof formData.content === 'object' ? formData.content : {});
            } catch (e) { }

            finalContent = {
                ...existingContent,
                pastoralMessage: pastoralMessage,
                raffle: raffle,
                productPromotion: productPromotion,
                testimonials: testimonials
            };
        }

        if (formData.slug === 'inicio') {
            let existingContent = {};
            try {
                existingContent = typeof formData.content === 'string' && formData.content ? JSON.parse(formData.content) : (typeof formData.content === 'object' ? formData.content : {});
            } catch (e) { }

            let contentData = { ...existingContent }; // Initialize contentData with existingContent

            if (formData.slug === 'inicio') {
                contentData = {
                    ...contentData,
                    hero: homeHero,
                    about: homeAbout,
                    agenda: homeAgenda,
                    ministries: homeMinistries,
                    activities: homeActivities,
                    podcast: homePodcast,
                    magazines: homeMagazines,
                    media: homeMedia,
                    contact: homeContact
                };
            } else if (formData.slug === 'ministerios/lideranca') {
                contentData = {
                    ...contentData,
                    pastoralMessage,
                    raffle,
                    productPromotion,
                    testimonials,
                    ...leadershipContent
                };
            } else if (formData.slug.includes('ministerios/')) {
                contentData = {
                    ...contentData,
                    pastoralMessage,
                    raffle,
                    productPromotion,
                    testimonials
                };
            }
            finalContent = contentData; // Assign contentData to finalContent
        }

        dbService.upsertPage({
            ...formData,
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
                        </div>
                    )}

                    {/* Home Specific Section */}
                    {formData.slug === 'inicio' && (
                        <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30 space-y-6">
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

                            <div className="pt-6 border-t border-blue-100 dark:border-blue-800/20">
                                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 mb-4">
                                    <h3 className="font-bold">Seção Quem Somos</h3>
                                </div>

                                <div className="space-y-4">
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

                            {/* Atividades */}
                            <div className="pt-6 border-t border-blue-100 dark:border-blue-800/20">
                                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 mb-4">
                                    <h3 className="font-bold">Seção Atividades em Destaque</h3>
                                </div>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Título</label>
                                            <input
                                                type="text"
                                                value={homeActivities.title}
                                                onChange={(e) => setHomeActivities({ ...homeActivities, title: e.target.value })}
                                                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Descrição</label>
                                            <input
                                                type="text"
                                                value={homeActivities.description}
                                                onChange={(e) => setHomeActivities({ ...homeActivities, description: e.target.value })}
                                                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <label className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Cartões de Atividades</label>
                                            <button
                                                type="button"
                                                onClick={() => setHomeActivities({ ...homeActivities, items: [...homeActivities.items, { title: 'Nova Atividade', desc: '', tag: '', image: '' }] })}
                                                className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-600 hover:text-white transition-all"
                                            >
                                                + Adicionar Atividade
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {homeActivities.items.map((item, idx) => (
                                                <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-900/80 rounded-xl border border-slate-100 dark:border-slate-700 space-y-4 group">
                                                    <div className="flex items-center justify-between">
                                                        <input
                                                            type="text"
                                                            value={item.title}
                                                            onChange={(e) => {
                                                                const newItems = [...homeActivities.items];
                                                                newItems[idx].title = e.target.value;
                                                                setHomeActivities({ ...homeActivities, items: newItems });
                                                            }}
                                                            className="bg-transparent font-bold text-slate-800 dark:text-white outline-none w-full"
                                                            placeholder="Título da Atividade"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setHomeActivities({ ...homeActivities, items: homeActivities.items.filter((_, i) => i !== idx) })}
                                                            className="text-red-400 hover:text-red-600 transition-colors"
                                                        >
                                                            &times;
                                                        </button>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-3">
                                                            <div>
                                                                <label className="text-[10px] font-bold text-slate-500 uppercase">Rótulo (Tag)</label>
                                                                <input
                                                                    type="text"
                                                                    value={item.tag}
                                                                    onChange={(e) => {
                                                                        const newItems = [...homeActivities.items];
                                                                        newItems[idx].tag = e.target.value;
                                                                        setHomeActivities({ ...homeActivities, items: newItems });
                                                                    }}
                                                                    className="w-full px-2 py-1 text-xs bg-white dark:bg-slate-800 border dark:border-slate-700 rounded"
                                                                    placeholder="ex: Toda Quinta"
                                                                />
                                                            </div>

                                                            <div>
                                                                <label className="text-[10px] font-bold text-slate-500 uppercase">Ícone</label>
                                                                <div className="flex gap-2 p-1 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded overflow-x-auto">
                                                                    {['Calendar', 'Users', 'Heart', 'Star', 'Music', 'Book', 'Camera', 'Baby'].map(iconName => (
                                                                        <button
                                                                            key={iconName}
                                                                            type="button"
                                                                            onClick={() => {
                                                                                const newItems = [...homeActivities.items];
                                                                                newItems[idx].icon = iconName;
                                                                                setHomeActivities({ ...homeActivities, items: newItems });
                                                                            }}
                                                                            className={`p-1 rounded transition-all ${item.icon === iconName ? 'bg-blue-600 text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500'}`}
                                                                            title={iconName}
                                                                        >
                                                                            {iconName === 'Calendar' && <Calendar size={14} />}
                                                                            {iconName === 'Users' && <Users size={14} />}
                                                                            {iconName === 'Heart' && <Heart size={14} />}
                                                                            {iconName === 'Star' && <Star size={14} />}
                                                                            {iconName === 'Music' && <Music size={14} />}
                                                                            {iconName === 'Book' && <Book size={14} />}
                                                                            {iconName === 'Camera' && <Camera size={14} />}
                                                                            {iconName === 'Baby' && <Baby size={14} />}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-bold text-slate-500 uppercase line-clamp-1">Preview / URL Imagem</label>
                                                            {item.image && (
                                                                <div className="h-16 w-full rounded overflow-hidden border border-slate-200 dark:border-slate-600">
                                                                    <img src={item.image} alt="Preview" className="w-full h-full object-cover" />
                                                                </div>
                                                            )}
                                                            <input
                                                                type="text"
                                                                value={item.image}
                                                                onChange={(e) => {
                                                                    const newItems = [...homeActivities.items];
                                                                    newItems[idx].image = e.target.value;
                                                                    setHomeActivities({ ...homeActivities, items: newItems });
                                                                }}
                                                                className="w-full px-2 py-1 text-[10px] bg-white dark:bg-slate-800 border dark:border-slate-700 rounded"
                                                                placeholder="URL da Imagem"
                                                            />
                                                        </div>
                                                    </div>

                                                    <textarea
                                                        value={item.desc}
                                                        onChange={(e) => {
                                                            const newItems = [...homeActivities.items];
                                                            newItems[idx].desc = e.target.value;
                                                            setHomeActivities({ ...homeActivities, items: newItems });
                                                        }}
                                                        className="w-full p-2 text-xs bg-white dark:bg-slate-800 border dark:border-slate-700 rounded resize-none"
                                                        placeholder="Descrição breve da atividade..."
                                                        rows="2"
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
                                                <div className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        value={homeMedia.featuredVideo.videoUrl}
                                                        onChange={(e) => setHomeMedia({ ...homeMedia, featuredVideo: { ...homeMedia.featuredVideo, videoUrl: e.target.value } })}
                                                        className="flex-1 px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border dark:border-slate-700 rounded"
                                                        placeholder="URL do Vídeo (ex: youtube.com/...)"
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
            </div >
        </div >
    );
};

export default PageEditor;

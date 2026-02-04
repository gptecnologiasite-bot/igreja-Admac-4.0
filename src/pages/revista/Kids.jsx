import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, Camera, BookOpen, X, Calendar, User, ChevronLeft, ChevronRight } from 'lucide-react';
import dbService from '../../services/dbService';

const Kids = () => {
    const [selectedArticle, setSelectedArticle] = useState(null);
    const carouselRef = useRef(null);

    const [articles, setArticles] = useState([
        {
            id: 1,
            icon: <Star className="w-6 h-6" />,
            iconColor: 'bg-blue-500/10 text-blue-500',
            title: 'Colorindo a Fé',
            excerpt: 'Atividades lúdicas para memorização de versículos básicos de forma criativa.',
            author: 'Profª Ana Paula',
            date: '15 Jan 2026',
            image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=800',
            content: `
                <h2>Colorindo a Fé: Atividades Criativas para Crianças</h2>
                
                <p>A memorização de versículos bíblicos é fundamental para o desenvolvimento espiritual das crianças. Mas como tornar esse processo divertido e eficaz?</p>
                
                <h3>Atividade 1: Versículos Coloridos</h3>
                <p>Imprima versículos em letras grandes e deixe as crianças colorirem cada palavra com uma col diferente. Isso ajuda na associação visual e torna a memorização mais divertida!</p>
                
                <h3>Atividade 2: Quebra-Cabeça Bíblico</h3>
                <p>Escreva um versículo em tiras de papel e peça para as crianças montarem na ordem correta. Você pode aumentar a dificuldade misturando palavras de diferentes versículos.</p>
                
                <h3>Atividade 3: Teatro de Versículos</h3>
                <p>Divida as crianças em grupos e peça para cada grupo dramatizar um versículo. Isso desenvolve a criatividade e ajuda na compreensão do significado.</p>
                
                <blockquote>"Ensina a criança no caminho em que deve andar, e, ainda quando for velho, não se desviará dele." - Provérbios 22:6</blockquote>
                
                <h3>Dicas Práticas:</h3>
                <ul>
                    <li>Use músicas para memorizar versículos longos</li>
                    <li>Crie cartões ilustrados com os versículos favoritos</li>
                    <li>Faça um mural de versículos na sala de aula</li>
                    <li>Recompense o esforço, não apenas a perfeição</li>
                </ul>
                
                <p>Lembre-se: o objetivo não é apenas decorar palavras, mas plantar a Palavra de Deus no coração das crianças!</p>
            `
        },
        {
            id: 2,
            icon: <Heart className="w-6 h-6" />,
            iconColor: 'bg-pink-500/10 text-pink-500',
            title: 'Amigos de Deus',
            excerpt: 'Uma série de estudos sobre Davi, Samuel e outras crianças da Bíblia.',
            author: 'Pastor João Silva',
            date: '12 Jan 2026',
            image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800',
            content: `
                <h2>Amigos de Deus: Crianças Extraordinárias da Bíblia</h2>
                
                <p>A Bíblia está cheia de histórias inspiradoras de crianças que fizeram a diferença no Reino de Deus. Vamos conhecer algumas delas!</p>
                
                <h3>1. Samuel - O Menino que Ouviu a Voz de Deus</h3>
                <p>Samuel era apenas um menino quando Deus o chamou no templo. Ele aprendeu a reconhecer a voz de Deus com a ajuda do sacerdote Eli. Essa história nos ensina que Deus fala com crianças também!</p>
                
                <h3>2. Davi - O Pequeno Gigante</h3>
                <p>Quando todos tinham medo de Golias, o jovem Davi confiou em Deus e venceu o gigante com apenas uma pedra e uma funda. Ele nos ensina que com Deus, somos mais fortes do que qualquer problema!</p>
                
                <h3>3. Josias - O Rei Criança</h3>
                <p>Josias se tornou rei com apenas 8 anos de idade! Ele amava a Palavra de Deus e fez reformas importantes em seu reino. Nunca somos jovens demais para fazer a diferença!</p>
                
                <h3>4. O Menino dos Cinco Pães e Dois Peixes</h3>
                <p>Um menino ofereceu seu lanche a Jesus, e com isso, Jesus alimentou mais de 5.000 pessoas! Quando damos o que temos a Jesus, Ele multiplica!</p>
                
                <blockquote>"Não despreze ninguém por ser jovem, mas seja um exemplo para os fiéis na palavra, no procedimento, no amor, na fé e na pureza." - 1 Timóteo 4:12</blockquote>
                
                <h3>O Que Aprendemos:</h3>
                <ul>
                    <li>Deus usa crianças para fazer coisas incríveis</li>
                    <li>A idade não importa quando temos fé</li>
                    <li>Pequenas ofertas se tornam grandes nas mãos de Deus</li>
                    <li>Obedecer a Deus traz bênçãos</li>
                </ul>
            `
        },
        {
            id: 3,
            icon: <BookOpen className="w-6 h-6" />,
            iconColor: 'bg-green-500/10 text-green-500',
            title: 'Contos Bíblicos',
            excerpt: 'Histórias adaptadas para leitura em família com ilustrações exclusivas.',
            author: 'Equipe Kids ADMAC',
            date: '10 Jan 2026',
            image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=800',
            content: `
                <h2>Contos Bíblicos Ilustrados para a Família</h2>
                
                <p>Nesta edição especial, trazemos três histórias bíblicas adaptadas para leitura em família, com linguagem simples e ilustrações encantadoras!</p>
                
                <h3>📖 História 1: Noé e a Grande Aventura</h3>
                <p>Era uma vez um homem muito bom chamado Noé. Ele amava a Deus e sempre fazia o que era certo. Um dia, Deus pediu a Noé para construir um barco ENORME - tão grande que caberia dois de cada animal do mundo!</p>
                
                <p>"Noé, vai chover muito, muito mesmo!", disse Deus. "Mas você e sua família estarão seguros no barco."</p>
                
                <p>Noé obedeceu, mesmo quando as pessoas riram dele. E sabe o que aconteceu? Deus cumpriu Sua promessa! Depois da chuva, apareceu um lindo arco-íris no céu - o sinal de que Deus sempre cuida de nós!</p>
                
                <h3>🌟 História 2: Ester, a Rainha Corajosa</h3>
                <p>Ester era uma menina judia muito bonita e corajosa. Ela se tornou rainha! Mas quando seu povo estava em perigo, ela precisou ser muito, muito corajosa.</p>
                
                <p>"Tenho medo, mas vou confiar em Deus", pensou Ester. E ela salvou todo o seu povo! Ester nos ensina que podemos ser corajosos quando confiamos em Deus.</p>
                
                <h3>🐟 História 3: Jonas e o Peixe Gigante</h3>
                <p>Jonas tentou fugir de Deus (má ideia!). Ele pegou um barco para ir bem longe. Mas Deus mandou uma tempestade e Jonas acabou sendo engolido por um peixe GIGANTE!</p>
                
                <p>Dentro da barriga do peixe, Jonas orou: "Desculpa, Deus! Eu vou obedecer agora!" E o peixe cuspiu Jonas na praia. Jonas aprendeu que é sempre melhor obedecer a Deus desde o começo!</p>
                
                <h3>💡 Perguntas para Conversar em Família:</h3>
                <ul>
                    <li>Qual história você mais gostou? Por quê?</li>
                    <li>Você já precisou ser corajoso como Ester?</li>
                    <li>O que você aprendeu sobre obedecer a Deus?</li>
                    <li>Como podemos confiar em Deus todos os dias?</li>
                </ul>
                
                <blockquote>"Tudo posso naquele que me fortalece." - Filipenses 4:13</blockquote>
            `
        }
    ]);

    useEffect(() => {
        const page = dbService.getPages().find(p => p.slug === 'revista/kids');
        if (page && page.content) {
            try {
                const content = typeof page.content === 'string' ? JSON.parse(page.content) : page.content;
                if (content.articles) {
                    // Map back the icons which are lost in JSON
                    const articlesWithIcons = content.articles.map((art, index) => ({
                        ...art,
                        icon: index === 0 ? <Star className="w-6 h-6" /> : (index === 1 ? <Heart className="w-6 h-6" /> : <BookOpen className="w-6 h-6" />)
                    }));
                    setArticles(articlesWithIcons);
                }
            } catch (e) {
                console.error("Error parsing kids articles", e);
            }
        }
    }, []);

    const scroll = (direction) => {
        if (carouselRef.current) {
            const { current } = carouselRef;
            const scrollAmount = direction === 'left' ? -300 : 300;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="pt-24 pb-16 min-h-screen bg-white dark:bg-church-dark transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Header */}
                    <div className="text-center mb-16">
                        <span className="px-4 py-2 bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 rounded-full text-sm font-bold uppercase tracking-widest">
                            Edição Janeiro 2026
                        </span>
                        <h1 className="mt-6 text-5xl md:text-7xl font-black text-church-primary dark:text-white uppercase tracking-tighter">
                            Revista <span className="text-yellow-500">KIDS</span>
                        </h1>
                        <p className="mt-4 text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                            Aventuras na fé, histórias bíblicas e muita diversão para os pequenos gigantes do Reino.
                        </p>
                    </div>

                    {/* Featured Article */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
                        <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800"
                                alt="Crianças na Igreja"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-8 left-8 right-8">
                                <h2 className="text-3xl font-bold text-white mb-2">Pequenos Missionários</h2>
                                <p className="text-white/80">Como ensinar o evangelismo prático desde cedo.</p>
                            </div>
                        </div>

                        {/* Articles Carousel */}
                        <div className="relative group -mx-4 px-4 md:-mx-8 md:px-8 max-w-full overflow-hidden">
                            {/* Navigation Buttons */}
                            <button
                                onClick={() => scroll('left')}
                                className="absolute left-0 top-1/2 -translate-y-1/2 ml-4 z-20 p-3 rounded-full bg-white dark:bg-[#1a1c23] shadow-lg border border-gray-100 dark:border-white/10 text-church-primary dark:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 disabled:opacity-0 hidden md:block"
                                aria-label="Previous slide"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>

                            <button
                                onClick={() => scroll('right')}
                                className="absolute right-0 top-1/2 -translate-y-1/2 mr-4 z-20 p-3 rounded-full bg-white dark:bg-[#1a1c23] shadow-lg border border-gray-100 dark:border-white/10 text-church-primary dark:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hidden md:block"
                                aria-label="Next slide"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>

                            <div
                                ref={carouselRef}
                                className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-8 scrollbar-hide pt-4"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                {articles.map((article) => (
                                    <motion.div
                                        key={article.id}
                                        whileHover={{ x: 5 }}
                                        className="snap-center min-w-[280px] shrink-0 flex gap-4 cursor-pointer group/card p-4 rounded-2xl hover:bg-white dark:hover:bg-white/5 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-white/10"
                                        onClick={() => setSelectedArticle(article)}
                                    >
                                        <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${article.iconColor}`}>
                                            {article.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-church-primary dark:text-white mb-1 group-hover/card:text-church-accent transition-colors">
                                                {article.title}
                                            </h3>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">{article.excerpt}</p>
                                            <div className="flex items-center gap-3 text-xs text-gray-400">
                                                <span className="flex items-center gap-1">
                                                    <User className="w-3 h-3" />
                                                    {article.author}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {article.date}
                                                </span>
                                            </div>
                                            <span className="inline-block mt-2 text-sm font-semibold text-church-accent group-hover/card:underline">
                                                Ler artigo completo →
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Gallery Preview */}
                    <div className="p-12 rounded-[3.5rem] bg-church-primary text-white text-center">
                        <Camera className="w-12 h-12 text-church-accent mx-auto mb-6" />
                        <h2 className="text-4xl font-bold mb-6 italic tracking-tight">O que rolou na última EBF</h2>
                        <button className="bg-church-accent text-church-primary px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">
                            Ver Galeria Completa
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Article Modal */}
            <AnimatePresence>
                {selectedArticle && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto"
                        onClick={() => setSelectedArticle(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white dark:bg-gray-900 rounded-3xl max-w-4xl w-full my-8 overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header with Image */}
                            <div className="relative h-64 md:h-96">
                                <img
                                    src={selectedArticle.image}
                                    alt={selectedArticle.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
                                <button
                                    onClick={() => setSelectedArticle(null)}
                                    className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                                        {selectedArticle.title}
                                    </h2>
                                    <div className="flex items-center gap-4 text-white/80 text-sm">
                                        <span className="flex items-center gap-2">
                                            <User className="w-4 h-4" />
                                            {selectedArticle.author}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            {selectedArticle.date}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Content */}
                            <div className="p-8 md:p-12 max-h-[60vh] overflow-y-auto">
                                <div
                                    className="prose prose-lg dark:prose-invert max-w-none
                                        prose-headings:text-church-primary dark:prose-headings:text-white
                                        prose-h2:text-3xl prose-h2:font-bold prose-h2:mb-4 prose-h2:mt-8
                                        prose-h3:text-xl prose-h3:font-bold prose-h3:mb-3 prose-h3:mt-6
                                        prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
                                        prose-blockquote:border-l-4 prose-blockquote:border-church-accent prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-church-primary dark:prose-blockquote:text-church-accent
                                        prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
                                        prose-li:text-gray-600 dark:prose-li:text-gray-300"
                                    dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Kids;

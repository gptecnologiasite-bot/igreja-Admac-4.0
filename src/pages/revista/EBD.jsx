import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, GraduationCap, Bookmark, Award, X, Calendar, User, Book, ChevronLeft, ChevronRight } from 'lucide-react';

const EBD = () => {
    const [selectedArticle, setSelectedArticle] = useState(null);
    const carouselRef = useRef(null);

    const articles = [
        {
            id: 1,
            icon: <BookOpen className="w-6 h-6" />,
            iconColor: 'bg-indigo-500/10 text-indigo-500',
            title: 'Fundamentos da Fé Cristã',
            excerpt: 'Explorando as doutrinas essenciais que sustentam nossa fé e prática cristã.',
            author: 'Pr. Carlos Mendes',
            date: '26 Jan 2026',
            image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=800',
            content: `
                <h2>Fundamentos da Fé Cristã: Alicerces Inabaláveis</h2>
                
                <p>A fé cristã não é construída sobre areia movediça, mas sobre fundamentos sólidos e eternos. Neste estudo, exploraremos as doutrinas essenciais que sustentam nossa caminhada com Cristo.</p>
                
                <h3>1. A Autoridade das Escrituras</h3>
                <p>A Bíblia é a Palavra inspirada de Deus, inerrante e suficiente para nos guiar em toda verdade. Como afirmou o apóstolo Paulo:</p>
                
                <blockquote>"Toda a Escritura é inspirada por Deus e útil para o ensino, para a repreensão, para a correção e para a instrução na justiça." - 2 Timóteo 3:16</blockquote>
                
                <h3>2. A Trindade</h3>
                <p>Cremos em um único Deus que existe eternamente em três pessoas: Pai, Filho e Espírito Santo. Cada pessoa da Trindade é plenamente Deus, coigual e coeterna.</p>
                
                <ul>
                    <li><strong>Deus Pai:</strong> O Criador soberano de todas as coisas</li>
                    <li><strong>Deus Filho:</strong> Jesus Cristo, encarnado para nossa salvação</li>
                    <li><strong>Deus Espírito Santo:</strong> Nosso consolador e guia</li>
                </ul>
                
                <h3>3. A Salvação pela Graça</h3>
                <p>Não somos salvos por obras, mas pela graça de Deus mediante a fé em Jesus Cristo. Esta é a mensagem central do Evangelho:</p>
                
                <blockquote>"Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus. Não vem das obras, para que ninguém se glorie." - Efésios 2:8-9</blockquote>
                
                <h3>4. A Segunda Vinda de Cristo</h3>
                <p>Jesus prometeu que voltaria para buscar Sua igreja e estabelecer Seu reino eterno. Esta esperança nos motiva a viver em santidade e vigilância.</p>
                
                <h3>Aplicação Prática:</h3>
                <ul>
                    <li>Estude as Escrituras diariamente</li>
                    <li>Compartilhe sua fé com outros</li>
                    <li>Viva em santidade, aguardando a volta de Cristo</li>
                    <li>Participe ativamente da comunhão da igreja</li>
                </ul>
                
                <p><strong>Conclusão:</strong> Estes fundamentos não são apenas teoria teológica, mas verdades transformadoras que devem moldar nossa vida diária. Que possamos estar firmados na rocha que é Cristo!</p>
            `
        },
        {
            id: 2,
            icon: <GraduationCap className="w-6 h-6" />,
            iconColor: 'bg-blue-500/10 text-blue-500',
            title: 'Hermenêutica Bíblica',
            excerpt: 'Princípios para interpretar corretamente as Escrituras e aplicá-las à vida contemporânea.',
            author: 'Profª Márcia Santos',
            date: '19 Jan 2026',
            image: 'https://images.unsplash.com/photo-1519791883288-dc8bd696e667?q=80&w=800',
            content: `
                <h2>Hermenêutica Bíblica: A Arte de Interpretar as Escrituras</h2>
                
                <p>Hermenêutica é a ciência e arte de interpretar textos, especialmente as Sagradas Escrituras. Compreender os princípios corretos de interpretação é fundamental para não distorcer a Palavra de Deus.</p>
                
                <h3>Princípio 1: Contexto é Rei</h3>
                <p>Nunca interprete um versículo isoladamente. Sempre considere:</p>
                <ul>
                    <li><strong>Contexto Histórico:</strong> Quando e por que foi escrito?</li>
                    <li><strong>Contexto Cultural:</strong> Quais eram os costumes da época?</li>
                    <li><strong>Contexto Literário:</strong> O que vem antes e depois do texto?</li>
                    <li><strong>Contexto Canônico:</strong> Como se relaciona com toda a Bíblia?</li>
                </ul>
                
                <h3>Princípio 2: A Escritura Interpreta a Escritura</h3>
                <p>A Bíblia é sua própria melhor intérprete. Passagens obscuras devem ser entendidas à luz de passagens claras sobre o mesmo tema.</p>
                
                <blockquote>"Sabendo primeiramente isto: que nenhuma profecia da Escritura é de particular interpretação." - 2 Pedro 1:20</blockquote>
                
                <h3>Princípio 3: Identifique o Gênero Literário</h3>
                <p>A Bíblia contém diferentes gêneros literários:</p>
                <ul>
                    <li>📜 <strong>Narrativa:</strong> Conta histórias (Gênesis, Atos)</li>
                    <li>📖 <strong>Lei:</strong> Instruções e mandamentos (Levítico, Deuteronômio)</li>
                    <li>🎵 <strong>Poesia:</strong> Linguagem figurada (Salmos, Cânticos)</li>
                    <li>📣 <strong>Profecia:</strong> Mensagens de Deus ao povo (Isaías, Jeremias)</li>
                    <li>✉️ <strong>Epístolas:</strong> Cartas às igrejas (Romanos, Coríntios)</li>
                    <li>🔮 <strong>Apocalíptico:</strong> Revelações simbólicas (Daniel, Apocalipse)</li>
                </ul>
                
                <h3>Princípio 4: Do Texto ao Contexto Atual</h3>
                <p>Pergunte-se sempre:</p>
                <ol>
                    <li>O que o texto significava para os leitores originais?</li>
                    <li>Qual é o princípio eterno por trás do texto?</li>
                    <li>Como esse princípio se aplica hoje?</li>
                </ol>
                
                <h3>Erros Comuns a Evitar:</h3>
                <ul>
                    <li>❌ Eisegese (colocar suas ideias no texto)</li>
                    <li>❌ Alegorização excessiva</li>
                    <li>❌ Ignorar o contexto histórico</li>
                    <li>❌ Usar a Bíblia como livro de sorte</li>
                </ul>
                
                <blockquote>"Procura apresentar-te a Deus aprovado, como obreiro que não tem de que se envergonhar, que maneja bem a palavra da verdade." - 2 Timóteo 2:15</blockquote>
                
                <p><strong>Conclusão:</strong> A interpretação correta das Escrituras requer estudo, oração e humildade. Que o Espírito Santo nos guie em toda verdade!</p>
            `
        },
        {
            id: 3,
            icon: <Award className="w-6 h-6" />,
            iconColor: 'bg-purple-500/10 text-purple-500',
            title: 'Teologia Sistemática',
            excerpt: 'Uma visão organizada das principais doutrinas cristãs e sua aplicação prática.',
            author: 'Pr. Roberto Alves',
            date: '12 Jan 2026',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800',
            content: `
                <h2>Teologia Sistemática: Organizando as Verdades de Deus</h2>
                
                <p>A Teologia Sistemática é o estudo organizado das doutrinas bíblicas, agrupadas por temas. É como montar um quebra-cabeça gigante onde cada peça (versículo) contribui para a imagem completa da verdade divina.</p>
                
                <h3>1. Bibliologia - A Doutrina das Escrituras</h3>
                <p>Estuda a natureza, inspiração e autoridade da Bíblia.</p>
                <ul>
                    <li><strong>Inspiração:</strong> Deus soprou Sua palavra através de autores humanos</li>
                    <li><strong>Inerrância:</strong> A Bíblia é livre de erros em seus manuscritos originais</li>
                    <li><strong>Suficiência:</strong> Tudo que precisamos para salvação e vida piedosa</li>
                </ul>
                
                <h3>2. Teologia Própria - A Doutrina de Deus</h3>
                <p>Quem é Deus? Seus atributos e natureza:</p>
                <ul>
                    <li>🌟 <strong>Atributos Incomunicáveis:</strong> Onipotência, Onisciência, Onipresença</li>
                    <li>❤️ <strong>Atributos Comunicáveis:</strong> Amor, Justiça, Santidade, Misericórdia</li>
                </ul>
                
                <blockquote>"Deus é espírito, e importa que os que o adoram o adorem em espírito e em verdade." - João 4:24</blockquote>
                
                <h3>3. Cristologia - A Doutrina de Cristo</h3>
                <p>Jesus Cristo é o centro da nossa fé:</p>
                <ul>
                    <li><strong>Divindade:</strong> Jesus é plenamente Deus</li>
                    <li><strong>Humanidade:</strong> Jesus é plenamente homem</li>
                    <li><strong>União Hipostática:</strong> Duas naturezas em uma pessoa</li>
                    <li><strong>Obra Redentora:</strong> Morte, ressurreição e ascensão</li>
                </ul>
                
                <h3>4. Pneumatologia - A Doutrina do Espírito Santo</h3>
                <p>O Espírito Santo não é uma força, mas uma pessoa divina:</p>
                <ul>
                    <li>Convence do pecado, justiça e juízo</li>
                    <li>Regenera e santifica os crentes</li>
                    <li>Distribui dons espirituais</li>
                    <li>Intercede por nós em oração</li>
                </ul>
                
                <h3>5. Soteriologia - A Doutrina da Salvação</h3>
                <p>Como somos salvos?</p>
                <ol>
                    <li><strong>Eleição:</strong> Deus nos escolheu antes da fundação do mundo</li>
                    <li><strong>Chamado:</strong> Deus nos chama eficazmente</li>
                    <li><strong>Regeneração:</strong> Nascemos de novo pelo Espírito</li>
                    <li><strong>Conversão:</strong> Arrependimento e fé</li>
                    <li><strong>Justificação:</strong> Declarados justos diante de Deus</li>
                    <li><strong>Santificação:</strong> Processo de crescimento em santidade</li>
                    <li><strong>Glorificação:</strong> Perfeição final no céu</li>
                </ol>
                
                <h3>6. Eclesiologia - A Doutrina da Igreja</h3>
                <p>A igreja é o corpo de Cristo na terra:</p>
                <ul>
                    <li>Comunhão dos santos</li>
                    <li>Adoração coletiva</li>
                    <li>Edificação mútua</li>
                    <li>Missão evangelística</li>
                </ul>
                
                <h3>7. Escatologia - A Doutrina das Últimas Coisas</h3>
                <p>O que acontecerá no futuro?</p>
                <ul>
                    <li>Segunda vinda de Cristo</li>
                    <li>Ressurreição dos mortos</li>
                    <li>Juízo final</li>
                    <li>Novos céus e nova terra</li>
                </ul>
                
                <blockquote>"Mas, como está escrito: As coisas que o olho não viu, e o ouvido não ouviu, e não subiram ao coração do homem, são as que Deus preparou para os que o amam." - 1 Coríntios 2:9</blockquote>
                
                <h3>Por Que Estudar Teologia Sistemática?</h3>
                <ul>
                    <li>✅ Conhecer melhor a Deus</li>
                    <li>✅ Defender a fé contra heresias</li>
                    <li>✅ Crescer em maturidade espiritual</li>
                    <li>✅ Ensinar outros com clareza</li>
                </ul>
                
                <p><strong>Conclusão:</strong> A teologia não é apenas para pastores e acadêmicos. Todo cristão deve buscar conhecer profundamente as verdades de Deus para viver uma vida que O glorifique!</p>
            `
        }
    ];

    const scroll = (direction) => {
        if (carouselRef.current) {
            const { current } = carouselRef;
            const scrollAmount = direction === 'left' ? -340 : 340;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="pt-24 pb-16 min-h-screen bg-white dark:bg-church-dark transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 1, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-20">
                        <div className="flex-1">
                            <span className="text-church-primary dark:text-church-accent font-bold uppercase tracking-widest text-sm mb-4 block">Conhecimento que Liberta</span>
                            <h1 className="text-6xl md:text-9xl font-black text-church-primary dark:text-white uppercase tracking-tighter leading-none mb-6">
                                REVISTA <span className="italic">EBD</span>
                            </h1>
                            <p className="text-2xl text-gray-500 dark:text-gray-400 font-medium">Aprofundamento teológico e aplicação prática das Escrituras em cada lição semanal.</p>
                        </div>
                        <div className="shrink-0 p-10 bg-church-light/50 dark:bg-white/5 rounded-[4rem] border-2 border-dashed border-gray-200 dark:border-white/10 hidden lg:block">
                            <BookOpen className="w-32 h-32 text-church-primary dark:text-church-accent" />
                        </div>
                    </div>

                    {/* Articles Grid / Carousel */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold text-church-primary dark:text-white mb-8 flex items-center gap-3">
                            <Book className="w-8 h-8 text-church-accent" />
                            Estudos Bíblicos desta Edição
                        </h2>

                        {/* Carousel Container */}
                        <div className="relative group -mx-4 px-4 md:-mx-8 md:px-8">
                            {/* Navigation Buttons */}
                            <button
                                onClick={() => scroll('left')}
                                className="absolute left-0 top-1/2 -translate-y-1/2 ml-4 z-20 p-2 rounded-full bg-white dark:bg-[#1a1c23] shadow-lg border border-gray-100 dark:border-white/10 text-church-primary dark:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 disabled:opacity-0 hidden md:block"
                                aria-label="Previous slide"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>

                            <button
                                onClick={() => scroll('right')}
                                className="absolute right-0 top-1/2 -translate-y-1/2 mr-4 z-20 p-2 rounded-full bg-white dark:bg-[#1a1c23] shadow-lg border border-gray-100 dark:border-white/10 text-church-primary dark:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hidden md:block"
                                aria-label="Next slide"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>

                            <div
                                ref={carouselRef}
                                className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                {articles.map((article) => (
                                    <motion.div
                                        key={article.id}
                                        whileHover={{ y: -5 }}
                                        className="snap-center min-w-[300px] md:min-w-[400px] shrink-0 cursor-pointer group/card h-full"
                                        onClick={() => setSelectedArticle(article)}
                                    >
                                        <div className="bg-white dark:bg-white/5 rounded-3xl overflow-hidden border border-gray-100 dark:border-white/10 hover:border-church-accent/50 dark:hover:border-church-accent/50 transition-all hover:shadow-xl h-full flex flex-col">
                                            {/* Article Image */}
                                            <div className="relative h-48 overflow-hidden shrink-0">
                                                <img
                                                    src={article.image}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                                                <div className={`absolute top-4 right-4 w-12 h-12 rounded-xl ${article.iconColor} flex items-center justify-center backdrop-blur-sm border border-white/20`}>
                                                    {article.icon}
                                                </div>
                                            </div>

                                            {/* Article Content */}
                                            <div className="p-6 flex flex-col grow">
                                                <h3 className="text-xl font-bold text-church-primary dark:text-white mb-2 group-hover/card:text-church-accent transition-colors">
                                                    {article.title}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 grow">
                                                    {article.excerpt}
                                                </p>
                                                <div className="flex items-center gap-3 text-xs text-gray-400 mb-3 mt-auto">
                                                    <span className="flex items-center gap-1">
                                                        <User className="w-3 h-3" />
                                                        {article.author}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        {article.date}
                                                    </span>
                                                </div>
                                                <span className="inline-block text-sm font-semibold text-church-accent group-hover/card:underline">
                                                    Ler estudo completo →
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Classes Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                        <div className="group p-12 rounded-[3.5rem] bg-church-primary text-white space-y-6 hover:shadow-2xl transition-all shadow-church-primary/20">
                            <GraduationCap className="w-12 h-12 text-church-accent" />
                            <h3 className="text-3xl font-bold">Classe de Adultos</h3>
                            <p className="text-white/70 text-lg leading-relaxed">Estudos apologéticos sobre os desafios da fé cristã na pós-modernidade e fundamentos da doutrina reformada.</p>
                        </div>
                        <div className="group p-12 rounded-[3.5rem] bg-church-light/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 space-y-6 hover:bg-white dark:hover:bg-white/10 transition-all">
                            <Award className="w-12 h-12 text-church-primary dark:text-church-accent" />
                            <h3 className="text-3xl font-bold text-church-primary dark:text-white">Formação de Líderes</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">Módulos especiais para aqueles que sentem o chamado para o ensino da Palavra e pastoreio de ovelhas.</p>
                        </div>
                    </div>

                    {/* Featured Quote */}
                    <div className="relative p-16 md:p-24 rounded-[4.5rem] border-2 border-church-accent/30 dark:border-church-accent/20 text-center overflow-hidden">
                        <Bookmark className="absolute -bottom-10 -right-10 w-48 h-48 text-church-accent/5" />
                        <h2 className="text-4xl md:text-5xl font-bold text-church-primary dark:text-white leading-tight italic max-w-4xl mx-auto">
                            "A Escritura não pode ser quebrada; o que ela diz, Deus diz."
                        </h2>
                        <div className="mt-10 inline-block px-6 py-3 bg-church-accent text-church-primary font-bold rounded-full">
                            Toda Edição de Domingo às 09h00
                        </div>
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
                                        prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2
                                        prose-li:text-gray-600 dark:prose-li:text-gray-300
                                        prose-strong:text-church-primary dark:prose-strong:text-church-accent"
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

export default EBD;

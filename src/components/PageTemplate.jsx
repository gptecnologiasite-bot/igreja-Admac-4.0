
import { motion } from 'framer-motion';

const PageTemplate = ({ title, description }) => {
    return (
        <div className="pt-24 pb-16 min-h-screen bg-white dark:bg-church-dark transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-church-primary dark:text-white mb-6">
                        {title}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed">
                        {description}
                    </p>

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-8 rounded-3xl bg-church-light/30 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                            <h2 className="text-2xl font-bold text-church-primary dark:text-church-accent mb-4">Sobre a Revista</h2>
                            <p className="text-gray-500 dark:text-gray-400">
                                Conteúdo em desenvolvimento para a nossa revista digital. Aqui você encontrará artigos, estudos e notícias exclusivas.
                            </p>
                        </div>
                        <div className="p-8 rounded-3xl bg-church-light/30 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                            <h2 className="text-2xl font-bold text-church-primary dark:text-church-accent mb-4">Últimas Edições</h2>
                            <p className="text-gray-500 dark:text-gray-400">
                                Em breve, disponibilizaremos o arquivo das edições passadas para consulta e download.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PageTemplate;

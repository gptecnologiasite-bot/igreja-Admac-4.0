import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Share2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import dbService from '../../services/dbService';
import Maintenance from '../../components/Maintenance';

const MediaPage = () => {
    const { slug } = useParams();
    const location = useLocation();
    const fullSlug = `midia/${slug}`;
    const [page, setPage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPage = () => {
            const data = dbService.getPageBySlug(fullSlug);
            setPage(data);
            setLoading(false);
        };

        loadPage();
        window.addEventListener('contentUpdated', loadPage);
        return () => window.removeEventListener('contentUpdated', loadPage);
    }, [fullSlug]);

    if (loading) {
        return (
            <div className="min-h-screen pt-24 flex justify-center items-center bg-white dark:bg-church-dark">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-church-primary"></div>
            </div>
        );
    }

    if (!page) {
        return (
            <div className="min-h-screen pt-24 px-4 flex flex-col items-center justify-center text-center bg-white dark:bg-church-dark">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Página não encontrada</h1>
                <Link to="/" className="text-church-primary hover:underline flex items-center gap-2">
                    <ArrowLeft size={20} />
                    Voltar para o Início
                </Link>
            </div>
        );
    }

    const isPreview = new URLSearchParams(location.search).get('preview') === 'true';
    if (page.status === 'Inativo' && !isPreview) {
        return <Maintenance />;
    }

    return (
        <div className="pt-24 pb-16 min-h-screen bg-white dark:bg-church-dark transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center gap-2 mb-8 text-church-primary dark:text-church-accent opacity-80">
                        <Share2 size={20} />
                        <span className="uppercase tracking-widest text-sm font-bold">Mídia & Redes Sociais</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-8">
                        {page.title}
                    </h1>

                    <div
                        className="prose prose-lg dark:prose-invert max-w-none 
                        prose-headings:text-gray-900 dark:prose-headings:text-white
                        prose-p:text-gray-600 dark:prose-p:text-gray-300
                        prose-a:text-church-primary dark:prose-a:text-church-accent hover:prose-a:underline
                        prose-strong:text-gray-900 dark:prose-strong:text-white"
                        dangerouslySetInnerHTML={{ __html: page.content }}
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default MediaPage;

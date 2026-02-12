import React from 'react';

const SkipToContent = () => {
    return (
        <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-church-primary focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-church-accent focus:ring-offset-2"
        >
            Pular para o conteúdo principal
        </a>
    );
};

export default SkipToContent;

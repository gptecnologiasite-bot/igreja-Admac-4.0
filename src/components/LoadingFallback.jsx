

const LoadingFallback = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-church-dark">
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-church-primary border-t-transparent"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">Carregando...</p>
            </div>
        </div>
    );
};

export default LoadingFallback;

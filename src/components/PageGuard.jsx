import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import dbService from '../services/dbService';
import Maintenance from './Maintenance';

const PageGuard = ({ slug, children }) => {
    const { user } = useAuth();
    const location = useLocation();
    const [status, setStatus] = useState('Ativo');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkStatus = () => {
            const page = dbService.getPageBySlug(slug);
            if (page) {
                setStatus(page.status);
            }
            setLoading(false);
        };

        checkStatus();

        // Listen for content updates to react immediately
        window.addEventListener('contentUpdated', checkStatus);
        return () => window.removeEventListener('contentUpdated', checkStatus);
    }, [slug]);

    if (loading) return null; // Or a loading spinner

    const isPreview = new URLSearchParams(location.search).get('preview') === 'true';

    // Only bypass if explicitly in preview mode
    if (status === 'Inativo' && !isPreview) {
        return <Maintenance />;
    }

    return children;
};

export default PageGuard;

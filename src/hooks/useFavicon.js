import { useEffect } from 'react';
import dbService from '../services/dbService';

const useFavicon = () => {
    useEffect(() => {
        const updateFavicon = () => {
            try {
                const settings = dbService.getSettings();
                const faviconUrl = settings.logoUrl || '/favicon.svg';
                
                // Find existing favicon link elements
                let faviconLink = document.querySelector("link[rel='icon'][type='image/svg+xml']");
                
                if (!faviconLink) {
                    // Create if doesn't exist
                    faviconLink = document.createElement('link');
                    faviconLink.rel = 'icon';
                    faviconLink.type = 'image/svg+xml';
                    document.head.appendChild(faviconLink);
                }
                
                // Update the href
                faviconLink.href = faviconUrl;
                
                // Also update other favicon formats if they exist
                const iconLink = document.querySelector("link[rel='icon'][type='image/x-icon']");
                if (iconLink && settings.logoUrl) {
                    iconLink.href = faviconUrl;
                }
                
                const pngLink32 = document.querySelector("link[rel='icon'][sizes='32x32']");
                if (pngLink32 && settings.logoUrl) {
                    pngLink32.href = faviconUrl;
                }
                
                const pngLink16 = document.querySelector("link[rel='icon'][sizes='16x16']");
                if (pngLink16 && settings.logoUrl) {
                    pngLink16.href = faviconUrl;
                }
                
                const appleTouchIcon = document.querySelector("link[rel='apple-touch-icon']");
                if (appleTouchIcon && settings.logoUrl) {
                    appleTouchIcon.href = faviconUrl;
                }
            } catch (error) {
                console.error('Error updating favicon:', error);
            }
        };

        // Update on mount
        updateFavicon();

        // Listen for settings updates
        window.addEventListener('settingsUpdated', updateFavicon);

        return () => {
            window.removeEventListener('settingsUpdated', updateFavicon);
        };
    }, []);
};

export default useFavicon;

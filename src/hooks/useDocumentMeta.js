import { useEffect } from 'react';
import { SITE_CONFIG } from '../config/site';

/**
 * Custom hook to set document title and meta description for SEO.
 * @param {Object} options
 * @param {string} options.title - Page title (will append site name)
 * @param {string} [options.description] - Meta description
 */
export const useDocumentMeta = ({ title, description }) => {
    useEffect(() => {
        const suffix = ` | ${SITE_CONFIG.name}`;
        document.title = title.includes(SITE_CONFIG.name) ? title : title + suffix;

        if (description) {
            let meta = document.querySelector('meta[name="description"]');
            if (!meta) {
                meta = document.createElement('meta');
                meta.name = 'description';
                document.head.appendChild(meta);
            }
            meta.content = description;
        }
    }, [title, description]);
};

export default useDocumentMeta;

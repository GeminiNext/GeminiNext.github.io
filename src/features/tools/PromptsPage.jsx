import React, { useState, useEffect } from 'react';
import promptsData from '../../data/prompts.json';
import Toast from '../../components/Toast';
import LazyImage from '../../components/LazyImage';
import useDocumentMeta from '../../hooks/useDocumentMeta';
import { useTheme } from '../../contexts/ThemeContext';

const ImageCarousel = ({ images, onImageClick }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { isDarkMode } = useTheme();

    if (!images || images.length === 0) return null;

    const nextImage = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className={`w-full ${isDarkMode ? 'bg-geek-bg/30 border-geek-border/50' : 'bg-gray-100 border-gray-200'} border-b relative`}>
            <div
                className="w-full h-48 overflow-hidden cursor-pointer relative group/img"
                onClick={() => onImageClick(images, currentIndex)}
            >
                <LazyImage
                    src={`/prompt_images/${images[currentIndex]}`}
                    alt={`Image ${currentIndex + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                    placeholderClassName="w-full h-full"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs font-mono border border-white/50 px-3 py-1 rounded-full backdrop-blur-sm">
                        View Fullscreen
                    </span>
                </div>
            </div>

            {images.length > 1 && (
                <>
                    <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm z-10">←</button>
                    <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm z-10">→</button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {images.map((_, idx) => (
                            <div key={idx} className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentIndex ? (isDarkMode ? 'bg-geek-primary w-4' : 'bg-blue-500 w-4') : 'bg-white/40'}`} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

const PromptsPage = () => {
    const [prompts, setPrompts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedImages, setSelectedImages] = useState(null);
    const [currentModalIndex, setCurrentModalIndex] = useState(0);
    const [toastMessage, setToastMessage] = useState(null);
    const { isDarkMode } = useTheme();

    useDocumentMeta({
        title: 'AI Prompt 提示词库',
        description: '精选高质量 AI 提示词模板集合，涵盖代码生成、文案写作、数据分析等多个领域，提升你的 LLM 工作流效率。',
    });

    useEffect(() => { setPrompts(promptsData); }, []);

    const filteredPrompts = prompts.filter(prompt =>
        prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setToastMessage('Prompt copied to clipboard!');
        }).catch(() => {
            setToastMessage('Failed to copy');
        });
    };

    const handleImageClick = (images, startIndex = 0) => {
        setSelectedImages(images);
        setCurrentModalIndex(startIndex);
    };

    const closeImageModal = () => { setSelectedImages(null); setCurrentModalIndex(0); };

    const nextModalImage = (e) => { e.stopPropagation(); setCurrentModalIndex((prev) => (prev + 1) % selectedImages.length); };
    const prevModalImage = (e) => { e.stopPropagation(); setCurrentModalIndex((prev) => (prev - 1 + selectedImages.length) % selectedImages.length); };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedImages) return;
            if (e.key === 'Escape') closeImageModal();
            else if (e.key === 'ArrowLeft') prevModalImage(e);
            else if (e.key === 'ArrowRight') nextModalImage(e);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImages]);

    const headingColor = isDarkMode ? 'text-white' : 'text-gray-900';
    const subColor = isDarkMode ? 'text-geek-dim' : 'text-gray-500';
    const accentColor = isDarkMode ? 'text-geek-primary' : 'text-blue-600';
    const cardBg = isDarkMode ? 'bg-geek-card/50 border-geek-border' : 'bg-white border-gray-200 shadow-sm';
    const inputBg = isDarkMode ? 'bg-geek-card border-geek-border' : 'bg-gray-50 border-gray-200';
    const contentBg = isDarkMode ? 'bg-geek-bg/50 border-geek-border/50' : 'bg-gray-50 border-gray-200';

    return (
        <div>
            <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                <h1 className={`text-2xl md:text-3xl font-bold ${headingColor}`}>
                    <span className={`${accentColor} font-mono`}>&gt;</span> Prompt Library
                    <span className={`${subColor} text-sm md:text-lg ml-2`}>AI Prompts Collection</span>
                </h1>
                <div className="relative w-full md:w-64">
                    <input
                        type="text"
                        placeholder="Search prompts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`w-full px-4 py-2 rounded-lg border focus:outline-none text-sm transition-all ${inputBg} ${isDarkMode ? 'text-white focus:border-geek-primary' : 'text-gray-900 focus:border-blue-500'}`}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPrompts.map((prompt) => (
                    <div key={prompt.id} className={`${cardBg} border rounded-xl hover:border-geek-primary transition-all group flex flex-col h-full overflow-hidden`}>
                        {prompt.images?.length > 0 ? <ImageCarousel images={prompt.images} onImageClick={handleImageClick} /> : <div className={`h-2 w-full ${isDarkMode ? 'bg-geek-primary/20' : 'bg-blue-100'}`}></div>}
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className={`text-xl font-bold ${headingColor} group-hover:${accentColor} transition-colors line-clamp-2 mb-4`}>{prompt.title}</h3>
                            <div className={`${contentBg} p-4 rounded-lg font-mono text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4 border max-h-32 overflow-y-auto flex-grow`}>{prompt.content}</div>
                            <button onClick={() => copyToClipboard(prompt.content)} className={`w-full py-2 rounded-lg border font-bold text-sm flex items-center justify-center gap-2 mt-auto transition-all ${isDarkMode ? 'border-geek-primary/30 text-geek-primary hover:bg-geek-primary hover:text-black' : 'border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white'}`}>📋 Copy Prompt</button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedImages && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={closeImageModal}>
                    <div className="relative max-w-[90vw] max-h-[90vh] p-2 rounded-xl" onClick={e => e.stopPropagation()}>
                        <button onClick={closeImageModal} className={`absolute -top-4 -right-4 w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all z-10 text-xl font-bold ${isDarkMode ? 'bg-geek-card text-white border-geek-primary hover:bg-geek-primary hover:text-black' : 'bg-white text-gray-900 border-blue-500 hover:bg-blue-500 hover:text-white'}`}>✕</button>
                        <LazyImage src={`/prompt_images/${selectedImages[currentModalIndex]}`} alt="Preview" className="max-w-full max-h-[85vh] rounded-lg shadow-2xl" />
                        {selectedImages.length > 1 && (
                            <>
                                <button onClick={prevModalImage} className={`absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full border-2 transition-all z-10 text-2xl font-bold ${isDarkMode ? 'bg-geek-card/90 text-white border-geek-primary hover:bg-geek-primary hover:text-black' : 'bg-white/90 text-gray-900 border-blue-500 hover:bg-blue-500 hover:text-white'}`}>←</button>
                                <button onClick={nextModalImage} className={`absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full border-2 transition-all z-10 text-2xl font-bold ${isDarkMode ? 'bg-geek-card/90 text-white border-geek-primary hover:bg-geek-primary hover:text-black' : 'bg-white/90 text-gray-900 border-blue-500 hover:bg-blue-500 hover:text-white'}`}>→</button>
                            </>
                        )}
                        <div className={`mt-2 text-center text-xs font-mono ${subColor}`}>Image {currentModalIndex + 1} / {selectedImages.length}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PromptsPage;

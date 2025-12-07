import React, { useState, useEffect } from 'react';
import promptsData from '../data/prompts.json';
import Toast from '../components/Toast';

// Image Carousel Component for Cards
const ImageCarousel = ({ images, onImageClick }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

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
        <div className="w-full bg-geek-bg/30 border-b border-geek-border/50 relative">
            <div
                className="w-full h-48 overflow-hidden cursor-pointer relative group/img"
                onClick={() => onImageClick(images, currentIndex)}
            >
                <img
                    src={`/prompt_images/${images[currentIndex]}`}
                    alt={`Image ${currentIndex + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                    onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                    }}
                />
                <div className="hidden w-full h-full items-center justify-center bg-geek-bg/50 text-geek-dim text-xs">
                    Image not found: {images[currentIndex]}
                </div>

                {/* View Button Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs font-mono border border-white/50 px-3 py-1 rounded-full backdrop-blur-sm">
                        View Fullscreen
                    </span>
                </div>
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm transition-all z-10"
                    >
                        ←
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm transition-all z-10"
                    >
                        →
                    </button>

                    {/* Dots Indicator */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {images.map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentIndex
                                    ? 'bg-geek-primary w-4'
                                    : 'bg-white/40'
                                    }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

const PromptPage = () => {
    const [prompts, setPrompts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedImages, setSelectedImages] = useState(null);
    const [currentModalIndex, setCurrentModalIndex] = useState(0);
    const [toastMessage, setToastMessage] = useState(null);

    useEffect(() => {
        setPrompts(promptsData);
    }, []);

    const filteredPrompts = prompts.filter(prompt =>
        prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setToastMessage('Prompt copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
            setToastMessage('Failed to copy');
        });
    };

    const handleImageClick = (images, startIndex = 0) => {
        setSelectedImages(images);
        setCurrentModalIndex(startIndex);
    };

    const closeImageModal = () => {
        setSelectedImages(null);
        setCurrentModalIndex(0);
    };

    const nextModalImage = (e) => {
        e.stopPropagation();
        setCurrentModalIndex((prev) => (prev + 1) % selectedImages.length);
    };

    const prevModalImage = (e) => {
        e.stopPropagation();
        setCurrentModalIndex((prev) => (prev - 1 + selectedImages.length) % selectedImages.length);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedImages) {
                if (e.key === 'Escape') closeImageModal();
                return;
            }

            switch (e.key) {
                case 'Escape':
                    closeImageModal();
                    break;
                case 'ArrowLeft':
                    setCurrentModalIndex((prev) => (prev - 1 + selectedImages.length) % selectedImages.length);
                    break;
                case 'ArrowRight':
                    setCurrentModalIndex((prev) => (prev + 1) % selectedImages.length);
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImages]);

    return (
        <div className="min-h-screen bg-geek-bg text-gray-300 font-sans selection:bg-geek-primary selection:text-black p-4 md:p-12">
            <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <a href="/" className="text-geek-dim hover:text-white transition-colors">
                            &larr; Back
                        </a>
                        <h1 className="text-2xl md:text-3xl font-bold text-white flex flex-col md:flex-row md:items-center">
                            <div>
                                <span className="text-geek-primary font-mono">&gt;</span> Prompt Library
                            </div>
                            <span className="text-geek-dim text-sm md:text-lg md:ml-2 mt-1 md:mt-0">AI Prompts Collection</span>
                        </h1>
                    </div>
                    {/* Search Bar */}
                    <div className="relative w-full md:w-64">
                        <input
                            type="text"
                            placeholder="Search prompts..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-geek-card border border-geek-border focus:border-geek-primary focus:outline-none text-sm text-white placeholder-geek-dim transition-all"
                        />
                        <span className="absolute right-3 top-2.5 text-geek-dim">🔍</span>
                    </div>
                </div>

                {/* Prompts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
                    {filteredPrompts.map((prompt) => (
                        <div key={prompt.id} className="p-0 rounded-xl bg-geek-card/50 backdrop-blur-sm border border-geek-border hover:border-geek-primary transition-all group flex flex-col h-full overflow-hidden">
                            {/* Images Section - Carousel */}
                            {prompt.images?.length > 0 ? (
                                <ImageCarousel images={prompt.images} onImageClick={handleImageClick} />
                            ) : (
                                <div className="h-2 w-full bg-geek-primary/20"></div>
                            )}

                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex flex-col gap-2 mb-4">
                                    <h3 className="text-xl font-bold text-white group-hover:text-geek-primary transition-colors line-clamp-2">{prompt.title}</h3>

                                    <div className="flex flex-wrap gap-2">
                                        <span className="text-xs text-geek-dim flex items-center gap-1">
                                            <span className="w-2 h-2 rounded-full bg-geek-secondary"></span>
                                            {prompt.tags[0] || 'Prompt'}
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-geek-bg/50 p-4 rounded-lg font-mono text-xs text-gray-300 mb-4 border border-geek-border/50 max-h-32 overflow-y-auto custom-scrollbar flex-grow">
                                    {prompt.content}
                                </div>

                                <button
                                    onClick={() => copyToClipboard(prompt.content)}
                                    className="w-full py-2 rounded-lg border border-geek-primary/30 text-geek-primary hover:bg-geek-primary hover:text-black transition-all font-bold text-sm flex items-center justify-center gap-2 mt-auto"
                                >
                                    <span>📋</span> Copy Prompt
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredPrompts.length === 0 && (
                    <div className="text-center py-20 text-geek-dim">
                        <p className="text-lg">No prompts found matching your search.</p>
                    </div>
                )}

                {/* Image Modal with Carousel */}
                {selectedImages && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
                        onClick={closeImageModal}
                    >
                        <div className="relative max-w-[90vw] max-h-[90vh] glass-card p-2 rounded-xl group/modal">
                            <button
                                onClick={closeImageModal}
                                className="absolute -top-4 -right-4 bg-geek-card text-white p-2 rounded-full border border-geek-primary hover:bg-geek-primary hover:text-black transition-all z-10"
                            >
                                ✕
                            </button>

                            <img
                                src={`/prompt_images/${selectedImages[currentModalIndex]}`}
                                alt="Preview"
                                className="max-w-full max-h-[85vh] rounded-lg shadow-[0_0_30px_rgba(0,255,157,0.1)]"
                                onClick={(e) => e.stopPropagation()}
                            />

                            {/* Navigation Arrows for Modal */}
                            {selectedImages.length > 1 && (
                                <>
                                    <button
                                        onClick={prevModalImage}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-geek-card/90 hover:bg-geek-primary text-white hover:text-black p-3 rounded-full border border-geek-primary transition-all z-10"
                                    >
                                        ←
                                    </button>
                                    <button
                                        onClick={nextModalImage}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-geek-card/90 hover:bg-geek-primary text-white hover:text-black p-3 rounded-full border border-geek-primary transition-all z-10"
                                    >
                                        →
                                    </button>
                                </>
                            )}

                            <div className="mt-2 text-center text-xs font-mono text-geek-dim flex items-center justify-center gap-2">
                                <span>{selectedImages[currentModalIndex]}</span>
                                {selectedImages.length > 1 && (
                                    <span className="text-geek-primary">
                                        ({currentModalIndex + 1} / {selectedImages.length})
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PromptPage;

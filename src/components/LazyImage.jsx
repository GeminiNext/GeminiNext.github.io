import React, { useState, useEffect, useRef } from 'react';

const LazyImage = ({
    src,
    alt,
    className = '',
    placeholderClassName = '',
    onError,
    onClick,
    ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [hasError, setHasError] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        if (!imgRef.current) return;

        // 创建 Intersection Observer
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                rootMargin: '50px', // 提前50px开始加载
                threshold: 0.01
            }
        );

        observer.observe(imgRef.current);

        return () => {
            if (imgRef.current) {
                observer.unobserve(imgRef.current);
            }
        };
    }, []);

    const handleLoad = () => {
        setIsLoaded(true);
    };

    const handleError = (e) => {
        setHasError(true);
        if (onError) {
            onError(e);
        }
    };

    return (
        <div ref={imgRef} className={`relative ${className}`} onClick={onClick}>
            {/* 加载占位符 */}
            {!isLoaded && !hasError && (
                <div className={`absolute inset-0 bg-geek-bg/30 animate-pulse flex items-center justify-center ${placeholderClassName}`}>
                    <div className="w-8 h-8 border-2 border-geek-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            {/* 错误占位符 */}
            {hasError && (
                <div className={`absolute inset-0 bg-geek-bg/50 flex items-center justify-center ${placeholderClassName}`}>
                    <div className="text-center text-geek-dim text-xs">
                        <div className="text-2xl mb-2">🖼️</div>
                        <div>Image not found</div>
                    </div>
                </div>
            )}

            {/* 实际图片 - 只在进入视口时才加载 */}
            {isInView && (
                <img
                    src={src}
                    alt={alt}
                    className={`${className} transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                    onLoad={handleLoad}
                    onError={handleError}
                    {...props}
                />
            )}
        </div>
    );
};

export default LazyImage;

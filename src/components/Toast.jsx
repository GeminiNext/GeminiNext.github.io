import React, { useEffect } from 'react';

const Toast = ({ message, onClose, duration = 2000 }) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [message, duration, onClose]);

    if (!message) return null;

    return (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-fadeInUp pointer-events-none">
            <div className="bg-[#0a0a0a]/90 border border-[#00ff9d]/50 text-[#00ff9d] px-6 py-3 rounded-full shadow-[0_0_20px_rgba(0,255,157,0.2)] flex items-center gap-2 backdrop-blur-md">
                <span className="text-xl">✓</span>
                <span className="font-mono text-sm font-bold">{message}</span>
            </div>
        </div>
    );
};

export default Toast;

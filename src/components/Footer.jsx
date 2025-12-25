import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full border-t border-geek-border/50 py-8 text-center text-geek-dim text-sm font-mono">
            <p className="mb-2">All about indie dev. <span className="text-geek-primary">Ship Fast.</span></p>
            <div className="flex justify-center gap-4 text-xs">
                <a href="/about" className="hover:text-white transition-colors">关于我们</a>
                <span className="text-geek-border">|</span>
                <a href="/privacy" className="hover:text-white transition-colors">隐私政策</a>
                <span className="text-geek-border">|</span>
                <a href="mailto:sunstar1227@126.com" className="hover:text-white transition-colors">联系我们</a>
            </div>
        </footer>
    );
};

export default Footer;

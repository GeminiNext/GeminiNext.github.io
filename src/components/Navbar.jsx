import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { SITE_CONFIG } from '../config/site';
import ThemeToggle from './ThemeToggle';

const navLinks = [
    { path: '/blog', label: '博客', icon: '📝' },
    { path: '/exam', label: 'AI考试', icon: '🧠' },
    { path: '/tools', label: '出海工具', icon: '🚀' },
];

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const { isDarkMode } = useTheme();

    const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    // Detect scroll for shadow effect
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const headerBg = isDarkMode
        ? (scrolled ? 'border-[#27272a]/60 bg-[#050505]/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.4)]' : 'border-[#27272a]/30 bg-[#050505]/70 backdrop-blur-md')
        : (scrolled ? 'border-gray-200 bg-white/90 backdrop-blur-xl shadow-md' : 'border-gray-200/50 bg-white/70 backdrop-blur-md');

    const logoColor = isDarkMode ? 'text-geek-primary' : 'text-blue-600';
    const titleColor = isDarkMode ? 'text-white' : 'text-gray-900';
    const subtitleColor = isDarkMode ? 'text-geek-dim' : 'text-gray-400';

    // Helper to split site name for styling (e.g., gemini and 4.cn)
    const renderLogo = () => {
        const name = SITE_CONFIG.name;
        // Split at the first number or dot for a similar aesthetic
        const match = name.match(/^([a-zA-Z]+)(.*)$/);
        if (match) {
            return (
                <span className={`${titleColor} font-bold text-lg tracking-tight`}>
                    {match[1]}<span className={subtitleColor}>{match[2]}</span>
                </span>
            );
        }
        return <span className={`${titleColor} font-bold text-lg tracking-tight`}>{name}</span>;
    };

    const linkClass = (active) => {
        if (active) {
            return isDarkMode
                ? 'bg-geek-primary/10 text-geek-primary border border-geek-primary/20'
                : 'bg-blue-50 text-blue-600 border border-blue-200';
        }
        return isDarkMode
            ? 'text-geek-dim hover:text-white hover:bg-white/5 border border-transparent'
            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100 border border-transparent';
    };

    const mobileMenuBg = isDarkMode
        ? 'border-[#27272a]/30 bg-[#050505]/95 backdrop-blur-xl'
        : 'border-gray-200 bg-white/95 backdrop-blur-xl';

    const menuBtnColor = isDarkMode ? 'text-geek-dim hover:text-white' : 'text-gray-500 hover:text-gray-900';

    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${headerBg}`}>
            <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group shrink-0">
                    <span className={`${logoColor} font-mono text-xl font-bold group-hover:drop-shadow-[0_0_8px_rgba(0,255,157,0.5)] transition-all`}>
                        &gt;
                    </span>
                    {renderLogo()}
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${linkClass(isActive(link.path))}`}
                        >
                            <span className="mr-1.5">{link.icon}</span>
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Right: Theme Toggle + Mobile Toggle */}
                <div className="flex items-center gap-2">
                    <ThemeToggle showLabel={false} />
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className={`md:hidden ${menuBtnColor} p-2 rounded-lg hover:bg-white/5 transition-colors`}
                        aria-label={mobileOpen ? '关闭菜单' : '打开菜单'}
                    >
                        <span className="text-xl">{mobileOpen ? '✕' : '☰'}</span>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className={`md:hidden border-t ${mobileMenuBg} animate-fadeIn`}>
                    <div className="px-6 py-4 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${linkClass(isActive(link.path))}`}
                            >
                                <span className="mr-2">{link.icon}</span>
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;

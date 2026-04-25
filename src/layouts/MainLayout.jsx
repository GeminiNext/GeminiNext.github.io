import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTheme } from '../contexts/ThemeContext';

const MainLayout = () => {
    const location = useLocation();
    const { isDarkMode } = useTheme();

    // Scroll to top on route change
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const bgClasses = isDarkMode
        ? 'bg-[#050505] text-gray-300 bg-[linear-gradient(to_right,#121212_1px,transparent_1px),linear-gradient(to_bottom,#121212_1px,transparent_1px)] bg-[size:40px_40px]'
        : 'bg-gray-50 text-gray-800';

    return (
        <div className={`min-h-screen flex flex-col font-sans antialiased transition-colors duration-300 ${bgClasses}`}>
            <Navbar />
            <main className="flex-grow w-full max-w-6xl mx-auto px-6 pt-24 pb-12">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;

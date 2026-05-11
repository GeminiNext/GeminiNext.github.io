import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import MainLayout from './layouts/MainLayout';

// Lazy-loaded feature modules for code splitting
const HomePage = lazy(() => import('./features/home/HomePage'));
const BlogListPage = lazy(() => import('./features/blog/BlogListPage'));
const BlogDetailPage = lazy(() => import('./features/blog/BlogDetailPage'));
const ExamPage = lazy(() => import('./features/exam/ExamPage'));
const ExamKnowledgePage = lazy(() => import('./features/exam/ExamKnowledgePage'));
const ToolsPage = lazy(() => import('./features/tools/ToolsPage'));
const PromptsPage = lazy(() => import('./features/tools/PromptsPage'));
const AboutPage = lazy(() => import('./features/pages/AboutPage'));
const PrivacyPage = lazy(() => import('./features/pages/PrivacyPage'));

// Loading fallback component
const LoadingFallback = () => (
    <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
            <div className="inline-block w-8 h-8 border-2 border-geek-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-geek-dim font-mono text-sm">Loading...</p>
        </div>
    </div>
);

function App() {
    return (
        <ThemeProvider>
            <Router>
                <Suspense fallback={<LoadingFallback />}>
                    <Routes>
                        {/* Main Layout routes (Navbar + Footer) */}
                        <Route path="/" element={<ExamPage />} />

                        {/* Main Layout routes (Navbar + Footer) */}
                        <Route element={<MainLayout />}>
                            <Route path="/category" element={<HomePage />} />
                            <Route path="/blog" element={<BlogListPage />} />
                            <Route path="/blog/:id" element={<BlogDetailPage />} />
                            <Route path="/tools" element={<ToolsPage />} />
                            <Route path="/tools/prompts" element={<PromptsPage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/privacy" element={<PrivacyPage />} />
                        </Route>

                        {/* Exam routes - standalone layout (own header/theme) */}
                        <Route path="/exam" element={<ExamPage />} />
                        <Route path="/exam/knowledge" element={<ExamKnowledgePage />} />
                        <Route path="/knowledge" element={<ExamKnowledgePage />} />
                    </Routes>
                </Suspense>
            </Router>
        </ThemeProvider>
    );
}

export default App;

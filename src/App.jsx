import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ExamPage from './pages/ExamPage';
import ExamOperatePage from './pages/ExamOperatePage';
import PrivacyPage from './pages/PrivacyPage';
import AboutPage from './pages/AboutPage';
import BlogListPage from './pages/BlogListPage';
import BlogDetailPage from './pages/BlogDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen flex flex-col font-sans antialiased selection:bg-geek-primary selection:text-black">
            <Header />
            <main className="flex-grow w-full max-w-6xl mx-auto px-6 py-12">
              <HomePage />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/exam" element={<ExamPage />} />
        <Route path="/exam_operate" element={<ExamOperatePage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogListPage />} />
        <Route path="/blog/:id" element={<BlogDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;

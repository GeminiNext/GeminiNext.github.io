import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans antialiased selection:bg-geek-primary selection:text-black">
        <Header />
        <main className="flex-grow w-full max-w-6xl mx-auto px-6 py-12">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import AchievementsSection from './components/AchievementsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular verificação de autenticação
    setTimeout(() => {
      // Por enquanto, simular usuário não logado
      setCurrentUser(null);
      setLoading(false);
    }, 1000);
  }, []);

  const handleLogout = () => {
    setCurrentUser(null);
    // Implementar lógica de logout
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando portfólio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar currentUser={currentUser} onLogout={handleLogout} />
      
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection currentUser={currentUser} />
        <AchievementsSection currentUser={currentUser} />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;

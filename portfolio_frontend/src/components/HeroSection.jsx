import React from 'react';
import { ArrowDown, Github, Linkedin, Mail, Download } from 'lucide-react';
import { Button } from './ui/button';

const HeroSection = () => {
  const handleScrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-secondary opacity-50"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-destructive/20 rounded-full blur-xl animate-pulse delay-2000"></div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Image */}
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full bg-gradient-to-br from-primary to-accent p-1 shadow-neon">
              <div className="w-full h-full rounded-full bg-card flex items-center justify-center text-6xl md:text-7xl font-bold text-primary">
                AD
              </div>
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground">
            <span className="block">Alexis Daniel</span>
            <span className="block text-primary gradient-primary bg-clip-text text-transparent">
              Matto Careaga
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Desenvolvedor Full Stack apaixonado por tecnologia e inovação
          </p>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transformo ideias em soluções digitais inovadoras, combinando design moderno 
            com tecnologias de ponta para criar experiências únicas e impactantes.
          </p>
        </div>

        {/* Call to Actions */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="hover-lift hover-glow"
            onClick={handleScrollToProjects}
          >
            Ver Projetos
            <ArrowDown className="ml-2 h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="hover-lift"
          >
            <Download className="mr-2 h-5 w-5" />
            Download CV
          </Button>
        </div>

        {/* Social Links */}
        <div className="mt-12 flex justify-center space-x-6">
          <a
            href="https://github.com/Peixe-Eterno"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors hover-lift"
          >
            <Github className="h-8 w-8" />
            <span className="sr-only">GitHub</span>
          </a>
          
          <a
            href="https://www.linkedin.com/in/alexis-daniel-matto-careaga-8033511b9/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors hover-lift"
          >
            <Linkedin className="h-8 w-8" />
            <span className="sr-only">LinkedIn</span>
          </a>
          
          <a
            href="mailto:alexisdanielmatto@gmail.com"
            className="text-muted-foreground hover:text-primary transition-colors hover-lift"
          >
            <Mail className="h-8 w-8" />
            <span className="sr-only">Email</span>
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


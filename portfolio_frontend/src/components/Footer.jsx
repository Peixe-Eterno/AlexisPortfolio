import React from 'react';
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';
import { Button } from './ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { label: 'Início', href: '#home' },
    { label: 'Sobre', href: '#about' },
    { label: 'Projetos', href: '#projects' },
    { label: 'Conquistas', href: '#achievements' },
    { label: 'Contato', href: '#contact' }
  ];

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/Peixe-Eterno',
      label: 'GitHub'
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/alexis-daniel-matto-careaga-8033511b9/',
      label: 'LinkedIn'
    },
    {
      icon: Mail,
      href: 'mailto:alexisdanielmatto@gmail.com',
      label: 'Email'
    }
  ];

  const handleLinkClick = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Alexis Daniel
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Desenvolvedor Full Stack apaixonado por criar soluções digitais inovadoras 
              que fazem a diferença. Transformando ideias em realidade através da tecnologia.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-background text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors hover-lift"
                >
                  <social.icon className="w-5 h-5" />
                  <span className="sr-only">{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Navegação
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Contato
            </h4>
            <div className="space-y-2 text-muted-foreground">
              <p>São Paulo, Brasil</p>
              <a
                href="mailto:alexisdanielmatto@gmail.com"
                className="block hover:text-primary transition-colors"
              >
                alexisdanielmatto@gmail.com
              </a>
              <p className="text-sm">
                Disponível para novos projetos
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-6 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center text-muted-foreground text-sm mb-4 md:mb-0">
            <span>© {currentYear} Alexis Daniel Matto Careaga. Feito com</span>
            <Heart className="w-4 h-4 mx-1 text-destructive fill-current" />
            <span>e muito código.</span>
          </div>

          {/* Back to Top Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={scrollToTop}
            className="hover-lift"
          >
            <ArrowUp className="w-4 h-4 mr-2" />
            Voltar ao topo
          </Button>
        </div>

        {/* Tech Stack Credits */}
        <div className="pb-6 text-center">
          <p className="text-xs text-muted-foreground">
            Desenvolvido com React, Tailwind CSS, shadcn/ui e muito ☕
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


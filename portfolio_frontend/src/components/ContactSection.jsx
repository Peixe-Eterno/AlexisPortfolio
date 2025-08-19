import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envio do formulário
    setTimeout(() => {
      alert('Mensagem enviada com sucesso! Retornarei em breve.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'alexisdanielmatto@gmail.com',
      href: 'mailto:alexisdanielmatto@gmail.com',
      color: 'text-primary'
    },
    {
      icon: Phone,
      label: 'Telefone',
      value: '+55 (11) 99999-9999',
      href: 'tel:+5511999999999',
      color: 'text-accent'
    },
    {
      icon: MapPin,
      label: 'Localização',
      value: 'São Paulo, Brasil',
      href: null,
      color: 'text-destructive'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/Peixe-Eterno',
      color: 'hover:text-foreground'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/alexis-daniel-matto-careaga-8033511b9/',
      color: 'hover:text-primary'
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      href: 'https://wa.me/5511999999999',
      color: 'hover:text-accent'
    }
  ];

  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Entre em Contato
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tem um projeto em mente? Vamos conversar sobre como posso ajudar a transformar suas ideias em realidade
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                Vamos trabalhar juntos
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Estou sempre aberto a discutir novos projetos, oportunidades criativas 
                ou parcerias. Se você tem uma ideia interessante ou precisa de ajuda 
                com desenvolvimento, não hesite em entrar em contato.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <Card key={index} className="hover-lift transition-smooth">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg bg-card ${info.color}`}>
                        <info.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{info.label}</p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-foreground hover:text-primary transition-colors font-medium"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-foreground font-medium">{info.value}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4">
                Redes Sociais
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-lg bg-card text-muted-foreground ${social.color} transition-colors hover-lift`}
                  >
                    <social.icon className="w-6 h-6" />
                    <span className="sr-only">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                  <div>
                    <p className="text-foreground font-medium">Disponível para novos projetos</p>
                    <p className="text-sm text-muted-foreground">
                      Responderei em até 24 horas
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="hover-glow transition-smooth">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">
                Envie uma mensagem
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Nome *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Assunto *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Sobre o que você gostaria de conversar?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Mensagem *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Conte-me mais sobre seu projeto ou ideia..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full hover-lift"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Enviar Mensagem
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-primary text-primary-foreground">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Pronto para começar seu projeto?
              </h3>
              <p className="text-primary-foreground/90 mb-6">
                Vamos transformar suas ideias em soluções digitais incríveis. 
                Entre em contato hoje mesmo e vamos conversar sobre seu próximo projeto.
              </p>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => document.querySelector('#contact form').scrollIntoView({ behavior: 'smooth' })}
              >
                Começar agora
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;


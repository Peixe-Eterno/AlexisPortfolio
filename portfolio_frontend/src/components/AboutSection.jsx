import React from 'react';
import { Code, Palette, Zap, Users, Award, Target } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const AboutSection = () => {
  const skills = [
    {
      icon: Code,
      title: 'Desenvolvimento',
      description: 'Full Stack com foco em tecnologias modernas como React, Node.js, Python e muito mais.',
      color: 'text-primary'
    },
    {
      icon: Palette,
      title: 'Design',
      description: 'Criação de interfaces intuitivas e experiências de usuário memoráveis.',
      color: 'text-accent'
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Otimização de aplicações para máxima velocidade e eficiência.',
      color: 'text-destructive'
    },
    {
      icon: Users,
      title: 'Colaboração',
      description: 'Trabalho em equipe e comunicação efetiva em projetos complexos.',
      color: 'text-secondary'
    }
  ];

  const stats = [
    { number: '50+', label: 'Projetos Concluídos' },
    { number: '3+', label: 'Anos de Experiência' },
    { number: '15+', label: 'Tecnologias Dominadas' },
    { number: '100%', label: 'Dedicação' }
  ];

  return (
    <section id="about" className="py-20 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Sobre Mim
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conheça mais sobre minha jornada, habilidades e paixão por tecnologia
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
                <Target className="mr-3 h-6 w-6 text-primary" />
                Minha Missão
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Sou um desenvolvedor Full Stack apaixonado por criar soluções digitais que fazem a diferença. 
                Com uma abordagem centrada no usuário, busco sempre entregar produtos que não apenas funcionem 
                perfeitamente, mas que também proporcionem experiências excepcionais.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
                <Award className="mr-3 h-6 w-6 text-accent" />
                Experiência
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Ao longo dos últimos anos, tive a oportunidade de trabalhar em diversos projetos desafiadores, 
                desde aplicações web complexas até sistemas de gerenciamento empresarial. Cada projeto me 
                ensinou algo novo e me ajudou a crescer como profissional e pessoa.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Filosofia de Trabalho
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Acredito que a tecnologia deve ser uma ferramenta para melhorar a vida das pessoas. 
                Por isso, sempre busco entender profundamente as necessidades dos usuários antes de 
                começar a desenvolver qualquer solução.
              </p>
            </div>
          </div>

          {/* Right Column - Skills Grid */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <Card key={index} className="hover-lift hover-glow transition-smooth">
                  <CardContent className="p-6 text-center">
                    <skill.icon className={`h-12 w-12 mx-auto mb-4 ${skill.color}`} />
                    <h4 className="text-lg font-semibold text-foreground mb-2">
                      {skill.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {skill.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className="mt-20">
          <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Tecnologias que Domino
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Flask', 
              'Django', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS', 'Git', 
              'HTML5', 'CSS3', 'Tailwind CSS', 'Next.js'
            ].map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-secondary/20 text-secondary-foreground rounded-full text-sm font-medium hover-lift transition-smooth"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;


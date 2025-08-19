import React, { useState, useEffect } from 'react';
import { Award, Calendar, ExternalLink, Building, Heart, MessageCircle, Share2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const AchievementsSection = ({ currentUser }) => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data para demonstração
  useEffect(() => {
    setTimeout(() => {
      setAchievements([
        {
          id: 1,
          title: 'AWS Certified Solutions Architect',
          description: 'Certificação em arquitetura de soluções na Amazon Web Services, demonstrando expertise em design e deploy de sistemas escaláveis.',
          organization: 'Amazon Web Services',
          date_achieved: '2024-03-15',
          certificate_url: 'https://aws.amazon.com/certification/',
          image_url: null,
          is_featured: true,
          category: { name: 'Cloud Computing', color: '#ff6b35' },
          likes_count: 42,
          comments_count: 7,
          created_at: '2024-03-15T10:00:00Z'
        },
        {
          id: 2,
          title: 'Hackathon Winner - FinTech Challenge',
          description: 'Primeiro lugar no hackathon de tecnologia financeira, desenvolvendo uma solução inovadora para pagamentos digitais.',
          organization: 'TechCorp Events',
          date_achieved: '2024-02-20',
          certificate_url: null,
          image_url: null,
          is_featured: true,
          category: { name: 'Competições', color: '#7209b7' },
          likes_count: 38,
          comments_count: 12,
          created_at: '2024-02-20T15:30:00Z'
        },
        {
          id: 3,
          title: 'Google Cloud Professional Developer',
          description: 'Certificação profissional em desenvolvimento na Google Cloud Platform, com foco em aplicações nativas da nuvem.',
          organization: 'Google Cloud',
          date_achieved: '2024-01-10',
          certificate_url: 'https://cloud.google.com/certification/',
          image_url: null,
          is_featured: false,
          category: { name: 'Cloud Computing', color: '#ff6b35' },
          likes_count: 29,
          comments_count: 4,
          created_at: '2024-01-10T09:15:00Z'
        },
        {
          id: 4,
          title: 'Scrum Master Certified',
          description: 'Certificação em metodologias ágeis e gestão de projetos, capacitando para liderar equipes de desenvolvimento.',
          organization: 'Scrum Alliance',
          date_achieved: '2023-11-25',
          certificate_url: 'https://scrumalliance.org/',
          image_url: null,
          is_featured: false,
          category: { name: 'Gestão de Projetos', color: '#0f3460' },
          likes_count: 21,
          comments_count: 3,
          created_at: '2023-11-25T14:20:00Z'
        },
        {
          id: 5,
          title: 'Open Source Contributor Award',
          description: 'Reconhecimento por contribuições significativas para projetos open source, incluindo bibliotecas React e ferramentas de desenvolvimento.',
          organization: 'GitHub',
          date_achieved: '2023-10-15',
          certificate_url: null,
          image_url: null,
          is_featured: true,
          category: { name: 'Open Source', color: '#00ff88' },
          likes_count: 56,
          comments_count: 18,
          created_at: '2023-10-15T11:45:00Z'
        }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const handleLike = async (achievementId) => {
    console.log('Curtir conquista:', achievementId);
  };

  const handleShare = (achievement) => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href + '#achievement-' + achievement.id)}`;
    window.open(linkedinUrl, '_blank', 'width=600,height=400');
  };

  if (loading) {
    return (
      <section id="achievements" className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Carregando conquistas...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="achievements" className="py-20 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Conquistas & Certificações
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Marcos importantes da minha jornada profissional e reconhecimentos obtidos
          </p>
        </div>

        {/* Achievements Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border transform md:-translate-x-1/2"></div>

          <div className="space-y-12">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.id}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background transform md:-translate-x-1/2 z-10">
                  {achievement.is_featured && (
                    <div className="absolute -inset-2 bg-primary/30 rounded-full animate-ping"></div>
                  )}
                </div>

                {/* Content Card */}
                <div className={`ml-12 md:ml-0 w-full md:w-5/12 ${
                  index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                }`}>
                  <Card className="hover-lift hover-glow transition-smooth">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Award className="w-5 h-5 text-primary" />
                            {achievement.is_featured && (
                              <Badge variant="default" className="text-xs">
                                Destaque
                              </Badge>
                            )}
                            <Badge 
                              variant="outline" 
                              className="text-xs"
                              style={{ borderColor: achievement.category.color }}
                            >
                              {achievement.category.name}
                            </Badge>
                          </div>
                          
                          <h3 className="text-xl font-semibold text-foreground mb-2">
                            {achievement.title}
                          </h3>
                          
                          <div className="flex items-center text-sm text-muted-foreground mb-3">
                            <Building className="w-4 h-4 mr-2" />
                            {achievement.organization}
                          </div>
                          
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4 mr-2" />
                            {new Date(achievement.date_achieved).toLocaleDateString('pt-BR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {achievement.description}
                      </p>

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => handleLike(achievement.id)}
                            className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Heart className="w-4 h-4" />
                            <span>{achievement.likes_count}</span>
                          </button>

                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <MessageCircle className="w-4 h-4" />
                            <span>{achievement.comments_count}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          {achievement.certificate_url && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(achievement.certificate_url, '_blank')}
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Certificado
                            </Button>
                          )}
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleShare(achievement)}
                          >
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Summary */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {achievements.length}
            </div>
            <div className="text-sm text-muted-foreground">
              Conquistas
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {achievements.filter(a => a.category.name === 'Cloud Computing').length}
            </div>
            <div className="text-sm text-muted-foreground">
              Certificações Cloud
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {achievements.reduce((sum, a) => sum + a.likes_count, 0)}
            </div>
            <div className="text-sm text-muted-foreground">
              Total de Curtidas
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {new Date().getFullYear() - 2021}+
            </div>
            <div className="text-sm text-muted-foreground">
              Anos de Experiência
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;


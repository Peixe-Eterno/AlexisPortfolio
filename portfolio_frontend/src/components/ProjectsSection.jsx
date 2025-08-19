import React, { useState, useEffect } from 'react';
import { Filter, Search, Grid, List } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import ProjectCard from './ProjectCard';

const ProjectsSection = ({ currentUser }) => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  // Mock data para demonstração
  useEffect(() => {
    // Simular carregamento de dados
    setTimeout(() => {
      setCategories([
        { id: 1, name: 'Web Development', color: '#00ff88' },
        { id: 2, name: 'Mobile Apps', color: '#7209b7' },
        { id: 3, name: 'Data Science', color: '#ff6b35' },
        { id: 4, name: 'DevOps', color: '#0f3460' }
      ]);

      setProjects([
        {
          id: 1,
          title: 'E-commerce Platform',
          description: 'Plataforma completa de e-commerce com React, Node.js e PostgreSQL. Sistema de pagamentos integrado, gestão de estoque e painel administrativo.',
          image_url: null,
          demo_url: 'https://demo.example.com',
          github_url: 'https://github.com/example/ecommerce',
          technologies: '["React", "Node.js", "PostgreSQL", "Stripe", "Docker"]',
          is_featured: true,
          is_published: true,
          category: { id: 1, name: 'Web Development' },
          likes_count: 24,
          comments_count: 8,
          views: 156,
          created_at: '2024-01-15T10:00:00Z'
        },
        {
          id: 2,
          title: 'Task Management App',
          description: 'Aplicativo de gerenciamento de tarefas com interface intuitiva, colaboração em tempo real e sincronização na nuvem.',
          image_url: null,
          demo_url: 'https://tasks.example.com',
          github_url: 'https://github.com/example/tasks',
          technologies: '["React Native", "Firebase", "Redux", "TypeScript"]',
          is_featured: false,
          is_published: true,
          category: { id: 2, name: 'Mobile Apps' },
          likes_count: 18,
          comments_count: 5,
          views: 89,
          created_at: '2024-02-20T14:30:00Z'
        },
        {
          id: 3,
          title: 'Data Analytics Dashboard',
          description: 'Dashboard interativo para análise de dados com visualizações em tempo real, relatórios customizáveis e integração com múltiplas fontes.',
          image_url: null,
          demo_url: null,
          github_url: 'https://github.com/example/analytics',
          technologies: '["Python", "Pandas", "Plotly", "Streamlit", "PostgreSQL"]',
          is_featured: true,
          is_published: true,
          category: { id: 3, name: 'Data Science' },
          likes_count: 31,
          comments_count: 12,
          views: 203,
          created_at: '2024-03-10T09:15:00Z'
        },
        {
          id: 4,
          title: 'CI/CD Pipeline Automation',
          description: 'Sistema automatizado de integração e deploy contínuo com Docker, Kubernetes e monitoramento avançado.',
          image_url: null,
          demo_url: null,
          github_url: 'https://github.com/example/cicd',
          technologies: '["Docker", "Kubernetes", "Jenkins", "Terraform", "AWS"]',
          is_featured: false,
          is_published: true,
          category: { id: 4, name: 'DevOps' },
          likes_count: 15,
          comments_count: 3,
          views: 67,
          created_at: '2024-04-05T16:45:00Z'
        }
      ]);
      
      setLoading(false);
    }, 1000);
  }, []);

  // Filtrar projetos
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || project.category.id.toString() === selectedCategory;
    const matchesFeatured = !showFeaturedOnly || project.is_featured;
    
    return matchesSearch && matchesCategory && matchesFeatured;
  });

  const handleLike = async (projectId) => {
    // Implementar lógica de curtir projeto
    console.log('Curtir projeto:', projectId);
  };

  const handleShare = (project) => {
    // Implementar compartilhamento no LinkedIn
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href + '#project-' + project.id)}`;
    window.open(linkedinUrl, '_blank', 'width=600,height=400');
  };

  if (loading) {
    return (
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Carregando projetos...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Meus Projetos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore alguns dos projetos que desenvolvi, desde aplicações web até soluções de dados
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar projetos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Featured Filter */}
            <Button
              variant={showFeaturedOnly ? "default" : "outline"}
              onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
              className="w-full sm:w-auto"
            >
              <Filter className="w-4 h-4 mr-2" />
              {showFeaturedOnly ? 'Todos' : 'Destaques'}
            </Button>
          </div>

          {/* View Mode */}
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredProjects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                currentUser={currentUser}
                onLike={handleLike}
                onShare={handleShare}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Nenhum projeto encontrado com os filtros selecionados.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setShowFeaturedOnly(false);
              }}
              className="mt-4"
            >
              Limpar filtros
            </Button>
          </div>
        )}

        {/* Load More Button */}
        {filteredProjects.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Carregar mais projetos
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;


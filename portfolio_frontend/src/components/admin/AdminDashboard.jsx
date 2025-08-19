import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Search, 
  Filter,
  BarChart3,
  Users,
  MessageSquare,
  Heart,
  TrendingUp,
  Calendar,
  Settings,
  Upload,
  Save,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';

const AdminDashboard = ({ currentUser, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [projects, setProjects] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  // Simular carregamento de dados
  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalProjects: 5,
        totalAchievements: 5,
        totalLikes: 186,
        totalComments: 49,
        monthlyViews: 1247,
        newFollowers: 23
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
    { id: 'projects', label: 'Projetos', icon: Eye },
    { id: 'achievements', label: 'Conquistas', icon: TrendingUp },
    { id: 'comments', label: 'Comentários', icon: MessageSquare },
    { id: 'settings', label: 'Configurações', icon: Settings }
  ];

  const handleAddNew = (type) => {
    setFormData({
      type,
      title: '',
      description: '',
      category: '',
      technologies: [],
      is_featured: false,
      status: 'published'
    });
    setShowAddForm(true);
  };

  const handleEdit = (item, type) => {
    setFormData({ ...item, type });
    setEditingItem(item);
    setShowAddForm(true);
  };

  const handleSave = () => {
    // Simular salvamento
    setTimeout(() => {
      setShowAddForm(false);
      setEditingItem(null);
      setFormData({});
      alert('Item salvo com sucesso!');
    }, 1000);
  };

  const handleDelete = (id, type) => {
    if (confirm('Tem certeza que deseja excluir este item?')) {
      // Simular exclusão
      alert('Item excluído com sucesso!');
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Projetos</p>
                <p className="text-3xl font-bold text-primary">{stats.totalProjects}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <Eye className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Conquistas</p>
                <p className="text-3xl font-bold text-accent">{stats.totalAchievements}</p>
              </div>
              <div className="p-3 bg-accent/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Curtidas</p>
                <p className="text-3xl font-bold text-destructive">{stats.totalLikes}</p>
              </div>
              <div className="p-3 bg-destructive/10 rounded-lg">
                <Heart className="w-6 h-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Comentários</p>
                <p className="text-3xl font-bold text-blue-500">{stats.totalComments}</p>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <MessageSquare className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Visualizações (mês)</p>
                <p className="text-3xl font-bold text-purple-500">{stats.monthlyViews}</p>
              </div>
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Novos Seguidores</p>
                <p className="text-3xl font-bold text-green-500">{stats.newFollowers}</p>
              </div>
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Users className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Atividade Recente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: 'Novo comentário em "E-commerce Platform"', time: '2 horas atrás', type: 'comment' },
              { action: 'Projeto "Task Management App" foi curtido', time: '4 horas atrás', type: 'like' },
              { action: 'Nova conquista "AWS Certified" foi adicionada', time: '1 dia atrás', type: 'achievement' },
              { action: 'Projeto "Data Analytics Dashboard" foi publicado', time: '2 dias atrás', type: 'project' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                <div className={`p-2 rounded-full ${
                  activity.type === 'comment' ? 'bg-blue-500/10 text-blue-500' :
                  activity.type === 'like' ? 'bg-red-500/10 text-red-500' :
                  activity.type === 'achievement' ? 'bg-yellow-500/10 text-yellow-500' :
                  'bg-green-500/10 text-green-500'
                }`}>
                  {activity.type === 'comment' ? <MessageSquare className="w-4 h-4" /> :
                   activity.type === 'like' ? <Heart className="w-4 h-4" /> :
                   activity.type === 'achievement' ? <TrendingUp className="w-4 h-4" /> :
                   <Eye className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">Gerenciar Projetos</h3>
        <Button onClick={() => handleAddNew('project')}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Projeto
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Buscar projetos..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filtros
        </Button>
      </div>

      <div className="grid gap-6">
        {[
          { id: 1, title: 'E-commerce Platform', status: 'published', likes: 24, comments: 8, featured: true },
          { id: 2, title: 'Task Management App', status: 'published', likes: 18, comments: 5, featured: false },
          { id: 3, title: 'Data Analytics Dashboard', status: 'draft', likes: 31, comments: 12, featured: true }
        ].map((project) => (
          <Card key={project.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-semibold">{project.title}</h4>
                    <Badge variant={project.status === 'published' ? 'default' : 'secondary'}>
                      {project.status === 'published' ? 'Publicado' : 'Rascunho'}
                    </Badge>
                    {project.featured && (
                      <Badge variant="outline">Destaque</Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      {project.likes}
                    </span>
                    <span className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      {project.comments}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(project, 'project')}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    {project.status === 'published' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(project.id, 'project')}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderForm = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {editingItem ? 'Editar' : 'Adicionar'} {formData.type === 'project' ? 'Projeto' : 'Conquista'}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setShowAddForm(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Título</label>
            <Input
              value={formData.title || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Digite o título..."
            />
          </div>

          <div>
            <label className="text-sm font-medium">Descrição</label>
            <Textarea
              value={formData.description || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Digite a descrição..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Categoria</label>
              <Input
                value={formData.category || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                placeholder="Ex: Web Development"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Status</label>
              <select
                value={formData.status || 'published'}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                className="w-full p-2 border border-border rounded-md bg-background"
              >
                <option value="published">Publicado</option>
                <option value="draft">Rascunho</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="featured"
              checked={formData.is_featured || false}
              onChange={(e) => setFormData(prev => ({ ...prev, is_featured: e.target.checked }))}
            />
            <label htmlFor="featured" className="text-sm font-medium">
              Marcar como destaque
            </label>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={() => setShowAddForm(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
      <div className="min-h-screen">
        {/* Header */}
        <div className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-bold">Dashboard Administrativo</h1>
                <Badge variant="outline">Admin</Badge>
              </div>
              <Button variant="outline" onClick={onClose}>
                <X className="w-4 h-4 mr-2" />
                Fechar
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex space-x-8">
            {/* Sidebar */}
            <div className="w-64 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {activeTab === 'overview' && renderOverview()}
              {activeTab === 'projects' && renderProjects()}
              {activeTab === 'achievements' && renderProjects()}
              {activeTab === 'comments' && (
                <div className="text-center py-12">
                  <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Gerenciamento de comentários em desenvolvimento</p>
                </div>
              )}
              {activeTab === 'settings' && (
                <div className="text-center py-12">
                  <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Configurações em desenvolvimento</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showAddForm && renderForm()}
    </div>
  );
};

export default AdminDashboard;


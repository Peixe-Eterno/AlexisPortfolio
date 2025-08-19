import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  ExternalLink, 
  Github, 
  Share2, 
  Eye, 
  Linkedin,
  Send,
  ThumbsUp,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';

const ProjectCard = ({ project, currentUser, onLike, onComment, onShare }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(project.likes_count || 0);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(project.comments || []);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  const handleLike = async () => {
    if (!currentUser) {
      alert('Você precisa estar logado para curtir projetos');
      return;
    }

    try {
      const newLikedState = !isLiked;
      setIsLiked(newLikedState);
      setLikesCount(prev => newLikedState ? prev + 1 : prev - 1);
      
      if (onLike) {
        await onLike(project.id);
      }
    } catch (error) {
      // Reverter em caso de erro
      setIsLiked(!isLiked);
      setLikesCount(prev => isLiked ? prev + 1 : prev - 1);
      console.error('Erro ao curtir projeto:', error);
    }
  };

  const handleComment = async () => {
    if (!currentUser) {
      alert('Você precisa estar logado para comentar!');
      return;
    }

    if (!newComment.trim()) {
      return;
    }

    setIsSubmittingComment(true);

    try {
      // Simular chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const comment = {
        id: Date.now(),
        user: {
          name: currentUser.name,
          avatar: currentUser.avatar
        },
        content: newComment.trim(),
        createdAt: new Date().toISOString(),
        likes: 0
      };

      setComments(prev => [comment, ...prev]);
      setNewComment('');
      
      if (onComment) {
        onComment(project.id, comment);
      }
    } catch (error) {
      alert('Erro ao enviar comentário. Tente novamente.');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleShareLinkedIn = () => {
    const url = `${window.location.origin}#project-${project.id}`;
    const text = `Confira este projeto incrível: ${project.title}`;
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`;
    
    window.open(linkedInUrl, '_blank', 'width=600,height=400');
    
    if (onShare) {
      onShare(project.id, 'linkedin');
    }
  };

  const handleShare = () => {
    if (onShare) {
      onShare(project);
    } else {
      // Fallback para compartilhamento nativo
      if (navigator.share) {
        navigator.share({
          title: project.title,
          text: project.description,
          url: window.location.href + `#project-${project.id}`
        });
      } else {
        // Copiar URL para clipboard
        navigator.clipboard.writeText(window.location.href + `#project-${project.id}`);
        alert('Link copiado para a área de transferência!');
      }
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const technologies = project.technologies ? JSON.parse(project.technologies) : [];

  return (
    <Card className="group hover-lift hover-glow transition-smooth overflow-hidden">
      {/* Project Image */}
      <div className="relative overflow-hidden">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-secondary flex items-center justify-center">
            <div className="text-4xl font-bold text-secondary-foreground opacity-50">
              {project.title.charAt(0)}
            </div>
          </div>
        )}
        
        {/* Overlay with actions */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
          {project.demo_url && (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => window.open(project.demo_url, '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Demo
            </Button>
          )}
          
          {project.github_url && (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => window.open(project.github_url, '_blank')}
            >
              <Github className="w-4 h-4 mr-2" />
              Código
            </Button>
          )}
        </div>

        {/* Featured Badge */}
        {project.is_featured && (
          <div className="absolute top-4 left-4">
            <Badge variant="default" className="bg-primary text-primary-foreground">
              Destaque
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-6">
        {/* Category */}
        {project.category && (
          <Badge variant="outline" className="mb-3">
            {project.category.name || project.category}
          </Badge>
        )}

        {/* Title and Description */}
        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.slice(0, 4).map((tech, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {technologies.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{technologies.length - 4}
              </Badge>
            )}
          </div>
        )}

        {/* Date */}
        <div className="flex items-center text-xs text-muted-foreground mb-4">
          <Calendar className="w-3 h-3 mr-1" />
          <span>{new Date(project.created_at).toLocaleDateString('pt-BR')}</span>
        </div>
      </CardContent>

      <CardFooter className="px-6 py-4 border-t border-border">
        <div className="flex items-center justify-between w-full">
          {/* Engagement Stats */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 text-sm transition-colors ${
                isLiked ? 'text-destructive' : 'text-muted-foreground hover:text-destructive'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{likesCount}</span>
            </button>

            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{comments.length || project.comments_count || 0}</span>
            </button>

            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Eye className="w-4 h-4" />
              <span>{project.views || 0}</span>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShareLinkedIn}
              className="text-muted-foreground hover:text-blue-600"
              title="Compartilhar no LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="text-muted-foreground hover:text-primary"
              title="Compartilhar"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 pt-4 border-t border-border w-full">
            {currentUser ? (
              <div className="mb-4">
                <div className="flex space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium text-primary">
                      {getInitials(currentUser.name)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <Textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Escreva um comentário..."
                      className="min-h-[80px] resize-none"
                    />
                    <div className="flex justify-end mt-2">
                      <Button
                        onClick={handleComment}
                        disabled={!newComment.trim() || isSubmittingComment}
                        size="sm"
                      >
                        {isSubmittingComment ? (
                          <>
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary-foreground mr-1"></div>
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Send className="w-3 h-3 mr-1" />
                            Comentar
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mb-4 p-3 bg-muted/30 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">
                  <button 
                    onClick={() => alert('Funcionalidade de login será implementada!')}
                    className="text-primary hover:underline"
                  >
                    Faça login
                  </button>
                  {' '}para comentar neste projeto
                </p>
              </div>
            )}

            {/* Comments List */}
            <div className="space-y-3">
              {comments.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Seja o primeiro a comentar!
                </p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-primary">
                        {getInitials(comment.user.name)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="bg-muted/30 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{comment.user.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(comment.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm text-foreground">{comment.content}</p>
                      </div>
                      <div className="flex items-center mt-2 space-x-3">
                        <button className="flex items-center space-x-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                          <ThumbsUp className="w-3 h-3" />
                          <span>{comment.likes}</span>
                        </button>
                        <button className="text-xs text-muted-foreground hover:text-primary transition-colors">
                          Responder
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;


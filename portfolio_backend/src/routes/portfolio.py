from flask import Blueprint, request, jsonify, current_app
from flask_login import login_required, current_user
from flask_cors import cross_origin
from src.models.portfolio import db, Project, Achievement, Category, Comment, Like, Notification, User
from datetime import datetime
import json
import os

portfolio_bp = Blueprint('portfolio', __name__)

# Rotas para Categorias
@portfolio_bp.route('/categories', methods=['GET'])
@cross_origin()
def get_categories():
    """Obter todas as categorias"""
    categories = Category.query.all()
    return jsonify([category.to_dict() for category in categories])

@portfolio_bp.route('/categories', methods=['POST'])
@cross_origin()
@login_required
def create_category():
    """Criar nova categoria (apenas admin)"""
    if not current_user.is_admin:
        return jsonify({'error': 'Acesso negado'}), 403
    
    data = request.get_json()
    
    if not data or not data.get('name'):
        return jsonify({'error': 'Nome da categoria é obrigatório'}), 400
    
    # Verificar se categoria já existe
    existing = Category.query.filter_by(name=data['name']).first()
    if existing:
        return jsonify({'error': 'Categoria já existe'}), 400
    
    category = Category(
        name=data['name'],
        description=data.get('description', ''),
        color=data.get('color', '#007bff')
    )
    
    db.session.add(category)
    db.session.commit()
    
    return jsonify(category.to_dict()), 201

# Rotas para Projetos
@portfolio_bp.route('/projects', methods=['GET'])
@cross_origin()
def get_projects():
    """Obter projetos publicados"""
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    category_id = request.args.get('category_id', type=int)
    featured_only = request.args.get('featured', type=bool)
    
    query = Project.query.filter_by(is_published=True)
    
    if category_id:
        query = query.filter_by(category_id=category_id)
    
    if featured_only:
        query = query.filter_by(is_featured=True)
    
    query = query.order_by(Project.created_at.desc())
    
    projects = query.paginate(
        page=page, per_page=per_page, error_out=False
    )
    
    return jsonify({
        'projects': [project.to_dict() for project in projects.items],
        'total': projects.total,
        'pages': projects.pages,
        'current_page': page,
        'has_next': projects.has_next,
        'has_prev': projects.has_prev
    })

@portfolio_bp.route('/projects/<int:project_id>', methods=['GET'])
@cross_origin()
def get_project(project_id):
    """Obter projeto específico"""
    project = Project.query.get_or_404(project_id)
    
    if not project.is_published:
        return jsonify({'error': 'Projeto não encontrado'}), 404
    
    return jsonify(project.to_dict(include_content=True))

@portfolio_bp.route('/projects', methods=['POST'])
@cross_origin()
@login_required
def create_project():
    """Criar novo projeto (apenas admin)"""
    if not current_user.is_admin:
        return jsonify({'error': 'Acesso negado'}), 403
    
    data = request.get_json()
    
    if not data or not data.get('title') or not data.get('description'):
        return jsonify({'error': 'Título e descrição são obrigatórios'}), 400
    
    project = Project(
        title=data['title'],
        description=data['description'],
        content=data.get('content', ''),
        image_url=data.get('image_url', ''),
        demo_url=data.get('demo_url', ''),
        github_url=data.get('github_url', ''),
        technologies=json.dumps(data.get('technologies', [])),
        is_published=data.get('is_published', False),
        is_featured=data.get('is_featured', False),
        category_id=data.get('category_id')
    )
    
    db.session.add(project)
    db.session.commit()
    
    return jsonify(project.to_dict(include_content=True)), 201

@portfolio_bp.route('/projects/<int:project_id>', methods=['PUT'])
@cross_origin()
@login_required
def update_project(project_id):
    """Atualizar projeto (apenas admin)"""
    if not current_user.is_admin:
        return jsonify({'error': 'Acesso negado'}), 403
    
    project = Project.query.get_or_404(project_id)
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'Dados inválidos'}), 400
    
    # Atualizar campos
    if 'title' in data:
        project.title = data['title']
    if 'description' in data:
        project.description = data['description']
    if 'content' in data:
        project.content = data['content']
    if 'image_url' in data:
        project.image_url = data['image_url']
    if 'demo_url' in data:
        project.demo_url = data['demo_url']
    if 'github_url' in data:
        project.github_url = data['github_url']
    if 'technologies' in data:
        project.technologies = json.dumps(data['technologies'])
    if 'is_published' in data:
        project.is_published = data['is_published']
    if 'is_featured' in data:
        project.is_featured = data['is_featured']
    if 'category_id' in data:
        project.category_id = data['category_id']
    
    project.updated_at = datetime.utcnow()
    db.session.commit()
    
    return jsonify(project.to_dict(include_content=True))

@portfolio_bp.route('/projects/<int:project_id>', methods=['DELETE'])
@cross_origin()
@login_required
def delete_project(project_id):
    """Deletar projeto (apenas admin)"""
    if not current_user.is_admin:
        return jsonify({'error': 'Acesso negado'}), 403
    
    project = Project.query.get_or_404(project_id)
    db.session.delete(project)
    db.session.commit()
    
    return jsonify({'message': 'Projeto deletado com sucesso'})

# Rotas para Conquistas
@portfolio_bp.route('/achievements', methods=['GET'])
@cross_origin()
def get_achievements():
    """Obter conquistas publicadas"""
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    category_id = request.args.get('category_id', type=int)
    featured_only = request.args.get('featured', type=bool)
    
    query = Achievement.query.filter_by(is_published=True)
    
    if category_id:
        query = query.filter_by(category_id=category_id)
    
    if featured_only:
        query = query.filter_by(is_featured=True)
    
    query = query.order_by(Achievement.date_achieved.desc())
    
    achievements = query.paginate(
        page=page, per_page=per_page, error_out=False
    )
    
    return jsonify({
        'achievements': [achievement.to_dict() for achievement in achievements.items],
        'total': achievements.total,
        'pages': achievements.pages,
        'current_page': page,
        'has_next': achievements.has_next,
        'has_prev': achievements.has_prev
    })

@portfolio_bp.route('/achievements/<int:achievement_id>', methods=['GET'])
@cross_origin()
def get_achievement(achievement_id):
    """Obter conquista específica"""
    achievement = Achievement.query.get_or_404(achievement_id)
    
    if not achievement.is_published:
        return jsonify({'error': 'Conquista não encontrada'}), 404
    
    return jsonify(achievement.to_dict(include_content=True))

@portfolio_bp.route('/achievements', methods=['POST'])
@cross_origin()
@login_required
def create_achievement():
    """Criar nova conquista (apenas admin)"""
    if not current_user.is_admin:
        return jsonify({'error': 'Acesso negado'}), 403
    
    data = request.get_json()
    
    if not data or not data.get('title') or not data.get('description'):
        return jsonify({'error': 'Título e descrição são obrigatórios'}), 400
    
    achievement = Achievement(
        title=data['title'],
        description=data['description'],
        content=data.get('content', ''),
        image_url=data.get('image_url', ''),
        certificate_url=data.get('certificate_url', ''),
        date_achieved=datetime.fromisoformat(data['date_achieved']) if data.get('date_achieved') else None,
        organization=data.get('organization', ''),
        is_published=data.get('is_published', False),
        is_featured=data.get('is_featured', False),
        category_id=data.get('category_id')
    )
    
    db.session.add(achievement)
    db.session.commit()
    
    return jsonify(achievement.to_dict(include_content=True)), 201

# Rotas para Comentários
@portfolio_bp.route('/projects/<int:project_id>/comments', methods=['GET'])
@cross_origin()
def get_project_comments(project_id):
    """Obter comentários de um projeto"""
    project = Project.query.get_or_404(project_id)
    
    if not project.is_published:
        return jsonify({'error': 'Projeto não encontrado'}), 404
    
    comments = Comment.query.filter_by(project_id=project_id).order_by(Comment.created_at.desc()).all()
    return jsonify([comment.to_dict() for comment in comments])

@portfolio_bp.route('/projects/<int:project_id>/comments', methods=['POST'])
@cross_origin()
@login_required
def create_project_comment(project_id):
    """Criar comentário em projeto"""
    project = Project.query.get_or_404(project_id)
    
    if not project.is_published:
        return jsonify({'error': 'Projeto não encontrado'}), 404
    
    data = request.get_json()
    
    if not data or not data.get('content'):
        return jsonify({'error': 'Conteúdo do comentário é obrigatório'}), 400
    
    comment = Comment(
        content=data['content'],
        user_id=current_user.id,
        project_id=project_id
    )
    
    db.session.add(comment)
    
    # Criar notificação para o admin
    admin = User.query.filter_by(is_admin=True).first()
    if admin and admin.id != current_user.id:
        notification = Notification(
            title='Novo comentário',
            message=f'{current_user.first_name} comentou no projeto "{project.title}"',
            type='comment',
            user_id=admin.id,
            related_user_id=current_user.id,
            project_id=project_id
        )
        db.session.add(notification)
    
    db.session.commit()
    
    return jsonify(comment.to_dict()), 201

# Rotas para Likes
@portfolio_bp.route('/projects/<int:project_id>/like', methods=['POST'])
@cross_origin()
@login_required
def toggle_project_like(project_id):
    """Curtir/descurtir projeto"""
    project = Project.query.get_or_404(project_id)
    
    if not project.is_published:
        return jsonify({'error': 'Projeto não encontrado'}), 404
    
    existing_like = Like.query.filter_by(user_id=current_user.id, project_id=project_id).first()
    
    if existing_like:
        # Remover like
        db.session.delete(existing_like)
        liked = False
    else:
        # Adicionar like
        like = Like(user_id=current_user.id, project_id=project_id)
        db.session.add(like)
        liked = True
        
        # Criar notificação para o admin
        admin = User.query.filter_by(is_admin=True).first()
        if admin and admin.id != current_user.id:
            notification = Notification(
                title='Nova curtida',
                message=f'{current_user.first_name} curtiu o projeto "{project.title}"',
                type='like',
                user_id=admin.id,
                related_user_id=current_user.id,
                project_id=project_id
            )
            db.session.add(notification)
    
    db.session.commit()
    
    return jsonify({
        'liked': liked,
        'likes_count': project.likes_count
    })

@portfolio_bp.route('/achievements/<int:achievement_id>/like', methods=['POST'])
@cross_origin()
@login_required
def toggle_achievement_like(achievement_id):
    """Curtir/descurtir conquista"""
    achievement = Achievement.query.get_or_404(achievement_id)
    
    if not achievement.is_published:
        return jsonify({'error': 'Conquista não encontrada'}), 404
    
    existing_like = Like.query.filter_by(user_id=current_user.id, achievement_id=achievement_id).first()
    
    if existing_like:
        # Remover like
        db.session.delete(existing_like)
        liked = False
    else:
        # Adicionar like
        like = Like(user_id=current_user.id, achievement_id=achievement_id)
        db.session.add(like)
        liked = True
        
        # Criar notificação para o admin
        admin = User.query.filter_by(is_admin=True).first()
        if admin and admin.id != current_user.id:
            notification = Notification(
                title='Nova curtida',
                message=f'{current_user.first_name} curtiu a conquista "{achievement.title}"',
                type='like',
                user_id=admin.id,
                related_user_id=current_user.id,
                achievement_id=achievement_id
            )
            db.session.add(notification)
    
    db.session.commit()
    
    return jsonify({
        'liked': liked,
        'likes_count': achievement.likes_count
    })

# Rotas para Notificações
@portfolio_bp.route('/notifications', methods=['GET'])
@cross_origin()
@login_required
def get_notifications():
    """Obter notificações do usuário"""
    if not current_user.is_admin:
        return jsonify({'error': 'Acesso negado'}), 403
    
    notifications = Notification.query.filter_by(user_id=current_user.id).order_by(Notification.created_at.desc()).all()
    return jsonify([notification.to_dict() for notification in notifications])

@portfolio_bp.route('/notifications/<int:notification_id>/read', methods=['PUT'])
@cross_origin()
@login_required
def mark_notification_read(notification_id):
    """Marcar notificação como lida"""
    notification = Notification.query.get_or_404(notification_id)
    
    if notification.user_id != current_user.id:
        return jsonify({'error': 'Acesso negado'}), 403
    
    notification.is_read = True
    db.session.commit()
    
    return jsonify(notification.to_dict())

# Rota para estatísticas
@portfolio_bp.route('/stats', methods=['GET'])
@cross_origin()
def get_stats():
    """Obter estatísticas do portfólio"""
    stats = {
        'total_projects': Project.query.filter_by(is_published=True).count(),
        'total_achievements': Achievement.query.filter_by(is_published=True).count(),
        'total_likes': Like.query.count(),
        'total_comments': Comment.query.count(),
        'total_users': User.query.filter_by(is_active=True).count()
    }
    
    return jsonify(stats)


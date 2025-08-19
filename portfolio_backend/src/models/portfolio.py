from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(UserMixin, db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    bio = db.Column(db.Text)
    profile_image = db.Column(db.String(255))
    is_admin = db.Column(db.Boolean, default=False)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relacionamentos
    comments = db.relationship('Comment', backref='author', lazy=True, cascade='all, delete-orphan')
    likes = db.relationship('Like', backref='user', lazy=True, cascade='all, delete-orphan')
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'bio': self.bio,
            'profile_image': self.profile_image,
            'is_admin': self.is_admin,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Category(db.Model):
    __tablename__ = 'categories'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    description = db.Column(db.Text)
    color = db.Column(db.String(7), default='#007bff')  # Hex color
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relacionamentos
    projects = db.relationship('Project', backref='category', lazy=True)
    achievements = db.relationship('Achievement', backref='category', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'color': self.color,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Project(db.Model):
    __tablename__ = 'projects'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text)  # Conteúdo detalhado do projeto
    image_url = db.Column(db.String(255))
    demo_url = db.Column(db.String(255))
    github_url = db.Column(db.String(255))
    technologies = db.Column(db.Text)  # JSON string com as tecnologias
    is_published = db.Column(db.Boolean, default=False)
    is_featured = db.Column(db.Boolean, default=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relacionamentos
    comments = db.relationship('Comment', backref='project', lazy=True, cascade='all, delete-orphan')
    likes = db.relationship('Like', backref='project', lazy=True, cascade='all, delete-orphan')
    
    @property
    def likes_count(self):
        return len(self.likes)
    
    @property
    def comments_count(self):
        return len(self.comments)
    
    def to_dict(self, include_content=False):
        data = {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'image_url': self.image_url,
            'demo_url': self.demo_url,
            'github_url': self.github_url,
            'technologies': self.technologies,
            'is_published': self.is_published,
            'is_featured': self.is_featured,
            'category_id': self.category_id,
            'category': self.category.to_dict() if self.category else None,
            'likes_count': self.likes_count,
            'comments_count': self.comments_count,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
        
        if include_content:
            data['content'] = self.content
            
        return data

class Achievement(db.Model):
    __tablename__ = 'achievements'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text)  # Conteúdo detalhado da conquista
    image_url = db.Column(db.String(255))
    certificate_url = db.Column(db.String(255))
    date_achieved = db.Column(db.Date)
    organization = db.Column(db.String(200))
    is_published = db.Column(db.Boolean, default=False)
    is_featured = db.Column(db.Boolean, default=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relacionamentos
    comments = db.relationship('Comment', backref='achievement', lazy=True, cascade='all, delete-orphan')
    likes = db.relationship('Like', backref='achievement', lazy=True, cascade='all, delete-orphan')
    
    @property
    def likes_count(self):
        return len(self.likes)
    
    @property
    def comments_count(self):
        return len(self.comments)
    
    def to_dict(self, include_content=False):
        data = {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'image_url': self.image_url,
            'certificate_url': self.certificate_url,
            'date_achieved': self.date_achieved.isoformat() if self.date_achieved else None,
            'organization': self.organization,
            'is_published': self.is_published,
            'is_featured': self.is_featured,
            'category_id': self.category_id,
            'category': self.category.to_dict() if self.category else None,
            'likes_count': self.likes_count,
            'comments_count': self.comments_count,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
        
        if include_content:
            data['content'] = self.content
            
        return data

class Comment(db.Model):
    __tablename__ = 'comments'
    
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=True)
    achievement_id = db.Column(db.Integer, db.ForeignKey('achievements.id'), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'user_id': self.user_id,
            'author': self.author.to_dict() if self.author else None,
            'project_id': self.project_id,
            'achievement_id': self.achievement_id,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class Like(db.Model):
    __tablename__ = 'likes'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=True)
    achievement_id = db.Column(db.Integer, db.ForeignKey('achievements.id'), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Constraint para evitar likes duplicados
    __table_args__ = (
        db.UniqueConstraint('user_id', 'project_id', name='unique_user_project_like'),
        db.UniqueConstraint('user_id', 'achievement_id', name='unique_user_achievement_like'),
    )
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'project_id': self.project_id,
            'achievement_id': self.achievement_id,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Notification(db.Model):
    __tablename__ = 'notifications'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    message = db.Column(db.Text, nullable=False)
    type = db.Column(db.String(50), nullable=False)  # 'comment', 'like', 'new_user'
    is_read = db.Column(db.Boolean, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))  # Para quem é a notificação
    related_user_id = db.Column(db.Integer, db.ForeignKey('users.id'))  # Quem causou a notificação
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=True)
    achievement_id = db.Column(db.Integer, db.ForeignKey('achievements.id'), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'message': self.message,
            'type': self.type,
            'is_read': self.is_read,
            'user_id': self.user_id,
            'related_user_id': self.related_user_id,
            'project_id': self.project_id,
            'achievement_id': self.achievement_id,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


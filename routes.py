import os
from urllib.parse import urlsplit
from flask import render_template, redirect, url_for, flash, request, jsonify, current_app
from flask_login import login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from app import app, db, mail
from models import User, Project, Category, Comment, Like, AboutMe
from forms import (LoginForm, RegisterForm, ForgotPasswordForm, ProjectForm, 
                   CategoryForm, CommentForm, AboutMeForm)
from utils import send_notification_email
import logging

# Public routes
@app.route('/')
def index():
    featured_projects = Project.query.filter_by(is_published=True, is_featured=True).limit(3).all()
    recent_projects = Project.query.filter_by(is_published=True).order_by(Project.created_at.desc()).limit(6).all()
    return render_template('index.html', featured_projects=featured_projects, recent_projects=recent_projects)

@app.route('/about')
def about():
    about_me = AboutMe.query.first()
    return render_template('about.html', about_me=about_me)

@app.route('/projects')
def projects():
    page = request.args.get('page', 1, type=int)
    category_id = request.args.get('category', type=int)
    
    query = Project.query.filter_by(is_published=True)
    if category_id:
        query = query.filter_by(category_id=category_id)
    
    projects = query.order_by(Project.created_at.desc()).paginate(
        page=page, per_page=6, error_out=False)
    
    categories = Category.query.all()
    return render_template('projects.html', projects=projects, categories=categories, 
                         selected_category=category_id)

@app.route('/project/<int:id>')
def project_detail(id):
    project = Project.query.get_or_404(id)
    if not project.is_published and not (current_user.is_authenticated and current_user.is_admin):
        flash('Project not found.', 'error')
        return redirect(url_for('index'))
    
    comments = Comment.query.filter_by(project_id=id).order_by(Comment.created_at.desc()).all()
    user_liked = False
    if current_user.is_authenticated:
        user_liked = Like.query.filter_by(user_id=current_user.id, project_id=id).first() is not None
    
    form = CommentForm()
    return render_template('project_detail.html', project=project, comments=comments, 
                         user_liked=user_liked, form=form)

@app.route('/like_project/<int:id>', methods=['POST'])
@login_required
def like_project(id):
    project = Project.query.get_or_404(id)
    existing_like = Like.query.filter_by(user_id=current_user.id, project_id=id).first()
    
    if existing_like:
        db.session.delete(existing_like)
        liked = False
    else:
        like = Like(user_id=current_user.id, project_id=id)
        db.session.add(like)
        liked = True
    
    db.session.commit()
    return jsonify({
        'liked': liked,
        'like_count': project.like_count
    })

@app.route('/comment_project/<int:id>', methods=['POST'])
@login_required
def comment_project(id):
    project = Project.query.get_or_404(id)
    form = CommentForm()
    
    if form.validate_on_submit():
        comment = Comment(
            content=form.content.data,
            user_id=current_user.id,
            project_id=id
        )
        db.session.add(comment)
        db.session.commit()
        
        # Send notification email to admin
        try:
            send_notification_email(project.title, current_user.username, form.content.data)
        except Exception as e:
            logging.error(f"Failed to send notification email: {e}")
        
        flash('Comment added successfully!', 'success')
    else:
        flash('Please enter a valid comment.', 'error')
    
    return redirect(url_for('project_detail', id=id))

# Authentication routes
@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and check_password_hash(user.password_hash, form.password.data):
            login_user(user)
            next_page = request.args.get('next')
            if not next_page or urlsplit(next_page).netloc != '':
                next_page = url_for('index')
            flash(f'Welcome back, {user.first_name}!', 'success')
            return redirect(next_page)
        flash('Invalid email or password.', 'error')
    
    return render_template('auth/login.html', form=form)

@app.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    
    form = RegisterForm()
    if form.validate_on_submit():
        # Check if user already exists
        if User.query.filter_by(email=form.email.data).first():
            flash('Email address already registered.', 'error')
            return render_template('auth/register.html', form=form)
        
        if User.query.filter_by(username=form.username.data).first():
            flash('Username already taken.', 'error')
            return render_template('auth/register.html', form=form)
        
        user = User(
            username=form.username.data,
            email=form.email.data,
            password_hash=generate_password_hash(form.password.data),
            first_name=form.first_name.data,
            last_name=form.last_name.data
        )
        db.session.add(user)
        db.session.commit()
        
        flash('Registration successful! Please log in.', 'success')
        return redirect(url_for('login'))
    
    return render_template('auth/register.html', form=form)

@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('You have been logged out.', 'info')
    return redirect(url_for('index'))

@app.route('/forgot_password', methods=['GET', 'POST'])
def forgot_password():
    form = ForgotPasswordForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user:
            # In a real app, you would send a password reset email
            flash('Password reset instructions have been sent to your email.', 'info')
        else:
            flash('Email address not found.', 'error')
        return redirect(url_for('login'))
    
    return render_template('auth/forgot_password.html', form=form)

# Admin routes
@app.route('/admin')
@login_required
def admin_dashboard():
    if not current_user.is_admin:
        flash('Access denied.', 'error')
        return redirect(url_for('index'))
    
    total_projects = Project.query.count()
    published_projects = Project.query.filter_by(is_published=True).count()
    total_users = User.query.count()
    total_comments = Comment.query.count()
    
    recent_projects = Project.query.order_by(Project.created_at.desc()).limit(5).all()
    recent_comments = Comment.query.order_by(Comment.created_at.desc()).limit(5).all()
    
    return render_template('admin/dashboard.html', 
                         total_projects=total_projects,
                         published_projects=published_projects,
                         total_users=total_users,
                         total_comments=total_comments,
                         recent_projects=recent_projects,
                         recent_comments=recent_comments)

@app.route('/admin/projects')
@login_required
def admin_projects():
    if not current_user.is_admin:
        flash('Access denied.', 'error')
        return redirect(url_for('index'))
    
    page = request.args.get('page', 1, type=int)
    projects = Project.query.order_by(Project.created_at.desc()).paginate(
        page=page, per_page=10, error_out=False)
    
    return render_template('admin/projects.html', projects=projects)

@app.route('/admin/project/new', methods=['GET', 'POST'])
@login_required
def admin_new_project():
    if not current_user.is_admin:
        flash('Access denied.', 'error')
        return redirect(url_for('index'))
    
    form = ProjectForm()
    if form.validate_on_submit():
        project = Project(
            title=form.title.data,
            description=form.description.data,
            content=form.content.data,
            demo_url=form.demo_url.data,
            github_url=form.github_url.data,
            technologies=form.technologies.data,
            category_id=form.category_id.data if form.category_id.data else None,
            is_featured=form.is_featured.data,
            is_published=form.is_published.data
        )
        
        # Handle image upload
        if form.image.data:
            filename = secure_filename(form.image.data.filename)
            if filename:
                upload_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
                os.makedirs(os.path.dirname(upload_path), exist_ok=True)
                form.image.data.save(upload_path)
                project.image_url = f'uploads/{filename}'
        
        db.session.add(project)
        db.session.commit()
        
        flash('Project created successfully!', 'success')
        return redirect(url_for('admin_projects'))
    
    return render_template('admin/project_form.html', form=form, title='New Project')

@app.route('/admin/project/<int:id>/edit', methods=['GET', 'POST'])
@login_required
def admin_edit_project(id):
    if not current_user.is_admin:
        flash('Access denied.', 'error')
        return redirect(url_for('index'))
    
    project = Project.query.get_or_404(id)
    form = ProjectForm(obj=project)
    
    if form.validate_on_submit():
        project.title = form.title.data
        project.description = form.description.data
        project.content = form.content.data
        project.demo_url = form.demo_url.data
        project.github_url = form.github_url.data
        project.technologies = form.technologies.data
        project.category_id = form.category_id.data if form.category_id.data else None
        project.is_featured = form.is_featured.data
        project.is_published = form.is_published.data
        
        # Handle image upload
        if form.image.data:
            filename = secure_filename(form.image.data.filename)
            if filename:
                upload_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
                os.makedirs(os.path.dirname(upload_path), exist_ok=True)
                form.image.data.save(upload_path)
                project.image_url = f'uploads/{filename}'
        
        db.session.commit()
        flash('Project updated successfully!', 'success')
        return redirect(url_for('admin_projects'))
    
    return render_template('admin/project_form.html', form=form, project=project, title='Edit Project')

@app.route('/admin/project/<int:id>/delete', methods=['POST'])
@login_required
def admin_delete_project(id):
    if not current_user.is_admin:
        flash('Access denied.', 'error')
        return redirect(url_for('index'))
    
    project = Project.query.get_or_404(id)
    db.session.delete(project)
    db.session.commit()
    
    flash('Project deleted successfully!', 'success')
    return redirect(url_for('admin_projects'))

@app.route('/admin/about', methods=['GET', 'POST'])
@login_required
def admin_about():
    if not current_user.is_admin:
        flash('Access denied.', 'error')
        return redirect(url_for('index'))
    
    about_me = AboutMe.query.first()
    if not about_me:
        about_me = AboutMe()
    
    form = AboutMeForm(obj=about_me)
    
    if form.validate_on_submit():
        about_me.title = form.title.data
        about_me.content = form.content.data
        about_me.linkedin_url = form.linkedin_url.data
        about_me.github_url = form.github_url.data
        about_me.email = form.email.data
        about_me.phone = form.phone.data
        about_me.location = form.location.data
        
        # Handle image upload
        if form.profile_image.data:
            filename = secure_filename(form.profile_image.data.filename)
            if filename:
                upload_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
                os.makedirs(os.path.dirname(upload_path), exist_ok=True)
                form.profile_image.data.save(upload_path)
                about_me.profile_image = f'uploads/{filename}'
        
        if about_me.id:
            db.session.commit()
        else:
            db.session.add(about_me)
            db.session.commit()
        
        flash('About section updated successfully!', 'success')
        return redirect(url_for('admin_about'))
    
    return render_template('admin/about_form.html', form=form, about_me=about_me)

# Error handlers
@app.errorhandler(404)
def not_found_error(error):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return render_template('500.html'), 500

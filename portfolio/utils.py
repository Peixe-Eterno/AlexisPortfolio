from flask_mail import Message
from flask import current_app
from app import mail, db
from models import Notification
import os
import secrets
from PIL import Image
import re

def send_notification_email(project_title, commenter_name, comment_content):
    """Send email notification to admin when a new comment is posted"""
    admin_email = os.environ.get('ADMIN_EMAIL', 'alexisdanielmatto@gmail.com')
    
    if not mail or not admin_email:
        return
    
    msg = Message(
        subject=f'Novo comentário em "{project_title}"',
        recipients=[admin_email],
        body=f"""
Um novo comentário foi postado no seu projeto "{project_title}".

Autor: {commenter_name}
Comentário: {comment_content}

Visite seu portfólio para visualizar e gerenciar comentários.
        """
    )
    
    try:
        mail.send(msg)
    except Exception as e:
        print(f"Erro ao enviar email: {e}")

def allowed_file(filename):
    """Check if file extension is allowed"""
    ALLOWED_EXTENSIONS = current_app.config.get('ALLOWED_EXTENSIONS', {'png', 'jpg', 'jpeg', 'gif', 'webp'})
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def save_picture(form_picture, folder='uploads', size=(800, 600)):
    """Save and resize uploaded picture"""
    random_hex = secrets.token_hex(8)
    _, f_ext = os.path.splitext(form_picture.filename)
    picture_fn = random_hex + f_ext
    picture_path = os.path.join(current_app.root_path, 'static', folder, picture_fn)
    
    # Create directory if it doesn't exist
    os.makedirs(os.path.dirname(picture_path), exist_ok=True)
    
    # Resize image
    img = Image.open(form_picture)
    img.thumbnail(size)
    img.save(picture_path, optimize=True, quality=85)
    
    return picture_fn

def create_slug(title):
    """Create URL-friendly slug from title"""
    slug = re.sub(r'[^\w\s-]', '', title.lower())
    slug = re.sub(r'[-\s]+', '-', slug)
    return slug.strip('-')

def create_notification(user_id, title, message, notification_type='info'):
    """Create a new notification for a user"""
    notification = Notification(
        user_id=user_id,
        title=title,
        message=message,
        type=notification_type
    )
    db.session.add(notification)
    db.session.commit()
    return notification

def get_linkedin_share_url(project_title, project_url, project_description):
    """Generate LinkedIn share URL"""
    base_url = "https://www.linkedin.com/sharing/share-offsite/"
    params = {
        'url': project_url,
        'title': project_title,
        'summary': project_description
    }
    
    query_string = '&'.join([f"{key}={value}" for key, value in params.items()])
    return f"{base_url}?{query_string}"

def format_date(date):
    """Format date for display"""
    if not date:
        return ""
    
    from datetime import datetime
    now = datetime.utcnow()
    diff = now - date
    
    if diff.days > 365:
        return f"{diff.days // 365} ano{'s' if diff.days // 365 > 1 else ''} atrás"
    elif diff.days > 30:
        return f"{diff.days // 30} mês{'es' if diff.days // 30 > 1 else ''} atrás"
    elif diff.days > 0:
        return f"{diff.days} dia{'s' if diff.days > 1 else ''} atrás"
    elif diff.seconds > 3600:
        hours = diff.seconds // 3600
        return f"{hours} hora{'s' if hours > 1 else ''} atrás"
    elif diff.seconds > 60:
        minutes = diff.seconds // 60
        return f"{minutes} minuto{'s' if minutes > 1 else ''} atrás"
    else:
        return "Agora mesmo"

def validate_email(email):
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def generate_meta_tags(title, description, image_url=None, url=None):
    """Generate meta tags for SEO and social sharing"""
    meta_tags = {
        'title': title,
        'description': description,
        'og:title': title,
        'og:description': description,
        'og:type': 'website',
        'twitter:card': 'summary_large_image',
        'twitter:title': title,
        'twitter:description': description,
    }
    
    if image_url:
        meta_tags['og:image'] = image_url
        meta_tags['twitter:image'] = image_url
    
    if url:
        meta_tags['og:url'] = url
        meta_tags['canonical'] = url
    
    return meta_tags


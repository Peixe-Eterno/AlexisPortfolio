from flask_mail import Message
from app import mail
import os

def send_notification_email(project_title, commenter_name, comment_content):
    """Send email notification to admin when a new comment is posted"""
    admin_email = os.environ.get('ADMIN_EMAIL', 'alexis@portfolio.com')
    
    if not mail or not admin_email:
        return
    
    msg = Message(
        subject=f'New comment on "{project_title}"',
        recipients=[admin_email],
        body=f"""
A new comment has been posted on your project "{project_title}".

Commenter: {commenter_name}
Comment: {comment_content}

Visit your portfolio to view and manage comments.
        """
    )
    
    mail.send(msg)

def allowed_file(filename):
    """Check if file extension is allowed"""
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

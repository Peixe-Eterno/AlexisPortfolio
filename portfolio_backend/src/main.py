import os
import sys
# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_login import LoginManager
from flask_mail import Mail
from src.models.portfolio import db, User
from src.routes.user import user_bp
from src.routes.portfolio import portfolio_bp
from src.routes.auth import auth_bp

app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))
app.config['SECRET_KEY'] = 'asdf#FGSgvasgf$5$WGT'

# Configurar CORS
CORS(app, supports_credentials=True)

# Configurar Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'auth.login'
login_manager.login_message = 'Por favor, faça login para acessar esta página.'

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Configurar Flask-Mail
app.config['MAIL_SERVER'] = os.environ.get('MAIL_SERVER', 'smtp.gmail.com')
app.config['MAIL_PORT'] = int(os.environ.get('MAIL_PORT', 587))
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('MAIL_DEFAULT_SENDER')

mail = Mail(app)

# Registrar blueprints
app.register_blueprint(user_bp, url_prefix='/api')
app.register_blueprint(portfolio_bp, url_prefix='/api')
app.register_blueprint(auth_bp, url_prefix='/api/auth')

# Configurar banco de dados
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(os.path.dirname(__file__), 'database', 'app.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

with app.app_context():
    db.create_all()
    
    # Criar usuário admin padrão se não existir
    admin = User.query.filter_by(email='alexisdanielmatto@gmail.com').first()
    if not admin:
        from werkzeug.security import generate_password_hash
        import secrets
        
        temp_password = secrets.token_urlsafe(12)
        admin_user = User(
            username='alexisdaniel',
            email='alexisdanielmatto@gmail.com',
            password_hash=generate_password_hash(temp_password),
            is_admin=True,
            first_name='Alexis Daniel',
            last_name='Matto Careaga',
            bio='Desenvolvedor Full Stack apaixonado por tecnologia e inovação.'
        )
        db.session.add(admin_user)
        db.session.commit()
        print(f"IMPORTANTE: Senha do admin: {temp_password}")
        print("Por favor, altere esta senha após o primeiro login!")

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    static_folder_path = app.static_folder
    if static_folder_path is None:
            return "Static folder not configured", 404

    if path != "" and os.path.exists(os.path.join(static_folder_path, path)):
        return send_from_directory(static_folder_path, path)
    else:
        index_path = os.path.join(static_folder_path, 'index.html')
        if os.path.exists(index_path):
            return send_from_directory(static_folder_path, 'index.html')
        else:
            return "index.html not found", 404


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

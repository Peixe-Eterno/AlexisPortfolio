from flask import Blueprint, request, jsonify, current_app
from flask_login import login_user, logout_user, login_required, current_user
from flask_cors import cross_origin
from flask_mail import Message, Mail
from src.models.portfolio import db, User, Notification
from werkzeug.security import generate_password_hash
import secrets
import re

auth_bp = Blueprint('auth', __name__)
mail = Mail()

def is_valid_email(email):
    """Validar formato de email"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def is_valid_password(password):
    """Validar força da senha"""
    if len(password) < 8:
        return False, "Senha deve ter pelo menos 8 caracteres"
    
    if not re.search(r'[A-Z]', password):
        return False, "Senha deve conter pelo menos uma letra maiúscula"
    
    if not re.search(r'[a-z]', password):
        return False, "Senha deve conter pelo menos uma letra minúscula"
    
    if not re.search(r'\d', password):
        return False, "Senha deve conter pelo menos um número"
    
    return True, "Senha válida"

@auth_bp.route('/register', methods=['POST'])
@cross_origin()
def register():
    """Registrar novo usuário"""
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'Dados inválidos'}), 400
    
    # Validar campos obrigatórios
    required_fields = ['username', 'email', 'password', 'first_name', 'last_name']
    for field in required_fields:
        if not data.get(field):
            return jsonify({'error': f'{field} é obrigatório'}), 400
    
    # Validar email
    if not is_valid_email(data['email']):
        return jsonify({'error': 'Email inválido'}), 400
    
    # Validar senha
    is_valid, message = is_valid_password(data['password'])
    if not is_valid:
        return jsonify({'error': message}), 400
    
    # Verificar se usuário já existe
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email já está em uso'}), 400
    
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'error': 'Nome de usuário já está em uso'}), 400
    
    # Criar novo usuário
    user = User(
        username=data['username'],
        email=data['email'],
        first_name=data['first_name'],
        last_name=data['last_name'],
        bio=data.get('bio', ''),
        is_admin=False  # Usuários normais não são admin por padrão
    )
    user.set_password(data['password'])
    
    db.session.add(user)
    
    # Criar notificação para o admin
    admin = User.query.filter_by(is_admin=True).first()
    if admin:
        notification = Notification(
            title='Novo usuário registrado',
            message=f'{user.first_name} {user.last_name} se registrou no portfólio',
            type='new_user',
            user_id=admin.id,
            related_user_id=user.id
        )
        db.session.add(notification)
    
    db.session.commit()
    
    return jsonify({
        'message': 'Usuário registrado com sucesso',
        'user': user.to_dict()
    }), 201

@auth_bp.route('/login', methods=['POST'])
@cross_origin()
def login():
    """Fazer login"""
    data = request.get_json()
    
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Email e senha são obrigatórios'}), 400
    
    user = User.query.filter_by(email=data['email']).first()
    
    if not user or not user.check_password(data['password']):
        return jsonify({'error': 'Email ou senha inválidos'}), 401
    
    if not user.is_active:
        return jsonify({'error': 'Conta desativada'}), 401
    
    login_user(user, remember=data.get('remember', False))
    
    return jsonify({
        'message': 'Login realizado com sucesso',
        'user': user.to_dict()
    })

@auth_bp.route('/logout', methods=['POST'])
@cross_origin()
@login_required
def logout():
    """Fazer logout"""
    logout_user()
    return jsonify({'message': 'Logout realizado com sucesso'})

@auth_bp.route('/me', methods=['GET'])
@cross_origin()
@login_required
def get_current_user():
    """Obter dados do usuário atual"""
    return jsonify(current_user.to_dict())

@auth_bp.route('/me', methods=['PUT'])
@cross_origin()
@login_required
def update_profile():
    """Atualizar perfil do usuário"""
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'Dados inválidos'}), 400
    
    # Atualizar campos permitidos
    if 'first_name' in data:
        current_user.first_name = data['first_name']
    if 'last_name' in data:
        current_user.last_name = data['last_name']
    if 'bio' in data:
        current_user.bio = data['bio']
    if 'profile_image' in data:
        current_user.profile_image = data['profile_image']
    
    # Verificar se username está sendo alterado
    if 'username' in data and data['username'] != current_user.username:
        existing = User.query.filter_by(username=data['username']).first()
        if existing:
            return jsonify({'error': 'Nome de usuário já está em uso'}), 400
        current_user.username = data['username']
    
    db.session.commit()
    
    return jsonify({
        'message': 'Perfil atualizado com sucesso',
        'user': current_user.to_dict()
    })

@auth_bp.route('/change-password', methods=['POST'])
@cross_origin()
@login_required
def change_password():
    """Alterar senha do usuário"""
    data = request.get_json()
    
    if not data or not data.get('current_password') or not data.get('new_password'):
        return jsonify({'error': 'Senha atual e nova senha são obrigatórias'}), 400
    
    if not current_user.check_password(data['current_password']):
        return jsonify({'error': 'Senha atual incorreta'}), 400
    
    # Validar nova senha
    is_valid, message = is_valid_password(data['new_password'])
    if not is_valid:
        return jsonify({'error': message}), 400
    
    current_user.set_password(data['new_password'])
    db.session.commit()
    
    return jsonify({'message': 'Senha alterada com sucesso'})

@auth_bp.route('/forgot-password', methods=['POST'])
@cross_origin()
def forgot_password():
    """Solicitar recuperação de senha"""
    data = request.get_json()
    
    if not data or not data.get('email'):
        return jsonify({'error': 'Email é obrigatório'}), 400
    
    user = User.query.filter_by(email=data['email']).first()
    
    if not user:
        # Por segurança, não revelar se o email existe
        return jsonify({'message': 'Se o email existir, você receberá instruções para recuperação'}), 200
    
    # Gerar token de recuperação
    reset_token = secrets.token_urlsafe(32)
    
    # Aqui você salvaria o token no banco (seria necessário adicionar campo na tabela User)
    # Por simplicidade, vamos apenas simular o envio do email
    
    try:
        # Enviar email de recuperação
        msg = Message(
            'Recuperação de Senha - Portfólio Alexis Daniel',
            recipients=[user.email]
        )
        msg.body = f'''
        Olá {user.first_name},

        Você solicitou a recuperação de senha para sua conta no portfólio.

        Use o token abaixo para redefinir sua senha:
        {reset_token}

        Se você não solicitou esta recuperação, ignore este email.

        Atenciosamente,
        Equipe do Portfólio
        '''
        
        mail.send(msg)
        
        return jsonify({'message': 'Instruções de recuperação enviadas por email'}), 200
    
    except Exception as e:
        current_app.logger.error(f'Erro ao enviar email: {str(e)}')
        return jsonify({'error': 'Erro interno do servidor'}), 500

@auth_bp.route('/reset-password', methods=['POST'])
@cross_origin()
def reset_password():
    """Redefinir senha com token"""
    data = request.get_json()
    
    if not data or not data.get('token') or not data.get('new_password'):
        return jsonify({'error': 'Token e nova senha são obrigatórios'}), 400
    
    # Aqui você verificaria o token no banco de dados
    # Por simplicidade, vamos apenas validar a nova senha
    
    is_valid, message = is_valid_password(data['new_password'])
    if not is_valid:
        return jsonify({'error': message}), 400
    
    # Simular redefinição de senha
    return jsonify({'message': 'Senha redefinida com sucesso'}), 200

@auth_bp.route('/admin/users', methods=['GET'])
@cross_origin()
@login_required
def get_users():
    """Obter lista de usuários (apenas admin)"""
    if not current_user.is_admin:
        return jsonify({'error': 'Acesso negado'}), 403
    
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)
    
    users = User.query.paginate(
        page=page, per_page=per_page, error_out=False
    )
    
    return jsonify({
        'users': [user.to_dict() for user in users.items],
        'total': users.total,
        'pages': users.pages,
        'current_page': page,
        'has_next': users.has_next,
        'has_prev': users.has_prev
    })

@auth_bp.route('/admin/users/<int:user_id>/toggle-status', methods=['PUT'])
@cross_origin()
@login_required
def toggle_user_status(user_id):
    """Ativar/desativar usuário (apenas admin)"""
    if not current_user.is_admin:
        return jsonify({'error': 'Acesso negado'}), 403
    
    user = User.query.get_or_404(user_id)
    
    if user.is_admin:
        return jsonify({'error': 'Não é possível desativar um administrador'}), 400
    
    user.is_active = not user.is_active
    db.session.commit()
    
    status = 'ativado' if user.is_active else 'desativado'
    return jsonify({
        'message': f'Usuário {status} com sucesso',
        'user': user.to_dict()
    })


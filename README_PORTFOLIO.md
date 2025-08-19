# 🚀 Portfólio Digital - Alexis Daniel Matto Careaga

Um sistema web completo de portfólio digital com funcionalidades sociais e área administrativa.

## ✨ Características Principais

- 🎨 **Design Moderno**: Interface responsiva com Tailwind CSS
- 🔐 **Sistema de Autenticação**: Login/cadastro para visitantes
- 👤 **Área Administrativa**: Gerenciamento completo de projetos e conquistas
- 💬 **Funcionalidades Sociais**: Curtidas, comentários e compartilhamento
- 🔗 **Integração LinkedIn**: Compartilhamento direto na rede social
- 📱 **Totalmente Responsivo**: Otimizado para todos os dispositivos
- ⚡ **Performance Otimizada**: Carregamento rápido e experiência fluida

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca JavaScript para interfaces
- **Vite** - Build tool moderna e rápida
- **Tailwind CSS** - Framework CSS utilitário
- **Lucide React** - Biblioteca de ícones

### Backend
- **Python 3.11** - Linguagem de programação
- **Flask** - Framework web minimalista
- **SQLAlchemy** - ORM para banco de dados
- **SQLite** - Banco de dados leve

## 🚀 Como Executar

### Pré-requisitos
- Python 3.11+
- Node.js 18+
- Git

### 1. Clone o Repositório
```bash
git clone https://github.com/Peixe-Eterno/AlexisPortfolio.git
cd AlexisPortfolio
```

### 2. Configure o Backend
```bash
cd portfolio_backend

# Criar ambiente virtual
python -m venv venv

# Ativar ambiente virtual
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate     # Windows

# Instalar dependências
pip install -r requirements.txt

# Executar servidor
python src/main.py
```

O backend estará disponível em: `http://localhost:5000`

### 3. Configure o Frontend
```bash
cd portfolio_frontend

# Instalar dependências
npm install
# ou
pnpm install

# Executar servidor de desenvolvimento
npm run dev
# ou
pnpm dev
```

O frontend estará disponível em: `http://localhost:5173`

## 🔑 Credenciais de Administrador

Ao executar o backend pela primeira vez, uma senha de administrador será gerada automaticamente. Procure por uma mensagem similar a:

```
IMPORTANTE: Senha do admin: oatg5tmvlAZbuzCm
Por favor, altere esta senha após o primeiro login!
```

**⚠️ IMPORTANTE**: Altere esta senha após o primeiro acesso por motivos de segurança.

## 📋 Funcionalidades

### Para Visitantes
- ✅ Visualizar projetos e conquistas
- ✅ Curtir projetos (requer login)
- ✅ Comentar projetos (requer login)
- ✅ Compartilhar no LinkedIn
- ✅ Entrar em contato via formulário
- ✅ Criar conta e fazer login

### Para Administradores
- ✅ Dashboard com estatísticas
- ✅ Gerenciar projetos (CRUD completo)
- ✅ Gerenciar conquistas (CRUD completo)
- ✅ Visualizar comentários e curtidas
- ✅ Sistema de notificações
- ✅ Controle de publicação (rascunho/publicado)

## 🌐 URLs de Acesso Público

### Demonstração Online (Temporária)
- **Frontend**: https://5173-io1i37tfe8mrcvwlneksw-18d50cdf.manus.computer
- **Backend API**: https://5000-io1i37tfe8mrcvwlneksw-18d50cdf.manus.computer

*Nota: Estas URLs são temporárias para demonstração. Para uso em produção, configure seu próprio servidor.*

## 📁 Estrutura do Projeto

```
portfolio_project/
├── portfolio_backend/          # Backend Flask
│   ├── src/
│   │   ├── main.py            # Aplicação principal
│   │   ├── models/            # Modelos de dados
│   │   └── routes/            # Rotas da API
│   └── requirements.txt       # Dependências Python
│
├── portfolio_frontend/         # Frontend React
│   ├── src/
│   │   ├── components/        # Componentes React
│   │   ├── App.jsx           # Componente principal
│   │   └── App.css           # Estilos
│   └── package.json          # Dependências Node.js
│
└── DOCUMENTACAO_PORTFOLIO.md  # Documentação técnica completa
```

## 🔧 Configuração para Produção

### Variáveis de Ambiente Recomendadas
```bash
# Backend
FLASK_ENV=production
SECRET_KEY=sua_chave_secreta_aqui
DATABASE_URL=postgresql://user:pass@localhost/portfolio

# Frontend
VITE_API_URL=https://seu-backend.com/api
```

### Deploy Recomendado
- **Frontend**: Vercel, Netlify, ou GitHub Pages
- **Backend**: Heroku, Railway, ou VPS com Gunicorn
- **Banco**: PostgreSQL para produção

## 🤝 Como Contribuir

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Contato

**Alexis Daniel Matto Careaga**
- 📧 Email: alexisdanielmatto@gmail.com
- 💼 LinkedIn: [alexis-daniel-matto-careaga](https://www.linkedin.com/in/alexis-daniel-matto-careaga-8033511b9/)
- 🐙 GitHub: [Peixe-Eterno](https://github.com/Peixe-Eterno)

## 🙏 Agradecimentos

- Comunidade React pela excelente documentação
- Equipe do Flask pelo framework robusto
- Tailwind CSS pela facilidade de estilização
- Lucide pela biblioteca de ícones

---

**Desenvolvido com ❤️ por Alexis Daniel Matto Careaga**


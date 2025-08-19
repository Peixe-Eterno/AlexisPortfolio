# Documentação Técnica - Portfólio Digital Alexis Daniel

## Visão Geral

Este documento apresenta a documentação técnica completa do sistema de portfólio digital desenvolvido para Alexis Daniel Matto Careaga. O sistema é uma aplicação web full-stack que permite ao usuário principal gerenciar suas conquistas, projetos e experiências, apresentando-os de forma organizada e atrativa, com recursos interativos para visitantes.

## Arquitetura do Sistema

### Tecnologias Utilizadas

**Frontend:**
- React 18.2.0
- Vite (build tool)
- Tailwind CSS (estilização)
- Lucide React (ícones)
- JavaScript ES6+

**Backend:**
- Python 3.11
- Flask 3.0.0
- SQLAlchemy (ORM)
- Flask-CORS (Cross-Origin Resource Sharing)
- SQLite (banco de dados)

**Ferramentas de Desenvolvimento:**
- Git (controle de versão)
- npm/pnpm (gerenciamento de pacotes)
- pip (gerenciamento de pacotes Python)

### Estrutura de Diretórios

```
portfolio_project/
├── portfolio_backend/          # Backend Flask
│   ├── src/
│   │   ├── main.py            # Arquivo principal da aplicação
│   │   ├── models/            # Modelos de dados
│   │   │   └── portfolio.py   # Modelos de projetos, conquistas, usuários
│   │   └── routes/            # Rotas da API
│   │       ├── portfolio.py   # Endpoints de projetos e conquistas
│   │       └── auth.py        # Endpoints de autenticação
│   ├── venv/                  # Ambiente virtual Python
│   └── requirements.txt       # Dependências Python
│
├── portfolio_frontend/         # Frontend React
│   ├── src/
│   │   ├── components/        # Componentes React
│   │   │   ├── ui/           # Componentes de interface
│   │   │   ├── auth/         # Componentes de autenticação
│   │   │   └── admin/        # Componentes administrativos
│   │   ├── App.jsx           # Componente principal
│   │   └── App.css           # Estilos principais
│   ├── public/               # Arquivos públicos
│   └── package.json          # Dependências Node.js
│
└── AlexisPortfolio/           # Repositório original (referência)
    └── portfolio/
        ├── design_concept.md  # Conceito de design
        └── app.py            # Aplicação Flask original
```

## Funcionalidades Implementadas

### 1. Área Pública (Visitantes)

#### 1.1 Página Inicial
- **Hero Section**: Apresentação pessoal com foto, nome e descrição
- **Navegação**: Menu responsivo com hambúrguer para dispositivos móveis
- **Call-to-Action**: Botões para visualizar projetos e download de CV
- **Links Sociais**: Acesso direto ao GitHub, LinkedIn e email

#### 1.2 Seção Sobre Mim
- **Missão Pessoal**: Descrição da filosofia de trabalho
- **Experiência**: Resumo da trajetória profissional
- **Habilidades**: Cards com competências principais
- **Estatísticas**: Métricas de projetos, experiência e tecnologias
- **Tecnologias**: Grid visual das tecnologias dominadas

#### 1.3 Seção de Projetos
- **Visualização em Cards**: Layout responsivo em grid
- **Filtros**: Por categoria e destaques
- **Informações Detalhadas**: Título, descrição, tecnologias, data
- **Links Externos**: Demo e código fonte (GitHub)
- **Funcionalidades Sociais**:
  - Sistema de curtidas com contador
  - Comentários (apenas usuários logados)
  - Compartilhamento no LinkedIn
  - Compartilhamento genérico (Web Share API)

#### 1.4 Seção de Conquistas
- **Cards de Certificações**: Exibição organizada por categoria
- **Badges de Destaque**: Identificação visual de conquistas importantes
- **Informações Completas**: Instituição, data, descrição
- **Estatísticas Resumidas**: Contadores de conquistas e curtidas

#### 1.5 Seção de Contato
- **Formulário de Contato**: Campos para nome, email, assunto e mensagem
- **Informações de Contato**: Telefone, localização, redes sociais
- **Status de Disponibilidade**: Indicador visual de disponibilidade

### 2. Sistema de Autenticação

#### 2.1 Modais de Autenticação
- **Modal de Login**: Email/senha com validação
- **Modal de Cadastro**: Formulário completo para novos usuários
- **Recuperação de Senha**: Sistema de reset (interface preparada)

#### 2.2 Gerenciamento de Usuários
- **Perfis de Usuário**: Informações básicas e avatar
- **Sessões**: Controle de login/logout
- **Permissões**: Diferenciação entre visitantes e administrador

### 3. Área Administrativa

#### 3.1 Dashboard Administrativo
- **Visão Geral**: Estatísticas e métricas do portfólio
- **Gerenciamento de Projetos**: CRUD completo
- **Gerenciamento de Conquistas**: CRUD completo
- **Sistema de Notificações**: Alertas sobre novos comentários

#### 3.2 Funcionalidades de Gestão
- **Upload de Mídia**: Suporte para imagens, vídeos e links
- **Categorização**: Organização por tags e categorias
- **Status de Publicação**: Opção de rascunho/publicado
- **Destaque**: Marcação de projetos em destaque

### 4. Integração com LinkedIn

#### 4.1 Compartilhamento Social
- **API do LinkedIn**: Integração para compartilhamento direto
- **Prévia Personalizada**: URLs com metadados otimizados
- **Abertura em Nova Janela**: UX otimizada para compartilhamento

#### 4.2 Funcionalidades Sociais Avançadas
- **Sistema de Comentários**: Interface completa com avatares
- **Curtidas Interativas**: Animações e feedback visual
- **Notificações**: Sistema para alertar sobre interações

## APIs e Endpoints

### Backend Flask (Porta 5000)

#### Projetos
```
GET    /api/projects              # Listar projetos
POST   /api/projects              # Criar projeto
GET    /api/projects/<id>         # Obter projeto específico
PUT    /api/projects/<id>         # Atualizar projeto
DELETE /api/projects/<id>         # Deletar projeto
POST   /api/projects/<id>/like    # Curtir projeto
POST   /api/projects/<id>/comment # Comentar projeto
```

#### Conquistas
```
GET    /api/achievements          # Listar conquistas
POST   /api/achievements          # Criar conquista
GET    /api/achievements/<id>     # Obter conquista específica
PUT    /api/achievements/<id>     # Atualizar conquista
DELETE /api/achievements/<id>     # Deletar conquista
```

#### Autenticação
```
POST   /api/auth/register         # Cadastro de usuário
POST   /api/auth/login            # Login
POST   /api/auth/logout           # Logout
GET    /api/auth/me               # Dados do usuário atual
POST   /api/auth/reset-password   # Reset de senha
```

#### Usuários
```
GET    /api/users                 # Listar usuários (admin)
GET    /api/users/<id>            # Obter usuário específico
PUT    /api/users/<id>            # Atualizar usuário
DELETE /api/users/<id>            # Deletar usuário (admin)
```

### Modelos de Dados

#### User (Usuário)
```python
{
    "id": int,
    "name": str,
    "email": str,
    "password_hash": str,
    "is_admin": bool,
    "avatar_url": str,
    "created_at": datetime,
    "updated_at": datetime
}
```

#### Project (Projeto)
```python
{
    "id": int,
    "title": str,
    "description": str,
    "technologies": str,  # JSON array
    "category_id": int,
    "image_url": str,
    "demo_url": str,
    "github_url": str,
    "is_featured": bool,
    "is_published": bool,
    "likes_count": int,
    "views": int,
    "created_at": datetime,
    "updated_at": datetime
}
```

#### Achievement (Conquista)
```python
{
    "id": int,
    "title": str,
    "description": str,
    "institution": str,
    "category_id": int,
    "certificate_url": str,
    "is_featured": bool,
    "likes_count": int,
    "date_achieved": datetime,
    "created_at": datetime,
    "updated_at": datetime
}
```

#### Comment (Comentário)
```python
{
    "id": int,
    "content": str,
    "user_id": int,
    "project_id": int,
    "likes": int,
    "created_at": datetime,
    "updated_at": datetime
}
```

#### Like (Curtida)
```python
{
    "id": int,
    "user_id": int,
    "project_id": int,
    "achievement_id": int,
    "created_at": datetime
}
```

## Configuração e Deploy

### Requisitos do Sistema
- Python 3.11+
- Node.js 18+
- npm ou pnpm
- Git

### Instalação Local

#### Backend
```bash
cd portfolio_backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou venv\Scripts\activate  # Windows
pip install -r requirements.txt
python src/main.py
```

#### Frontend
```bash
cd portfolio_frontend
npm install  # ou pnpm install
npm run dev  # ou pnpm dev
```

### URLs de Acesso

#### Desenvolvimento Local
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

#### Deploy Público (Temporário)
- **Frontend**: https://5173-io1i37tfe8mrcvwlneksw-18d50cdf.manus.computer
- **Backend**: https://5000-io1i37tfe8mrcvwlneksw-18d50cdf.manus.computer

### Credenciais de Administrador
- **Senha gerada automaticamente**: `oatg5tmvlAZbuzCm`
- **Recomendação**: Alterar após primeiro login

## Segurança

### Medidas Implementadas
- **Hash de Senhas**: Utilizando werkzeug.security
- **CORS Configurado**: Permitindo apenas origens autorizadas
- **Validação de Dados**: Sanitização de inputs
- **Autenticação por Sessão**: Controle de acesso às rotas protegidas

### Recomendações para Produção
- Implementar HTTPS
- Configurar variáveis de ambiente para credenciais
- Utilizar banco de dados PostgreSQL
- Implementar rate limiting
- Configurar logs de segurança
- Implementar JWT para autenticação stateless

## Performance e Otimização

### Frontend
- **Code Splitting**: Carregamento lazy de componentes
- **Otimização de Imagens**: Formatos modernos e compressão
- **CSS Otimizado**: Tailwind CSS com purge
- **Bundle Optimization**: Vite para build otimizado

### Backend
- **Paginação**: Implementada nas listagens
- **Cache**: Headers de cache para recursos estáticos
- **Compressão**: Gzip habilitado
- **Queries Otimizadas**: SQLAlchemy com lazy loading

## Responsividade

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Componentes Responsivos
- Menu hambúrguer para mobile
- Grid adaptativo para projetos e conquistas
- Formulários otimizados para touch
- Navegação otimizada para diferentes dispositivos

## Testes

### Testes Realizados
- **Funcionalidade de Curtidas**: ✅ Funcionando
- **Sistema de Comentários**: ✅ Funcionando
- **Integração LinkedIn**: ✅ Funcionando
- **APIs Backend**: ✅ Funcionando
- **Responsividade**: ✅ Funcionando
- **Navegação**: ✅ Funcionando

### Cenários de Teste
1. **Usuário Visitante**:
   - Visualização de projetos e conquistas
   - Tentativa de curtir sem login (bloqueado)
   - Tentativa de comentar sem login (bloqueado)

2. **Usuário Logado**:
   - Curtir projetos
   - Comentar projetos
   - Compartilhar no LinkedIn

3. **Administrador**:
   - Acesso ao dashboard
   - CRUD de projetos e conquistas
   - Visualização de notificações

## Manutenção

### Logs
- **Backend**: Logs do Flask em desenvolvimento
- **Frontend**: Console do navegador para debugging
- **Recomendação**: Implementar logging estruturado para produção

### Backup
- **Banco de Dados**: SQLite file-based (fácil backup)
- **Uploads**: Diretório de mídia (backup necessário)
- **Código**: Versionado no Git

### Atualizações
- **Dependências**: Verificar regularmente por atualizações de segurança
- **Node.js**: Manter versão LTS
- **Python**: Manter versão estável

## Próximos Passos

### Melhorias Sugeridas
1. **Sistema de Upload**: Interface para upload de imagens
2. **Editor WYSIWYG**: Para descrições de projetos
3. **Analytics**: Métricas de visualização e engajamento
4. **SEO**: Meta tags dinâmicas e sitemap
5. **PWA**: Transformar em Progressive Web App
6. **Temas**: Sistema de temas claro/escuro
7. **Internacionalização**: Suporte a múltiplos idiomas

### Integrações Futuras
- **Google Analytics**: Métricas detalhadas
- **GitHub API**: Sincronização automática de repositórios
- **Email Service**: Notificações por email
- **CDN**: Para otimização de imagens
- **Search**: Sistema de busca avançada

## Suporte e Contato

Para dúvidas técnicas ou suporte, entre em contato:
- **Email**: alexisdanielmatto@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/alexis-daniel-matto-careaga-8033511b9/
- **GitHub**: https://github.com/Peixe-Eterno

---

**Desenvolvido com ❤️ usando React, Flask e tecnologias modernas.**


# Portfolio System - Alexis Daniel

## Overview
A comprehensive digital portfolio web application built with Flask that allows Alexis Daniel to showcase his projects, achievements, and experiences. The system features a public-facing portfolio with visitor interaction capabilities (likes, comments, LinkedIn sharing) and a robust admin panel for content management. Visitors can register accounts to participate actively in the community by leaving comments and feedback on projects.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Template Engine**: Jinja2 templates with Bootstrap 5 for responsive design
- **Static Assets**: Custom CSS with CSS variables for theming (gold/black color scheme), vanilla JavaScript for interactivity
- **UI Components**: Card-based layout for projects, responsive navigation, form validation, and interactive elements
- **Admin Interface**: Dedicated admin templates for content management with dashboard, project forms, and project listing

### Backend Architecture
- **Framework**: Flask web framework with modular structure
- **Database ORM**: SQLAlchemy with declarative base for database operations
- **Authentication**: Flask-Login for session management with user roles (admin/visitor)
- **Form Handling**: WTForms with Flask-WTF for secure form processing and CSRF protection
- **File Management**: Werkzeug utilities for secure file uploads with size limits (16MB)

### Data Models
- **User**: Authentication with admin privileges, profile management
- **Project**: Core content entity with categories, publishing status, featured flags
- **Category**: Organizational structure for project classification
- **Comment**: User-generated content linked to projects
- **Like**: Interaction tracking system
- **AboutMe**: Profile information management

### Authentication System
- **User Registration**: Email-based registration with password confirmation
- **Login/Logout**: Session-based authentication with remember me functionality
- **Password Recovery**: Email-based password reset system
- **Role-Based Access**: Admin vs. visitor permissions with route protection

### File Upload System
- **Image Management**: Secure file upload with extension validation (jpg, png, jpeg, gif)
- **Storage**: Local file system with organized directory structure
- **Security**: Filename sanitization and file type validation

## External Dependencies

### Core Framework Dependencies
- **Flask**: Web framework with SQLAlchemy integration
- **Flask-Login**: User session management
- **Flask-WTF**: Form handling and CSRF protection
- **Flask-Mail**: Email functionality for notifications and password recovery

### Frontend Dependencies
- **Bootstrap 5**: CSS framework via CDN
- **Font Awesome 6**: Icon library via CDN
- **Custom CSS**: Theme implementation with CSS variables

### Database
- **SQLAlchemy**: ORM for database operations
- **SQLite**: Default development database (configurable via DATABASE_URL environment variable)
- **Connection Pooling**: Configured with pool_recycle and pool_pre_ping for reliability

### Email Service
- **SMTP Integration**: Gmail SMTP configuration for email notifications
- **Admin Notifications**: Automated emails for new comments on projects
- **Password Recovery**: Email-based password reset functionality

### Environment Configuration
- **Session Management**: SESSION_SECRET for secure sessions
- **Database**: DATABASE_URL for database connection
- **Email Settings**: MAIL_SERVER, MAIL_USERNAME, MAIL_PASSWORD configuration
- **Admin Contact**: ADMIN_EMAIL for notification system

### Middleware
- **ProxyFix**: Werkzeug middleware for proper header handling in production environments
- **File Upload**: Configured with maximum file size limits and secure filename handling
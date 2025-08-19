import React, { useState } from 'react';
import { Menu, X, Home, User, Briefcase, Award, MessageCircle, LogIn, UserPlus, LogOut, Settings, Shield } from 'lucide-react';
import { Button } from './ui/button';
import LoginModal from './auth/LoginModal';
import RegisterModal from './auth/RegisterModal';
import AdminDashboard from './admin/AdminDashboard';

const Navbar = ({ currentUser, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { icon: Home, label: 'Início', href: '#home' },
    { icon: User, label: 'Sobre', href: '#about' },
    { icon: Briefcase, label: 'Projetos', href: '#projects' },
    { icon: Award, label: 'Conquistas', href: '#achievements' },
    { icon: MessageCircle, label: 'Contato', href: '#contact' },
  ];

  const handleMenuClick = (href) => {
    setIsMenuOpen(false);
    // Scroll suave para a seção
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogin = (userData) => {
    // Simular login - em uma aplicação real, isso viria do contexto/estado global
    console.log('Usuário logado:', userData);
    // onLogin seria chamado aqui para atualizar o estado global
  };

  const handleRegister = (userData) => {
    // Simular registro - em uma aplicação real, isso viria do contexto/estado global
    console.log('Usuário registrado:', userData);
    // onRegister seria chamado aqui para atualizar o estado global
  };

  const handleLogout = () => {
    onLogout();
    setShowUserMenu(false);
  };

  const isOwner = currentUser?.email === 'alexisdanielmatto@gmail.com';

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a 
                href="#home" 
                className="text-2xl font-bold text-primary hover:text-accent transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  handleMenuClick('#home');
                }}
              >
                Alexis Daniel
              </a>
            </div>

            {/* Menu Desktop */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors hover-glow"
                    onClick={(e) => {
                      e.preventDefault();
                      handleMenuClick(item.href);
                    }}
                  >
                    <item.icon className="inline-block w-4 h-4 mr-2" />
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Botões de Autenticação Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{currentUser.name || currentUser.first_name}</span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg py-1">
                      <div className="px-4 py-2 border-b border-border">
                        <p className="text-sm font-medium">{currentUser.name || currentUser.first_name}</p>
                        <p className="text-xs text-muted-foreground">{currentUser.email}</p>
                      </div>
                      
                      {isOwner && (
                        <button
                          onClick={() => {
                            setShowAdminDashboard(true);
                            setShowUserMenu(false);
                          }}
                          className="w-full flex items-center px-4 py-2 text-sm hover:bg-muted transition-colors"
                        >
                          <Shield className="w-4 h-4 mr-2" />
                          Dashboard Admin
                        </button>
                      )}
                      
                      <button
                        onClick={() => setShowUserMenu(false)}
                        className="w-full flex items-center px-4 py-2 text-sm hover:bg-muted transition-colors"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Configurações
                      </button>
                      
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-sm hover:bg-muted transition-colors text-destructive"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sair
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowLoginModal(true)}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Entrar
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => setShowRegisterModal(true)}
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Cadastrar
                  </Button>
                </div>
              )}
            </div>

            {/* Botão Menu Hambúrguer Mobile */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMenu}
                className="text-foreground hover:text-primary"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card border-b border-border">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    handleMenuClick(item.href);
                  }}
                >
                  <item.icon className="inline-block w-5 h-5 mr-3" />
                  {item.label}
                </a>
              ))}
              
              {/* Botões de Autenticação Mobile */}
              <div className="pt-4 border-t border-border">
                {currentUser ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2">
                      <p className="text-sm font-medium">{currentUser.name || currentUser.first_name}</p>
                      <p className="text-xs text-muted-foreground">{currentUser.email}</p>
                    </div>
                    
                    {isOwner && (
                      <button
                        onClick={() => {
                          setShowAdminDashboard(true);
                          setIsMenuOpen(false);
                        }}
                        className="w-full flex items-center px-3 py-2 text-sm hover:bg-muted transition-colors rounded-md"
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        Dashboard Admin
                      </button>
                    )}
                    
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full flex items-center px-3 py-2 text-sm hover:bg-muted transition-colors rounded-md"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Configurações
                    </button>
                    
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-3 py-2 text-sm hover:bg-muted transition-colors rounded-md text-destructive"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sair
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => {
                        setShowLoginModal(true);
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Entrar
                    </Button>
                    <Button
                      variant="default"
                      className="w-full justify-start"
                      onClick={() => {
                        setShowRegisterModal(true);
                        setIsMenuOpen(false);
                      }}
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Cadastrar
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
        onLogin={handleLogin}
      />

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
        onRegister={handleRegister}
      />

      {/* Admin Dashboard */}
      {showAdminDashboard && (
        <AdminDashboard
          currentUser={currentUser}
          onClose={() => setShowAdminDashboard(false)}
        />
      )}

      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </>
  );
};

export default Navbar;


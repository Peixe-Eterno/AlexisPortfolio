import React, { useState } from 'react';
import { X, Eye, EyeOff, Mail, Lock, User, ArrowRight, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin, onRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Nome deve ter pelo menos 2 caracteres';
    }

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem';
    }

    if (!acceptTerms) {
      newErrors.terms = 'Você deve aceitar os termos de uso';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simular chamada de API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simular cadastro bem-sucedido
      const userData = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        avatar: null
      };
      
      onRegister(userData);
      onClose();
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      setAcceptTerms(false);
    } catch (error) {
      setErrors({ general: 'Erro ao criar conta. Tente novamente.' });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, label: '', color: '' };

    let strength = 0;
    if (password.length >= 6) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    const levels = [
      { label: 'Muito fraca', color: 'bg-red-500' },
      { label: 'Fraca', color: 'bg-orange-500' },
      { label: 'Regular', color: 'bg-yellow-500' },
      { label: 'Boa', color: 'bg-blue-500' },
      { label: 'Forte', color: 'bg-green-500' }
    ];

    return { strength, ...levels[strength - 1] || levels[0] };
  };

  const passwordStrength = getPasswordStrength();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto animate-in fade-in-0 zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Criar Conta</CardTitle>
            <p className="text-muted-foreground mt-2">
              Junte-se à comunidade e interaja com os projetos
            </p>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.general && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {errors.general}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Nome completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Seu nome completo"
                  className={`pl-10 ${errors.name ? 'border-destructive' : ''}`}
                />
              </div>
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="seu@email.com"
                  className={`pl-10 ${errors.email ? 'border-destructive' : ''}`}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Crie uma senha forte"
                  className={`pl-10 pr-10 ${errors.password ? 'border-destructive' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              
              {formData.password && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all ${passwordStrength.color}`}
                        style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {passwordStrength.label}
                    </span>
                  </div>
                </div>
              )}
              
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirmar senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirme sua senha"
                  className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-destructive' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="flex items-start space-x-3 text-sm">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    acceptTerms 
                      ? 'bg-primary border-primary text-primary-foreground' 
                      : 'border-border hover:border-primary'
                  }`}>
                    {acceptTerms && <Check className="w-3 h-3" />}
                  </div>
                </div>
                <span className="leading-5">
                  Eu aceito os{' '}
                  <button type="button" className="text-primary hover:underline">
                    termos de uso
                  </button>
                  {' '}e{' '}
                  <button type="button" className="text-primary hover:underline">
                    política de privacidade
                  </button>
                </span>
              </label>
              {errors.terms && (
                <p className="text-sm text-destructive">{errors.terms}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                  Criando conta...
                </>
              ) : (
                <>
                  Criar conta
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Já tem uma conta?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-primary hover:underline font-medium"
              >
                Entrar
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterModal;


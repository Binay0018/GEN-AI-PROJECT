import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { HiSparkles } from 'react-icons/hi2';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import './AuthPages.scss';

const LoginPage = () => {
  const { login, loading } = useAuth();
  const { error: toastError } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err) {
      toastError(err.userMessage || 'Invalid credentials');
    }
  };

  return (
    <Card padding="lg" className="auth-page">
      <div className="auth-page__brand">
        <HiSparkles />
        <span>InterviewAI</span>
      </div>

      <h1>Welcome back</h1>
      <p className="auth-page__subtitle">Sign in to continue preparing</p>

      <form onSubmit={handleSubmit} className="auth-page__form">
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
        <Button type="submit" loading={loading} className="auth-page__submit">
          Sign In
        </Button>
      </form>

      <p className="auth-page__footer">
        Don't have an account? <Link to="/register">Create one</Link>
      </p>
    </Card>
  );
};

export default LoginPage;

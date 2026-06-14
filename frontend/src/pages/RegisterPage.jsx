import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { HiSparkles } from 'react-icons/hi2';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import './AuthPages.scss';

const RegisterPage = () => {
  const { register, loading } = useAuth();
  const { error: toastError, success } = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    if (password && password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    try {
      await register({ name, email, password });
      success('Account created successfully!');
      navigate('/dashboard');
    } catch (err) {
      toastError(err.userMessage || 'Registration failed');
    }
  };

  return (
    <Card padding="lg" className="auth-page">
      <div className="auth-page__brand">
        <HiSparkles />
        <span>InterviewAI</span>
      </div>

      <h1>Create your account</h1>
      <p className="auth-page__subtitle">Start preparing for your dream job</p>

      <form onSubmit={handleSubmit} className="auth-page__form">
        <Input
          label="Full Name"
          type="text"
          name="name"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />
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
          placeholder="Min 6 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
        <Button type="submit" loading={loading} className="auth-page__submit">
          Create Account
        </Button>
      </form>

      <p className="auth-page__footer">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </Card>
  );
};

export default RegisterPage;

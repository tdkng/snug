import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const LOGIN_ENDPOINT = 'http://localhost:8080/api/auth/login';

const LoginForm = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (loginError) setLoginError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');

    try {
      const response = await fetch(LOGIN_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setLoginError(errorData.message || 'Login failed. Please try again.');
        return;
      }
      const data = await response.json();
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Network error. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Username */}
      <div className="space-y-1">
        <Label htmlFor="username" className="leading-5">
          Username
        </Label>
        <Input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

      {/* Password */}
      <div className="w-full space-y-1">
        <Label htmlFor="password" className="leading-5">
          Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={isVisible ? 'text' : 'password'}
            placeholder="••••••••••••••••"
            className="pr-9"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => setIsVisible((prevState) => !prevState)}
            className="text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent"
          >
            {isVisible ? <EyeOffIcon /> : <EyeIcon />}
            <span className="sr-only">
              {isVisible ? 'Hide password' : 'Show password'}
            </span>
          </Button>
        </div>
      </div>

      {loginError && (
        <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
          {loginError}
        </div>
      )}

      <Button
        className="w-full bg-brown text-white hover:bg-brown/80 disabled:opacity-50"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Log in to Snug'}
      </Button>
    </form>
  );
};

const Login = () => {
  document.body.style.backgroundColor = 'var(--color-toffee)';

  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/signup');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-toffee">
      <Card className="z-1 w-full border-none shadow-md sm:max-w-lg">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="link" onClick={handleClick}>
              Sign Up
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

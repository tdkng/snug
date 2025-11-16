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

const SIGNUP_ENDPOINT = 'http://localhost:8080/api/auth/signup';

const SignupForm = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (signupError) setSignupError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSignupError('');

    try {
      const response = await fetch(SIGNUP_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setSignupError(errorData.message || 'Signup failed. Please try again.');
        return;
      }
      // const data = await response.json();
      navigate('/home');
    } catch (error) {
      console.error('Signup error:', error);
      setSignupError('Network error. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Email */}
      <div className="space-y-1">
        <Label htmlFor="email" className="leading-5">
          Email
        </Label>
        <Input
          type="text"
          id="email"
          name="email"
          placeholder="email@address.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

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
      <div className="space-y-1">
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

      {signupError && (
        <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
          {signupError}
        </div>
      )}

      <Button
        className="w-full bg-brown text-white hover:bg-brown/80 disabled:opacity-50"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? 'Signing up...' : 'Sign up for Snug'}
      </Button>
    </form>
  );
};

const Signup = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-dark-toffee">
      <Card className="z-1 w-full border-none shadow-md sm:max-w-lg">
        <CardHeader>
          <CardTitle>Sign Up for an account</CardTitle>
          <CardDescription>
            Create your account by entering your email below
          </CardDescription>
          <CardAction>
            <Button variant="link" onClick={handleClick}>
              Log In
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;

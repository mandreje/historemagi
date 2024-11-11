import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../lib/pocketbase';
import { AuthInput } from './AuthInput';
import { AuthError } from './AuthError';
import { AuthButton } from './AuthButton';
import { Mail, Lock } from 'lucide-react';

export function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (formData.password !== formData.passwordConfirm) {
      setError('Passordene må være like');
      setIsLoading(false);
      return;
    }

    try {
      const response = await register({
        email: formData.email,
        password: formData.password,
        passwordConfirm: formData.passwordConfirm
      });

      if (response.success) {
        navigate('/dashboard');
      } else {
        setError(response.error || 'Registrering mislyktes');
      }
    } catch (err) {
      setError('En uventet feil oppstod');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Opprett ny konto
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <AuthInput
              id="email"
              name="email"
              type="email"
              label="E-post"
              value={formData.email}
              onChange={handleChange}
              placeholder="din@epost.no"
              Icon={Mail}
              autoComplete="email"
            />

            <AuthInput
              id="password"
              name="password"
              type="password"
              label="Passord"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              Icon={Lock}
              autoComplete="new-password"
            />

            <AuthInput
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              label="Bekreft passord"
              value={formData.passwordConfirm}
              onChange={handleChange}
              placeholder="••••••••"
              Icon={Lock}
              autoComplete="new-password"
            />
          </div>

          <AuthError message={error} />

          <AuthButton
            isLoading={isLoading}
            loadingText="Registrerer..."
            text="Registrer"
          />
        </form>
      </div>
    </div>
  );
}
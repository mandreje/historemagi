import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { login, register, resetPassword, logout, getCurrentUser, checkConnection } from '../lib/pocketbase';

export function useAuth() {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  const { data: isConnected } = useQuery('serverConnection', checkConnection, {
    refetchInterval: 30000, // Check connection every 30 seconds
    staleTime: 10000,
  });

  const { data: user, isLoading: isLoadingUser } = useQuery(
    'user',
    getCurrentUser,
    {
      staleTime: Infinity,
      enabled: !!isConnected,
    }
  );

  const loginMutation = useMutation(
    (credentials: { email: string; password: string }) =>
      login(credentials.email, credentials.password),
    {
      onSuccess: (response) => {
        if (response.success) {
          queryClient.setQueryData('user', response.data?.record);
          setError(null);
        } else {
          setError(response.error || 'Login failed');
        }
      },
      onError: () => {
        setError('An unexpected error occurred');
      },
    }
  );

  const registerMutation = useMutation(
    (data: { email: string; password: string; passwordConfirm: string; name?: string }) =>
      register(data),
    {
      onSuccess: (response) => {
        if (response.success) {
          queryClient.setQueryData('user', response.data?.record);
          setError(null);
        } else {
          setError(response.error || 'Registration failed');
        }
      },
      onError: () => {
        setError('An unexpected error occurred');
      },
    }
  );

  const handleLogout = useCallback(async () => {
    logout();
    queryClient.setQueryData('user', null);
  }, [queryClient]);

  const resetPasswordMutation = useMutation(
    (email: string) => resetPassword(email),
    {
      onSuccess: (response) => {
        if (!response.success) {
          setError(response.error || 'Password reset failed');
        }
      },
    }
  );

  return {
    user,
    isAuthenticated: !!user,
    isLoading: isLoadingUser || loginMutation.isLoading || registerMutation.isLoading,
    error,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: handleLogout,
    resetPassword: resetPasswordMutation.mutate,
    clearError: () => setError(null),
    isConnected,
  };
}
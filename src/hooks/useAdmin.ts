import { useQuery, useMutation } from 'react-query';
import { adminLogin, checkConnection } from '../lib/auth';

export function useAdmin() {
  const { data: connectionStatus, isLoading: checkingConnection } = useQuery(
    'connection',
    checkConnection,
    {
      retry: 2,
      retryDelay: 1000,
    }
  );

  const loginMutation = useMutation(adminLogin, {
    onError: (error) => {
      console.error('Admin login error:', error);
    },
  });

  const login = async () => {
    if (!connectionStatus) {
      throw new Error('No connection to server');
    }
    return loginMutation.mutateAsync();
  };

  return {
    login,
    isLoading: loginMutation.isLoading || checkingConnection,
    isError: loginMutation.isError,
    error: loginMutation.error,
    isConnected: connectionStatus,
  };
}
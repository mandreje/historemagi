import { pb } from './pocketbase';

export interface AuthResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export const adminLogin = async (): Promise<AuthResponse> => {
  try {
    const email = import.meta.env.VITE_POCKETBASE_ADMIN_EMAIL;
    const password = import.meta.env.VITE_POCKETBASE_ADMIN_PASSWORD;

    if (!email || !password) {
      throw new Error('Admin credentials not found in environment variables');
    }

    const authData = await pb.admins.authWithPassword(email, password);
    
    return {
      success: true,
      data: authData
    };
  } catch (error: any) {
    console.error('Admin login error:', error);
    
    if (!import.meta.env.VITE_POCKETBASE_ADMIN_EMAIL || !import.meta.env.VITE_POCKETBASE_ADMIN_PASSWORD) {
      return {
        success: false,
        error: 'Missing admin credentials in environment variables'
      };
    }

    if (error.status === 0) {
      return {
        success: false,
        error: 'Could not connect to the server. Please check if PocketBase is running.'
      };
    }

    return {
      success: false,
      error: 'Invalid admin credentials'
    };
  }
};

export const isAdmin = (): boolean => {
  return pb.authStore.isValid && pb.authStore.model?.type === 'admin';
};

export const checkConnection = async (): Promise<boolean> => {
  try {
    await pb.health.check();
    return true;
  } catch {
    return false;
  }
};
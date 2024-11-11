import PocketBase from 'pocketbase';

const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

export interface AuthResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export const checkConnection = async (): Promise<boolean> => {
  try {
    const health = await pb.health.check();
    return health.code === 200;
  } catch {
    return false;
  }
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    // First check if we can connect to PocketBase
    const isConnected = await checkConnection();
    if (!isConnected) {
      return {
        success: false,
        error: 'Unable to connect to the server. Please check your connection and try again.'
      };
    }

    const authData = await pb.collection('users').authWithPassword(email, password);
    
    if (!authData?.token) {
      throw new Error('Authentication failed');
    }

    return {
      success: true,
      data: authData
    };
  } catch (error: any) {
    console.error('Login error:', error);
    
    if (!error.status || error.status === 0) {
      return {
        success: false,
        error: 'Unable to connect to the server. Please check your connection and try again.'
      };
    }

    if (error.status === 400) {
      return {
        success: false,
        error: 'Invalid email or password'
      };
    }

    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.'
    };
  }
};

export const register = async (data: {
  email: string;
  password: string;
  passwordConfirm: string;
  name?: string;
}): Promise<AuthResponse> => {
  try {
    const isConnected = await checkConnection();
    if (!isConnected) {
      return {
        success: false,
        error: 'Unable to connect to the server. Please check your connection and try again.'
      };
    }

    const record = await pb.collection('users').create({
      ...data,
      emailVisibility: true,
    });
    
    if (record) {
      // Auto login after successful registration
      return login(data.email, data.password);
    }
    
    return {
      success: false,
      error: 'Registration failed. Please try again.'
    };
  } catch (error: any) {
    console.error('Registration error:', error);
    
    if (!error.status || error.status === 0) {
      return {
        success: false,
        error: 'Unable to connect to the server. Please check your connection and try again.'
      };
    }

    if (error.data?.data?.email?.code === 'validation_not_unique') {
      return {
        success: false,
        error: 'This email is already registered'
      };
    }
    
    return {
      success: false,
      error: 'Registration failed. Please try again.'
    };
  }
};

export const resetPassword = async (email: string): Promise<AuthResponse> => {
  try {
    const isConnected = await checkConnection();
    if (!isConnected) {
      return {
        success: false,
        error: 'Unable to connect to the server. Please check your connection and try again.'
      };
    }

    await pb.collection('users').requestPasswordReset(email);
    return {
      success: true
    };
  } catch (error: any) {
    console.error('Password reset error:', error);
    return {
      success: false,
      error: 'Unable to send password reset email. Please try again.'
    };
  }
};

export const logout = () => {
  pb.authStore.clear();
};

export const getCurrentUser = () => {
  return pb.authStore.model;
};

export const getUser = () => {
  return getCurrentUser();
};

export { pb };
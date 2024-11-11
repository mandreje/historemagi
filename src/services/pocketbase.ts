import PocketBase from 'pocketbase';

export const pb = new PocketBase('http://127.0.0.1:8090');

export interface AuthError {
  message: string;
  field?: string;
}

export interface AuthResponse {
  success: boolean;
  error?: AuthError;
}

export const signUp = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    await pb.collection('users').create({
      email,
      password,
      passwordConfirm: password,
      emailVisibility: true,
    });
    
    return { success: true };
  } catch (error) {
    console.error('SignUp Error:', error);
    return {
      success: false,
      error: {
        message: 'Kunne ikke opprette konto. Vennligst prøv igjen.',
        field: 'form'
      }
    };
  }
};

export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    await pb.collection('users').authWithPassword(email, password);
    return { success: true };
  } catch (error) {
    console.error('SignIn Error:', error);
    return {
      success: false,
      error: {
        message: 'Ugyldig e-post eller passord',
        field: 'form'
      }
    };
  }
};

export const resetPassword = async (email: string): Promise<AuthResponse> => {
  try {
    await pb.collection('users').requestPasswordReset(email);
    return { success: true };
  } catch (error) {
    console.error('Password Reset Error:', error);
    return {
      success: false,
      error: {
        message: 'Kunne ikke sende tilbakestillingslenke. Vennligst prøv igjen.',
        field: 'email'
      }
    };
  }
};

export const signOut = () => {
  pb.authStore.clear();
};
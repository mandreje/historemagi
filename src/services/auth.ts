import { pb } from './pocketbase';

export interface AuthResponse {
  success: boolean;
  user?: any;
  error?: string;
}

export async function signUp(email: string, password: string): Promise<AuthResponse> {
  try {
    const data = {
      email,
      password,
      passwordConfirm: password,
      emailVisibility: true,
    };

    const record = await pb.collection('users').create(data);
    
    if (record) {
      // Auto-login after successful registration
      const authData = await pb.collection('users').authWithPassword(email, password);
      return { 
        success: true, 
        user: authData.record 
      };
    }
    
    return { 
      success: false, 
      error: 'Kunne ikke opprette bruker' 
    };
  } catch (error: any) {
    console.error('SignUp Error:', error);
    
    if (error.status === 400) {
      if (error.response?.data?.email?.code === 'validation_invalid_email') {
        return {
          success: false,
          error: 'Ugyldig e-postadresse'
        };
      }
      if (error.response?.data?.email?.code === 'validation_not_unique') {
        return {
          success: false,
          error: 'E-postadressen er allerede i bruk'
        };
      }
      if (error.response?.data?.password) {
        return {
          success: false,
          error: 'Passordet må være minst 8 tegn'
        };
      }
    }
    
    return {
      success: false,
      error: 'En feil oppstod under registrering'
    };
  }
}

export async function signIn(email: string, password: string): Promise<AuthResponse> {
  try {
    const authData = await pb.collection('users').authWithPassword(email, password);
    
    return {
      success: true,
      user: authData.record
    };
  } catch (error: any) {
    return {
      success: false,
      error: 'Ugyldig e-post eller passord'
    };
  }
}

export async function requestPasswordReset(email: string): Promise<AuthResponse> {
  try {
    await pb.collection('users').requestPasswordReset(email);
    return {
      success: true
    };
  } catch (error: any) {
    console.error('Password Reset Request Error:', error);
    return {
      success: false,
      error: 'Kunne ikke sende tilbakestillingslenke. Sjekk at e-postadressen er riktig.'
    };
  }
}

export async function confirmPasswordReset(
  resetToken: string,
  password: string,
  passwordConfirm: string
): Promise<AuthResponse> {
  try {
    await pb.collection('users').confirmPasswordReset(
      resetToken,
      password,
      passwordConfirm
    );
    return {
      success: true
    };
  } catch (error: any) {
    console.error('Password Reset Confirmation Error:', error);
    return {
      success: false,
      error: 'Kunne ikke tilbakestille passordet. Lenken kan være utløpt eller ugyldig.'
    };
  }
}

export function signOut() {
  pb.authStore.clear();
}

export function isAuthenticated(): boolean {
  return pb.authStore.isValid;
}

export function getCurrentUser() {
  return pb.authStore.model;
}
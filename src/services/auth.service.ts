import { pb } from '../lib/pocketbase';
import api from './api';

export interface AuthResponse {
  success: boolean;
  user?: any;
  error?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  passwordConfirm: string;
}

class AuthService {
  async login({ email, password }: LoginCredentials): Promise<AuthResponse> {
    try {
      const authData = await pb.collection('users').authWithPassword(email, password);
      return {
        success: true,
        user: authData.record
      };
    } catch (error: any) {
      console.error('Login error:', error);
      return {
        success: false,
        error: 'Invalid email or password'
      };
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const record = await pb.collection('users').create({
        ...data,
        emailVisibility: true,
      });

      // Auto login after successful registration
      if (record) {
        return this.login({ email: data.email, password: data.password });
      }

      return {
        success: false,
        error: 'Registration failed'
      };
    } catch (error: any) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed'
      };
    }
  }

  async logout() {
    pb.authStore.clear();
  }

  async resetPassword(email: string): Promise<AuthResponse> {
    try {
      await pb.collection('users').requestPasswordReset(email);
      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        error: 'Password reset request failed'
      };
    }
  }

  async confirmPasswordReset(
    token: string,
    password: string,
    passwordConfirm: string
  ): Promise<AuthResponse> {
    try {
      await pb.collection('users').confirmPasswordReset(
        token,
        password,
        passwordConfirm
      );
      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        error: 'Password reset confirmation failed'
      };
    }
  }

  async updateProfile(userId: string, data: any): Promise<AuthResponse> {
    try {
      const record = await pb.collection('users').update(userId, data);
      return {
        success: true,
        user: record
      };
    } catch (error) {
      return {
        success: false,
        error: 'Profile update failed'
      };
    }
  }

  isAuthenticated(): boolean {
    return pb.authStore.isValid;
  }

  getCurrentUser() {
    return pb.authStore.model;
  }

  async refreshToken(): Promise<boolean> {
    try {
      const token = pb.authStore.token;
      if (!token) return false;

      await pb.collection('users').authRefresh();
      return true;
    } catch {
      return false;
    }
  }
}

export const authService = new AuthService();
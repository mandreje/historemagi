import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from '../components/TextInput';
import { Button } from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import { signUp } from '../services/auth';
import { BookOpen } from 'lucide-react';

export function SignUpScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleSignUp = async () => {
    if (!email || !password) {
      setError('Vennligst fyll ut alle feltene');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await signUp(email, password);
      if (!response.success) {
        setError(response.error || 'En feil oppstod under registrering');
      }
    } catch (err) {
      setError('En uventet feil oppstod. Vennligst prøv igjen.');
    } finally {
      setLoading(false);
    }
  };

  const navigateToForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const navigateToSignIn = () => {
    navigation.navigate('SignIn');
  };

  if (isAuthenticated) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Du er nå logget inn!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BookOpen color="#4F46E5" size={40} />
        <Text style={styles.title}>Historie Magi</Text>
        <Text style={styles.subtitle}>Din magiske historieforteller</Text>
      </View>

      <View style={styles.formContainer}>
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TextInput
          label="E-postadresse"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />

        <TextInput
          label="Passord"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="new-password"
        />

        <TouchableOpacity onPress={navigateToForgotPassword}>
          <Text style={styles.forgotPassword}>Glemt passord?</Text>
        </TouchableOpacity>

        <Button
          title={loading ? 'Registrerer...' : 'Registrer deg'}
          onPress={handleSignUp}
          loading={loading}
        />

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>eller</Text>
          <View style={styles.line} />
        </View>

        <TouchableOpacity onPress={navigateToSignIn}>
          <Text style={styles.loginText}>
            Har du allerede en konto?{' '}
            <Text style={styles.loginLink}>Logg inn her</Text>
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Ved å registrere deg godtar du våre{' '}
          <Text style={styles.footerLink}>vilkår og betingelser</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 8,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  error: {
    color: '#EF4444',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  forgotPassword: {
    color: '#4F46E5',
    fontSize: 14,
    textAlign: 'right',
    marginTop: 8,
    marginBottom: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    color: '#6B7280',
    paddingHorizontal: 16,
  },
  loginText: {
    textAlign: 'center',
    color: '#374151',
  },
  loginLink: {
    color: '#4F46E5',
    fontWeight: '600',
  },
  footer: {
    padding: 16,
  },
  footerText: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 12,
  },
  footerLink: {
    color: '#4F46E5',
  },
});
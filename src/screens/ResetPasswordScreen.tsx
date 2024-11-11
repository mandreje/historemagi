import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from '../components/TextInput';
import { Button } from '../components/Button';
import { confirmPasswordReset } from '../services/auth';
import { BookOpen } from 'lucide-react';

export function ResetPasswordScreen({ route, navigation }: any) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const resetToken = route.params?.token;

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      setError('Vennligst fyll ut alle feltene');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passordene må være like');
      return;
    }

    if (password.length < 8) {
      setError('Passordet må være minst 8 tegn');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await confirmPasswordReset(resetToken, password, confirmPassword);
      if (response.success) {
        setSuccess(true);
      } else {
        setError(response.error || 'Kunne ikke tilbakestille passordet');
      }
    } catch (err) {
      setError('En uventet feil oppstod. Vennligst prøv igjen.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <BookOpen color="#4F46E5" size={40} />
          <Text style={styles.title}>Passord oppdatert!</Text>
          <Text style={styles.subtitle}>
            Du kan nå logge inn med ditt nye passord
          </Text>
        </View>
        <View style={styles.formContainer}>
          <Button
            title="Gå til innlogging"
            onPress={() => navigation.navigate('SignIn')}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BookOpen color="#4F46E5" size={40} />
        <Text style={styles.title}>Tilbakestill passord</Text>
        <Text style={styles.subtitle}>
          Vennligst velg et nytt passord
        </Text>
      </View>

      <View style={styles.formContainer}>
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TextInput
          label="Nytt passord"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="new-password"
        />

        <TextInput
          label="Bekreft nytt passord"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          autoComplete="new-password"
        />

        <Button
          title={loading ? 'Oppdaterer...' : 'Oppdater passord'}
          onPress={handleResetPassword}
          loading={loading}
        />
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
    textAlign: 'center',
    paddingHorizontal: 32,
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
});
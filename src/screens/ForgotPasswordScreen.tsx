import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthHeader } from '../components/AuthHeader';
import { TextInput } from '../components/TextInput';
import { Button } from '../components/Button';
import { requestPasswordReset } from '../services/auth';

export function ForgotPasswordScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      setError('Vennligst skriv inn e-postadressen din');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await requestPasswordReset(email);
      if (response.success) {
        setSuccess(true);
      } else {
        setError(response.error || 'Kunne ikke sende tilbakestillingslenke');
      }
    } catch (err) {
      setError('En uventet feil oppstod. Vennligst prøv igjen.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <AuthHeader />

      <View style={styles.formContainer}>
        {success ? (
          <View style={styles.successContainer}>
            <Text style={styles.successTitle}>Sjekk e-posten din</Text>
            <Text style={styles.successText}>
              Vi har sendt deg en lenke for å tilbakestille passordet ditt.
            </Text>
            <Button
              title="Tilbake til innlogging"
              onPress={() => navigation.navigate('SignIn')}
              variant="secondary"
            />
          </View>
        ) : (
          <>
            <Text style={styles.title}>Glemt passord?</Text>
            <Text style={styles.description}>
              Skriv inn e-postadressen din, så sender vi deg en lenke for å tilbakestille passordet.
            </Text>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <TextInput
              label="E-postadresse"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />

            <Button
              title={loading ? 'Sender...' : 'Send tilbakestillingslenke'}
              onPress={handleSubmit}
              loading={loading}
            />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  description: {
    color: '#6B7280',
    marginBottom: 24,
  },
  error: {
    color: '#EF4444',
    fontSize: 14,
    marginBottom: 16,
  },
  successContainer: {
    alignItems: 'center',
    padding: 16,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 8,
  },
  successText: {
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
});
```tsx
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native';
import { router } from 'expo-router';
import { Mail, User } from 'lucide-react-native';
import { useAuthStore } from '@/stores/auth-store';
import { useSalesStore } from '@/stores/sales-store';
import Colors from '@/constants/colors';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  
  const { login } = useAuthStore();
  const { addSalesPerson } = useSalesStore();

  const handleLogin = async () => {
    if (!email.includes('@')) {
      setError('Ange en giltig e-postadress');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      // För nya användare, registrera dem först
      if (isNewUser) {
        if (!name) {
          setError('Ange ditt namn');
          setLoading(false);
          return;
        }
        
        // Lägg till säljare i systemet
        addSalesPerson({
          name,
          monthlyGoal: 20, // 20 bilar per månad
          yearlyGoal: 240, // 20 * 12 = 240 bilar per år
        });
      }
      
      // Logga in användaren
      await login(email, 'demo-password', name);
      router.replace('/(tabs)');
    } catch (err) {
      setError('Kunde inte logga in. Försök igen.');
    } finally {
      setLoading(false);
    }
  };

  // Demo login för test
  const loginAsDemo = async () => {
    try {
      setLoading(true);
      await login('demo@segeltorp.se', 'demo-password', 'Demo Säljare');
      router.replace('/(tabs)');
    } catch (err) {
      setError('Kunde inte logga in. Försök igen.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Team Segeltorp
        <Text style={styles.subtitle}>Välkommen till säljportalen!
      

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Mail size={20} color={Colors.light.text} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Din jobbmail"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setError('');
            }}
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
          />
        

        {isNewUser && (
          <View style={styles.inputContainer}>
            <User size={20} color={Colors.light.text} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Ditt namn"
              value={name}
              onChangeText={(text) => {
                setName(text);
                setError('');
              }}
              autoCapitalize="words"
            />
          
        )}

        {error ? <Text style={styles.errorText}>{error} : null}

        <Pressable 
          style={[styles.button, ((!email || (isNewUser && !name)) || loading) && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={(!email || (isNewUser && !name)) || loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Loggar in...' : isNewUser ? 'Registrera & Logga in' : 'Logga in'}
          
        

        <Pressable 
          style={styles.toggleButton}
          onPress={() => setIsNewUser(!isNewUser)}
        >
          <Text style={styles.toggleButtonText}>
            {isNewUser ? 'Har du redan ett konto? Logga in' : 'Ny användare? Registrera dig'}
          
        

        <Pressable 
          style={styles.demoButton}
          onPress={loginAsDemo}
        >
          <Text style={styles.demoButtonText}>Testa som demo-användare
        
      
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 4,
  },
  inputIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: Colors.light.tint,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  toggleButton: {
    padding: 8,
    alignItems: 'center',
  },
  toggleButtonText: {
    color: Colors.light.tint,
    fontSize: 14,
  },
  demoButton: {
    padding: 16,
    alignItems: 'center',
  },
  demoButtonText: {
    color: Colors.light.tint,
    fontSize: 16,
  },
  errorText: {
    color: Colors.light.error,
    textAlign: 'center',
  },
});
```

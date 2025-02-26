```tsx
import { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import Colors from '@/constants/colors';

const steps = [
  {
    title: 'Välkommen till Team Segeltorp',
    description: 'Här kan du enkelt registrera försäljningar, se statistik och kommunicera med ditt team.',
  },
  {
    title: 'Registrera försäljningar',
    description: 'Tryck på plus-knappen för att registrera en ny försäljning. Välj mellan ny eller begagnad bil.',
  },
  {
    title: 'Se din statistik',
    description: 'På statistik-sidan kan du se dina försäljningssiffror och jämföra med teamet.',
  },
  {
    title: 'Håll kontakten',
    description: 'Använd team-chatten för att kommunicera med dina kollegor och dela framgångar.',
  },
];

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.replace('/(tabs)');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{steps[currentStep].title}
        <Text style={styles.description}>{steps[currentStep].description}
      

      <View style={styles.footer}>
        <View style={styles.dots}>
          {steps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentStep === index && styles.dotActive
              ]}
            />
          ))}
        

        <Pressable style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {currentStep < steps.length - 1 ? 'Nästa' : 'Kom igång'}
          
        
      
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    padding: 32,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.light.border,
  },
  dotActive: {
    backgroundColor: Colors.light.tint,
  },
  button: {
    backgroundColor: Colors.light.tint,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
```

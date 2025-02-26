```tsx
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Send } from 'lucide-react-native';
import { useChatStore } from '@/stores/chat-store';
import { useSalesStore } from '@/stores/sales-store';
import Colors from '@/constants/colors';

export default function ChatScreen() {
  const [message, setMessage] = useState('');
  const { messages, addMessage } = useChatStore();
  const { salesPeople } = useSalesStore();

  const handleSend = () => {
    if (message.trim()) {
      addMessage('currentUserId', message.trim());
      setMessage('');
    }
  };

  const getSenderName = (senderId: string) => {
    const sender = salesPeople.find(person => person.id === senderId);
    return sender?.name || 'Unknown';
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ScrollView style={styles.messageList}>
        {messages.map(msg => (
          <View 
            key={msg.id} 
            style={[
              styles.messageContainer,
              msg.senderId === 'currentUserId' ? styles.sentMessage : styles.receivedMessage
            ]}
          >
            <Text style={styles.senderName}>{getSenderName(msg.senderId)}
            <Text style={styles.messageText}>{msg.text}
            <Text style={styles.timestamp}>
              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            
          
        ))}
      

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          multiline
        />
        <Pressable style={styles.sendButton} onPress={handleSend}>
          <Send size={24} color={Colors.light.tint} />
        
      
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messageList: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    maxWidth: '80%',
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.light.tint,
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.light.card,
  },
  senderName: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 16,
    color: Colors.light.text,
  },
  timestamp: {
    fontSize: 10,
    color: '#666',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    backgroundColor: Colors.light.card,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.light.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

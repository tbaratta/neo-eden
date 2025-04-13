import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { sendMessage } from '../config/api';

export default function ChatBox() {
  const [inputMessage, setInputMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!inputMessage.trim()) return;

    const messageToSend = inputMessage.trim();
    setInputMessage(''); // Clear input immediately when sending

    try {
      setIsLoading(true);
      // Add user message to chat
      const userMessage = {
        text: messageToSend,
        isUser: true,
      };
      setChatHistory(prev => [...prev, userMessage]);
      
      // Add loading message
      const loadingMessage = {
        text: "Thinking...",
        isUser: false,
        isLoading: true,
      };
      setChatHistory(prev => [...prev, loadingMessage]);
      
      // Send to backend and get response
      const response = await sendMessage(messageToSend);
      
      // Remove loading message and add AI response
      setChatHistory(prev => 
        prev.filter(msg => !msg.isLoading).concat({
          text: response.reply,
          isUser: false,
        })
      );
    } catch (error) {
      // Remove loading message and add error message
      setChatHistory(prev => 
        prev.filter(msg => !msg.isLoading).concat({
          text: error.message || 'Sorry, I encountered an error. Please try again.',
          isUser: false,
          isError: true,
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.backArrow}>←</Text>
        <Text style={styles.title}>BOB THE GUIDE</Text>
        <Text style={styles.icon}>📝</Text>
      </View>

      {/* Chat Area */}
      <ScrollView 
        style={styles.chatArea} 
        contentContainerStyle={styles.chatContent}
      >
        {chatHistory.map((message, index) => (
          <View 
            key={index} 
            style={[
              styles.messageBubble,
              message.isUser ? styles.userMessage : styles.aiMessage,
              message.isError && styles.errorMessage,
              message.isLoading && styles.loadingMessage
            ]}
          >
            {message.isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#9C5DFF" />
                <Text style={styles.loadingText}>{message.text}</Text>
              </View>
            ) : (
              <Text style={[
                styles.messageText,
                message.isUser && styles.userMessageText,
                message.isError && styles.errorText
              ]}>
                {message.text}
              </Text>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputArea}>
        <TextInput
          placeholder="What would you want to ask?"
          placeholderTextColor="#A5A5A5"
          style={styles.input}
          value={inputMessage}
          onChangeText={setInputMessage}
          editable={!isLoading}
          multiline
        />
        <TouchableOpacity 
          onPress={handleSend}
          disabled={isLoading || !inputMessage.trim()}
          style={styles.sendButton}
        >
          <Text style={[
            styles.sendIcon,
            (isLoading || !inputMessage.trim()) && styles.sendIconDisabled
          ]}>➤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  backArrow: {
    color: '#fff',
    fontSize: 24,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  icon: {
    color: '#fff',
    fontSize: 22,
  },
  chatArea: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#9C5DFF',
    marginBottom: 20,
  },
  chatContent: {
    padding: 15,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 20,
    marginVertical: 5,
  },
  userMessage: {
    backgroundColor: '#9C5DFF',
    alignSelf: 'flex-end',
  },
  aiMessage: {
    backgroundColor: '#F0F0F0',
    alignSelf: 'flex-start',
  },
  errorMessage: {
    backgroundColor: '#FFE5E5',
  },
  loadingMessage: {
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  loadingText: {
    color: '#666',
    fontSize: 16,
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  userMessageText: {
    color: '#fff',
  },
  errorText: {
    color: '#FF0000',
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 20,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  sendIcon: {
    fontSize: 20,
    color: '#9C5DFF',
  },
  sendIconDisabled: {
    opacity: 0.5,
  },
  sendButton: {
    padding: 8,
  },
});

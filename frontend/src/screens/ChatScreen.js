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

import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native';

export default function ChatBox({ route, navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const [inputMessage, setInputMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { image, prompt } = route.params || {}; // Access image from route params

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

      // API call to Gemini API
      const response = await sendMessageToGemini(messageToSend); // Call Gemini API

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
          text: 'Sorry, I encountered an error. Please try again.',
          isUser: false,
          isError: true,
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessageToGemini = async (message) => {
    try {
      const response = await fetch('http://10.245.6.249:5000/api/gemini/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: message,
        }),
      });

      // Check if the response is successful (status code 200-299)
      if (!response.ok) {
        throw new Error(`Failed to fetch from Gemini API, status: ${response.status}`);
      }

      const data = await response.json();

      // Check if data.reply exists, else return a default message
      return { reply: data.reply || 'Sorry, no response from AI' };

    } catch (error) {
      console.error('Error calling Gemini API:', error);
      // Display a user-friendly error message
      throw new Error('Error with Gemini API: ' + error.message);
    }
  };


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.backArrow, { color: '#fff', fontSize: 18 }]}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>BOB THE GUIDE</Text>
      </View>

      {/* Chat Area */}
      <ScrollView style={styles.chatArea} contentContainerStyle={styles.chatContent}>
        {chatHistory.map((message, index) => (
          <View
            key={index}
            style={[styles.messageBubble, message.isUser ? styles.userMessage : styles.aiMessage]}>
            {message.isUser ? (
              <Text style={styles.messageText}>{message.text}</Text>
            ) : (
              <>
                {message.isLoading && (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color="#9C5DFF" />
                    <Text style={styles.loadingText}>{message.text}</Text>
                  </View>
                )}
                {!message.isLoading && message.text && <Text style={styles.messageText}>{message.text}</Text>}
                {image && !message.isLoading && (
                  <Image source={{ uri: image.uri }} style={styles.imagePreview} />
                )}
              </>
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
          returnKeyType="send"
          onSubmitEditing={() => {
            if (inputMessage.trim()) {
              handleSend();
            }
          }}
        />
        <TouchableOpacity
          onPress={handleSend}
          disabled={isLoading || !inputMessage.trim()}
          style={styles.sendButton}>
          <Text style={styles.sendIcon}>➤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#49441f',
    paddingTop: 60,
    paddingHorizontal: 20,
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
  chatArea: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#9C5DFF',
    marginBottom: 5,
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
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 5,
    height: 30,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  sendButton: {
    padding: 8,
  },
  sendIcon: {
    fontSize: 20,
    color: '#9C5DFF',
  },
});


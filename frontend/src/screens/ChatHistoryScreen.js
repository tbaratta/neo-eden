
import React, { useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { api } from '../config/api';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function ChatHistoryScreen({ navigation }) {
  const [chatHistory, setChatHistory] = useState([]);
  const fetchChatHistory = async () => {
    try {
      const token = await authService.getToken();
      const response = await fetch(`${api.baseUrl}/api/chat/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setChatHistory(data);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  useEffect(() => {
    fetchChatHistory();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Chat History</Text>
      </View>

      {/* Chat History List */}
      <ScrollView style={styles.historyList}>
        {chatHistory.length > 0 ? (
          chatHistory.map((chat, index) => (
            <Text key={index}>{chat.message}</Text>
          ))
        ) : (
          <Text>No chat history available.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#49441f',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingTop: 70,
    paddingBottom: 20,
    paddingHorizontal: 20,
    marginTop: 0,
  },
  backButton: {
    color: '#fff',
    fontSize: 16,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  historyList: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    paddingTop: 20,
  },
});
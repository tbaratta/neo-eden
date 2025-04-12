import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function ChatBox() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.backArrow}>←</Text>
        <Text style={styles.title}>BOB THE GUIDE</Text>
        <Text style={styles.icon}>📝</Text>
      </View>

      {/* Chat Area */}
      <View style={styles.chatArea}></View>

      {/* Input Area */}
      <View style={styles.inputArea}>
        <TextInput
          placeholder="What would you want to ask?"
          placeholderTextColor="#A5A5A5"
          style={styles.input}
        />
        <TouchableOpacity>
          <Text style={styles.sendIcon}>➤</Text>
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
});

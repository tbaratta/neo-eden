import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import ChatBox from './src/screens/ChatScreen';
import NavBar from './src/navigation/TabNavigator';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ChatBox />
      <NavBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A4522',
  },
});

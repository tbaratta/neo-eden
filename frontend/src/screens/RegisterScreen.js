import React, { useState } from 'react';
import {
     View,
     Text,
     TextInput,
     TouchableOpacity,
     StyleSheet,
} from 'react-native';

export default function RegisterScreen({ navigation }) {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');

     const handleRegister = () => {
          if (email && password) {
               console.log('Registered:', email);
               navigation.replace('Tabs'); // Later: validate & route securely
          } else {
               alert('Please fill in all fields');
          }
     };

     return (
          <View style={styles.container}>
               <Text style={styles.heading}>Create an Account</Text>

               <TextInput
                    placeholder="Email"
                    placeholderTextColor="#aaa"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
               />

               <TextInput
                    placeholder="Password"
                    placeholderTextColor="#aaa"
                    style={styles.input}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
               />

               <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Register</Text>
               </TouchableOpacity>

               <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backToLogin}>← Back to Login</Text>
               </TouchableOpacity>
          </View>
     );
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: '#1a1a1a',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 24,
     },
     heading: {
          fontSize: 26,
          fontWeight: 'bold',
          color: '#fff',
          marginBottom: 32,
     },
     input: {
          width: '100%',
          backgroundColor: '#2b2b2b',
          color: '#fff',
          borderRadius: 8,
          padding: 12,
          marginBottom: 16,
          borderColor: '#49441f',
          borderWidth: 1,
     },
     button: {
          backgroundColor: '#49441f',
          borderRadius: 8,
          padding: 14,
          width: '100%',
          alignItems: 'center',
          marginTop: 8,
     },
     buttonText: {
          color: '#fff',
          fontWeight: '600',
     },
     backToLogin: {
          marginTop: 20,
          color: '#aaa',
          textDecorationLine: 'underline',
     },
});
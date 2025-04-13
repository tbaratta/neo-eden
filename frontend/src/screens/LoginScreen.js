import React, { useState } from 'react';
import {
     View,
     Text,
     TextInput,
     TouchableOpacity,
     StyleSheet,
     Image,
     Alert,
     ActivityIndicator,
} from 'react-native';
import { authAPI } from '../config/api';

export default function LoginScreen({ navigation }) {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [loading, setLoading] = useState(false);

     const handleLogin = async () => {
          if (!email || !password) {
               Alert.alert('Error', 'Please enter both email and password');
               return;
          }

          try {
               setLoading(true);
               await authAPI.login(email, password);
               navigation.replace('Tabs');
               
          } catch (error) {
               Alert.alert('Error', error.toString());
          } finally {
               setLoading(false);
          }
     };

     return (
          <View style={styles.container}>
               <Image
                    source={require('../../assets/images/logo-white2.png')}
                    style={styles.logo}
                    resizeMode="contain"
               />
               <TextInput
                    placeholder="Email"
                    placeholderTextColor="#aaa"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
               />

               <TextInput
                    placeholder="Password"
                    placeholderTextColor="#aaa"
                    style={styles.input}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
               />

               <TouchableOpacity
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={handleLogin}
                    disabled={loading}
               >
                    {loading ? (
                         <ActivityIndicator color="#fff" />
                    ) : (
                         <Text style={styles.buttonText}>Continue</Text>
                    )}
               </TouchableOpacity>

               <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.signUp}>
                         Don't have an account? <Text style={styles.link}>Sign up</Text>
                    </Text>
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
          paddingHorizontal: 32, // was 24
          paddingVertical: 40,   // add top/bottom breathing room too
     },
     logo: {
          width: '100%',
          height: 150,
          minHeight: 150,
          aspectRatio: 5.5,
          marginBottom: 40,
     },
     input: {
          width: '100%',
          backgroundColor: '#2b2b2b',
          color: '#fff',
          borderRadius: 8,
          padding: 12,
          marginBottom: 12,
          borderColor: '#49441f',
          borderWidth: 1,
     },
     button: {
          backgroundColor: '#49441f',
          borderRadius: 8,
          padding: 12,
          width: '100%',
          alignItems: 'center',
          marginTop: 8,
     },
     buttonDisabled: {
          opacity: 0.7,
     },
     buttonText: {
          color: '#fff',
          fontWeight: 'bold',
     },
     signUp: {
          color: '#aaa',
          marginTop: 20,
          fontSize: 14,
     },
     link: {
          color: '#fff',
          textDecorationLine: 'underline',
     },
});
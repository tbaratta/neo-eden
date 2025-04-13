import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import NewsScreen from '../screens/NewsScreen';
// import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
     return (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
               <Stack.Screen name="News" component={NewsScreen} />
               <Stack.Screen name="Login" component={LoginScreen} />
               <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
     );
}
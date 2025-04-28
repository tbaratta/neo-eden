import React, { useState, useEffect } from 'react';
import {
     View,
     Text,
     TouchableOpacity,
     TextInput,
     Image,
     ScrollView,
     KeyboardAvoidingView,
     Platform,
     Keyboard,
     TouchableWithoutFeedback,
     ActivityIndicator,
     Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function CameraScreen({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
     const [image, setImage] = useState(null);
     const [prompt, setPrompt] = useState('');
     const [loading, setLoading] = useState(false);
     const [aiResponse, setAIResponse] = useState('');

     const openCamera = async () => {
          const permission = await ImagePicker.requestCameraPermissionsAsync();
          if (!permission.granted) {
               alert('Camera access is required!');
               return;
          }

          const result = await ImagePicker.launchCameraAsync({
               base64: true,
               quality: 0.7,
          });

          if (!result.canceled) {
               setImage(result.assets[0]);
          }
     };

     const pickFromGallery = async () => {
          const result = await ImagePicker.launchImageLibraryAsync({
               base64: true,
               quality: 0.7,
          });

          if (!result.canceled) {
               setImage(result.assets[0]);
          }
     };

     const handleSubmit = async () => {
          if (!image || !prompt) {
               Alert.alert('Missing Info', 'Please take/select a photo and enter a prompt.');
               return;
          }

          // Reset AI response and set loading state before making the request
          setAIResponse('');
          setLoading(true);

          console.log("Sending base64 length:", image.base64?.length);
          console.log("Prompt:", prompt);

          try {
               // Make API request
               const response = await fetch('http://10.0.0.252:3000/api/gemini/analyze', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                         imageBase64: image.base64,
                         prompt: 
                         `You are a botanist survival chatbot that analyzes plant photos and helps with anything related to gardening or survival. Identify plants from the image and provide useful, accurate, and brief tips in bullet point format on farming, foraging, or water sourcing. Stay focused only on survival and plant-related topics; avoid off-topic responses. Format responses clearly with spacing and minimal length, and only ask questions when needed for accuracy.
                         ${prompt}`,
                    }),
               });

               const data = await response.json();
               console.log("API response:", data);

               if (response.ok) {
                    setAIResponse(data.reply);
               } else {
                    Alert.alert('Error', data.error || 'AI analysis failed.');
               }
          } catch (error) {
               Alert.alert('Error', 'An error occurred while sending the request.');
          } finally {
               // Ensure loading state is set to false once request is complete
               setLoading(false);
          }
     };


     // 👇 THIS is your return (inside the function!)
     return (
          <KeyboardAvoidingView
               behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
               style={{ flex: 1 }}
          >
               <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView
                         contentContainerStyle={{
                              flexGrow: 1,
                              backgroundColor: '#1a1a1a',
                              padding: 24,
                              alignItems: 'center',
                              justifyContent: 'flex-start',
                         }}
                         keyboardShouldPersistTaps="handled"
                    >
                         <Image
                              source={require('../../assets/images/logo-white.png')}
                              resizeMode="contain"
                              style={{ width: '80%', height: 150, marginBottom: 32 }}
                         />

                         {!image ? (
                              <>
                                   <TouchableOpacity
                                        onPress={openCamera}
                                        style={{
                                             backgroundColor: '#49441f',
                                             paddingVertical: 16,
                                             paddingHorizontal: 24,
                                             borderRadius: 12,
                                             alignItems: 'center',
                                             width: '100%',
                                             marginBottom: 12,
                                        }}
                                   >
                                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
                                             📸 Take a Photo
                                        </Text>
                                   </TouchableOpacity>

                                   <TouchableOpacity
                                        onPress={pickFromGallery}
                                        style={{
                                             borderColor: '#49441f',
                                             borderWidth: 1.5,
                                             paddingVertical: 16,
                                             borderRadius: 12,
                                             alignItems: 'center',
                                             width: '100%',
                                             marginBottom: 10,
                                        }}
                                   >
                                        <Text style={{ color: '#aaa', fontSize: 15 }}>Choose from Gallery</Text>
                                   </TouchableOpacity>
                              </>
                         ) : (
                              <>
                                   <Image
                                        source={{ uri: image.uri }}
                                        style={{
                                             width: '100%',
                                             height: 200,
                                             borderRadius: 12,
                                             marginBottom: 24,
                                        }}
                                   />

                                   <TextInput
                                        placeholder="Ask the AI about this image..."
                                        placeholderTextColor="#aaa"
                                        value={prompt}
                                        onChangeText={setPrompt}
                                        multiline
                                        style={{
                                             backgroundColor: '#2b2b2b',
                                             color: '#fff',
                                             padding: 16,
                                             borderRadius: 10,
                                             borderWidth: 1,
                                             borderColor: '#49441f',
                                             marginBottom: 16,
                                             minHeight: 100,
                                             width: '100%',
                                             textAlignVertical: 'top',
                                        }}
                                   />

                                   <TouchableOpacity
                                        onPress={handleSubmit}
                                        disabled={loading}
                                        style={{
                                             backgroundColor: '#49441f',
                                             paddingVertical: 16,
                                             borderRadius: 12,
                                             alignItems: 'center',
                                             width: '100%',
                                             marginBottom: 12,
                                             opacity: loading ? 0.6 : 1,
                                        }}
                                   >
                                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
                                             {loading ? 'Sending to AI...' : 'Send to AI'}
                                        </Text>
                                   </TouchableOpacity>

                                   <TouchableOpacity onPress={() => setImage(null)}>
                                        <Text
                                             style={{
                                                  color: '#bbb',
                                                  textAlign: 'center',
                                                  textDecorationLine: 'underline',
                                             }}
                                        >
                                             ↺ Retake or Choose Another
                                        </Text>
                                   </TouchableOpacity>
                              </>
                         )}

                         {loading && <ActivityIndicator size="large" color="#fff" style={{ marginTop: 5 }} />}

                         {aiResponse ? (
                              <View
                                   style={{
                                        marginTop: 8,
                                        marginBottom: 20,
                                        backgroundColor: '#2b2b2b',
                                        padding: 16,
                                        borderRadius: 10,
                                        width: '100%',
                                        maxHeight: 250, // 👈 Set a height cap so it doesn't push other content
                                   }}
                              >
                                   <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, marginBottom: 4 }}>
                                        Gemini AI Response:
                                   </Text>
                                   <ScrollView>
                                        {/* ✅ Renders multiline text properly */}
                                        {aiResponse.split('\n').map((line, index) => (
                                             <Text key={index} style={{ color: '#ccc', marginBottom: 4 }}>
                                                  {line}
                                             </Text>
                                        ))}
                                   </ScrollView>
                              </View>
                         ) : (
                              <Text style={{ color: '#888', marginTop: 40 }}>(No response yet)</Text> // fallback
                         )}

                    </ScrollView>
               </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
     );
}
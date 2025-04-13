// 📸 CameraScreen.js
// This screen captures or selects an image and collects a user prompt.
// On submit, it sends { image (with .uri and .base64), prompt } to ChatScreen.
// Backend should handle processing this in ChatScreen for Gemini AI requests.
import React, { useState } from 'react';
import {
     View,
     Text,
     TouchableOpacity,
     TextInput,
     Image,
     ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function CameraScreen({ navigation }) {
     // Image = object returned from camera or gallery
     // Prompt = user-entered question to be asked alongside the image
     const [image, setImage] = useState(null);
     const [prompt, setPrompt] = useState('');

     // Launches the device's camera to take a picture
     // Sends back base64 image (needed for Gemini or backend AI)
     const openCamera = async () => {
          const permission = await ImagePicker.requestCameraPermissionsAsync();
          if (!permission.granted) {
               alert('Camera access is required!');
               return;
          }

          const result = await ImagePicker.launchCameraAsync({
               base64: true, // BASE64 string will be used in request
               quality: 0.7,
          });

          if (!result.canceled) {
               setImage(result.assets[0]); // Save image object
          }
     };

     // Opens device gallery to choose an existing image
     // Also includes base64 string for AI input
     const pickFromGallery = async () => {
          const result = await ImagePicker.launchImageLibraryAsync({
               base64: true,
               quality: 0.7,
          });

          if (!result.canceled) {
               setImage(result.assets[0]); // Save selected image
          }
     };

     // Called when user taps "Send to AI"
     // Navigates to ChatScreen and passes the image + prompt
     // This is where the backend will handle sending image & prompt to Gemini API
     const handleSubmit = () => {
          if (!image || !prompt) {
               alert('Please take or choose a photo and enter a prompt');
               return;
          }

          navigation.navigate('Chat', {
               image,   // backend: access image.uri and image.base64
               prompt,  // backend: user-entered string describing the query
          });
     };

     return (
          <ScrollView
               contentContainerStyle={{
                    flexGrow: 1,
                    backgroundColor: '#1a1a1a',
                    padding: 24,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
               }}
          >
               {/* Neo Eden logo at top */}
               <Image
                    source={require('../../assets/images/logo-white.png')}
                    resizeMode="contain"
                    style={{
                         width: '80%',
                         height: 80,
                         marginBottom: 32,
                    }}
               />

               {/* If no image selected yet, show camera/gallery buttons */}
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
                                   marginBottom: 24,
                              }}
                         >
                              <Text style={{ color: '#aaa', fontSize: 15 }}>
                                   Choose from Gallery
                              </Text>
                         </TouchableOpacity>
                    </>
               ) : (
                    <>
                         {/* Image preview */}
                         <Image
                              source={{ uri: image.uri }}
                              style={{
                                   width: '100%',
                                   height: 400,
                                   borderRadius: 12,
                                   marginBottom: 20,
                              }}
                         />

                         {/* User prompt input (for AI analysis request) */}
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

                         {/* Final submission: image + prompt sent to ChatScreen */}
                         <TouchableOpacity
                              onPress={handleSubmit}
                              style={{
                                   backgroundColor: '#49441f',
                                   paddingVertical: 16,
                                   borderRadius: 12,
                                   alignItems: 'center',
                                   width: '100%',
                                   marginBottom: 12,
                              }}
                         >
                              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
                                   Send to AI
                              </Text>
                         </TouchableOpacity>

                         {/* Option to reset and choose another image */}
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
          </ScrollView>
     );
}


import React, { useState } from 'react';
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

export default function CameraScreen() {
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

          setLoading(true);
          setAIResponse('');

          try {
               const response = await fetch('http://10.245.6.249:3000/api/gemini/analyze', {
                    method: 'POST',
                    base64: true,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                         imageBase64: image.base64,
                         prompt,
                    }),
               });

               const data = await response.json();

               if (response.ok) {
                    setAIResponse(data.result);
               } else {
                    Alert.alert('Error', data.error || 'AI analysis failed.');
               }
          } catch (err) {
               console.error(err);
               Alert.alert('Network Error', 'Could not reach backend.');
          } finally {
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
                              style={{ width: '80%', height: 80, marginBottom: 32 }}
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

                         {loading && <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />}

                         {aiResponse ? (
                              <View
                                   style={{
                                        marginTop: 24,
                                        backgroundColor: '#2b2b2b',
                                        padding: 16,
                                        borderRadius: 10,
                                   }}
                              >
                                   <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>
                                        Gemini AI Response:
                                   </Text>
                                   <Text style={{ color: '#ccc' }}>{aiResponse}</Text>
                              </View>
                         ) : null}
                    </ScrollView>
               </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
     );
}



// // 📸 CameraScreen.js
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   Image,
//   ScrollView,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';

// export default function CameraScreen() {
//   const [image, setImage] = useState(null);
//   const [prompt, setPrompt] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [aiResponse, setAIResponse] = useState('');

//   const openCamera = async () => {
//     const permission = await ImagePicker.requestCameraPermissionsAsync();
//     if (!permission.granted) {
//       alert('Camera access is required!');
//       return;
//     }

//     const result = await ImagePicker.launchCameraAsync({
//       base64: true,
//       quality: 0.7,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0]);
//     }
//   };

//   const pickFromGallery = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       base64: true,
//       quality: 0.7,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0]);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!image || !prompt) {
//       Alert.alert('Missing Info', 'Please take/select a photo and enter a prompt.');
//       return;
//     }

//     setLoading(true);
//     setAIResponse('');

//     try {
//       const response = await fetch('http://127.0.0.1:3000/api/ask', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           imageBase64: image.base64,
//           prompt,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setAIResponse(data.result);
//       } else {
//         Alert.alert('Error', data.error || 'AI analysis failed.');
//       }
//     } catch (err) {
//       console.error(err);
//       Alert.alert('Network Error', 'Could not reach backend.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ScrollView
//       contentContainerStyle={{
//         flexGrow: 1,
//         backgroundColor: '#1a1a1a',
//         padding: 24,
//         alignItems: 'center',
//         justifyContent: 'flex-start',
//       }}
//       keyboardShouldPersistTaps="handled"
//     >
//       {/* Neo Eden logo */}
//       <Image
//         source={require('../../assets/images/logo-white.png')}
//         resizeMode="contain"
//         style={{ width: '80%', height: 80, marginBottom: 32 }}
//       />

//       {!image ? (
//         <>
//           <TouchableOpacity
//             onPress={openCamera}
//             style={{
//               backgroundColor: '#49441f',
//               paddingVertical: 16,
//               paddingHorizontal: 24,
//               borderRadius: 12,
//               alignItems: 'center',
//               width: '100%',
//               marginBottom: 12,
//             }}
//           >
//             <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
//               📸 Take a Photo
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={pickFromGallery}
//             style={{
//               borderColor: '#49441f',
//               borderWidth: 1.5,
//               paddingVertical: 16,
//               borderRadius: 12,
//               alignItems: 'center',
//               width: '100%',
//               marginBottom: 24,
//             }}
//           >
//             <Text style={{ color: '#aaa', fontSize: 15 }}>Choose from Gallery</Text>
//           </TouchableOpacity>
//         </>
//       ) : (
//         <>
//           <Image
//             source={{ uri: image.uri }}
//             style={{
//               width: '100%',
//               height: 400,
//               borderRadius: 12,
//               marginBottom: 20,
//             }}
//           />

//           <TextInput
//             placeholder="Ask the AI about this image..."
//             placeholderTextColor="#aaa"
//             value={prompt}
//             onChangeText={setPrompt}
//             multiline
//             style={{
//               backgroundColor: '#2b2b2b',
//               color: '#fff',
//               padding: 16,
//               borderRadius: 10,
//               borderWidth: 1,
//               borderColor: '#49441f',
//               marginBottom: 16,
//               minHeight: 100,
//               width: '100%',
//               textAlignVertical: 'top',
//             }}
//           />

//           <TouchableOpacity
//             onPress={handleSubmit}
//             disabled={loading}
//             style={{
//               backgroundColor: '#49441f',
//               paddingVertical: 16,
//               borderRadius: 12,
//               alignItems: 'center',
//               width: '100%',
//               marginBottom: 12,
//               opacity: loading ? 0.6 : 1,
//             }}
//           >
//             <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
//               {loading ? 'Sending to AI...' : 'Send to AI'}
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => setImage(null)}>
//             <Text
//               style={{
//                 color: '#bbb',
//                 textAlign: 'center',
//                 textDecorationLine: 'underline',
//               }}
//             >
//               ↺ Retake or Choose Another
//             </Text>
//           </TouchableOpacity>
//         </>
//       )}

//       {loading && <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />}

//       {aiResponse ? (
//         <View style={{ marginTop: 24, backgroundColor: '#2b2b2b', padding: 16, borderRadius: 10 }}>
//           <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>
//             Gemini AI Response:
//           </Text>
//           <Text style={{ color: '#ccc' }}>{aiResponse}</Text>
//         </View>
//       ) : null}
//     </ScrollView>
//   );
// }
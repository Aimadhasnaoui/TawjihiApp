// import { Image } from "expo-image";
// import { useState } from "react";
// import {
//   KeyboardAvoidingView,
//   Platform,
//   Pressable,
//   ScrollView,
//   Text,
//   TextInput,
//   TouchableWithoutFeedback,
//   View
// } from "react-native";
// import Logo from '../assets/images/logo.png';
// import { useAuthStore } from './Store/authStore';

// export default function Login() {
//   const {login} = useAuthStore()

//   const [name, setName] = useState("");
//   const [cin, setCin] = useState("");
//   const [errors, setErrors] = useState({ name: "", cin: "" });
//   const [focusedInput, setFocusedInput] = useState(null);

//   const validateName = (value) => {
//     if (!value.trim()) {
//       return "Le nom est requis";
//     }
//     if (value.trim().length < 2) {
//       return "Le nom doit contenir au moins 2 caractères";
//     }
//     if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(value)) {
//       return "Le nom ne doit contenir que des lettres";
//     }
//     return "";
//   };

//   const validateCin = (value) => {
//     if (!value.trim()) {
//       return "Le CIN est requis";
//     }
//     // Moroccan CIN format: 1-2 letters followed by 6-7 digits
//     if (!/^[A-Z]{1,2}\d{6,7}$/i.test(value.trim())) {
//       return "Format CIN invalide (ex: AB123456)";
//     }
//     return "";
//   };

//   const handleSubmit = () => {
//     const nameError = validateName(name);
//     const cinError = validateCin(cin);

//     setErrors({ name: nameError, cin: cinError });

//     if (!nameError && !cinError) {
//       // All validation passed - send data
//       const userData = {
//         name: name.trim(),
//         cin: cin.trim().toUpperCase(),
//       };
      
//       // Here you would typically make an API call
//       console.log("Sending data:", userData);
//       login()
//     }
//   };

//   const handleNameChange = (value) => {
//     setName(value);
//     if (errors.name) {
//       setErrors({ ...errors, name: validateName(value) });
//     }
//   };

//   const handleCinChange = (value) => {
//     setCin(value);
//     if (errors.cin) {
//       setErrors({ ...errors, cin: validateCin(value) });
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       className="flex-1 bg-[#b0396b]"
//     >
//       <TouchableWithoutFeedback 
//       // onPress={Keyboard.dismiss}
//       >
//         <ScrollView
//           contentContainerStyle={{ flexGrow: 4 }}
//           keyboardShouldPersistTaps="handled"
//           showsVerticalScrollIndicator={false}
//         >
//           <View className="flex-1 items-center justify-center pt-2 pb-8">
//             <Image
//               source={Logo}
//               style={{ width: 240, height: 240 }}
//               resizeMode="contain"
//             />

//             <View className="gap-3 mb-10 mt-4 items-center justify-center">
//               <Text className="text-white text-3xl font-bold">Connexion</Text>
//               <Text className="text-white text-sm text-center px-4">
//                 Entrez vos identifiants pour accéder à votre compte
//               </Text>
//             </View>

//             <View className="w-full px-6 mb-6">
//               <Text className="text-white mb-2 font-medium">Nom</Text>
//               <TextInput
//                 placeholder="Entrez votre nom"
//                 placeholderTextColor="#9CA3AF"
//                 value={name}
//                 onChangeText={handleNameChange}
//                 onFocus={() => setFocusedInput("name")}
//                 onBlur={() => setFocusedInput(null)}
//                 className={`text-white placeholder:text-white/60 bg-white/10 p-3 rounded-xl ${
//                   focusedInput === "name" ? "border-2 border-white" : ""
//                 } ${errors.name ? "border-2 border-red-400" : ""}`}
//                 autoCapitalize="words"
//               />
//               {errors.name ? (
//                 <Text className="text-red-200 text-xs mt-1 ml-1">{errors.name}</Text>
//               ) : null}
//             </View>

//             <View className="w-full px-6 mb-10">
//               <Text className="text-white mb-2 font-medium">CIN</Text>
//               <TextInput
//                 placeholder="Ex: AB123456"
//                 placeholderTextColor="#9CA3AF"
//                 value={cin}
//                 onChangeText={handleCinChange}
//                 onFocus={() => setFocusedInput("cin")}
//                 onBlur={() => setFocusedInput(null)}
//                 className={`text-white placeholder:text-white/60 bg-white/10  p-3 rounded-xl ${
//                   focusedInput === "cin" ? "border-2 border-white" : ""
//                 } ${errors.cin ? "border-2 border-red-400" : ""}`}
//                 autoCapitalize="characters"
//                 maxLength={9}
//               />
//               {errors.cin ? (
//                 <Text className="text-red-200 text-xs mt-1 ml-1">{errors.cin}</Text>
//               ) : null}
//             </View>

//             <Pressable
//               onPress={handleSubmit}
//               className="bg-white w-[80%] px-6 py-3 rounded-xl active:opacity-80"
//             >
//               <Text className="text-center text-[#b0396b] font-semibold text-base">
//                 Se connecter
//               </Text>
//             </Pressable>
//           </View>
//         </ScrollView>
//       </TouchableWithoutFeedback>
//     </KeyboardAvoidingView>
//   );
// }
import { ResizeMode, Video } from "expo-av";
import { Image } from "expo-image";
import { useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from "react-native";
import Logo from '../assets/images/logo.png';
import { useAuthStore } from './Store/authStore';

export default function Login() {
  const {login} = useAuthStore()
  const video = useRef(null);

  const [name, setName] = useState("");
  const [cin, setCin] = useState("");
  const [errors, setErrors] = useState({ name: "", cin: "" });
  const [focusedInput, setFocusedInput] = useState(null);

  const validateName = (value) => {
    if (!value.trim()) {
      return "Le nom est requis";
    }
    if (value.trim().length < 2) {
      return "Le nom doit contenir au moins 2 caractères";
    }
    if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(value)) {
      return "Le nom ne doit contenir que des lettres";
    }
    return "";
  };

  const validateCin = (value) => {
    if (!value.trim()) {
      return "Le CIN est requis";
    }
    if (!/^[A-Z]{1,2}\d{6,7}$/i.test(value.trim())) {
      return "Format CIN invalide (ex: AB123456)";
    }
    return "";
  };

  const handleSubmit = () => {
    const nameError = validateName(name);
    const cinError = validateCin(cin);

    setErrors({ name: nameError, cin: cinError });

    if (!nameError && !cinError) {
      const userData = {
        name: name.trim(),
        cin: cin.trim().toUpperCase(),
      };
      console.log("Sending data:", userData);
      login()
    }
  };

  const handleNameChange = (value) => {
    setName(value);
    if (errors.name) {
      setErrors({ ...errors, name: validateName(value) });
    }
  };

  const handleCinChange = (value) => {
    setCin(value);
    if (errors.cin) {
      setErrors({ ...errors, cin: validateCin(value) });
    }
  };

  return (
    <View className="flex-1">
      {/* Video Background */}
      <Video
        ref={video}
        style={StyleSheet.absoluteFill}
        source={require('../assets/Back.mp4')} // Your video file
        // OR use remote video:
        // source={{ uri: 'https://example.com/video.mp4' }}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
        isMuted
        rate={1.0}
      />

      {/* Dark Overlay for better readability */}
      <View style={StyleSheet.absoluteFill} className="bg-black/40" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View className="flex-1 items-center justify-center pt-2 pb-8">
              <Image
                source={Logo}
                style={{ width: 240, height: 240 }}
                resizeMode="contain"
              />

              <View className="gap-3 mb-10 mt-4 items-center justify-center">
                <Text className="text-white text-3xl font-bold">Connexion</Text>
                <Text className="text-white text-sm text-center px-4">
                  Entrez vos identifiants pour accéder à votre compte
                </Text>
              </View>

              <View className="w-full px-6 mb-6">
                <Text className="text-white mb-2 font-medium">Nom</Text>
                <TextInput
                  placeholder="Entrez votre nom"
                  placeholderTextColor="#9CA3AF"
                  value={name}
                  onChangeText={handleNameChange}
                  onFocus={() => setFocusedInput("name")}
                  onBlur={() => setFocusedInput(null)}
                  className={`text-white placeholder:text-white/60 bg-white/10 p-3 rounded-xl ${
                    focusedInput === "name" ? "border-2 border-white" : ""
                  } ${errors.name ? "border-2 border-red-400" : ""}`}
                  autoCapitalize="words"
                />
                {errors.name ? (
                  <Text className="text-red-200 text-xs mt-1 ml-1">{errors.name}</Text>
                ) : null}
              </View>

              <View className="w-full px-6 mb-10">
                <Text className="text-white mb-2 font-medium">CIN</Text>
                <TextInput
                  placeholder="Ex: AB123456"
                  placeholderTextColor="#9CA3AF"
                  value={cin}
                  onChangeText={handleCinChange}
                  onFocus={() => setFocusedInput("cin")}
                  onBlur={() => setFocusedInput(null)}
                  className={`text-white placeholder:text-white/60 bg-white/10 p-3 rounded-xl ${
                    focusedInput === "cin" ? "border-2 border-white" : ""
                  } ${errors.cin ? "border-2 border-red-400" : ""}`}
                  autoCapitalize="characters"
                  maxLength={9}
                />
                {errors.cin ? (
                  <Text className="text-red-200 text-xs mt-1 ml-1">{errors.cin}</Text>
                ) : null}
              </View>

              <Pressable
                onPress={handleSubmit}
                className="bg-white w-[80%] px-6 py-3 rounded-xl active:opacity-80"
              >
                <Text className="text-center text-[#b0396b] font-semibold text-base">
                  Se connecter
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}
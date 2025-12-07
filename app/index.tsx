// import { StatusBar } from "expo-status-bar";
// import { useState } from "react";
// import { Modal, Pressable, Text, View } from "react-native";
// import "./global.css";
// export default function App() {
//   const [visible, setVisible] = useState(false);

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <StatusBar  backgroundColor="white" style="dark" />
//       <Pressable 
//         onPress={() => setVisible(true)}
//         style={{ backgroundColor: "red", padding: 10, borderRadius: 8 }}
//       >
//         <Text style={{ color: "white" }}>Open Modal</Text>
//       </Pressable>
//    {/* <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <ActivityIndicator size="large" color="#4f46e5" />
//       <Text style={{ marginTop: 10 }}>Loading...</Text>
//     </View> */}
//       <Modal
//         visible={visible}
//         animationType="fade"
//         transparent={true}
//         onRequestClose={() => setVisible(false)}
//       >
//         <Pressable        
//           onPress={() => setVisible(false)}
//           style={{
//             flex: 1,
//             justifyContent: "center",
//             alignItems: "center",
//             backgroundColor: "rgba(0,0,0,0.5)",
//           }}
//         >
//           <View 
//             style={{
//               width: 250,
//               backgroundColor: "white",
//               padding: 20,
//               borderRadius: 10,
//             }}
//           >
//             <Text>This is a modal!</Text>

//             <Pressable onPress={() => setVisible(false)}>
//               <Text style={{ marginTop: 20, color: "blue" }}>Close</Text>
//             </Pressable>
//           </View>

//         </Pressable>
//       </Modal>
//     </View>
//   );
// }
import React, { useState } from "react";
import { StatusBar, Text, View } from "react-native";
import Navbar from "../Component/NavBar"; // Import the Navbar component
import SideBar from "../Component/SideBar"; // Import the SideBar component
import "../global.css";
export default function App() {
   const [sidebarVisible, setSidebarVisible] = useState(false);
  return (
    <>
      <View className="flex-1 bg-gray-100 h-full">
      <Navbar 
        onMenuPress={() => setSidebarVisible(true)}
        userName="Mohamed Alaoui"
      />
      
      <SideBar 
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        userName="Mohamed Alaoui"
        userEmail="m.alaoui@example.com"
      />
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-600 text-lg">Contenu de la page</Text>
      </View> 
        </View>
       <StatusBar  backgroundColor="white" barStyle={"dark-content"} />
    {/* <Login></Login> */}
    </>
    
  );
}
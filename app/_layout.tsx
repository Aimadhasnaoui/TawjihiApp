import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import "../global.css";
import { CheckUser } from "./Store/authStore";
export default function RootLayout() {
 const isLogin = CheckUser();
  const iscomplete = false;
const queryClient = new QueryClient();
  return (
     <QueryClientProvider client={queryClient}>
  <Stack  screenOptions={{ headerShown: false }} >
  <Stack.Protected guard={!isLogin && iscomplete}>
        <Stack.Screen name="tabs" />
      </Stack.Protected>
  <Stack.Protected guard={!isLogin && !iscomplete}>
        <Stack.Screen name="RegisterPage" />
      </Stack.Protected>
    <Stack.Protected guard={isLogin}>
    <Stack.Screen name="Login" />
    </Stack.Protected>
      
  </Stack>
     </QueryClientProvider>
);
}

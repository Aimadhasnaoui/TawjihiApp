import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import "../global.css";
import { useAuthStore } from './Store/authStore';
export default function RootLayout() {
  const {isLogin} = useAuthStore();

const queryClient = new QueryClient();
  return (
     <QueryClientProvider client={queryClient}>
  <Stack  screenOptions={{ headerShown: false }} >
  <Stack.Protected guard={!isLogin}>
        <Stack.Screen name="tabs" />
      </Stack.Protected>
    <Stack.Protected guard={isLogin}>
    <Stack.Screen name="Login" />
    </Stack.Protected>
      
  </Stack>
     </QueryClientProvider>
);
}

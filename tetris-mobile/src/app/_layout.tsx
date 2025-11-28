import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../styles/global.css";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="start-game" />
        <Stack.Screen name="game" />
        <Stack.Screen name="end-game" />
      </Stack>
    </QueryClientProvider>
  );
}

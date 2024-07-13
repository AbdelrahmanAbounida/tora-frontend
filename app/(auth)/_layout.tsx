import { AuthContext } from "@/providers/auth-context";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect } from "react";

export default function RootLayout() {
  // check if user is authenticated
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { accessToken } = authContext;
  const router = useRouter();
  useEffect(() => {
    if (accessToken) {
      router.replace("/(tabs)/home");
    }
  }, [accessToken]);

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      {/* <StatusBar backgroundColor="#161622" style="light" /> */}
    </Stack>
  );
}

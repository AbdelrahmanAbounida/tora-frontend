import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import { StatusBar } from "expo-status-bar";
import { ApolloProvider } from "@apollo/client";
import { apollo_client } from "@/graphql/client";
import { AuthContext, AuthProvider } from "@/providers/auth-context";
import { RootSiblingParent } from "react-native-root-siblings";
import { ToastProvider } from "react-native-toast-notifications";

SplashScreen.preventAutoHideAsync();

function RootLayout() {
  const [loaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    ...FontAwesome.font,
  });

  const router = useRouter();
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { accessToken } = authContext;

  useEffect(() => {
    if (error) {
      throw error;
    }

    if (loaded) {
      SplashScreen.hideAsync();
    }

    if (loaded && !accessToken) {
      router.replace("(auth)/login");
    }
  }, [error, loaded, accessToken, router]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Slot />
      <StatusBar backgroundColor="#161622" style="light" />
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <ApolloProvider client={apollo_client}>
      <AuthProvider>
        {/** for toast */}
        <RootSiblingParent>
          <ToastProvider>
            <RootLayout />
          </ToastProvider>
        </RootSiblingParent>
      </AuthProvider>
    </ApolloProvider>
  );
}

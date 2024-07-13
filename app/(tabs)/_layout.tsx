import React, { useContext, useEffect } from "react";
import { Tabs, useRouter } from "expo-router";
import { useColorScheme } from "@/components/useColorScheme";
import { Image, Text, View } from "react-native";
import { AuthContext } from "@/providers/auth-context";

const images = {
  create: require("../../assets/icons/create.png"),
  home: require("../../assets/icons/home.png"),
  profile: require("../../assets/icons/profile.png"),
  saved: require("../../assets/icons/saved.png"),
};

function TabBarIcon(props: {
  // name: React.ComponentProps<typeof FontAwesome>["name"];
  image: keyof typeof images;
  color: string;
  title: string;
}) {
  // return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
  return (
    <View className="flex items-center justify-center gap-1">
      <Image
        source={images[props.image]}
        alt="image"
        resizeMode="contain"
        tintColor={props.color}
      />

      <Text
        className="text-[12px] font-psemibold"
        style={{ color: props.color }}
      >
        {props.title}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const router = useRouter();
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { accessToken } = authContext;

  useEffect(() => {
    if (!accessToken) {
      router.replace("(auth)/login");
    }
    console.log({ accessToken });
  }, [accessToken, router]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarStyle: {
          backgroundColor: "#161622",
          borderTopWidth: 1,
          borderTopColor: "#232533",
          height: 84,
        },
        // tabBarShowLabel: false,
        tabBarShowLabel: false, //true,
      }}
    >
      {/* <Image source={require("")} */}
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon title="Home" image="home" color={color} />
          ),
          // headerShadowVisible: false,
          // headerRight: () => (
          //   <Link href="/modal" asChild>
          //     <Pressable>
          //       {({ pressed }) => (
          //         <FontAwesome
          //           name="info-circle"
          //           size={25}
          //           color={Colors[colorScheme ?? "light"].text}
          //           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          //         />
          //       )}
          //     </Pressable>
          //   </Link>
          // ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon title="Create" image="create" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon title="Profile" image="profile" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon title="Saved" image="saved" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

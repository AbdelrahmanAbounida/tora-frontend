import { useEffect } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  const fetchUsers = async () => {
    try {
      console.log("fetching users");
      const response = await fetch("http://192.168.0.115:5000/users/all");
      console.log(response);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log({ error });
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <SafeAreaView className="bg-dark h-full">
      <View>
        <Text className="text-primary font-bold text-xl">Create</Text>
      </View>
    </SafeAreaView>
  );
}

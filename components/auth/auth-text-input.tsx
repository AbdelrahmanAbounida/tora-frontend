import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";

interface AuthTextInputProps {
  title: string;
  onChange: any;
  onBlur: any;
  value: string;
  fieldType?: "regular" | "password" | "search";
  placeholder: string;
  error: boolean;
}

export default function AuthTextInput({
  title,
  onChange,
  onBlur,
  value,
  fieldType = "regular",
  placeholder,
  error,
}: AuthTextInputProps) {
  const [viewPassword, setviewPassword] = useState<boolean>(false);

  return (
    <View className="flex space-y-1 mt-2">
      <Text className="font-pmedium text-secondary pl-1 text-[16px]">
        {title}
      </Text>

      <View
        className={`bg-lightDark h-[58px] rounded-lg border ${
          error ? "border-red-500" : "border-lightDark2"
        } flex flex-row items-center pl-3`}
      >
        <TextInput
          className="text-white font-psemibold placeholder:font-pregular text-[16px] flex-1"
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          placeholderTextColor="#7B7B8B"
          placeholder={placeholder}
          secureTextEntry={fieldType === "password" && !viewPassword}
        />

        {fieldType === "password" && (
          <TouchableOpacity
            className="h-full  flex items-center justify-center pr-3"
            onPress={() => setviewPassword(!viewPassword)}
          >
            {viewPassword ? (
              <Entypo
                onClick={() => setviewPassword(!viewPassword)}
                className="text-secondary opacity-30"
                name="eye"
                size={17}
                color="#7B7B8B"
              />
            ) : (
              <Feather
                className="text-secondary opacity-0"
                name="eye-off"
                size={17}
                color="#7B7B8B"
              />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

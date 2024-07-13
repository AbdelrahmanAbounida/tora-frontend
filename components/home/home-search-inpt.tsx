import { View, TextInput } from "react-native";
import React from "react";

interface HomeSearchInputProps {
  onChange: any;
  onBlur: any;
  value: string;
  fieldType?: "regular" | "password" | "search";
  placeholder: string;
  error: boolean;
}

export default function HomeSearchInput({
  error,
  onBlur,
  onChange,
  value,
  placeholder,
}: HomeSearchInputProps) {
  return (
    <View className={`flex flex-row items-center pl-3`}>
      <TextInput
        className="text-white font-psemibold placeholder:font-pregular text-[16px] flex-1"
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
        placeholderTextColor="#7B7B8B" // #CDCDE0
        placeholder={placeholder}
      />
    </View>
  );
}

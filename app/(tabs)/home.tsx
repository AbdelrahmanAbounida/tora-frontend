import AuthTextInput from "@/components/auth/auth-text-input";
import ErrorMessage from "@/components/auth/error-msg";
import CustomButton from "@/components/custom-button";
import HomeSearchInput from "@/components/home/home-search-inpt";
import TrendingVideos from "@/components/home/trending";
import Logo from "@/components/logo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

const SearchSchema = z.object({
  content: z.string().min(1, { message: "" }),
});

export default function TabOneScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof SearchSchema>>({
    resolver: zodResolver(SearchSchema),
  });

  const handleSearch = async (data: z.infer<typeof SearchSchema>) => {
    console.log({ data });
    try {
      setloading(true);
    } catch (error) {
      console.log({ error });
    } finally {
      setloading(false);
    }
  };

  const [loading, setloading] = useState(false);

  return (
    <SafeAreaView className="bg-dark h-full">
      <View className="p-[24px] pt-[52px]">
        {/** header */}
        <View className="flex">
          <View className="flex flex-row justify-between">
            <View className="flex items-start">
              <Text className="text-secondary font-pmedium text-[14px]">
                Welcome Back
              </Text>
              <Text className="text-white font-psemibold text-[24px] leading-[32px]">
                Your Profile {/** ::TODO:: fetch data from database */}
              </Text>
            </View>
            <Logo withText={false} />
          </View>

          {/** search field */}
          <View
            className={`flex items-center flex-row bg-lightDark mt-7 h-[58px] rounded-lg border ${
              errors.content ? "border-red-500" : "border-lightDark2 border-1"
            } `}
          >
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="flex-1">
                  <HomeSearchInput
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    placeholder="Search for a video topic"
                    error={!!errors.content}
                  />
                  {/* {errors.content && (
                    <View className="absolute top-[17px]  right-1">
                      <ErrorMessage message={errors.content.message!} />
                    </View>
                  )} */}
                </View>
              )}
              name="content"
            />

            {/** submit form */}
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <TouchableOpacity
                onPress={handleSubmit(handleSearch)}
                className=" h-full pl-5 flex items-center justify-center mr-2"
              >
                <Image
                  width={16}
                  height={16}
                  source={require("../../assets/icons/search.png")}
                  alt="search"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/** Trending Videos  */}
        <TrendingVideos />

        {/** video list */}
      </View>
    </SafeAreaView>
  );
}

import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "@/components/logo";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import CustomButton from "@/components/custom-button";
import AuthTextInput from "@/components/auth/auth-text-input";
import ErrorMessage from "@/components/auth/error-msg";
import { Link } from "expo-router";
import { AuthContext } from "@/providers/auth-context";
import Toast from "react-native-root-toast";

const LoginfromSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .refine(
      (data) =>
        z
          .string()
          .min(1, { message: "Email is required" })
          .email({ message: "Email not valid" })
          .safeParse(data.trim()).success
    )
    .transform((val) => val.replaceAll(" ", "")),
  // .email({ message: "Email not valid" })
  password: z.string().min(1, { message: "password is required" }),
});

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginfromSchema>>({
    resolver: zodResolver(LoginfromSchema),
  });

  const handleLogin = async (data: z.infer<typeof LoginfromSchema>) => {
    console.log("Login ");
    console.log({ data });
    try {
      setloading(true);
      setloginError("");
      const res = await login(data.email, data.password);
      console.log({ res: res?.error });

      if (res?.error) {
        let toast = Toast.show(res?.errorlear, {
          duration: Toast.durations.LONG,
        });
        setTimeout(function hideToast() {
          Toast.hide(toast);
        }, 3000);

        setloginError(res.error);
      }
    } catch (error) {
      console.log({ error });
      setloginError("Something went wrong");
    } finally {
      setloading(false);
    }
  };
  const [loginError, setloginError] = useState<string>("");
  const [loading, setloading] = useState(false);

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { login, accessToken } = authContext;
  console.log({ accessToken });
  return (
    <SafeAreaView className="bg-dark h-full">
      <ScrollView className="w-full mt-[60px] px-[24px] ">
        <Logo />
        <Text className="mt-9 text-[22px] font-psemibold text-white">
          Login
        </Text>
        {/** form */}
        <View className="mt-7 space-y-3 flex">
          {/** Email */}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <AuthTextInput
                  title="Email"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  placeholder="Your Email"
                  error={!!errors.email}
                />
                {errors.email && (
                  <View className="absolute top-[17px] right-1">
                    <ErrorMessage message={errors.email.message!} />
                  </View>
                )}
              </View>
            )}
            name="email"
          />

          {/** password */}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <AuthTextInput
                  title="Password"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  placeholder="*****"
                  fieldType="password"
                  error={!!errors.password}
                />
                {errors.password && (
                  <View className="absolute top-[17px]  right-1">
                    <ErrorMessage message={errors.password.message!} />
                  </View>
                )}
              </View>
            )}
            name="password"
          />

          <View className="w-full  flex flex-row items-center justify-end px-2">
            <Link href={"/(auth)/forget-password"}>
              <Text className="text-secondary">Forget Password?</Text>
            </Link>
          </View>

          {/** submit form */}
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <CustomButton
              variant={"default"}
              className="w-full text-white "
              textClassName="text-lg font-semibold"
              style={{ marginTop: 10 }}
              title="Log In"
              onClick={handleSubmit(handleLogin)}
            />
          )}
        </View>

        {/** go to register */}
        <View className="flex flex-row items-center justify-center text-center mt-3">
          <Text className="text-secondary font-pregular">
            Don’t have an account?{"  "}
            <Link href={"/(auth)/register"}>
              <Text className="text-primary">Signup</Text>
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
import { useToast } from "react-native-toast-notifications";

const RegisterformSchema = z
  .object({
    // name: z.string().min(1, { message: "Name is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .transform((val) => val.trim())
      .refine(
        (val) =>
          z.string().email({ message: "Email not valid" }).safeParse(val)
            .success,
        {
          message: "Email not valid",
        }
      ),
    password: z
      .string()
      .min(4, { message: "Password mustn't be less than 4 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match",
  });

export default function Register() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof RegisterformSchema>>({
    resolver: zodResolver(RegisterformSchema),
  });

  const handleRegister = async (data: z.infer<typeof RegisterformSchema>) => {
    console.log({ data });
    try {
      setloading(true);
      setloginError("");
      const resp = await register(data.email, data.password);
      if (resp.error) {
        setloginError(resp.error);
        toast.show(resp.error, { type: "danger" });
      }
    } catch (error) {
      console.log({ error });
      setloginError("Something went wrong");
    } finally {
      setloading(false);
    }
  };

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { register } = authContext;

  const [loginError, setloginError] = useState<string>("");
  const [loading, setloading] = useState(false);
  const toast = useToast();

  return (
    <SafeAreaView className="bg-dark h-full">
      <ScrollView className="w-full mt-[60px] px-[24px] ">
        <View className="flex flex-row  ">
          <Logo />
        </View>
        <Text className="mt-9 text-[22px] font-psemibold text-white">
          Sign up
        </Text>
        {/** form */}
        <View className="mt-7 space-y-5 flex">
          {/* * name */}
          {/* <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <AuthTextInput
                  title="Name"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  placeholder="Your Name"
                  fieldType="password"
                  error={!!errors.name}
                />
                {errors.name && (
                  <View className="absolute top-[17px]  right-1">
                    <ErrorMessage message={errors.name.message!} />
                  </View>
                )}
              </View>
            )}
            name="name"
          /> */}

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

          {/** confirm Password */}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <AuthTextInput
                  title="Confirm Password"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  placeholder="*****"
                  fieldType="password"
                  error={!!errors.confirmPassword}
                />
                {errors.confirmPassword && (
                  <View className="absolute top-[17px]  right-1">
                    <ErrorMessage message={errors.confirmPassword.message!} />
                  </View>
                )}
              </View>
            )}
            name="confirmPassword"
          />

          {/** submit form */}
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <CustomButton
              style={{ marginTop: 10 }}
              title="Signup"
              onClick={handleSubmit(handleRegister)}
            />
          )}
        </View>

        {/** go to register */}
        <View className="flex flex-row items-center justify-center text-center mt-3">
          <Text className="text-secondary font-pregular">
            {"Already have an account?  "}
            <Link href={"/(auth)/login"}>
              <Text className="text-primary">Login</Text>
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

import images from "@/constants/images";
import { registerFormAtom } from "@/utils/atom";
import {
  RegisterPasswordFormData,
  registerPasswordSchema,
} from "@/utils/schema";
import { useRouter } from "expo-router";
import { useAtom } from "jotai";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { toast } from "sonner-native";
import { z } from "zod";

const Password = () => {
  const router = useRouter();

  const [form, setForm] = useAtom(registerFormAtom);

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<RegisterPasswordFormData>>({});

  const validateForm = (): boolean => {
    try {
      registerPasswordSchema.parse(form);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleChange = (value: string) => {
    setForm((prev) => ({ ...prev, password: value }));
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  const isValidPassword = form.password.length >= 8;
  const isDisabled = form.password === "" || !isValidPassword;

  const handlePress = () => {
    Keyboard.dismiss();

    if (!validateForm()) {
      toast.error("Please fill all fields");
      return;
    }

    router.push("/(auth)/(register)/gender");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <View className="bg-s-dark1 min-h-screen p-6 flex">
        <View>
          <Text className="text-3xl font-semibold text-white">
            Create a password
          </Text>
          <View>
            <TextInput
              value={form.password}
              onChangeText={handleChange}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={!showPassword}
              autoComplete="password-new"
              textContentType="newPassword"
              returnKeyType="next"
              className="bg-[#717171] rounded-md h-14 px-5 font-semibold flex items-center text-white mt-1"
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-5"
            >
              <Image
                source={
                  showPassword ? images.passwordShow : images.passwordHide
                }
                className="w-6 h-6"
              />
            </TouchableOpacity>
          </View>
          <Text className="text-white mt-1 text-sm">
            Use at least 8 characters.
          </Text>
          {errors.password ? (
            <Text className="text-red-500 text-sm mt-1">{errors.password}</Text>
          ) : null}
        </View>

        <View className="flex items-center mt-16 gap-5">
          <TouchableOpacity
            onPress={handlePress}
            disabled={!form.password}
            className="disabled:bg-[#717171] rounded-full  bg-white text-black px-11 py-5 "
          >
            <Text className="text-xl font-bold ">Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Password;

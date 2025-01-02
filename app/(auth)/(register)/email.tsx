import { registerFormAtom } from "@/utils/atom";
import { RegisterEmailFormData, registerEmailSchema } from "@/utils/schema";
import { Link, useRouter } from "expo-router";
import { useAtom } from "jotai";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { toast } from "sonner-native";
import { z } from "zod";

const Email = () => {
  const router = useRouter();
  const [errors, setErrors] = useState<Partial<RegisterEmailFormData>>({});
  const [form, setForm] = useAtom(registerFormAtom);

  const validateForm = (): boolean => {
    try {
      registerEmailSchema.parse(form);
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
    setForm((prev) => ({ ...prev, email: value }));
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handlePress = () => {
    Keyboard.dismiss();

    if (!validateForm()) {
      toast.error("Please fill all fields");
      return;
    }

    router.push("/(auth)/(register)/password");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <View className="bg-s-dark1 min-h-screen p-6 flex">
        <View>
          <Text className="text-3xl font-semibold text-white">
            What's your email?
          </Text>
          <TextInput
            value={form.email}
            onChangeText={handleChange}
            autoCorrect={false}
            autoComplete="email"
            returnKeyType="next"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            className="bg-[#717171] rounded-md h-14 px-5 font-semibold flex items-center text-white mt-1"
          />
          <Text className="text-white mt-1 text-sm">
            You'll need to confirm this email later.
          </Text>
          {errors.email ? (
            <Text className="text-red-500 text-sm mt-1">{errors.email}</Text>
          ) : null}
        </View>

        <View className="flex items-center mt-16 gap-5">
          <TouchableOpacity
            onPress={handlePress}
            disabled={!form.email}
            className="disabled:bg-[#717171] rounded-full  bg-white text-black px-11 py-5 "
          >
            <Text className="text-xl font-bold ">Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Email;

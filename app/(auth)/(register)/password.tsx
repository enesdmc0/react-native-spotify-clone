import { registerFormAtom } from "@/atom";
import images from "@/constants/images";
import { Link, useRouter } from "expo-router";
import { useAtom } from "jotai";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

const Password = () => {
  const [form, setForm] = useAtom(registerFormAtom);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (value: string) => {
    setForm((prev) => ({ ...prev, password: value }));
  };
  const router = useRouter();
  const isValidPassword = form.password.length >= 8;
  const isDisabled = form.password === "" || !isValidPassword;

  const handlePress = () => {
    if (isDisabled) return;
    console.log(form);
    router.push("/(auth)/(register)/gender");
  };

  return (
    <View className="bg-s-dark1 min-h-screen p-6 flex">
      <View>
        <Text className="text-3xl font-semibold text-white">
          Create a password
        </Text>
        <View>
          <TextInput
            value={form.password}
            onChangeText={handleChange}
            className="bg-[#717171] rounded-md h-14 px-5 font-semibold flex items-center text-white mt-1"
            autoCapitalize="none"
            secureTextEntry={!showPassword}
            autoComplete="password-new"
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-5"
          >
            <Image
              source={showPassword ? images.passwordShow : images.passwordHide}
              className="w-6 h-6"
            />
          </TouchableOpacity>
        </View>
        <Text className="text-white mt-1 text-sm">
          Use at least 8 characters.
        </Text>
      </View>

      <View className="flex items-center mt-16 gap-5">
        <TouchableOpacity
          onPress={handlePress}
          disabled={isDisabled}
          className="disabled:bg-[#717171] rounded-full  bg-white text-black px-11 py-5 "
        >
          <Text className="text-xl font-bold ">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Password;

import { login } from "@/utils/actions";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handlePress = async () => {
    const response = await login(form.email, form.password);


  };

  return (
    <View className="bg-s-dark1 min-h-screen p-6 flex">
      <View>
        <Text className="text-3xl font-semibold text-white">
          Email or username
        </Text>
        <TextInput
          textContentType="emailAddress"
          value={form.email}
          onChangeText={(value) => setForm({ ...form, email: value })}
          autoCapitalize="none"
          className="bg-[#717171] rounded-md h-14 px-5 font-semibold flex items-center text-white mt-1"
        />
      </View>
      <View className="mt-10">
        <Text className="text-3xl font-semibold text-white">Password</Text>
        <TextInput
          value={form.password}
          onChangeText={(value) => setForm({ ...form, password: value })}
          className="bg-[#717171] rounded-md h-14 px-5 font-semibold flex items-center text-white mt-1"
          autoCapitalize="none"
          secureTextEntry={true}
          textContentType="password"
        />
      </View>

      <View className="flex items-center mt-16 gap-5">
        <TouchableOpacity
          onPress={handlePress}
          className="rounded-full  bg-white text-black px-11 py-5 "
        >
          <Text className="text-xl font-bold ">Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity className="rounded-full  border border-[#686868] px-7 py-2 ">
          <Text className="text-white">Log in without password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

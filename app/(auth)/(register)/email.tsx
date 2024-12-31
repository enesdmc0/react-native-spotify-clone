
import { registerFormAtom } from "@/utils/atom";
import { Link, useRouter } from "expo-router";
import { useAtom } from "jotai";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

const Email = () => {
  const [form, setForm] = useAtom(registerFormAtom);

  const handleChange = (value: string) => {
    setForm((prev) => ({ ...prev, email: value }));
  };
  const router = useRouter();
  const isDisabled = form.email === "";
  const handlePress = () => {
    if (isDisabled) return;
    router.push("/(auth)/(register)/password");
  };

  return (
    <View className="bg-s-dark1 min-h-screen p-6 flex">
      <View>
        <Text className="text-3xl font-semibold text-white">
          What's your email?
        </Text>
        <TextInput
          value={form.email}
          onChangeText={handleChange}
          className="bg-[#717171] rounded-md h-14 px-5 font-semibold flex items-center text-white mt-1"
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
        />
        <Text className="text-white mt-1 text-sm">
          You'll need to confirm this email later.
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

export default Email;

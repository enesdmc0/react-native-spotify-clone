import { View, Text, TextInput, TouchableOpacity } from "react-native";
const Login = () => {
  return (
    <View className="bg-s-dark1 min-h-screen p-6 flex">
      <View>
        <Text className="text-3xl font-semibold text-white">
          Email or username
        </Text>
        <TextInput className="bg-[#717171] rounded-md h-14 px-5 font-semibold flex items-center text-white mt-1" />
      </View>
      <View className="mt-10">
        <Text className="text-3xl font-semibold text-white">Password</Text>
        <TextInput className="bg-[#717171] rounded-md h-14 px-5 font-semibold flex items-center text-white mt-1" />
      </View>

      <View className="flex items-center mt-16 gap-5">
        <TouchableOpacity className="rounded-full  bg-white text-black px-11 py-5 ">
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

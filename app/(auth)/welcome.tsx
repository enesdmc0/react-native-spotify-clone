import { Link } from "expo-router";
import { View, Text, Image, TouchableOpacity } from "react-native";

import images from "@/constants/images";
import { welcomeData } from "@/constants/index";

const Welcome = () => {
  return (
    <View className="bg-s-dark1 min-h-screen flex items-center justify-end w-full p-10 pb-20 ">
      <View className=" flex items-center justify-center flex-col w-full">
        <Image className="size-16" source={images.whiteLogo} />
        <View className="mt-8">
          <Text className="font-bold text-4xl text-white text-center">
            Millions of songs.{" "}
          </Text>
          <Text className="font-bold text-4xl text-white text-center">
            Free on Spotify.
          </Text>
        </View>
        <View className="w-full flex gap-4 mt-10">
          <TouchableOpacity className="bg-s-green p-4 rounded-full flex items-center justify-center">
            <Link href="/(auth)/(register)/email" className="font-bold text-xl">
              Sign up free
            </Link>
          </TouchableOpacity>
          {welcomeData.map((x) => (
            <TouchableOpacity
              key={x.title}
              className="border border-[#686868] p-4 px-6 rounded-full flex flex-row items-center justify-between"
            >
              <Image className="size-8" source={x.icon} />
              <Text className="font-bold text-white text-xl">{x.title}</Text>
              <Text></Text>
            </TouchableOpacity>
          ))}
        </View>
        <Link
          href="/(auth)/login"
          className="mt-10 text-white font-bold text-xl"
        >
          Log in
        </Link>
      </View>
    </View>
  );
};

export default Welcome;

import { logout } from "@/utils/actions";
import { tokenAtom } from "@/utils/atom";
import { Link, useRouter } from "expo-router";
import { useSetAtom } from "jotai";
import { View, Text, TouchableOpacity } from "react-native";

const Home = () => {
  const router = useRouter();
  const setToken = useSetAtom(tokenAtom);
  const handleLogout = async () => {
    await logout();
    console.log("Logged out");
    setToken(null);
    router.replace("/(auth)/login");
  };

  return (
    <View className="flex-1 flex items-center justify-center">
      <Link href="/(root)/(tabs)/home/profile">Profile</Link>
      <Link href="/(auth)/login">Login</Link>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

import { logout } from "@/utils/actions";
import { tokenAtom } from "@/utils/atom";
import { Link, useRouter } from "expo-router";
import { useSetAtom } from "jotai";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PlaylistDetail = () => {
  const router = useRouter();
  const setToken = useSetAtom(tokenAtom);
  const handleLogout = async () => {
    await logout();
    console.log("Logged out");
    setToken(null);
    router.replace("/(auth)/login");
  };

  return (
    <SafeAreaView className="h-full bg-[#121212] items-center justify-center gap-10">
      <Text className="text-white font-bold text-2xl underline">
        Playlist Detail Page
      </Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text className="text-white font-bold text-2xl bg-red-950 rounded-lg p-3 ">
          Logout
        </Text>
      </TouchableOpacity>
      <Link
        className="text-white font-bold text-2xl rounded-lg p-3 bg-green-600 "
        href="/(auth)/login"
      >
        Login
      </Link>
      <Link
        className="text-white font-bold text-2xl rounded-lg p-3 bg-green-600 "
        href="/add-to-playlist"
      >
        Add to Playlist
      </Link>
    </SafeAreaView>
  );
};

export default PlaylistDetail;

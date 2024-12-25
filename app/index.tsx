import { Link } from "expo-router";
import { View } from "react-native";

const Home = () => {
  const isLogin = true;

  // if(isLogin) return <Redirect href="(root)/(tabs)/home" />
  return (
    <View className="flex-1 flex items-center justify-center">
      <Link href="/(auth)/login">Login</Link>
      <Link href="/(auth)/(register)/email">Register Step - 1</Link>
      <Link href="/(auth)/(register)/password">Register Step - 2</Link>
      <Link href="/(auth)/(register)/gender">Register Step - 3</Link>
      <Link href="/(auth)/(register)/birthday">Register Step - 4</Link>
      <Link href="/(auth)/welcome">Welcome</Link>
      <Link href="/(root)/(tabs)/home/123">Playlist ID</Link>
      <Link
        href={{
          pathname: "/add-to-playlist",
          params: { playlistId: "1234" },
        }}
      >
        Add to This Playlist
      </Link>
      <Link href="/(root)/(tabs)/home">Home</Link>
      <Link href="/(root)/(tabs)/search">Search</Link>
      <Link href="/(root)/(tabs)/your-library">Your Library</Link>
      <Link href="/(root)/(tabs)/create">Create</Link>
    </View>
  );
};

export default Home;

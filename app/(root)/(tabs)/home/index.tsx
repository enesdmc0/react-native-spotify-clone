import { Link } from "expo-router";
import { View, Text } from "react-native";

const Home = () => {
  return (
    <View className="flex-1 flex items-center justify-center">
      <Link href="/(root)/(tabs)/home/profile">Profile</Link>
    </View>
  );
};

export default Home;

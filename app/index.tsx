import { isAuth } from "@/utils/actions";
import { Redirect } from "expo-router";

const Home = () => {
  const auth = isAuth();

  if (auth) return <Redirect href="/(root)/(tabs)/home" />;

  return <Redirect href="/(auth)/welcome" />;
};

export default Home;

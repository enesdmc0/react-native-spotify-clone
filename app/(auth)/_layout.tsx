import { Image } from "react-native";
import { Link, Redirect, Stack } from "expo-router";

import images from "@/constants/images";
import { useAuth } from "@/utils/actions";

const AuthLayout = () => {
  const auth = useAuth();
  console.log(auth, "auth-layout");
  if (auth) return <Redirect href="/(root)/(tabs)/home" />;

  return (
    <Stack>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen
        name="login"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#181818",
          },
          headerTintColor: "#fff",
          title: "Log in",
          headerLeft: () => (
            <Link href="/(auth)/welcome">
              <Image className="size-7" source={images.left} />
            </Link>
          ),
        }}
      />
      <Stack.Screen name="(register)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthLayout;

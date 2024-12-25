import { Image } from "react-native";
import { Link, Stack } from "expo-router";

import images from "@/constants/images";

const AuthLayout = () => {
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

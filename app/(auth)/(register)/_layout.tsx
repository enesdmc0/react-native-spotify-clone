import images from "@/constants/images";
import { Link, Stack } from "expo-router";
import { Image } from "react-native";

const RegisterLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="email"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#181818",
          },
          headerTintColor: "#fff",
          title: "Create Account",
          headerLeft: () => (
            <Link href="/(auth)/welcome">
              <Image className="size-7" source={images.left} />
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="password"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#181818",
          },
          headerTintColor: "#fff",
          title: "Create Account",
          headerLeft: () => (
            <Link href="/(auth)/(register)/email">
              <Image className="size-7" source={images.left} />
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="gender"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#181818",
          },
          headerTintColor: "#fff",
          title: "Create Account",
          headerLeft: () => (
            <Link href="/(auth)/(register)/password">
              <Image className="size-7" source={images.left} />
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="birthday"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#181818",
          },
          headerTintColor: "#fff",
          title: "Create Account",
          headerLeft: () => (
            <Link href="/(auth)/(register)/gender">
              <Image className="size-7" source={images.left} />
            </Link>
          ),
        }}
      />
    </Stack>
  );
};

export default RegisterLayout;

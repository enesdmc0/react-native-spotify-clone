import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="add-to-playlist" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;

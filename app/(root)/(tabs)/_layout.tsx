import { Tabs } from "expo-router";
import { Text } from "react-native";

const TabsLayout = () => {
  return (
    <Tabs
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => <Text>A</Text>,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => <Text>B</Text>,
        }}
      />
      <Tabs.Screen
        name="your-library"
        options={{
          title: "Your Library",
          headerShown: false,
          tabBarIcon: ({ focused }) => <Text>C</Text>,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          headerShown: false,
          tabBarIcon: ({ focused }) => <Text>D</Text>,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

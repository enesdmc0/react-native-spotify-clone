import images from "@/constants/images";
import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, Text, View } from "react-native";

interface TabIconProps {
  focused: boolean;
  icon: ImageSourcePropType;
  title: string;
}

const TabIcon = ({ focused, icon, title }: TabIconProps) => {
  return (
    <View className="flex-1 mt-3 flex flex-col items-center">
      <Image
        tintColor={focused ? "#ffffff" : "#666876"}
        resizeMode="contain"
        className="size-9"
        source={icon}
      />
      <Text
        className={`${
          focused ? "text-white" : "text-[#666876]"
        } text-xs w-full text-center mt-1`}
      >
        {title}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "transparent",
          borderTopWidth: 0,
          minHeight: 70,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Home" icon={images.tab1} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Search" icon={images.tab2} />
          ),
        }}
      />
      <Tabs.Screen
        name="your-library"
        options={{
          title: "Your Library",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              title="Your Library"
              icon={images.tab3}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Create" icon={images.tab4} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

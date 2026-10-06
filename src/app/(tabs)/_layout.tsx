import { Tabs } from "expo-router";
import {
  Heart,
  Home,
  Settings,
  ShoppingCart,
  TrendingUp,
} from "lucide-react-native";
import { View } from "react-native";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          height: 85,
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          overflow: "visible",
        },

        tabBarItemStyle: {
          height: 85,
        },
      }}
    >
      <Tabs.Screen
        name="trending"
        options={{
          tabBarIcon: ({ focused }) => (
            <TrendingUp
              size={30}
              strokeWidth={1.5}
              color={focused ? "#000" : "#000"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="favorite"
        options={{
          tabBarIcon: ({ focused }) => (
            <Heart
              size={30}
              strokeWidth={1.5}
              color={focused ? "#000" : "#000"}
            />
          ),
        }}
      />

      {/* ⭐ SPECIAL HOME TAB */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 76,
                height: 76,
                borderRadius: 48,
                backgroundColor: "#42B1EF",

                alignItems: "center",
                justifyContent: "center",

                transform: [{ translateY: -15 }], 

                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 8,
                },
                shadowOpacity: 0.25,
                shadowRadius: 8,

                elevation: 8,
              }}
            >
              <Home
                size={48}
                color="#fff"
                strokeWidth={1.5}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ focused }) => (
            <ShoppingCart
              size={30}
              strokeWidth={1.5}
              color="#000"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="setting"
        options={{
          tabBarIcon: ({ focused }) => (
            <Settings
              size={30}
              strokeWidth={1.5}
              color="#000"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
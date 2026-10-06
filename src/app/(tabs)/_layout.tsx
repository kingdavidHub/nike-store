import { Tabs } from "expo-router";
import { Heart, Home, Settings, ShoppingCart, TrendingUp } from "lucide-react-native";

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
      <Tabs.Screen name="index" options={{
        tabBarIcon: () => (
          <Home size={30} strokeWidth={1} />
        ),
      }} />
      <Tabs.Screen name="trending" options={{
        tabBarIcon: () => (
          <TrendingUp size={30} strokeWidth={1} />
        ),
      }} />
      <Tabs.Screen name="favorite" options={{
        tabBarIcon: () => (
          <Heart size={30} strokeWidth={1} />
        ),
      }} />
      <Tabs.Screen name="cart" options={{
        tabBarIcon: () => (
          <ShoppingCart strokeWidth={1} />
        ),
      }} />
      <Tabs.Screen name="setting" options={{
        tabBarIcon: () => (
          <Settings size={30} strokeWidth={1} />
        ),
      }} />
    </Tabs>
  )
}

export default TabsLayout;
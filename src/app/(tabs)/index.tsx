import { Text, TextInput, View } from "react-native";
import { styled } from "nativewind";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, Menu, Search } from "lucide-react-native";
import { useState } from "react";
import ShopList from "@/components/ShopList";
import { BlurView } from "expo-blur";
import NavBar from "@/components/NavBar";
const SafeAreaView = styled(RNSafeAreaView);

export default function App() {
  const [search, setSearch] = useState<string>('');
  return (
    <SafeAreaView className="flex-1">
      <NavBar />
      <Text className="text-[27px] semi mb-8 pl-8 pr-8">Nike shoe store</Text>

      <View className="relative pl-8 pr-8">
        <View className="search-bar">
          <Search color="#818181" />
          <TextInput
            className="flex-1 px-2 text-xl"
            placeholder="Search"
            value={search}
            onChangeText={setSearch}
            placeholderTextColor="#818181"
            style={{ textAlignVertical: "center" }}
          />
        </View>

        <BlurView
          pointerEvents="none"
          intensity={35}
          tint="default"
          className="search-fade"
        />
      </View>

      <ShopList />
    </SafeAreaView>
  );
}


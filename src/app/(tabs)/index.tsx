import { FlatList, Text, TextInput, View } from "react-native";
import { styled } from "nativewind";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { Search } from "lucide-react-native";
import { useState } from "react";
import { BlurView } from "expo-blur";
import NavBar from "@/components/NavBar";
import { Link } from 'expo-router';
import { clsx } from 'clsx';
import { getHeight, formatCurrency } from '../../../lib/utils';
import { STORE } from '../../../constants/data';
import { checkMarkIcon } from '@/assets/icon';
import ShopList from "@/components/ShopList";


const SafeAreaView = styled(RNSafeAreaView);

export default function App() {
  const [search, setSearch] = useState<string>('');
  return (
    <SafeAreaView className="flex-1">
      <FlatList
        data={STORE}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperClassName="gap-2 px-8"
        contentContainerClassName="gap-2 pb-8"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <NavBar />
            <Text className="page-title">Nike shoe store</Text>
            <View className="relative px-8">
              <View className="search-bar">
                <Search color="#818181" />
                <TextInput
                  className="flex-1 px-2 text-xl"
                  placeholder="Search"
                  value={search}
                  onChangeText={setSearch}
                  placeholderTextColor="#818181"
                />
              </View>
            </View>
          </View>
        }
        renderItem={({ item, index }) => <ShopList item={item} index={index} />}
      />
    </SafeAreaView>
  );
}


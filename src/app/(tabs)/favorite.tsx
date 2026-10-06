import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import {
  SafeAreaView as RNSafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Heart } from "lucide-react-native";
import { Link } from "expo-router";
import NavBar from "@/components/NavBar";
import { STORE } from "../../../constants/data";
import { formatCurrency } from "../../../lib/utils";
import { useStore } from "../../../store/useStore";

const SafeAreaView = styled(RNSafeAreaView);

const Favorite = () => {
  const favorites = useStore((s) => s.favorites);
  const toggleFavorite = useStore((s) => s.toggleFavorite);
  const insets = useSafeAreaInsets();

  const favoriteItems = favorites
    .map((id) => STORE.find((item) => item.id === id))
    .filter((item): item is (typeof STORE)[number] => Boolean(item));

  return (
    <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
      <NavBar />
      <Text className="text-[27px] semi mb-8 pl-8 pr-8">Favorites</Text>

      {favoriteItems.length === 0 ? (
        <View className="flex-1 items-center justify-center px-8 gap-4">
          <View className="w-20 h-20 rounded-full bg-[#F8F6F6] items-center justify-center">
            <Heart size={36} color="#818181" strokeWidth={1.5} />
          </View>
          <Text className="text-xl font-semibold">No favorites yet</Text>
          <Text className="text-md font-light text-[#818181] text-center">
            Tap the heart on any shoe to save it here.
          </Text>
        </View>
      ) : (
        <ScrollView
          className="flex-1"
          contentContainerClassName="pl-8 pr-8 gap-4"
          style={{ paddingBottom: insets.bottom + 100 }}
        >
          {favoriteItems.map((item) => (
            <View
              key={item.id}
              className="flex-row items-center rounded-3xl p-4 gap-4"
              style={{ backgroundColor: item.card_color }}
            >
              <Link
                href={{ pathname: "/store-items/[id]", params: { id: item.id } }}
                asChild
              >
                <TouchableOpacity className="flex-row items-center flex-1 gap-4">
                  <Image source={item.shoe_image} className="w-20 h-16" resizeMode="contain" />
                  <View className="flex-col items-start flex-1 gap-1">
                    <Text className="text-lg font-semibold">
                      {item.product.product_name}
                    </Text>
                    <Text className="text-md font-light">{item.shoe_pair}</Text>
                    <Text className="text-md font-semibold">
                      {formatCurrency(item.shoe_price)}
                    </Text>
                  </View>
                </TouchableOpacity>
              </Link>

              <TouchableOpacity
                onPress={() => toggleFavorite(item.id)}
                className="w-11 h-11 rounded-full bg-white items-center justify-center"
                accessibilityLabel="Remove from favorites"
              >
                <Heart size={22} color="#08A6FF" fill="#08A6FF" strokeWidth={1.5} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Favorite;

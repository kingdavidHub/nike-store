import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import {
  SafeAreaView as RNSafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { ShoppingCart, Trash2 } from "lucide-react-native";
import { Link } from "expo-router";
import NavBar from "@/components/NavBar";
import { STORE } from "../../../constants/data";
import { formatCurrency } from "../../../lib/utils";
import { useStore } from "../../../store/useStore";

const SafeAreaView = styled(RNSafeAreaView);

const Cart = () => {
  const cart = useStore((s) => s.cart);
  const removeFromCart = useStore((s) => s.removeFromCart);
  const insets = useSafeAreaInsets();

  const cartItems = cart
    .map((id) => STORE.find((item) => item.id === id))
    .filter((item): item is (typeof STORE)[number] => Boolean(item));

  const subtotal = cartItems.reduce((sum, item) => sum + item.shoe_price, 0);

  return (
    <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
      <NavBar />
      <Text className="text-[27px] semi mb-8 pl-8 pr-8">Cart</Text>

      {cartItems.length === 0 ? (
        <View className="flex-1 items-center justify-center px-8 gap-4">
          <View className="w-20 h-20 rounded-full bg-[#F8F6F6] items-center justify-center">
            <ShoppingCart size={36} color="#818181" strokeWidth={1.5} />
          </View>
          <Text className="text-xl font-semibold">Your cart is empty</Text>
          <Text className="text-md font-light text-[#818181] text-center">
            Add shoes from the store to see them here.
          </Text>
        </View>
      ) : (
        <>
          <ScrollView
            className="flex-1"
            contentContainerClassName="pl-8 pr-8 gap-4"
            style={{ paddingBottom: insets.bottom + 24 }}
          >
            {cartItems.map((item) => (
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
                  onPress={() => removeFromCart(item.id)}
                  className="w-11 h-11 rounded-full bg-white items-center justify-center"
                  accessibilityLabel="Remove from cart"
                >
                  <Trash2 size={22} color="#E5484D" strokeWidth={1.5} />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <View
            className="bg-white rounded-t-4xl p-8 flex-col gap-6"
            style={{ paddingBottom: insets.bottom + 24 }}
          >
            <View className="flex-row justify-between items-center">
              <Text className="text-xl text-[#818181]">Subtotal</Text>
              <Text className="text-xl font-semibold">{formatCurrency(subtotal)}</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-xl text-[#818181]">Shipping</Text>
              <Text className="text-xl font-semibold">Free</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-2xl font-semibold">Total</Text>
              <Text className="text-2xl font-semibold">{formatCurrency(subtotal)}</Text>
            </View>
            <TouchableOpacity className="rounded-xl bg-[#0098EE] py-4 items-center">
              <Text className="text-white text-xl">Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Cart;

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
      <Text className="page-title">Cart</Text>

      {cartItems.length === 0 ? (
        <View className="empty-state">
          <View className="empty-state-icon">
            <ShoppingCart size={36} color="#818181" strokeWidth={1.5} />
          </View>
          <Text className="text-xl font-semibold">Your cart is empty</Text>
          <Text className="muted-copy">
            Add shoes from the store to see them here.
          </Text>
        </View>
      ) : (
        <>
          <ScrollView
            className="flex-1"
            contentContainerClassName="list-content"
            style={{ paddingBottom: insets.bottom + 24 }}
          >
            {cartItems.map((item) => (
              <View
                key={item.id}
                className="list-row"
                style={{ backgroundColor: item.card_color }}
              >
                <Link
                  href={{ pathname: "/store-items/[id]", params: { id: item.id } }}
                  asChild
                >
                  <TouchableOpacity className="list-link">
                    <Image source={item.shoe_image} className="item-thumbnail" resizeMode="contain" />
                    <View className="item-info">
                      <Text className="text-lg font-semibold">
                        {item.product.product_name}
                      </Text>
                      <Text className="text-base font-light">{item.shoe_pair}</Text>
                      <Text className="text-base font-semibold">
                        {formatCurrency(item.shoe_price)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Link>

                <TouchableOpacity
                  onPress={() => removeFromCart(item.id)}
                  className="icon-action"
                  accessibilityLabel="Remove from cart"
                >
                  <Trash2 size={22} color="#E5484D" strokeWidth={1.5} />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <View
            className="summary-panel"
            style={{ paddingBottom: insets.bottom + 24 }}
          >
            <View className="summary-row">
              <Text className="text-xl text-[#818181]">Subtotal</Text>
              <Text className="text-xl font-semibold">{formatCurrency(subtotal)}</Text>
            </View>
            <View className="summary-row">
              <Text className="text-xl text-[#818181]">Shipping</Text>
              <Text className="text-xl font-semibold">Free</Text>
            </View>
            <View className="summary-row">
              <Text className="text-2xl font-semibold">Total</Text>
              <Text className="text-2xl font-semibold">{formatCurrency(subtotal)}</Text>
            </View>
            <TouchableOpacity className="primary-button">
              <Text className="text-white text-xl">Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Cart;

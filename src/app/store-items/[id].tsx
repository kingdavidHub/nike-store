import { View, Text, Image, TouchableOpacity } from 'react-native';
import {
  SafeAreaView as RNSafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { styled } from 'nativewind';
import { useLocalSearchParams } from 'expo-router';
import NavBar from '@/components/NavBar';
import { STORE } from '../../../constants/data';
import { formatCurrency } from '../../../lib/utils';
import { Heart } from 'lucide-react-native';
import { useStore } from '../../../store/useStore';

const SafeAreaView = styled(RNSafeAreaView);

const StoreItem = () => {
  const { id } = useLocalSearchParams();
  const item = STORE.find((item) => item.id === id);
  const insets = useSafeAreaInsets();

  const favorites = useStore((s) => s.favorites);
  const toggleFavorite = useStore((s) => s.toggleFavorite);
  const addToCart = useStore((s) => s.addToCart);

  const isFavorite = item ? favorites.includes(item.id) : false;

  if (!item) {
    return (
      <Text>No Item Found</Text>
    )
  }



  return (
    <SafeAreaView
      className='flex-1'
      edges={['top', 'left', 'right']}
      style={{
        backgroundColor: item.card_color,
      }}
    >
      <NavBar />
      <View className="flex-1 flex-col">
        <View className="max-h-80 flex justify-center items-center">
          <Image source={item?.product.product_image} />
        </View>
        <View
          className="detail-panel"
          style={{ paddingBottom: insets.bottom + 16 }}
        >
          <View className='flex-col gap-2'>
            <Text className='text-2xl'>{item.product.product_name}</Text>
            <View className='flex-row justify-between items-center'>
              <Text className='text-xl'>{item.shoe_pair}</Text>
              <Text className='text-xl font-semibold'>{formatCurrency(item.shoe_price)}</Text>
            </View>
          </View>
          <View className='detail-section'>
            <Text className='text-2xl'>Product Description</Text>
            <Text>{item.product.product_description}</Text>
          </View>

          <View className='detail-actions'>
            <TouchableOpacity
              onPress={() => item && toggleFavorite(item.id)}
              className='outline-button'>
              <Heart
                fill={isFavorite ? '#08A6FF' : 'none'}
                stroke={isFavorite ? '#08A6FF' : '#08A6FF'}
              />

            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => item && addToCart(item.id)}
              className='detail-button'>
              <Text className='text-white text-xl'>Add To Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StoreItem;
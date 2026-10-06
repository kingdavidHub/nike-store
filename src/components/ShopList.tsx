import { ScrollView, View, Text, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { clsx } from 'clsx';
import { getHeight, formatCurrency } from '../../lib/utils';
import { STORE } from '../../constants/data';
import { checkMarkIcon } from '@/assets/icon';

const TALL = 235;
const SHORT = 205;

export default function ShopList() {

  return (
    <ScrollView className="flex-1 pl-8 pr-8" contentContainerClassName="shoe-grid">
      {STORE.map((item, index) => (
        <Link
          key={item.id}
          href={{ pathname: '/store-items/[id]', params: { id: item.id } }}
          asChild
        >
          <Pressable
            className={clsx(
              'shoe-card',
              getHeight(index, TALL, SHORT) === TALL ? 'h-[265px]' : 'h-[235px]'
            )}
            style={{ backgroundColor: item.card_color }}
          >
            <View className="flex-row items-start justify-between">
              <View className="flex-col items-start">
                <Text className="text-2xl font-semibold">{item.shoe_color}</Text>
                <Text className="text-base font-light">{item.shoe_pair}</Text>
              </View>
              <Image source={checkMarkIcon} />
            </View>
            <View className="flex-1 items-center justify-center">
              <Image source={item.shoe_image} />
            </View>
            <View className="flex items-end">
              <Text>{formatCurrency(item.shoe_price)}</Text>
            </View>
          </Pressable>
        </Link>
      ))}
    </ScrollView>
  );
}
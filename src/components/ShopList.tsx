import { ScrollView, View, Text, Image } from 'react-native';
import { clsx } from 'clsx';
import { getHeight } from '../../lib/utils';
import { STORE } from '../../constants/data';
import { checkMarkIcon } from '@/assets/icon';

type Item = { id: string; label: string };

// const DATA: Item[] = Array.from({ length: 4 }, (_, i) => ({
//   id: String(i),
//   label: `Item ${i}`,
// }));

const TALL = 235;
const SHORT = 205;



export default function ShopList() {
  return (
    <ScrollView className="flex-1" contentContainerClassName="flex-row flex-wrap p-2 gap-3">
      {STORE.map((item, index) => (
        <View
          key={item.id}
          className={clsx(
            'w-[48%] rounded-3xl flex-col p-4 gap-2 relative',
            getHeight(index, TALL, SHORT) === TALL ? 'h-[265px]' : 'h-[235px]'
          )}
          style={{ backgroundColor: item.card_color }}
        >
          <View className='flex-row items-top justify-between'>
            <View className='flex-col items-start'>
              <Text className='text-2xl font-semibold'>{item.shoe_color}</Text>
              <Text className='text-md font-light'>{item.shoe_pair}</Text>
            </View>
            <Image source={checkMarkIcon} />
          </View>
          <View className={clsx(item.shoe_image_correction ? 'absolute left-1 bottom-3' : null)}>
            <Image source={item.shoe_image} />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
import { NewsProp } from "@Screens/NewsFlowStack/HomeScreen";
import clsx from "clsx";
import { View, Image, Text, TouchableHighlight, TouchableOpacity } from "react-native";
import RemixIcon from "react-native-remix-icon";

type NewsCardProps = {
  news: NewsProp;
  navigateToDetailScreen: (placeId: number) => void;
};

export default function NewsCard({ news, navigateToDetailScreen }: NewsCardProps) {
  return (
    <TouchableOpacity onPress={() => navigateToDetailScreen(news.id)}>
      <View className="flex-row w-full my-5   h-24">
        <View className=" w-[25%] aspect-[1] ">
          <Image
            resizeMode="cover"
            className="aspect-1 w-full h-full"
            source={{ uri: news.image }}
          />
        </View>
        <View className="w-[75%] px-3">
          <View className="flex-row justify-between">
            <Text className="capitalize color-white">{news.source}</Text>
            <Text className="capitalize color-white">{news.datetime}</Text>
          </View>
          <View className="mt-1">
            <Text numberOfLines={2} className="text-lg font-bold leading-snug color-white">
              {news.headline}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

import NewsCard from "App/Components/Molecules/NewsCard";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { useNewsModule } from "@Store/NewsModuleCtx";
import ScreenSurface from "@Components/Atoms/ScreenSurface";
import NavigationTopBar from "@Components/Atoms/NavigationTopBar";
import { useNavigation } from "@react-navigation/native";
import { NewsStackParamList } from "..";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { fetchMarketNews } from "@Api/apiClient";
import Storage from "App/Utils/Storage";
import RemixIcon from "react-native-remix-icon";

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<NewsStackParamList, "HomeScreen">;
};

export type NewsProp = {
  id: number;
  headline: string;
  summary: string;
  image: string;
  source?: string;
  datetime: string;
};

type AllNewsProp = NewsProp[];

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { allNews, navigateToDetailScreen, error, name, logout } = useHomeScreen(navigation);

  const renderItem = ({ item }: { item: NewsProp }) => {
    return (
      <NewsCard
        news={{
          image: item.image,
          headline: item.headline,
          source: item.source,
          summary: item.summary,
          id: item.id,
          datetime: item.datetime,
        }}
        navigateToDetailScreen={navigateToDetailScreen}
      />
    );
  };
  return (
    <ScreenSurface bg={"bg-black"}>
      <View className="">
        {/* <NavigationTopBar title="Hey" /> */}
        <View className="flex-row justify-between mt-10 mb-7 ">
          <Text className="text-left ml-2 text-3xl  color-white font-extrabold ">
            {`Hey ${name}`}
          </Text>
          <TouchableOpacity onPress={logout}>
            <RemixIcon name="logout-circle-line" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View className="mb-28 h-[80%]">
          {allNews.length > 0 ? (
            <FlatList
              data={allNews}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          ) : allNews.length === 0 && error ? (
            <View className="items-center mt-8 justify-center ">
              <Text className="color-white">{`${error} , Please try again later.`}</Text>
            </View>
          ) : (
            <View className="mt-8 items-center justify-center ">
              <Text className="color-white">Fetching data...</Text>
            </View>
          )}
        </View>
      </View>
    </ScreenSurface>
  );
}

type UseHomeScreenProps = {
  navigation: HomeScreenProps["navigation"];
};

function useHomeScreen(navigation: HomeScreenProps["navigation"]) {
  const { allNews, setNewsData, setAllNews } = useNewsModule();
  const [error, setError] = useState(undefined);
  const [name, setName] = useState("");

  useEffect(() => {
    (async () => {
      const name = await Storage.getItem("name", "");
      setName(name);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (allNews.length === 0) {
        const response = await fetchMarketNews();
        if (response?.data) {
          setNewsData(response.data);
        }
        if (response.error) {
          setError(response.error);
        }

        // console.log(data);
      }
    })();
  }, [allNews]);

  const navigateToDetailScreen = (id: number) => {
    const selectedPlace = allNews?.find((place) => place.id === id);
    if (!selectedPlace) return;
  };

  const logout = async () => {
    //Clear the name from storage
    await Storage.removeItem("name");
    navigation.navigate("PersonalInfoScreen");
  };
  return {
    allNews,
    navigateToDetailScreen,
    error,
    name,
    logout,
  };
}

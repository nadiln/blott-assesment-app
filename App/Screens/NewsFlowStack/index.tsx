import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen, { NewsProp } from "./HomeScreen";
import { NewsModuleProvider } from "App/Store/NewsModuleCtx";
import { NavigatorScreenParams } from "@react-navigation/native";
import PersonalInfoScreen from "./PersonalInfoScreen";
import NotificationPermissionScreen from "./NotificationPermissionScreen";
import { useEffect, useState } from "react";
import Storage from "App/Utils/Storage";

export type NewsStackParamList = {
  PersonalInfoScreen?: undefined;
  NotificationPermissionScreen?: undefined;
  HomeScreen?: undefined;
};

const NewsStack = createNativeStackNavigator<NewsStackParamList>();

export type NewsFlowStackProps = object;

function NewsFlowStack({}: NewsFlowStackProps) {
  //If the user has already entered their name, we will skip the PersonalInfoScreen
  const [initialRouteName, setInitialRouteName] = useState<undefined | keyof NewsStackParamList>(
    undefined
  );

  useEffect(() => {
    const checkInitialRoute = async () => {
      try {
        const value = await Storage.getItem("name", "");
        if (value !== "") {
          setInitialRouteName("HomeScreen");
        }
      } catch (error) {
        console.error("Error reading AsyncStorage value:", error);
      }
    };

    checkInitialRoute();
  }, []);

  console.log("initialRouteName", initialRouteName);

  if (initialRouteName === undefined) {
    return null;
  }

  return (
    <NewsModuleProvider>
      <NewsStack.Navigator
        id={undefined}
        initialRouteName={initialRouteName}
        screenOptions={{ headerShown: false }}>
        <NewsStack.Screen name="PersonalInfoScreen" component={PersonalInfoScreen} />
        <NewsStack.Screen
          name="NotificationPermissionScreen"
          component={NotificationPermissionScreen}
        />
        <NewsStack.Screen name="HomeScreen" component={HomeScreen} />
      </NewsStack.Navigator>
    </NewsModuleProvider>
  );
}

export default NewsFlowStack;

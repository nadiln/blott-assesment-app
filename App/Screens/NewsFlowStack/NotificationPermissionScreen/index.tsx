import ScreenSurface from "@Components/Atoms/ScreenSurface";
import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Notifications from "expo-notifications";
import { NewsStackParamList } from "..";

type NotificationPermissionScreenProps = {
  navigation: NativeStackNavigationProp<NewsStackParamList, "NotificationPermissionScreen">;
};

export default function NotificationPermissionScreen({
  navigation,
}: NotificationPermissionScreenProps) {
  const { requestNotificationPermission } = useNotificationScreen(navigation);

  return (
    <ScreenSurface>
      <View className="flex-1 justify-center items-center">
        <Image source={require("../../../../assets/notification_content.png")} />
      </View>
      <View className="mb-6 px-7">
        <TouchableOpacity
          onPress={requestNotificationPermission}
          className="bg-primary h-12 w-full rounded-full items-center justify-center">
          <Text className="color-white font-bold">Continue</Text>
        </TouchableOpacity>
      </View>
    </ScreenSurface>
  );
}

type UseNotificationScreenProps = NotificationPermissionScreenProps["navigation"];

function useNotificationScreen(navigation: UseNotificationScreenProps) {
  const requestNotificationPermission = async () => {
    console.log("Notification Permission..");
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }

    navigation.navigate("HomeScreen");
  };

  return {
    requestNotificationPermission,
  };
}

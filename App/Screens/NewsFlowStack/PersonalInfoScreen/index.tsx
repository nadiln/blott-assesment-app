import ScreenSurface from "@Components/Atoms/ScreenSurface";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import { NewsStackParamList } from "..";
import PersonalInfoForm from "./PersonalInfoForm";

type PersonalInfoScreenProps = {
  navigation: NativeStackNavigationProp<NewsStackParamList, "PersonalInfoScreen">;
};

export default function PersonalInfoScreen({ navigation }: PersonalInfoScreenProps) {
  const { navigateToScreen } = usePersonalInfoScreen(navigation);

  return (
    <ScreenSurface>
      <View className="flex-1 pb-2">
        <Text className="mt-5 mb-4 text-2xl font-bold text-left">Your legal name</Text>
        <Text className="mb-8 text-left">
          We need to know a bit about you so that we can create your account.
        </Text>
        <PersonalInfoForm navigateToScreen={navigateToScreen} />
      </View>
    </ScreenSurface>
  );
}

type UsePersonalInfoScreenProps = PersonalInfoScreenProps["navigation"];

function usePersonalInfoScreen(navigation: UsePersonalInfoScreenProps) {
  const navigateToScreen = () => {
    navigation.navigate("NotificationPermissionScreen");
  };

  return { navigateToScreen };
}

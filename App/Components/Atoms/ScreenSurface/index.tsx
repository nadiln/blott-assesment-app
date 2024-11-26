import clsx from "clsx";
import { View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

type ScreenSurfaceProps = React.PropsWithChildren<{
  bg?: string;
}>;

export default function ScreenSurface({ children, bg }: ScreenSurfaceProps) {
  const { top, bottom, left, right } = useSafeAreaInsets();
  return (
    <SafeAreaView className="flex-1">
      <View className={clsx("flex-1 px-5", bg ? bg : "bg-bg-screen-surface")}>
        {children}
        {/* <SafeAreaView> */}
        {/* <View className="flex-1 mx-4 bg-bg-screen-surface">{children}</View> */}
        {/* </SafeAreaView> */}
      </View>
    </SafeAreaView>
  );
}

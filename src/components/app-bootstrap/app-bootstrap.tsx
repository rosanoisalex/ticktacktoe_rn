import { View } from "react-native";
import React, { ReactElement, ReactNode } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

type AppBootstrapProps = {
  children: ReactNode;
};

export default function AppBootstrap({
  children,
}: AppBootstrapProps): ReactElement {
  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.preventAutoHideAsync();
  }, []);

  return <>{children}</>;
}

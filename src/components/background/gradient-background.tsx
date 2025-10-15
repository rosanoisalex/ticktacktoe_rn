import { ImageBackground, View } from "react-native";
import React, { ReactElement, ReactNode } from "react";

type GradientBackgroundProps = {
  children: ReactNode;
};

const IMG = {
  url: "https://e0.pxfuel.com/wallpapers/682/356/desktop-wallpaper-black-and-yellow-full-iphone-yellow-apple-thumbnail.jpg",
};

export default function GradientBackground({
  children,
}: GradientBackgroundProps): ReactElement {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={require("./bg.png")} />
      {children}
    </View>
  );
}

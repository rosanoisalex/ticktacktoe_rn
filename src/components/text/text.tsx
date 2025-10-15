import React, { ReactElement, ReactNode } from "react";
import { Text as NativeText, TextProps as NativeTextProps } from "react-native";

type TextProps = {
  weight?: "400" | "700"; // Make weight optional
  children: ReactNode;
} & NativeTextProps;

const defaultProps = {
  weight: "940" as const,
  // Specify the correct default value
};

export default function Text({
  children,
  style,
  weight, // Use default value if not provided
  ...props
}: TextProps): ReactElement {
  let fontFamily;
  fontFamily = "Arial";
  return (
    <NativeText {...props} style={[{ fontFamily }, style]}>
      {children}
    </NativeText>
  );
}

Text.defaultProps = defaultProps;

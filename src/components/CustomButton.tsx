import React, { JSX } from "react";
import {
  Dimensions,
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

type ButtonProps = {
  children: string | JSX.Element | JSX.Element[];
  onPressFunction: (e: GestureResponderEvent) => void;
  backgroundColor?: string;
  textColor?: string;
  width?: number;
  height?: number;
};

export default function CustomButton({
  children,
  onPressFunction,
  backgroundColor = "#febbba",
  textColor = "white",
  width,
  height = Dimensions.get("window").height / 17,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.connectionButton,
        {
          backgroundColor,
          height,
          width,
        },
      ]}
      onPress={onPressFunction}
    >
      <Text style={{ color: textColor ?? "white" }}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  connectionButton: {
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

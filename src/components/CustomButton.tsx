import React, { ReactNode } from "react";
import {
  Dimensions,
  DimensionValue,
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

type ButtonProps = {
  children: ReactNode;
  onPressFunction: () => void;
  backgroundColor?: string;
  textColor?: string;
  width?: DimensionValue;
  height?: DimensionValue;
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
          borderColor: backgroundColor,
          height,
          width,
          boxShadow: `5px 5px 5px ${backgroundColor}50`,
        },
      ]}
      onPress={onPressFunction}
    >
      <Text
        style={{ color: textColor ?? "white", fontFamily: "Poppins-Regular" }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  connectionButton: {
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
});

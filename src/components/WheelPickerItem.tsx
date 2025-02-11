import React from "react";
import {
  StyleProp,
  TextStyle,
  Animated,
  Text,
  ViewStyle,
  StyleSheet,
  Image,
} from "react-native";
import { WheelPickerOption } from "./WheelPicker";

// Code pompé sur : https://github.com/erksch/react-native-wheely

interface ItemProps {
  textStyle: StyleProp<TextStyle>;
  style: StyleProp<ViewStyle>;
  option: WheelPickerOption;
  height: number;
  index: number;
  currentScrollIndex: Animated.AnimatedAddition<any>;
  visibleRest: number;
  rotationFunction: (x: number) => number;
  opacityFunction: (x: number) => number;
  scaleFunction: (x: number) => number;
}

function WheelPickerItem({
  textStyle,
  style,
  height,
  option,
  index,
  visibleRest,
  currentScrollIndex,
  opacityFunction,
  rotationFunction,
  scaleFunction,
}) {
  const relativeScrollIndex = Animated.subtract(index, currentScrollIndex);

  const translateY = relativeScrollIndex.interpolate({
    inputRange: (() => {
      const range = [0];
      for (let i = 1; i <= visibleRest + 1; i++) {
        range.unshift(-i);
        range.push(i);
      }
      return range;
    })(),
    outputRange: (() => {
      const range = [0];
      for (let i = 1; i <= visibleRest + 1; i++) {
        let y =
          (height / 2) * (1 - Math.sin(Math.PI / 2 - rotationFunction(i)));
        for (let j = 1; j < i; j++) {
          y += height * (1 - Math.sin(Math.PI / 2 - rotationFunction(j)));
        }
        range.unshift(y);
        range.push(-y);
      }
      return range;
    })(),
  });

  const opacity = relativeScrollIndex.interpolate({
    inputRange: (() => {
      const range = [0];
      for (let i = 1; i <= visibleRest + 1; i++) {
        range.unshift(-i);
        range.push(i);
      }
      return range;
    })(),
    outputRange: (() => {
      const range = [1];
      for (let x = 1; x <= visibleRest + 1; x++) {
        const y = opacityFunction(x);
        range.unshift(y);
        range.push(y);
      }
      return range;
    })(),
  });

  const scale = relativeScrollIndex.interpolate({
    inputRange: (() => {
      const range = [0];
      for (let i = 1; i <= visibleRest + 1; i++) {
        range.unshift(-i);
        range.push(i);
      }
      return range;
    })(),
    outputRange: (() => {
      const range = [1.0];
      for (let x = 1; x <= visibleRest + 1; x++) {
        const y = scaleFunction(x);
        range.unshift(y);
        range.push(y);
      }
      return range;
    })(),
  });

  return (
    <Animated.View
      style={[
        styles.option,
        style,
        {
          height,
          opacity,
          transform: [{ translateY }, { scale }],
        },
      ]}
    >
      <Text style={[textStyle, { fontWeight: "500", fontSize: 18 }]}>
        {option?.titre}
      </Text>
      {option && (
        <Image
          style={{ width: 100, height: 100, margin: 10 }}
          source={option?.imageUrl}
        ></Image>
      )}
      <Text style={[textStyle, { fontWeight: "200" }]}>
        {option?.description}
      </Text>
    </Animated.View>
  );
}

export default React.memo(WheelPickerItem);

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  selectedIndicator: {
    position: "absolute",
    width: "100%",
    backgroundColor: "hsl(200, 8%, 94%)",
    borderRadius: 5,
    top: "50%",
  },
  scrollView: {
    overflow: "hidden",
    flex: 1,
  },
  option: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    zIndex: 100,
  },
});

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  StyleProp,
  TextStyle,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Animated,
  ViewStyle,
  View,
  ViewProps,
  FlatListProps,
  FlatList,
  StyleSheet,
} from "react-native";
import WheelPickerItem from "./WheelPickerItem";

// Code pompé sur : https://github.com/erksch/react-native-wheely

export type WheelPickerOption = {
  titre: string;
  description: string;
  imageUrl: string;
};

type WheelPickerProps = {
  selectedIndex: number;
  options: WheelPickerOption[];
  onChange: (index: number) => void;
  selectedIndicatorStyle?: StyleProp<ViewStyle>;
  itemTextStyle?: TextStyle;
  itemStyle?: ViewStyle;
  itemHeight?: number;
  containerStyle?: ViewStyle;
  containerProps?: Omit<ViewProps, "style">;
  scaleFunction?: (x: number) => number;
  rotationFunction?: (x: number) => number;
  opacityFunction?: (x: number) => number;
  visibleRest?: number;
  decelerationRate?: "normal" | "fast" | number;
  flatListProps?: Omit<FlatListProps<string | null>, "data" | "renderItem">;
};

export default function WheelPicker({
  selectedIndex,
  options,
  onChange,
  selectedIndicatorStyle = {},
  containerStyle = {},
  itemStyle = {},
  itemTextStyle = {},
  itemHeight = 40,
  scaleFunction = (x: number) => 1.0 ** x,
  rotationFunction = (x: number) => 1 - Math.pow(1 / 2, x),
  opacityFunction = (x: number) => Math.pow(1 / 3, x),
  visibleRest = 2,
  decelerationRate = "fast",
  containerProps = {},
  flatListProps = {},
}: WheelPickerProps) {
  const flatListRef = useRef<FlatList>(null);
  const [scrollY] = useState(new Animated.Value(0));

  const containerHeight = (1 + visibleRest * 2) * itemHeight;

  const paddedOptions = useMemo(() => {
    const array: (WheelPickerOption | null)[] = [...options];
    for (let i = 0; i < visibleRest; i++) {
      array.unshift(null);
      array.push(null);
    }
    return array;
  }, [options, visibleRest]);

  const offsets = useMemo(
    () => [...Array(paddedOptions.length)].map((x, i) => i * itemHeight),
    [paddedOptions, itemHeight]
  );

  const currentScrollIndex = useMemo(
    () => Animated.add(Animated.divide(scrollY, itemHeight), visibleRest),
    [visibleRest, scrollY, itemHeight]
  );

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const offsetY = Math.min(
      itemHeight * (options.length - 1),
      Math.max(event.nativeEvent.contentOffset.y, 0)
    );

    let index = Math.floor(Math.floor(offsetY) / itemHeight);
    const last = Math.floor(offsetY % itemHeight);
    if (last > itemHeight / 2) index++;

    if (index !== selectedIndex) {
      onChange(index);
    }
  };

  useEffect(() => {
    if (selectedIndex < 0 || selectedIndex >= options.length) {
      throw new Error(
        `Selected index ${selectedIndex} is out of bounds [0, ${
          options.length - 1
        }]`
      );
    }
  }, [selectedIndex, options]);

  /**
   * If selectedIndex is changed from outside (not via onChange) we need to scroll to the specified index.
   * This ensures that what the user sees as selected in the picker always corresponds to the value state.
   */
  useEffect(() => {
    flatListRef.current?.scrollToIndex({
      index: selectedIndex,
      animated: false,
    });
  }, [selectedIndex]);

  return (
    <View
      style={[styles.container, { height: containerHeight }, containerStyle]}
      {...containerProps}
    >
      <View
        style={[
          styles.selectedIndicator,
          selectedIndicatorStyle,
          {
            transform: [{ translateY: -itemHeight / 2 }],
            height: itemHeight,
          },
        ]}
      />
      <Animated.FlatList
        {...flatListProps}
        ref={flatListRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        snapToOffsets={offsets}
        decelerationRate={decelerationRate}
        initialScrollIndex={selectedIndex}
        getItemLayout={(data, index) => ({
          length: itemHeight,
          offset: itemHeight * index,
          index,
        })}
        data={paddedOptions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item: option, index }) => (
          <WheelPickerItem
            key={`option-${index}`}
            index={index}
            option={option}
            style={itemStyle}
            textStyle={itemTextStyle}
            height={itemHeight}
            currentScrollIndex={currentScrollIndex}
            scaleFunction={scaleFunction}
            rotationFunction={rotationFunction}
            opacityFunction={opacityFunction}
            visibleRest={visibleRest}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  selectedIndicator: {
    position: "absolute",
    width: "100%",
    backgroundColor: "#52525210",
    // backgroundColor: "#febbba25",
    // backgroundColor: "hsl(200, 8%, 94%)",
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

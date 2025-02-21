import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

type ArrowSkipProps = {
  skipTo: string | undefined;
};

function ArrowSkip({ skipTo }: ArrowSkipProps) {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(skipTo);
      }}
    >
      <MaterialCommunityIcons
        name="arrow-right-drop-circle-outline"
        size={40}
        color="#525252"
        style={{ opacity: 0.4 }}
      ></MaterialCommunityIcons>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});

export default ArrowSkip;

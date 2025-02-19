import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type ArrowSkipProps = {
  skipTo: string | undefined;
};

function ArrowSkip({ skipTo }: ArrowSkipProps) {
  const navigation = useNavigation<any>();

  function handleSkipPage() {
    navigation.navigate(skipTo);
  }

  return (
    <TouchableOpacity onPress={handleSkipPage}>
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

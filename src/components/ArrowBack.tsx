import React from "react";
import {
    Button,
    Text,
    TextInput,
    View,
    StyleSheet,
    TouchableOpacity,
  } from "react-native";
  import { MaterialCommunityIcons } from "@expo/vector-icons";
  
  type ArrowBackProps = {
    onPress: (()=> void)
  };
  function ArrowBack(props: ArrowBackProps) {
    return (
      <TouchableOpacity onPress= {props.onPress} style={styles.container}>
       <MaterialCommunityIcons
       name = "arrow-left-drop-circle-outline"
       size = {40}
       color= "#525252">
         </MaterialCommunityIcons>
      </TouchableOpacity>
    );
  }
  
  const styles = StyleSheet.create({
    container: {

    },
  });

export default ArrowBack;
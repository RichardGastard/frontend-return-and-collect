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
 import { useNavigation } from "@react-navigation/native";
  
  
  function ArrowBack() {
    const navigation = useNavigation();

    return (
      <TouchableOpacity onPress= {()=>navigation.goBack()}>
       <MaterialCommunityIcons
       name = "arrow-left-drop-circle-outline"
       size = {40}
       color= "#525252">
         </MaterialCommunityIcons>
      </TouchableOpacity>
    );
  }
  
  const styles = StyleSheet.create({
    
  });

export default ArrowBack;
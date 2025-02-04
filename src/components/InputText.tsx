import React from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

type InputTextProps = {
  placeholder: string;
  name: string;
};

function InputText(props: InputTextProps) {
  return (
    <View style={styles.container}>
      <TextInput placeholder={props.placeholder} id={props.name}></TextInput>;
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
export default InputText;

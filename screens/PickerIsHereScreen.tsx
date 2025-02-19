import { useState, useRef } from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { FontAwesome, FontAwesome5 } from "react-native-vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { SafeAreaView } from "react-native-safe-area-context";
import ArrowBack from "@/components/ArrowBack";
import CustomButton from "@/components/CustomButton";
import CustomModal from "@/components/Modal";

function PickerIsHereScreen() {
  const [isModalVisible, setModalVisible] = useState(false);

//   const handleSecretCode = () => {
//     setModalVisible(!isModalVisible);
//   };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        // keyboardVerticalOffset={keyboardHeight}
      >
        <ScrollView
          style={{ overflow: "visible" }}
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
        >
          <View>
            <View style={styles.header}>
              <ArrowBack></ArrowBack>
              <Text style={styles.title}>Le Collecteur est Arrivé</Text>
            </View>
            <View style={styles.backgroundbell}>
              <View style={styles.bell}>
                <FontAwesome
                  style={styles.fontbell}
                  name={"bell"}
                  size={200}
                  color="gray"
                />
              </View>
            </View>
            <View style={styles.code}>
              <CustomButton onPressFunction={() => setModalVisible(true)}>
                Secret Code
              </CustomButton>
              <CustomModal isVisible={isModalVisible} onClose={() => setModalVisible(false)} title="Voici le Code">
            <TouchableOpacity  onPress={() => setModalVisible(false)}>
            <MaterialCommunityIcons
        name="alpha-x-box"
        size={30}
        color="#525252"
        style={{ opacity: 0.4 }}
      ></MaterialCommunityIcons>
            </TouchableOpacity>
            <View style={styles.validationcode}>
                <Text>1234</Text>
            </View>
      </CustomModal>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffbf0",
    padding: 20,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    fontSize: 30,
    color: "#525252",
    marginLeft: 30,
  },
  backgroundbell: {
    borderWidth: 1,
    marginTop: 20,
    height: 450,
    backgroundColor: "rgb(208, 207, 207)",
    alignItems: "center",
    flexDirection: "column",
  },
  bell: {
    alignItems: "center",
    marginTop: 100,
    height: 250,
  },
  fontbell: {},
  text: {
    marginTop: 25,
    fontSize: 30,
  },
  code: {
    marginTop: 50,
  },
  validationcode: {
    borderWidth: 1,
    marginTop: 20,
    height: 20,
  }
});

export default PickerIsHereScreen;

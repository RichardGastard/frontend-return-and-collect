import { useState, useRef } from "react";
import { StyleSheet } from "react-native";
import Layout from "@/components/Layout";

import { FontAwesome, FontAwesome5 } from "react-native-vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { SafeAreaView } from "react-native-safe-area-context";
import ArrowBack from "@/components/ArrowBack";
import CustomButton from "@/components/CustomButton";
import CustomModal from "@/components/Modal";

function PickerIsHereScreen() {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleSecretCode = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <Layout
      title="Votre collecteur est arrivé"
      description="Veuillez donner le code secret à votre collecteur"
      arrowBack
    >
      <CustomButton onPressFunction={() => setModalVisible(true)}>
        Afficher votre code secret
      </CustomButton>
    </Layout>
    // <SafeAreaView style={styles.container}>
    //   <KeyboardAvoidingView
    //     behavior={Platform.OS === "ios" ? "padding" : "height"}
    //     style={{ flex: 1 }}
    //     // keyboardVerticalOffset={keyboardHeight}
    //   >
    //     <ScrollView
    //       style={{ overflow: "visible" }}
    //       keyboardDismissMode="interactive"
    //       keyboardShouldPersistTaps="handled"
    //     >
    //       <View>
    //         <View style={styles.header}>
    //           <ArrowBack></ArrowBack>
    //           <Text style={styles.title}>Le Collecteur est Arrivé</Text>
    //         </View>
    //         <View style={styles.backgroundbell}>
    //           <View style={styles.bell}>
    //             <FontAwesome
    //               style={styles.fontbell}
    //               name={"bell"}
    //               size={200}
    //               color="gray"
    //             />
    //           </View>
    //         </View>
    //         <View style={styles.code}>
    //           <CustomButton onPressFunction={() => setModalVisible(true)}>
    //             Secret Code
    //           </CustomButton>
    //           <CustomModal
    //             isVisible={isModalVisible}
    //             onClose={() => setModalVisible(false)}
    //             title="Voici le Code"
    //             code={1234}
    //           >

    //             <CustomButton
    //             onPressFunction={() => setModalVisible(false)} width={100}>Close</CustomButton>
    //           </CustomModal>
    //         </View>
    //       </View>
    //     </ScrollView>
    //   </KeyboardAvoidingView>
    // </SafeAreaView>
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
    marginTop: 20,
    height: 20,
  },
  closeText: {
    color: "white",
    textAlign: "center",
  },
});

export default PickerIsHereScreen;

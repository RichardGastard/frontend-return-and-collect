import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  code: number,
  children?: React.ReactNode;
}

const CustomModal: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  title,
  code,
  children,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <View style={styles.container}>
        {title && <Text style={styles.title}>{title}</Text>}
        <Text style={styles.secretCode}>{code}</Text>
        <View style={styles.content}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fffbf0",
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems:"center",
    position: "absolute",
    height: 130,
    width: 150,
    alignSelf: "center"
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    position: "absolute",
    top: 5,
    left: 0,
    right: 0,
    textAlign: "center",
    paddingVertical: 5,
  },
  secretCode: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    height: 30,
  },
});

export default CustomModal;

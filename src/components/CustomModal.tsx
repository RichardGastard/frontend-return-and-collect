import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import CustomButton from "./CustomButton";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  code: string;
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
    alignItems: "center",
    height: 180,
    width: 180,
    alignSelf: "center",
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: "Public-Sans-Bold",
    textAlign: "center",
  },
  secretCode: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    top: 10,
  },
  content: {
    height: 30,
    marginBottom: 50,
  },
});

export default CustomModal;

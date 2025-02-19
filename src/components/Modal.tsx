import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

const CustomModal: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  title,
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
        <View style={styles.content}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fffbf0",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    height: 100,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    borderWidth:1,
    height: 30,
    marginTop: 10,
  },
  content: {
    borderWidth:1,
    height: 30,
    marginTop: 10,
  },
});

export default CustomModal;

import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Dimensions,
  FlatList,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Code source: https://medium.com/@mindelias/building-a-custom-dropdown-menu-in-react-native-a-step-by-step-guide-939b5f16627b

interface DropdownMenuProps {
  options: string[];
  onChange: (option: string) => void;
  placeholder: string;
}

export default function DropdownMenu({
  onChange,
  options = ["Aucune option"],
  placeholder = "Sélectionnez une option",
}: DropdownMenuProps) {
  const dropdownRef = useRef<View>(null);
  const [position, setPosition] = useState({ x: 0, y: 0, width: 0 });
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(placeholder);

  useEffect(() => {
    if (dropdownRef.current && visible) {
      dropdownRef.current.measure((fx, fy, width, height, px, py) => {
        setPosition({
          x: px,
          y: py + height,
          width: width,
        });
      });
    }
  }, [visible]);

  const onSelect = useCallback((item) => {
    onChange(item);
    setSelectedItem(item);
    setVisible(false);
  }, []);

  const toggleVisible = useCallback(() => setVisible(!visible), [visible]);

  return (
    <View>
      <TouchableWithoutFeedback onPress={toggleVisible}>
        <View ref={dropdownRef} style={styles.dropdownStyle}>
          <Text>{selectedItem}</Text>
          <MaterialCommunityIcons
            name={visible ? "chevron-up" : "chevron-down"}
            size={22}
            color="#aaa"
          ></MaterialCommunityIcons>
        </View>
      </TouchableWithoutFeedback>
      {visible && (
        <Modal transparent={true} visible={visible} animationType="fade">
          <TouchableWithoutFeedback onPress={() => setVisible(false)}>
            <View style={styles.modalOverlay}>
              <View
                style={[
                  styles.optionStyle,
                  {
                    top: position.y + (Platform.OS === "android" ? -32 : 3),
                    left: position.x,
                    width: position.width,
                    maxHeight:
                      Dimensions.get("screen").height - position.y - 50,
                  },
                ]}
              >
                <FlatList
                  data={options}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => onSelect(item)}
                      style={styles.option}
                    >
                      <Text>{item}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  option: {
    backgroundColor: "#fffbf0",
    width: "100%",
    padding: 12,
    fontSize: 14,
  },
  optionStyle: {
    backgroundColor: "#fffbf0",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "scroll",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  dropdownStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: "#fffbf0",
  },
});

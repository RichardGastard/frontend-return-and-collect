import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";

type InputProps = {
  placeholder: string;
  keyboardType: any;
  label: string;
};

export default function Input({ label, keyboardType }: InputProps) {
  // permet de cacher le password si label contient 'de passe'
  const [passwordSecured, setPasswordSecured] = useState<boolean>(true);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TextInput
          style={styles.input}
          placeholder={`Mettre son ${label.toLowerCase()}...`} // reprend le label pour rajouter dans le placeholder
          keyboardType={keyboardType}
          secureTextEntry={
            label.includes("de passe") ? passwordSecured : !passwordSecured
          } // securise la string lorsque le label inclu 'de passe'
        />
        {label.includes("de passe") && (
          <View style={{ position: "absolute", right: 10 }}>
            {/* permet d'avoir l'icon oeil dans le input */}
            <TouchableOpacity
              onPress={() => {
                setPasswordSecured(!passwordSecured); // change l'icon pour voir le mot de passe
              }}
            >
              <MaterialCommunityIcons
                name={passwordSecured ? "eye" : "eye-off"} // switch icon oeil le mot de passe
                size={22}
                color="#aaa"
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    color: "#525252",
    marginBottom: 4,
    position: "relative",
    borderWidth: 0,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    width: "100%",
    backgroundColor: "#fffbf0",
  },
});

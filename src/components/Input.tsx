import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { TextInput } from "react-native-paper";

// TODO //
// faire un champ auto completion pour les adresses

type InputProps = {
  keyboardType?: string;
  label: string;
};

export default function Input({
  label,
  keyboardType = "none",
  ...props
}: InputProps) {
  // permet de cacher le password si label contient 'mot de passe' ou 'password'
  const [passwordSecured, setPasswordSecured] = useState<boolean>(true);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextInput
          style={styles.input}
          mode="outlined"
          label={label}
          placeholder={`Mettre son ${label.toLowerCase()}...`} // reprend le label pour rajouter dans le placeholder
          outlineColor="#525252" // ligne extérieure
          selectionColor="febbba" // curseur
          cursorColor="#febbba"
          activeOutlineColor="#febbba"
          textColor="#525252"
          secureTextEntry={
            label.toLowerCase().includes("mot de passe") ||
            label.toLowerCase().includes("password")
              ? passwordSecured
              : !passwordSecured
          } // securise la string lorsque le label inclu 'mot de passe' ou 'password'
          {...props}
        />
        {(label.toLowerCase().includes("mot de passe") ||
          label.toLowerCase().includes("password")) && (
          <View
            style={{
              position: "absolute",
              right: 15,
              alignItems: "center",
              top: 19,
            }}
          >
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
    backgroundColor: "#fffbf0",
    color: "#525252",
    width: "100%",
    justifyContent: "center",
  },
});

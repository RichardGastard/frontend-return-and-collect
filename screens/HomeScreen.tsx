import { useState } from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import Checkbox from "expo-checkbox"; // because Checkbox has been removed from react-native

function HomeScreen() {
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [isChecked, setIsChecked] = useState<Boolean>(false);

  const handleSubmit = () => {
    console.log(email);
  };

  const handleSelected = () => {
    if (!isChecked) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Connexion [TITLE]</Text>
        <Text>Bienvenue ! Entrez vos informations</Text>
      </View>
      <TextInput
        onChangeText={(value) => setEmail(value)}
        value={email}
        placeholder="Mettre ton email..."
      />
      <TextInput
        onChangeText={(value) => setPassword(value)}
        value={password}
        placeholder="Mettre ton mot de passe..."
      />
      <Checkbox value={isChecked} onValueChange={setIsChecked} />
      <Button title="Se connecter" onPress={() => handleSubmit()} />
      <Button title="Connexion Google" />
      <View>
        <TouchableOpacity>
          <Text>Création de compte ?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  bigBlue: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 30,
  },
  red: {
    color: "red",
  },
});

export default HomeScreen;

import { useState } from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";

import InputText from "@/components/InputText";

import Checkbox from "expo-checkbox"; // because Checkbox has been removed from react-native
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

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
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.logoView}>
          <Image
            source={require("../assets/logo-without-bg.png")}
            style={styles.logo}
          />
        </View>
        <View>
          <View style={styles.header}>
            <Text style={styles.title}>Connexion</Text>
            <Text style={styles.description}>
              Bienvenue, entrez vos informations
            </Text>
          </View>
          <View style={styles.inputs}>
            <View>
              <Text style={{ fontSize: 16 }}>Email</Text>
              <TextInput
                onChangeText={(value) => setEmail(value)}
                value={email}
                placeholder="Mettre ton email..."
                style={styles.input}
              />
            </View>

            <View>
              <Text style={{ fontSize: 16 }}>Mot de passe</Text>
              <TextInput
                onChangeText={(value) => setPassword(value)}
                value={password}
                placeholder="Mettre ton mot de passe..."
                style={styles.input}
              />
            </View>
          </View>
          <View style={styles.tips}>
            <View>
              <Checkbox value={isChecked} onValueChange={setIsChecked} />
              <Text>Se souvenir de moi</Text>
            </View>
            <TouchableOpacity>
              <Text>Mot de passe oublié ?</Text>
            </TouchableOpacity>
          </View>

          <Button title="Se connecter" onPress={() => handleSubmit()} />
          <Button title="Connexion Google" />
          <View>
            <TouchableOpacity>
              <Text>Création de compte ?</Text>
            </TouchableOpacity>
          </View>
          <InputText placeholder="jfjdkjfdk" />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffbf0",
  },
  image: {
    flex: 1,
    backgroundColor: "#fffbf0",
    opacity: 30,
  },
  logo: {
    width: 200,
    height: 200,
  },
  logoView: {
    alignItems: "center",
  },
  header: {
    borderColor: "red",
    borderWidth: 1,
  },
  title: {
    fontSize: 36,
    color: "#525252",
  },
  description: {
    color: "#525252",
  },
  inputs: {
    marginTop: 35,
    width: "97%",
    justifyContent: "space-between",
    marginRight: "auto",
    marginLeft: "auto",
    gap: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  input: {
    borderColor: "#525252",
    borderWidth: 1,
    borderRadius: 5,
    height: 35,
    paddingHorizontal: 10,
  },
  tips: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
});

export default HomeScreen;

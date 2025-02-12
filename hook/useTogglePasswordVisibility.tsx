import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const useTogglePasswordVisibility = () => {
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(true);

  const [rightIcon, setRightIcon] = useState<keyof typeof MaterialCommunityIcons.glyphMap
  >("eye");

  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "eye-off") {
      setRightIcon("eye");
      setPasswordVisibility(!passwordVisibility);
    }
  };

  return {
    passwordVisibility,
    rightIcon,
    handlePasswordVisibility,
  };
};

//  Glyphmap vient lister les valeurs dispos pour 'name ='   keyof typeof MaterialCommunityIcons.glyphMap

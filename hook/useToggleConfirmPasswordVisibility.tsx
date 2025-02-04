import { useState } from "react";

export const useToggleConfirmPasswordVisibility = () => {
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState<boolean>(true);
  const [icon, setRightIcon] = useState<string>("eye");

  const handleConfirmPasswordVisibility = () => {
    if (icon === "eye") {
      setRightIcon("eye-off");
      setConfirmPasswordVisibility(!confirmPasswordVisibility);
    } else if (icon === "eye-off") {
      setRightIcon("eye");
      setConfirmPasswordVisibility(!confirmPasswordVisibility);
    }
  };

  return {
    confirmPasswordVisibility,
    icon,
    handleConfirmPasswordVisibility,
  };
};

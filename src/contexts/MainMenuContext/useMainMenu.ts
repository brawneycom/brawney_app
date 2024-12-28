import { useContext } from "react";
import { MainMenuContext } from "./MainMenuContext";

export const useMainMenu = () => useContext(MainMenuContext);

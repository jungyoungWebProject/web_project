import { UserCredential } from "firebase/auth";
import { atom } from "recoil";
import { v1 } from "uuid";

export type themeType = "DarkTheme" | "LightTheme";

export const mood = atom<themeType>({
  key: `theme`,
  default: "DarkTheme",
});

export const selectedOptions = atom({
  key: `selectedOptions/${v1()}`,
  default: "tranding",
});

export const loginData = atom<UserCredential | null>({
  key: `loginData/${v1()}`,
  default: null,
});

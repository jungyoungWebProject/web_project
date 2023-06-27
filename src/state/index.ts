import { User } from "firebase/auth";
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

export const loginData = atom<User | null>({
  key: `loginData/${v1()}`,
  default: null,
});

export const showLoginPopup = atom<boolean>({
  key: `showLoginPopup${v1()}`,
  default: false,
});

export const markdownText = atom<object>({
  key: "markdown",
  default: {
    title: "",
    paragraph: "",
  },
});

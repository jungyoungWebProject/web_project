import { UserCredential } from "firebase/auth";
import { atom } from "recoil";
import { v1 } from "uuid";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export type themeType = "DarkTheme" | "LightTheme";

export const mood = atom<themeType>({
  key: `theme`,
  default: "DarkTheme",
  effects_UNSTABLE: [persistAtom],
});

export const selectedOptions = atom({
  key: `selectedOptions/${v1()}`,
  default: "tranding",
});

export const loginData = atom<UserCredential | null>({
  key: `loginData/${v1()}`,
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const showLoginPopup = atom<boolean>({
  key: `showLoginPopup${v1()}`,
  default: false,
});

export const markdownText = atom({
  key: "markdown",
  default: {
    title: "",
    paragraph: "",
  },
});

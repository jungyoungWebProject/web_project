import { UserCredential } from "firebase/auth";
import { atom } from "recoil";
import { v1 } from "uuid";

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);
    // setSelf -> Callbacks to set or reset the value of the atom.
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    // onSet -> Subscribe to changes in the atom value.
    onSet((newValue: any, _: any, isReset: boolean) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export type themeType = "DarkTheme" | "LightTheme";

export const mood = atom<themeType>({
  key: `theme`,
  default: "DarkTheme",
  effects: [localStorageEffect("theme")],
});

export const selectedOptions = atom({
  key: `selectedOptions/${v1()}`,
  default: "tranding",
});

export const loginData = atom<UserCredential | null>({
  key: `loginData/${v1()}`,
  default: null,
  effects: [localStorageEffect("loginData")],
});

export const showLoginPopup = atom<boolean>({
  key: `showLoginPopup${v1()}`,
  default: false,
});

export const markdownText = atom({
  key: `markdown${v1()}`,
  default: {
    title: "",
    paragraph: "",
  },
});

export const showQuickMenu = atom<boolean>({
  key: `showQuickMenu${v1()}`,
  default: false,
});

export const showPublishPage = atom<boolean>({
  key: `showPublishPage${v1()}`,
  default: false,
});

export const postData = atom({
  key: `postData${v1()}`,
  default: {
    id: v1(),
    wuser: "",
    title: "",
    summary: "",
    paragraph: "",
    mainimgurl: "",
    date: "",
    postUrl: "",
    public: true,
  },
});

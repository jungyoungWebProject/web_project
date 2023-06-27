import { loginData, mood } from "state";
import { useRecoilState } from "recoil";

function setState() {
  const [userData, setUserData] = useRecoilState(loginData);
  const [theme, setTheme] = useRecoilState(mood);

  const udata = JSON.parse(localStorage.getItem("recoil-persist"));
}

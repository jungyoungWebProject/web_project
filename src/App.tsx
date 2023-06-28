import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as P from "./pages/index";
import { useRecoilValue } from "recoil";
import { loginData, mood, themeType } from "state/index";
import styled from "styled-components";
import * as S from "style";

export default function App() {
  const theme = useRecoilValue(mood);
  const LoginData = useRecoilValue(loginData);

  return (
    <Body mood={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<P.MainPage />}></Route>
          <Route path="/recent" element={<P.MainPage />}></Route>
          <Route path="/write" element={<P.WritingPage />}></Route>
          <Route
            path={`/@${LoginData?.user.email?.slice(
              0,
              LoginData?.user.email?.indexOf("@")
            )}`}
            element={<P.ShowPost></P.ShowPost>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </Body>
  );
}

const Body = styled.body<{ mood: themeType }>`
  background-color: ${(props) => S[props.mood].BgColor};

  height: max-content;
  width: 100vw;

  box-sizing: border-box;

  display: flex;
  justify-content: center;
`;

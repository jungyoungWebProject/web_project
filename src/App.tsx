import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as P from "./pages/index";
import { useRecoilValue } from "recoil";
import { mood, themeType } from "state/index";
import styled from "styled-components";
import * as S from "style";

export default function App() {
  const theme = useRecoilValue(mood);

  return (
    <Body mood={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<P.MainPage />}></Route>
          <Route path="/recent" element={<P.MainPage />}></Route>
          <Route path="/write" element={<P.WritingPage />}></Route>
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

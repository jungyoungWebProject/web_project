import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as P from "./pages/index";
import * as C from "components/index";
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
          <Route
            path="/"
            element={
              <P.MainPage
                children={
                  <>
                    <C.Post />
                    <C.Post />
                    <C.Post />
                    <C.Post />
                    <C.Post />
                    <C.Post />
                    <C.Post />
                  </>
                }
              />
            }
          ></Route>
          <Route
            path="/recent"
            element={<P.MainPage children={<></>} />}
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

  transition-timing-function: ease-out;
  transition-duration: 0.1s;

  box-sizing: border-box;

  display: flex;
  justify-content: center;
`;

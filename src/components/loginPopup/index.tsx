import { mood, themeType, loginData } from "state/index";
import { useRecoilValue, useRecoilState } from "recoil";
import * as C from "style";
import styled from "styled-components";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function Post() {
  const theme = useRecoilValue(mood);
  const [postData, setPostData] = useRecoilState(loginData);

  function handleGoogleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((data) => {
        setPostData(data);
        console.log(postData);
      })
      .catch((err) => {
        console.log("굿조맛탱탱탱탱볼", err);
      });
  }

  return (
    <Container mood={theme}>
      <LoginContainer mood={theme}>
        <LoginContainerIcon mood={theme}></LoginContainerIcon>
        <LoginContainerInput mood={theme}></LoginContainerInput>
        <CloseBtn></CloseBtn>
      </LoginContainer>
    </Container>
  );
}

const Container = styled.div<{ mood: themeType }>`
  width: 100vw;
  height: 100vh;

  position: absolute;
  left: 0%;
  top: 0%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => C[props.mood].BgColor};
  opacity: 0.4;
`;

const LoginContainer = styled.div<{ mood: themeType }>`
  width: 606px;
  height: 530px;

  background-color: ${(props) => C[props.mood].BgColor};
`;

const LoginContainerIcon = styled.div<{ mood: themeType }>`
  width: 216px;
  height: 530px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => C[props.mood].BgColor};
`;

const LoginContainerInput = styled.div<{ mood: themeType }>`
  width: 390px;
  height: 530px;

  display: flex;
  justify-self: center;
  align-items: center;
`;

const CloseBtn = styled.div``;

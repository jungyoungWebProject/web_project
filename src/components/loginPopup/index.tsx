import { mood, themeType, loginData, showLoginPopup } from "state/index";
import { useRecoilValue, useRecoilState } from "recoil";
import * as C from "style";
import styled from "styled-components";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function Post() {
  const theme = useRecoilValue(mood);
  const [postData, setPostData] = useRecoilState(loginData);
  const [ShowLoginPopup, setShowLoginPopup] = useRecoilState(showLoginPopup);

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
    <>
      {ShowLoginPopup && (
        <Container mood={theme}>
          <LoginContainer mood={theme}>
            <LoginContainerIcon mood={theme}></LoginContainerIcon>
            <LoginContainerInput mood={theme}></LoginContainerInput>
            <CloseBtn
              onClick={() => {
                setShowLoginPopup(!ShowLoginPopup);
              }}
            ></CloseBtn>
          </LoginContainer>
        </Container>
      )}
    </>
  );
}

const Container = styled.div<{ mood: themeType }>`
  width: 100%;
  height: 100%;

  position: absolute;
  left: 0%;
  top: 0%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => C[props.mood].LoginBgColor};
  z-index: 1;
`;

const LoginContainer = styled.div<{ mood: themeType }>`
  width: 606px;
  height: 530px;

  position: relative;

  display: flex;

  border-radius: 5px;
  overflow: hidden;

  box-shadow: 0px 0px 10px ${(props) => C[props.mood].ShadowColor};
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
  background-color: ${(props) => C[props.mood].BtnColor1};
`;

const CloseBtn = styled.div`
  width: 24px;
  height: 24px;

  position: absolute;
  right: 30px;
  top: 30px;

  background-size: cover;
  background-repeat: no-repeat;

  background: url("images/loginpopup/closeBtn.jpg");

  &:hover {
    cursor: pointer;
  }
`;

import { mood, themeType, loginData, showLoginPopup } from "state/index";
import { useRecoilValue, useRecoilState } from "recoil";
import * as C from "style";
import styled from "styled-components";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useEffect } from "react";

export default function Post() {
  const theme = useRecoilValue(mood);
  const [postData, setPostData] = useRecoilState(loginData);
  const [ShowLoginPopup, setShowLoginPopup] = useRecoilState(showLoginPopup);
  const [data, setData] = useRecoilState(loginData);

  useEffect(() => {
    const getRedirectLoginResult = async () => {
      try {
        const result = await getRedirectResult(auth);

        if (result?.user) {
          // 사용자 정보 확인
          setData(result);
          console.log("연동성공");
          window.location.reload();
        } else {
          console.log("연동실패");
        }
      } catch (error) {
        console.log("연동실패", error);
      }
    };

    getRedirectLoginResult();
  }, [auth]);

  async function GetGoogleLogin() {
    setShowLoginPopup(!ShowLoginPopup);
    const provider = new GoogleAuthProvider();

    await signInWithRedirect(auth, provider);
    window.location.reload();
  }

  return (
    <>
      {ShowLoginPopup && (
        <Container mood={theme}>
          <LoginContainer mood={theme}>
            <LoginContainerIcon mood={theme}>
              <IconDiv>
                <MainIcon />
                환영합니다!
              </IconDiv>
            </LoginContainerIcon>
            <LoginContainerInput mood={theme}>
              <LoginInput>
                <LoginTitle mood={theme}>로그인</LoginTitle>
                <LoginOption mood={theme}>이메일로 로그인</LoginOption>
                <InputDiv>
                  <EmailInput
                    placeholder="이메일을 입력하세요."
                    mood={theme}
                  ></EmailInput>
                  <EmailSubmitBtn>로그인</EmailSubmitBtn>
                </InputDiv>
                <LoginOption mood={theme}>소셜 계정으로 로그인</LoginOption>
                <OAuthIconDiv>
                  <GoogleOAuthBtn onClick={GetGoogleLogin} />
                </OAuthIconDiv>
              </LoginInput>
            </LoginContainerInput>
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
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => C[props.mood].BgColor};
  color: ${(props) => C[props.mood].TextColor3};
`;

const MainIcon = styled.div`
  width: 168px;
  height: 108px;

  background-image: url("images/loginpopup/Welcome!.svg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const IconDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 24px;

  font-size: 1.75rem;
  font-weight: 600;
`;

const LoginContainerInput = styled.div<{ mood: themeType }>`
  width: 390px;
  height: 530px;

  display: flex;

  position: relative;

  box-sizing: border-box;
  padding: 24px;

  background-color: ${(props) => C[props.mood].BtnColor1};
`;

const LoginInput = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const LoginTitle = styled.h2<{ mood: themeType }>`
  font-size: 1.3125rem;
  color: ${(props) => C[props.mood].TextColor1};

  margin: 62px 0px 0px 0px;
`;

const LoginOption = styled.h2<{ mood: themeType }>`
  font-size: 1rem;
  color: ${(props) => C[props.mood].TextColor2};
  margin: 18px 0px;
`;

const InputDiv = styled.div`
  display: flex;
`;

const EmailInput = styled.input<{ mood: themeType }>`
  width: 246px;
  height: 48px;

  box-sizing: border-box;

  border: 1px solid ${(props) => C[props.mood].LineColor2};
  border-radius: 2px 0px 0px 2px;
  outline: none;

  padding-left: 16px;
  margin-bottom: 23px;

  font-size: 1rem;
  color: ${(props) => C[props.mood].TextColor1};

  background-color: ${(props) => C[props.mood].LineColor1};

  &:focus {
    border: 1px solid ${(props) => C[props.mood].BtnColor2};
  }
`;

const EmailSubmitBtn = styled.div`
  width: 96px;
  height: 48px;

  text-align: center;
  line-height: 48px;

  background-color: ${C.DarkTheme.BtnColor2};
  font-weight: 600;

  &:hover {
    cursor: pointer;
  }
`;

const OAuthIconDiv = styled.div`
  width: 100%;
  height: min-content;

  padding: 8px;
  box-sizing: border-box;

  display: flex;
  justify-content: center;
`;

const GoogleOAuthBtn = styled.button`
  width: 48px;
  height: 48px;

  background-image: url("images/loginpopup/GoogleIcon.png");

  background-position: center;
  background-size: 66%;
  background-repeat: no-repeat;
  background-color: white;

  border: none;
  border-radius: 24px;

  &:hover {
    cursor: pointer;
  }
`;

const CloseBtn = styled.div`
  width: 24px;
  height: 24px;

  position: absolute;
  right: 30px;
  top: 30px;

  background-size: 15px 15px;
  background-repeat: no-repeat;
  background-position: center;

  background-image: url("images/loginpopup/closeBtn.jpg");

  &:hover {
    cursor: pointer;
  }
`;

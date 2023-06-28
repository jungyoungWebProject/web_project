import { useRecoilState, useRecoilValue } from "recoil";
import {
  mood,
  themeType,
  showLoginPopup,
  loginData,
  showQuickMenu,
} from "state/index";
import styled from "styled-components";
import * as C from "style";
import { User, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";

export default function Header() {
  const LoginData = useRecoilValue(loginData);
  const [ShowLoginPopup, setShowLoginPopup] = useRecoilState(showLoginPopup);
  const [theme, setTheme] = useRecoilState(mood);
  const [ShowQuickMenu, setShowQuickMenu] = useRecoilState(showQuickMenu);

  async function SignOut() {
    await signOut(auth)
      .then(() => {
        console.log("로그아웃 성공");
        localStorage.removeItem("loginData");
      })
      .catch(() => {
        console.log("로그아웃 실패");
      });
    window.location.reload();
  }

  return (
    <>
      <Container mood={theme}>
        <HeaderContainer>
          <HeaderContainerTitle mood={theme}>velog</HeaderContainerTitle>

          <HeaderContainerOptions>
            <ThemeBtn
              mood={theme}
              onClick={() => {
                setTheme(theme === "DarkTheme" ? "LightTheme" : "DarkTheme");
              }}
            ></ThemeBtn>
            <SearchBtn mood={theme}></SearchBtn>
            {!LoginData && (
              <LoginBtn
                mood={theme}
                onClick={() => {
                  setShowLoginPopup(!ShowLoginPopup);
                }}
              >
                로그인
              </LoginBtn>
            )}
            {LoginData && (
              <>
                <Link to="/write">
                  <NewPostBtn mood={theme}>새 글 작성</NewPostBtn>
                </Link>
                <Profile
                  data={LoginData.user}
                  onClick={() => {
                    ShowQuickMenu
                      ? setShowQuickMenu(false)
                      : setShowQuickMenu(true);
                  }}
                >
                  {ShowQuickMenu && (
                    <QuickMenu>
                      <Link
                        to={`/@${LoginData?.user.email?.slice(
                          0,
                          LoginData?.user.email?.indexOf("@")
                        )}`}
                      >
                        <QuickMenuElement mood={theme}>
                          내 벨로그
                        </QuickMenuElement>
                      </Link>
                      <QuickMenuElement mood={theme}>임시 글</QuickMenuElement>
                      <QuickMenuElement mood={theme}>
                        읽기 목록
                      </QuickMenuElement>
                      <QuickMenuElement mood={theme}>설정</QuickMenuElement>
                      <Link to="/">
                        <QuickMenuElement mood={theme} onClick={SignOut}>
                          로그아웃
                        </QuickMenuElement>
                      </Link>
                    </QuickMenu>
                  )}
                </Profile>
              </>
            )}
          </HeaderContainerOptions>
        </HeaderContainer>
      </Container>
    </>
  );
}

const Container = styled.div<{ mood: themeType }>`
  width: 91vw;
  height: 64px;

  color: ${(props) => C[props.mood].TextColor1};

  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const HeaderContainer = styled.div`
  width: 100%;
  height: 64px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
`;

const HeaderContainerTitle = styled.div<{ mood: themeType }>`
  width: min-content;
  height: min-content;

  color: ${(props) => C[props.mood].TextColor1};

  font-size: 1.5rem;
  font-family: "Fira Code", monospace;
  font-weight: 500;
`;

const HeaderContainerOptions = styled.div`
  width: min-content;
  height: min-content;

  display: flex;
  align-items: center;
  font-size: 1rem;

  gap: 5px;
`;

const ThemeBtn = styled.button<{ mood: themeType }>`
  width: 40px;
  height: 40px;

  border: none;
  border-radius: 25px;

  background: url(${(props) => C[props.mood].BtnUrl1});
  background-position: center;
  background-size: 24px;
  background-repeat: no-repeat;

  animation: none;

  &:hover {
    cursor: pointer;
  }
`;

const SearchBtn = styled.div<{ mood: themeType }>`
  width: 40px;
  height: 40px;

  border: none;
  border-radius: 25px;

  background-image: url(${(props) => C[props.mood].BtnUrl2});
  background-position: center;
  background-size: ${(props) => (props.mood === "DarkTheme" ? "20px" : "25px")};
  background-repeat: no-repeat;

  &:hover {
    cursor: pointer;
  }
`;

const LoginBtn = styled.div<{ mood: themeType }>`
  width: 85px;
  height: 32.5px;

  display: flex;

  border: 1px solid ${(props) => C[props.mood].TextColor1};
  border-radius: 17.5px;
  font-size: 1rem;
  font-weight: 600;

  border: 1px solid ${(props) => C[props.mood].TextColor1};
  color: ${(props) => C[props.mood].TextColor1};

  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    transition-timing-function: ease-out;
    transition-duration: 0.1s;
    background-color: ${(props) => C[props.mood].TextColor1};
    color: ${(props) => C[props.mood].BgColor};
  }
`;
const NewPostBtn = styled.div<{ mood: themeType }>`
  width: 110px;
  height: 32.5px;

  display: flex;

  border-radius: 17.5px;
  font-size: 1rem;
  font-weight: 600;

  border: 1px solid ${(props) => C[props.mood].TextColor1};
  color: ${(props) => C[props.mood].TextColor1};

  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    transition-timing-function: ease-out;
    transition-duration: 0.1s;
    background-color: ${(props) => C[props.mood].TextColor1};
    color: ${(props) => C[props.mood].BgColor};
  }
`;

const Profile = styled.div<{ data: User }>`
  width: 30px;
  height: 30px;

  position: relative;

  border: none;
  border-radius: 25px;

  background: url(${(props) => props.data.photoURL});
  background-position: center;
  background-size: 30px;
  background-repeat: no-repeat;

  margin: 0 15px 0 15px;

  animation: none;

  &:hover {
    cursor: pointer;
  }
`;

const QuickMenu = styled.div`
  width: 192px;
  height: min-content;

  position: absolute;

  display: flex;
  flex-direction: column;

  top: 3rem;
  right: 0;
`;

const QuickMenuElement = styled.div<{ mood: themeType }>`
  width: 100%;
  height: 48px;

  position: static;

  box-sizing: border-box;
  padding: 12px 16px;

  font-size: 1rem;
  font-family: "Fira Code";

  color: ${(props) => C[props.mood].TextColor1};
  background-color: ${(props) => C[props.mood].BgColor};

  &:hover {
    color: ${(props) => C[props.mood].BtnColor2};
  }
`;

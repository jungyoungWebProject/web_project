import { useRecoilState, useRecoilValue } from "recoil";
import { mood, themeType, showLoginPopup, loginData } from "state/index";
import styled from "styled-components";
import * as C from "style";
import { User } from "firebase/auth";
import { Link } from "react-router-dom";

export default function Header() {
  const postData = useRecoilValue(loginData);
  const [ShowLoginPopup, setShowLoginPopup] = useRecoilState(showLoginPopup);
  const [theme, setTheme] = useRecoilState(mood);

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
            {!postData && (
              <LoginBtn
                mood={theme}
                onClick={() => {
                  setShowLoginPopup(!ShowLoginPopup);
                }}
              >
                로그인
              </LoginBtn>
            )}
            {postData && (
              <>
                <Link to="/write">
                  <NewPostBtn mood={theme}>새 글 작성</NewPostBtn>
                </Link>
                <Profile data={postData}></Profile>
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
  width: 50px;
  height: 50px;

  border: none;
  border-radius: 25px;

  background: url(${(props) => props.data.photoURL});
  background-position: center;
  background-size: 30px;
  background-repeat: no-repeat;

  animation: none;

  &:hover {
    cursor: pointer;
  }
`;

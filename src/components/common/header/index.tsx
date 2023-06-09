import { useRecoilState } from "recoil";
import { mood, themeType } from "state/index";
import styled from "styled-components";
import * as C from "style";

export default function Header() {
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

  min-width: 1024px;

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
  gap: 5px;
  align-items: center;
  font-size: 1rem;
`;

const ThemeBtn = styled.button<{ mood: themeType }>`
  width: 50px;
  height: 50px;

  border: none;
  border-radius: 25px;

  background: url(${(props) => C[props.mood].BtnUrl1});
  background-position: center;
  background-size: 30px;
  background-repeat: no-repeat;

  animation: none;

  &:hover {
    cursor: pointer;
  }
`;

const SearchBtn = styled.div<{ mood: themeType }>`
  width: 50px;
  height: 0px;

  border: none;
  border-radius: 25px;

  background: url(${(props) => C[props.mood].BtnUrl2});
  background-position: center;
  background-size: 20px;
  background-repeat: no-repeat;

  &:hover {
    cursor: pointer;
  }
`;

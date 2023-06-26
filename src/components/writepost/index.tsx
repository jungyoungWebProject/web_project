import styled from "styled-components";
import * as C from "../../style/index";
import { useRef } from "react";
import { mood, themeType } from "state";
import { useRecoilValue } from "recoil";

export default function WritePost() {
  const theme = useRecoilValue(mood);

  return (
    <Container mood={theme}>
      <WriteArea mood={theme}>
        <WriteAreaHeader>
          <WTitle mood={theme} placeholder="제목을 입력하세요" />
          <DivideLine mood={theme} />
          <WTag mood={theme} placeholder="태그를 입력하세요" />
        </WriteAreaHeader>
      </WriteArea>
    </Container>
  );
}

const Container = styled.div<{ mood: themeType }>`
  background-color: white;
  width: 100vw;
  height: 100vh;

  background-color: ${(props) => C[props.mood].BgColor};
`;

const WriteArea = styled.div<{ mood: themeType }>`
  width: 50%;
  height: 100%;

  display: flex;
  flex-direction: column;

  border: none;
  background-color: ${(props) => C[props.mood].BgColor};
`;

const WriteAreaHeader = styled.div`
  width: 624.8px;
  height: 190px;

  box-sizing: border-box;
  padding: 32px 48px 0px;
`;

const WTitle = styled.input<{ mood: themeType }>`
  width: 90%;
  height: min-content;

  min-height: 66px;

  white-space: pre-line;
  background-color: ${(props) => C[props.mood].BgColor};
  color: ${(props) => C[props.mood].TextColor1};

  font-size: 2.75rem;
  font-family: "Fira Code";
  font-weight: 600;
  word-spacing: -0.75rem;
  letter-spacing: 0px;

  border: none;

  outline: none;

  ::placeholder {
    color: ${(props) => C[props.mood].TextColor3};

    font-size: 2.75rem;
    font-family: "Fira Code";
    font-weight: 600;
    word-spacing: -0.5rem;
  }
`;

const DivideLine = styled.div<{ mood: themeType }>`
  width: 64px;
  height: 6px;

  margin: 24px 0px 16px;

  background-color: ${(props) => C[props.mood].LineColor2};
`;

const WTag = styled.input<{ mood: themeType }>`
  width: 90%;
  height: min-content;

  min-height: 34px;

  margin: 0px 0px 12px;
  padding: 1px 2px;

  border: none;

  outline: none;

  color: ${(props) => C[props.mood].TextColor3};

  font-size: 1.125rem;
  font-family: "Fira Code";
  word-spacing: -0.25rem;

  background-color: ${(props) => C[props.mood].BgColor};
  color: ${(props) => C[props.mood].TextColor1};

  ::placeholder {
    color: ${(props) => C[props.mood].TextColor3};

    font-size: 1.125rem;
    font-family: "Fira Code";
    word-spacing: -0.25rem;
  }
`;

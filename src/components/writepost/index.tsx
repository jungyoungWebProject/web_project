import styled from "styled-components";
import * as C from "../../style/index";
import { mood, themeType, markdownText } from "state";
import { useRecoilValue, useRecoilState } from "recoil";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default function WritePost() {
  const theme = useRecoilValue(mood);
  const [writedText, setWritedText] = useRecoilState(markdownText);

  return (
    <Container mood={theme}>
      <WriteArea mood={theme}>
        <WriteContainerHeader>
          <WTitle
            mood={theme}
            placeholder="제목을 입력하세요"
            onChange={(e) => {
              setWritedText({
                ...writedText,
                title: "# " + e.target.value + "\r\n",
              });
            }}
          />
          <DivideLine mood={theme} />
          <WTag mood={theme} placeholder="태그를 입력하세요" />
          <MarkDownButtonArea />
        </WriteContainerHeader>
        <MarkDownTextArea
          mood={theme}
          placeholder="당신의 이야기를 적어보세요..."
          onChange={(e) => {
            setWritedText({ ...writedText, paragraph: e.target.value });
            console.log(writedText);
          }}
        />
      </WriteArea>
      <MarkDownView mood={theme}>
        <ReactMarkDown1 mood={theme}>
          {writedText.title + writedText.paragraph}
        </ReactMarkDown1>
      </MarkDownView>
    </Container>
  );
}

const Container = styled.div<{ mood: themeType }>`
  background-color: white;
  width: 100vw;
  height: 100vh;

  box-sizing: border-box;

  display: flex;
  overflow: hidden;

  background-color: ${(props) => C[props.mood].BgColor};
`;

const WriteContainerHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

const WriteArea = styled.div<{ mood: themeType }>`
  width: 50%;
  height: 100%;

  display: flex;
  flex-direction: column;

  padding: 32px 48px 0px;
  box-sizing: border-box;

  border: none;
  background-color: ${(props) => C[props.mood].BgColor};
`;
const WTitle = styled.input<{ mood: themeType }>`
  width: 100%;
  height: min-content;

  min-height: 66px;
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
    color: ${(props) => C[props.mood].TextColor2};

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

const WTag = styled.textarea<{ mood: themeType }>`
  width: 100%;
  height: min-content;

  min-height: 34px;

  margin: 0px 0px 12px;
  padding: 1px 2px;

  border: none;

  outline: none;
  resize: none;

  color: ${(props) => C[props.mood].TextColor3};

  font-size: 1.125rem;
  font-family: "Fira Code";
  word-spacing: -0.25rem;

  background-color: ${(props) => C[props.mood].BgColor};
  color: ${(props) => C[props.mood].TextColor1};

  ::placeholder {
    color: ${(props) => C[props.mood].TextColor3};
  }
`;

const MarkDownButtonArea = styled.div`
  width: 100%;
  /* height: min-content; */
  height: 48px;

  box-sizing: border-box;
  padding: 0px 48px;
  margin: 0px 0px 16px 0px;

  border: 1px solid gray;
`;

const MarkDownTextArea = styled.textarea<{ mood: themeType }>`
  width: 100%;
  height: 60%;

  min-height: 34px;

  margin: 0px 0px 12px;
  padding: 1px 2px;

  border: none;

  outline: none;
  resize: none;
  white-space: pre-wrap;
  color: ${(props) => C[props.mood].TextColor3};

  font-size: 1.125rem;
  font-family: "Fira Code";
  word-spacing: -0.25rem;

  background-color: ${(props) => C[props.mood].BgColor};

  ::placeholder {
    color: ${(props) => C[props.mood].TextColor1};

    font-style: oblique;
  }

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => C[props.mood].TextColor1};
    border-radius: 2.5px;
  }
`;

const MarkDownView = styled.div<{ mood: themeType }>`
  width: 50%;
  height: 100%;

  box-sizing: border-box;
  padding: 48px 0px 0px 0px;

  background-color: ${(props) => C[props.mood].LineColor1};

  font-size: 1.125rem;
  font-family: "Fira Code";
  word-spacing: -0.25rem;

  background-color: ${(props) => C[props.mood].BgColor};
  color: ${(props) => C[props.mood].TextColor1};
`;

const ReactMarkDown1 = styled(ReactMarkdown)<{ mood: themeType }>`
  width: 100%;
  height: 100%;

  white-space: pre-wrap;

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => C[props.mood].TextColor1};
    border-radius: 2.5px;
  }
`;

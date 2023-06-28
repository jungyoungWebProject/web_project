import styled from "styled-components";
import * as C from "../../style/index";
import {
  mood,
  themeType,
  markdownText,
  showPublishPage,
  postData,
} from "state";
import { useRecoilValue, useRecoilState } from "recoil";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function PublishPost() {
  const theme = useRecoilValue(mood);
  const [writedText, setWritedText] = useRecoilState(markdownText);
  const [showPublish, setShowPublish] = useRecoilState(showPublishPage);
  const [PostData, setPostData] = useRecoilState(postData);

  useEffect(() => {
    setWritedText({ ...writedText, title: "", paragraph: "" });
  }, []);

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
              setPostData((prevPost) => ({
                ...prevPost,
                title: e.target.value,
              }));
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
            setWritedText({
              ...writedText,
              paragraph: e.target.value,
            });
            setPostData((prevPost)=> ({
              ...prevPost,
              paragraph: e.target.value,
            }))
          }}
        />
        <Editbar mood={theme}>
          <Link to="/">
            <ExitBtn mood={theme}>← 나가기</ExitBtn>
          </Link>
          <EditBtnDiv>
            <Link to="/">
              <EditBtn mood={theme} usage="imshe">
                임시저장
              </EditBtn>
            </Link>
            <EditBtn
              mood={theme}
              usage="publish"
              onClick={() => {
                setShowPublish(true);
              }}
            >
              출간하기
            </EditBtn>
          </EditBtnDiv>
        </Editbar>
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

  position: relative;

  box-sizing: border-box;

  display: flex;
  overflow: hidden;

  background-color: ${(props) => C[props.mood].BgColor};
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

const WriteContainerHeader = styled.div`
  display: flex;
  flex-direction: column;
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

const WTag = styled.input<{ mood: themeType }>`
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
  white-space: pre-line;
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

const Editbar = styled.div<{ mood: themeType }>`
  width: 50%;
  height: 64px;

  position: absolute;
  bottom: 0;
  left: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 1rem 0 1rem;
  box-sizing: border-box;

  background-color: ${(props) => C[props.mood].LineColor2};
`;

const ExitBtn = styled.div<{ mood: themeType }>`
  width: 114px;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 0.25rem;

  background-color: ${(props) => C[props.mood].LineColor2};
  color: ${(props) => C[props.mood].TextColor1};

  font-size: 1.125rem;
  font-family: "Fira Code";

  &:hover {
    cursor: pointer;
    background-color: ${(props) => C[props.mood].LineColor1};
  }
`;

const EditBtnDiv = styled.div`
  display: flex;
  width: min-content;
  height: max-content;

  gap: 1rem;
`;

const EditBtn = styled.div<{ mood: themeType; usage: string }>`
  width: 114px;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 0.25rem;

  background-color: ${(props) =>
    props.usage === "publish"
      ? C[props.mood].BtnColor2
      : C[props.mood].LineColor2};
  color: ${(props) =>
    props.usage === "publish"
      ? C[props.mood].BgColor
      : C[props.mood].BtnColor2};

  font-size: 1.125rem;
  font-family: "Fira Code";
  font-weight: 600;

  &:hover {
    cursor: pointer;
    background-color: ${(props) =>
      props.usage === "publish"
        ? C[props.mood].TextColor1
        : C[props.mood].LineColor1};
  }
`;

const MarkDownView = styled.div<{ mood: themeType }>`
  width: 50%;
  height: 100%;

  box-sizing: border-box;
  padding: 48px 0px 0px 48px;

  background-color: ${(props) => C[props.mood].LineColor1};

  font-size: 1.125rem;
  font-family: "Fira Code";
  word-spacing: -0.25rem;

  background-color: ${(props) => C[props.mood].LineColor1};
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

  & p {
    margin: 0;
  }
  & h1 {
    margin: 0;
  }
  & h2 {
    margin: 0;
  }
  & h3 {
    margin: 0;
  }
  & h4 {
    margin: 0;
  }

  word-break: keep-all;
  overflow-wrap: break-word;
`;

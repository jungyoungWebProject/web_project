import styled from "styled-components";
import * as C from "../../style/index";
import {
  mood,
  themeType,
  markdownText,
  showPublishPage,
  postData,
} from "../../state";
import { useRecoilValue, useRecoilState } from "recoil";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default function PublishPost() {
  const theme = useRecoilValue(mood);
  const [writedText, setWritedText] = useRecoilState(markdownText);
  const [showPublish, setShowPublish] = useRecoilState(showPublishPage);
  const [PostData, setPostData] = useRecoilState(postData);

  return <Container mood={theme}>
    
  </Container>;
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

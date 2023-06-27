import styled from "styled-components";
import * as C from "../../style/index";
import { mood, themeType, showPublishPage } from "state/index";
import { useRecoilValue, useRecoilState } from "recoil";

export default function PostSection() {
  const theme = useRecoilValue(mood);
  const [showPublish, setShowPublish] = useRecoilState(showPublishPage);

  return (
    <>
      {showPublish && (
        <Container mood={theme}>
          <PreViewArea mood={theme}>
            <h2>포스트 미리보기</h2>
            <PreViewContents></PreViewContents>
          </PreViewArea>
        </Container>
      )}
    </>
  );
}

const Container = styled.div<{ mood: themeType }>`
  width: 100vw;
  height: 100vh;

  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  gap: 32px;

  background-color: ${(props) => C[props.mood].BgColor};

  z-index: 1;
`;

const PreViewArea = styled.div<{ mood: themeType }>`
  width: 351px;
  height: 425px;

  display: flex;
  flex-direction: column;

  font-size: 0.875rem;
  font-family: "Fira Code";
  font-weight: 600;

  color: ${(props) => C[props.mood].TextColor1};
`;

const PreViewContents = styled.div`
  width: 100%;
  height: min-content;

  display: flex;
  flex-direction: column;
`;

const UpLoadImage = styled.div`
    width: 100%;
    height: 194px;
`;

const UpLoadBtn = styled.input`

`;

const IntroduceText = styled.div`

`;

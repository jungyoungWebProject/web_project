import { mood, themeType } from "state/index";
import { useRecoilValue } from "recoil";
import * as C from "style";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Post(props: any) {
  const theme = useRecoilValue(mood);

  return (
    <Link to={`/post/`}>
      <Container mood={theme}>
        <ImgSection background="images/sample/sampleImg.png"></ImgSection>
        <ParagraphSection>
          <Title mood={theme}>제목!!</Title>
          <Paragraph>
            동료들은 다 아는 정보, 나만 모르지 않게 만들어주는 일일일에서 한
            주간 개발자들이 많이 읽은 상위 10개의 아티클들을 소개합니다.
          </Paragraph>
          <PostInfo>2023년 5월 30일 · 0개의 댓글</PostInfo>
        </ParagraphSection>
        <UserInfo mood={theme}>
          by
          <UserName mood={theme}>fwefe</UserName>
        </UserInfo>
      </Container>
    </Link>
  );
}

const Container = styled.div<{ mood: themeType }>`
  width: 20rem;
  height: max-content;
  background-color: ${(props) => C[props.mood].BgColor};

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  color: ${(props) => C[props.mood].TextColor2};
  background-color: ${(props) => C[props.mood].BtnColor1};
  box-shadow: 0px 5px 15px ${(props) => C[props.mood].ShadowColor};

  border-radius: 5px;

  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  transition-duration: 0.5s;

  overflow: hidden;

  &:hover {
    margin: -5px 0px 0px 0px;
    box-shadow: 0px 10px 10px ${(props) => C[props.mood].ShadowColor};
    cursor: pointer;
  }
`;

const ImgSection = styled.div<{ background: string }>`
  width: 320px;
  height: 167px;

  background: url(${(props) => props.background});

  background-size: cover;
`;

const ParagraphSection = styled.div`
  width: 320px;
  height: 165px;

  padding: 16px;
  box-sizing: border-box;
`;

const Title = styled.h4<{ mood: themeType }>`
  margin: 0px 0px 4px;
  color: ${(props) => C[props.mood].TextColor1};
`;

const Paragraph = styled.p`
  margin: 0px 0px 24px;
  font-size: 0.875rem;
`;

const PostInfo = styled.div`
  font-size: 0.75rem;
`;

const UserInfo = styled.div<{ mood: themeType }>`
  width: 320px;
  height: 45px;

  display: flex;
  gap: 3.5px;

  border-top: 1px solid ${(props) => C[props.mood].LineColor2};
  font-size: 0.75rem;

  padding: 10px 14px;
  box-sizing: border-box;
`;

const UserName = styled.div<{ mood: themeType }>`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${(props) => C[props.mood].TextColor1};
`;

import { mood, themeType, loginData } from "state/index";
import { useRecoilValue } from "recoil";
import * as C from "style";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { DocumentData } from "firebase/firestore";

export default function Post(props: DocumentData) {
  const theme = useRecoilValue(mood);
  const Pdata = props.postData.PostData;
  const LoginData = useRecoilValue(loginData);

  console.log(
    `/post/@${
      Pdata.postUrl ===
      `${LoginData?.user.email?.slice(0, LoginData?.user.email?.indexOf("@"))}/`
        ? Pdata.postUrl + Pdata.title
        : Pdata.postUrl
    }`.replace(" ", "-")
  );
  return (
    <Link
      to={`/@${
        Pdata.postUrl ===
        `${LoginData?.user.email?.slice(
          0,
          LoginData?.user.email?.indexOf("@")
        )}/`
          ? Pdata.postUrl + Pdata.title
          : Pdata.postUrl
      }`.replace(" ", "-")}
    >
      <Container mood={theme}>
        <ImgSection background={`${Pdata.mainimgurl}`}></ImgSection>
        <ParagraphSection>
          <Title mood={theme}>{Pdata.title}</Title>
          <Paragraph>{Pdata.summary}</Paragraph>
          <PostInfo>{Pdata.date} · 0개의 댓글</PostInfo>
        </ParagraphSection>
        <UserInfo mood={theme}>
          by
          <UserName mood={theme}>{Pdata.wuser}</UserName>
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

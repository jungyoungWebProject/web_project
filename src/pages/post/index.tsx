import styled from "styled-components";
import { DocumentData } from "firebase/firestore";
import * as C from "../../components/index";
import * as S from "../../style";
import { themeType, mood, loginData } from "state";
import { useRecoilValue } from "recoil";
import ReactMarkdown from "react-markdown";

export default function ShowPost(props: DocumentData) {
  const theme = useRecoilValue(mood);
  const LoginData = useRecoilValue(loginData);

  console.log(props.data.PostData.mainimgurl);

  return (
    <Container>
      <C.Header post={props.data}></C.Header>

      <Title mood={theme}>{props.data.PostData.title}</Title>

      <WriterInfo mood={theme}>
        {LoginData?.user.email?.slice(0, LoginData?.user.email?.indexOf("@"))} ·{" "}
        <span style={{ fontWeight: "500" }}>{props.data.PostData.date}</span>
      </WriterInfo>
      <MainImg background={props.data.PostData.mainimgurl}></MainImg>
      <MarkDown mood={theme}>{props.data.PostData.paragraph}</MarkDown>
    </Container>
  );
}

const Container = styled.div`
  height: max-content;
  width: 100vw;
  display: flex;
  flex-direction: column;
  gap: 35px;
  align-items: center;

  position: relative;

  overflow-y: auto;
`;

const Title = styled.div<{ mood: themeType }>`
  width: 50%;

  color: ${(props) => S[props.mood].TextColor1};

  font-size: 3rem;
  font-weight: 600;
  font-family: "Fira Code";

  text-align: left;
`;

const WriterInfo = styled.div<{ mood: themeType }>`
  width: 50%;

  font-size: 1rem;
  font-weight: 600;
  font-family: "";

  color: ${(props) => S[props.mood].TextColor1};
`;

const MainImg = styled.div<{ background: string }>`
  width: 600px;
  height: 300px;

  background: url(${(props) => props.background});
  background-size: cover;
`;
const MarkDown = styled(ReactMarkdown)<{ mood: themeType }>`
  width: 50%;
  height: max-content;

  display: flex;
  flex-direction: column;

  color: ${(props) => S[props.mood].TextColor1};
  background-color: ${(props) => S[props.mood].BgColor};

  font-size: 1.25rem;
  font-weight: 600;
  font-family: "Fira Code";
  text-align: left;

  padding-bottom: 20rem;
`;

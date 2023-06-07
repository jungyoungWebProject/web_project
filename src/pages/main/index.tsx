import { ReactNode } from "react";
import * as C from "../../components/index";
import styled from "styled-components";

interface PropsType {
  children: ReactNode;
}

export default function MainPage({ children }: PropsType) {
  return (
    <Container>
      <C.Header />
      <C.Main />
      <PostSection>{children}</PostSection>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 35px;
  margin-bottom: 30px;
  align-items: center;
`;

const PostSection = styled.div`
  height: max-content;
  width: 91vw;

  display: flex;
  flex-wrap: wrap;
  gap: 35px;
`;

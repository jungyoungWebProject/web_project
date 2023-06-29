import styled from "styled-components";
import { DocumentData } from "firebase/firestore";
import reactMarkdown from "react-markdown";
import * as C from "../../components/index";

export default function ShowPost(props: DocumentData) {
  return (
    <Container>
      <C.Header></C.Header>
      {props.data.Postdata.title}
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

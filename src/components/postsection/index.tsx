import styled from "styled-components";
import * as C from "../../components/index";

export default function PostSection() {
  return (
    <Container>
      <C.Post></C.Post>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  height: max-content;
  width: 91vw;

  display: flex;
  flex-wrap: wrap;
  gap: 35px;
`;

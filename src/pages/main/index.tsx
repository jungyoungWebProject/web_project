import * as C from "../../components/index";
import styled from "styled-components";

export default function MainPage() {


  return (
    <Container>
      <C.Header />
      <C.Menu />
      <C.PostSection></C.PostSection>
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

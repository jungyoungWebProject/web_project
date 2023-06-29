import styled from "styled-components";
import * as C from "../../style/index";
import { mood, themeType } from "../../state";
import { useRecoilValue } from "recoil";

export default function PublishPost() {
  const theme = useRecoilValue(mood);

  return <Container mood={theme}></Container>;
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

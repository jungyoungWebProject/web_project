import { mood, selectedOptions, themeType } from "state/index";
import { useRecoilState, useRecoilValue } from "recoil";
import { useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as C from "style";
import { keyframes } from "styled-components";

export default function Menu() {
  const theme = useRecoilValue(mood);
  const [selectedOption, setSelectedOption] = useRecoilState(selectedOptions);

  const tranding = useRef<HTMLButtonElement | null>(null);
  const recent = useRef<HTMLButtonElement | null>(null);

  return (
    <Container>
      <TopMenu>
        <GroupOptions>
          <Link to="/">
            <ArrangeOptions
              selected={selectedOption}
              ref={tranding}
              mood={theme}
              option="tranding"
              onClick={() => {
                setSelectedOption("tranding");
              }}
            >
              트렌딩
            </ArrangeOptions>
          </Link>
          <Link to="/recent">
            <ArrangeOptions
              selected={selectedOption}
              ref={recent}
              mood={theme}
              option="recent"
              onClick={() => {
                setSelectedOption("recent");
              }}
            >
              최신
            </ArrangeOptions>
          </Link>

          {selectedOption === "tranding" && (
            <SelectionTag mood={theme}>이번 주</SelectionTag>
          )}

          <SelectedLine mood={theme} selected={selectedOption} />
        </GroupOptions>
        <SelectionTag mood={theme}>wef</SelectionTag>
      </TopMenu>
    </Container>
  );
}

const Container = styled.div`
  width: 91vw;
  height: max-content;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  box-sizing: border-box;
`;

const TopMenu = styled.div`
  width: 100%;
  height: 48px;

  display: flex;
  justify-content: space-between;
`;

const GroupOptions = styled.div`
  width: max-content;
  height: min-content;

  position: relative;

  display: flex;
  align-items: center;
`;

const ArrangeOptions = styled.button<{
  mood: themeType;
  selected: string;
  option: string;
}>`
  width: 112px;
  height: 48px;
  padding: 0px 16px 0px 16px;

  font-size: 1.25rem;
  color: ${(props) =>
    props.selected === props.option
      ? C[props.mood].TextColor1
      : C[props.mood].TextColor2};

  background-color: ${(props) =>
    props.theme ? C[props.mood].BgColor : C[props.mood].BgColor};
  font-weight: ${(props) => (props.selected === props.option ? 600 : 500)};

  transition-timing-function: ease-out;
  transition-duration: 0s;

  text-align: center;
  border: none;
  cursor: pointer;
`;

const moveLine = (isLeftSelected: boolean) => keyframes`
  from {
    ${isLeftSelected ? "left: 112px" : "left: 0px"};
  }

  to {
    ${isLeftSelected ? "left: 0px" : "left: 112px"};
  }
`;

const SelectedLine = styled.div<{
  mood: themeType;
  selected: string;
}>`
  width: 112px;
  height: 1.5px;

  position: absolute;
  bottom: 0px;

  background-color: ${(props) => C[props.mood].TextColor1};

  animation: ${(props) =>
    props.selected
      ? moveLine(props.selected === "tranding")
      : moveLine(props.selected === "recent")};
  animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
  animation-fill-mode: forwards;
  animation-duration: 0.5s;

  z-index: 1;
`;

const SelectionTag = styled.div<{ mood: themeType }>`
  width: 72px;
  height: 32px;
  line-height: 32px;

  background-color: ${(props) => C[props.mood].BtnColor1};
  color: ${(props) => C[props.mood].TextColor1};

  padding: 0px 16px 0px 16px;

  font-size: 1rem;
  font-weight: 600;

  text-align: center;
  border: none;
`;

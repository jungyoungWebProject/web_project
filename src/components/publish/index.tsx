import styled from "styled-components";
import * as C from "../../style/index";
import {
  mood,
  themeType,
  showPublishPage,
  postData,
  loginData,
} from "state/index";
import { useRecoilValue, useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { database } from "../../firebase";
import { Link } from "react-router-dom";

export default function PostSection() {
  const theme = useRecoilValue(mood);
  const [showPublish, setShowPublish] = useRecoilState(showPublishPage);
  const [PostData, setPostData] = useRecoilState(postData);
  const LoginData = useRecoilValue(loginData);
  const [isBtnSelected, setIsBtnSelected] = useState(true);

  useEffect(() => {
    setShowPublish(false);
  }, []);

  return (
    <>
      {showPublish && (
        <Container mood={theme}>
          <PreViewArea mood={theme}>
            <h2>포스트 미리보기</h2>
            <PreViewContents>
              <UpLoadImage mood={theme}>
                <UpLoadBtn mood={theme}>썸네일 업로드</UpLoadBtn>
              </UpLoadImage>
              <IntroduceText
                mood={theme}
                placeholder="당신의 포스트를 짧게 소개해보세요."
                onChange={(e) => {
                  setPostData((prevPost) => ({
                    ...prevPost,
                    summary: e.target.value,
                  }));
                }}
              />
            </PreViewContents>
          </PreViewArea>
          <SettingArea mood={theme}>
            <PublicSetting>
              <h2>공개 설정</h2>
              <GroupSettingPart>
                <PublicButton
                  mood={theme}
                  selected={isBtnSelected}
                  onClick={() => {
                    setIsBtnSelected(true);
                    setPostData((prevData) => ({
                      ...prevData,
                      public: true,
                    }));
                  }}
                >
                  전체 공개
                </PublicButton>
                <PublicButton
                  mood={theme}
                  selected={!isBtnSelected}
                  onClick={() => {
                    setIsBtnSelected(false);
                    setPostData((prevData) => ({
                      ...prevData,
                      public: false,
                    }));
                  }}
                >
                  비공개
                </PublicButton>
              </GroupSettingPart>
              <h2>URL 설정</h2>
              <GroupSettingPart>
                <BaseURL mood={theme}>
                  <div>
                    /@
                    {LoginData?.user.email?.slice(
                      0,
                      LoginData?.user.email?.indexOf("@")
                    )}
                    /
                  </div>
                  <URLInput
                    mood={theme}
                    onChange={(e) => {
                      setPostData((prevData) => ({
                        ...prevData,
                        postUrl: e.target.value,
                      }));
                    }}
                  />
                </BaseURL>
              </GroupSettingPart>
              <h2>시리즈 설정</h2>
              <GroupSettingPart>
                <SeriesBar mood={theme}>시리즈에 추가하기</SeriesBar>
              </GroupSettingPart>
              <GroupSettingPart style={{ marginTop: "3rem" }}>
                <EditBtn
                  mood={theme}
                  usage="cancel"
                  onClick={() => {
                    setShowPublish(false);
                  }}
                >
                  취소
                </EditBtn>
                <Link
                  to={`/@${LoginData?.user.email?.slice(
                    0,
                    LoginData?.user.email?.indexOf("@")
                  )}`}
                >
                  <EditBtn
                    mood={theme}
                    usage="publish"
                    onClick={() => {
                      let date = new Date();

                      setPostData((prevData) => ({
                        ...prevData,
                        user: LoginData?.user.email || "",
                        date: date,
                      }));

                      addDoc(collection(database, "post"), {
                        PostData,
                      });
                    }}
                  >
                    출간하기
                  </EditBtn>
                </Link>
              </GroupSettingPart>
            </PublicSetting>
          </SettingArea>
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

  gap: 64px;

  background-color: ${(props) => C[props.mood].BtnColor1};

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

  gap: 32px;
`;

const UpLoadImage = styled.div<{ mood: themeType }>`
  width: 100%;
  height: 193px;

  background-color: ${(props) => C[props.mood].LineColor1};

  display: flex;
  justify-content: center;
  align-items: center;
`;

const UpLoadBtn = styled.div<{ mood: themeType }>`
  width: 165px;
  height: 32px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 0.25rem;

  background-color: ${(props) => C[props.mood].BtnColor1};
  color: ${(props) => C[props.mood].BtnColor2};

  font-size: 1rem;
  font-family: "Fira Code";
  font-weight: 600;
`;

const IntroduceText = styled.textarea<{ mood: themeType }>`
  width: 100%;
  height: 118px;

  display: flex;
  flex-direction: column;

  padding: 12px 16px;
  box-sizing: border-box;
  font-size: 0.875rem;
  font-family: "Fira Code";

  outline: none;
  resize: none;

  border: none;
  background-color: ${(props) => C[props.mood].LineColor1};
  color: ${(props) => C[props.mood].TextColor1};
`;

const SettingArea = styled.div<{ mood: themeType }>`
  width: 351px;
  height: 425px;

  display: flex;
  flex-direction: column;

  font-size: 0.875rem;
  font-family: "Fira Code";
  font-weight: 600;

  color: ${(props) => C[props.mood].TextColor1};

  h2 {
    margin-bottom: 0.75rem;
  }
`;

const PublicSetting = styled.div`
  width: 100%;
  height: min-content;

  display: flex;
  flex-direction: column;
`;

const GroupSettingPart = styled.div`
  width: 100%;
  height: min-content;

  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const PublicButton = styled.div<{ mood: themeType; selected: boolean }>`
  width: 168px;
  height: 48px;

  color: ${(props) =>
    props.selected ? C[props.mood].BtnColor2 : C[props.mood].TextColor2};
  border: 1px solid
    ${(props) => (props.selected ? C[props.mood].BtnColor2 : "none")};
  background-color: ${(props) => C[props.mood].LineColor1};

  font-size: 1.125rem;
  font-family: "Fira Code";
  font-weight: 600;

  border-radius: 0.25rem;

  display: flex;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;

  &:hover {
    cursor: pointer;
  }
`;

const BaseURL = styled.div<{ mood: themeType }>`
  width: 354px;
  height: 48px;

  display: flex;
  flex: 1 auto;

  color: ${(props) => C[props.mood].TextColor2};
  background-color: ${(props) => C[props.mood].LineColor1};

  font-size: 1rem;
  font-family: "";
  font-weight: 400;
  padding: 0.5rem;

  border-radius: 0.25rem;
  box-sizing: border-box;

  display: flex;
  align-items: center;
`;

const URLInput = styled.input<{ mood: themeType }>`
  display: flex;

  border: none;
  outline: none;

  font-size: 1rem;
  font-family: "";
  font-weight: 400;

  color: ${(props) => C[props.mood].TextColor1};
  background-color: ${(props) => C[props.mood].LineColor1};
`;

const SeriesBar = styled.div<{ mood: themeType }>`
  width: 354px;
  height: 48px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: ${(props) => C[props.mood].BtnColor2};
  background-color: ${(props) => C[props.mood].LineColor1};

  font-size: 1.125rem;
  font-family: "";
  font-weight: 600;

  border-radius: 0.25rem;

  display: flex;
  align-items: center;

  cursor: pointer;
`;

const EditBtn = styled.div<{ mood: themeType; usage: string }>`
  width: 114px;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 0.25rem;

  background-color: ${(props) =>
    props.usage === "publish"
      ? C[props.mood].BtnColor2
      : C[props.mood].LineColor2};
  color: ${(props) =>
    props.usage === "publish"
      ? C[props.mood].BgColor
      : C[props.mood].BtnColor2};

  font-size: 1.125rem;
  font-family: "Fira Code";
  font-weight: 600;

  &:hover {
    cursor: pointer;
    background-color: ${(props) =>
      props.usage === "publish"
        ? C[props.mood].TextColor1
        : C[props.mood].LineColor1};
  }
`;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as P from "./pages/index";
import { useRecoilValue } from "recoil";
import { loginData, mood, themeType } from "state/index";
import styled from "styled-components";
import * as S from "style";
import { useEffect, useState } from "react";

import { getDocs, collection, DocumentData } from "firebase/firestore";
import { database } from "./firebase";

export default function App() {
  const theme = useRecoilValue(mood);
  const LoginData = useRecoilValue(loginData);
  const [posts, setPosts] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsRef = await getDocs(collection(database, "post/"));
      const postData = postsRef.docs.map((doc) => doc.data());
      setPosts(postData);
      console.log(postData);
    };

    fetchPosts();
  }, []);

  return (
    <Body mood={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<P.MainPage />}></Route>
          <Route path="/recent" element={<P.MainPage />}></Route>
          <Route path="/write" element={<P.WritingPage />}></Route>

          {posts.map((postData, postIndex) => (
            <Route
              key={postIndex}
              path={`/@${
                postData.PostData.postUrl ===
                `${LoginData?.user.email?.slice(
                  0,
                  LoginData?.user.email?.indexOf("@")
                )}/`
                  ? postData.PostData.postUrl + postData.PostData.title
                  : postData.PostData.postUrl
              }`.replace(" ", "-")}
              element={<P.ShowPost data={postData}></P.ShowPost>}
            ></Route>
          ))}
        </Routes>
      </BrowserRouter>
    </Body>
  );
}

const Body = styled.body<{ mood: themeType }>`
  background-color: ${(props) => S[props.mood].BgColor};

  height: max-content;
  width: 100vw;

  box-sizing: border-box;

  display: flex;
  justify-content: center;
`;

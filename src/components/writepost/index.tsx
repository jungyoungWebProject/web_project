import styled from "styled-components";
import * as C from "../index";
import { useRef } from "react";
import { loginData } from "state";
import { useRecoilState } from "recoil";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

export default function WritePost() {
  const Title = useRef<any>(null);
  const Paragraph = useRef<any>(null);

  const [userPost, setUserPost] = useRecoilState(loginData);

  async function uploadPost() {
    try {
      console.log(userPost);
      const docRef = await addDoc(collection(db, "post"), {
        title: Title.current.value,
        paragraph: Paragraph.current.value,
        userid: userPost?.user.uid,
        username: userPost?.user.displayName,
        id: 99,
        heart: 6,
        date: userPost?.user.metadata.creationTime,
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("X발에러: ", e);
    }
  }

  return (
    <Container>
      <input ref={Title} type="text"></input>제목
      <input ref={Paragraph} type="text"></input>내용
      <button onClick={uploadPost}>데이터 추가!</button>
    </Container>
  );
}

const Container = styled.div`
  background-color: white;
  width: 100vw;
  height: 100vh;
`;

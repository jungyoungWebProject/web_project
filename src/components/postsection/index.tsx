import styled from "styled-components";
import * as C from "../../components/index";
import { getDocs, collection, DocumentData } from "firebase/firestore";
import { database } from "../../firebase";
import { useEffect, useState } from "react";

export default function PostSection() {
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
    <Container>
      {posts.map((postData, postIndex) => (
        <C.Post key={postIndex} postData={postData}></C.Post>
      ))}
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

import styled from "styled-components";
import * as C from "../../components/index";
import { getDoc, doc } from "firebase/firestore";
import { database } from "../../firebase";
import { useEffect, useState } from "react";

export default function PostSection() {
  const [posts, setPosts] = useState<object>();

  useEffect(() => {
    const fetchPosts = async () => {
      const postDoc = await getDoc(doc(database, "post/"));
      setPosts(postDoc.data() as object);
    };

    fetchPosts();
  }, []);

  return (
    <Container>
      {posts &&
        Object.entries(posts).map(([postId, postData]) => (
          <C.Post key={postId}>{postData}</C.Post>
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

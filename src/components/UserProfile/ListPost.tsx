import React, { useEffect, useState } from "react";
import { Post } from "../../models/post";
import { map } from "lodash";

const ListPost = (props: any) => {
  const { userProfile } = props;
  const [listPostByUser, setListPostByUser]: any = useState(null);

  useEffect(() => {
    if (userProfile) {
      Post.listPostsByUserId(userProfile.id, { limit: 100 }).then((res: any) => {
        const listPosts = map(res.rows, (item: any) => {
          return { ...item, user: userProfile };
        });
        setListPostByUser(listPosts);
      });
    }
  }, [userProfile]);

  return (
    <>
      {listPostByUser?.map((post: any, index: number) => (
        <div style={{ marginBottom: 30 }} key={index}></div>
      ))}
    </>
  );
};

export default ListPost;

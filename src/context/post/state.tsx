import React, { useReducer } from "react";
import CreatePost from "../../components/CreatePost/CreatePost";
import { INITIAL_STATE } from "./constants";
import { createPost, discardCreatingPost } from "./dispatchers";
import Reducer from "./reducer";
import IPostCtx from "./types";

export const PostCtx = React.createContext<IPostCtx>(INITIAL_STATE as any);

export default function PostProvider({ children }: any) {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  const setters = {
    createPost: () => createPost(dispatch),
    discardCreatingPost: () => discardCreatingPost(dispatch),
  };

  return (
    <PostCtx.Provider value={{ ...state, ...setters }}>
      {children}
      {state.isCreatingPost && <CreatePost />}
    </PostCtx.Provider>
  );
}

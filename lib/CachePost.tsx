"use client";

import React, { useEffect } from "react";
import { useGlobalState } from "./hooks";
import { Post } from "./types";

const CachePost: React.FC<{ post: Post }> = ({ post }) => {
  const {
    state: { cachedPost },
    dispatch,
  } = useGlobalState();

  useEffect(() => {
    if (!cachedPost || cachedPost.id !== post.id) {
      dispatch({
        type: `cachePost`,
        post,
        from: {
          component: `CachePost`,
          context: `useEffect()`,
        },
      });
    }
  }, []);

  return null;
};

export default CachePost;

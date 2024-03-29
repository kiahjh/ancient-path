import React from "react";
import type { Language, Post } from "@/lib/types";
import PostPageAudioPrompt from "@/components/PostPageAudioPrompt";
import CachePost from "@/lib/CachePost";

const PostPageTemplate: React.FC<{ post: Post; language: Language }> = ({
  post,
  language,
}) => {
  return (
    <div className="px-0 md:px-16 lg:px-12 py-16 md:py-20 flex justify-center">
      <div className="bg-white rounded-3xl px-6 xs:px-8 sm:px-16 pb-12 sm:pb-16 pt-12 sm:pt-20 flex justify-center max-w-4xl">
        <div>
          <h1 className="text-2xl xs:text-3xl lg:text-4xl font-bold mb-8 text-slate-800 max-w-3xl">
            {post[language].title}
          </h1>
          <PostPageAudioPrompt />
          <div
            dangerouslySetInnerHTML={{ __html: post[language].content }}
            className="prose-base sm:prose-lg text-justify prose-slate mt-8"
          />
        </div>
      </div>
      <CachePost post={post} />
    </div>
  );
};

export default PostPageTemplate;

import React from "react";
import type { Language, Post } from "@/lib/types";
import PostPageAudioPrompt from "@/components/PostPageAudioPrompt";

const PostPageTemplate: React.FC<{ post: Post; language: Language }> = ({
  post,
  language,
}) => (
  <div className="p-20">
    <div className="bg-white rounded-3xl p-16 pt-20 flex justify-center">
      <div className="">
        <h1 className="text-4xl font-bold mb-8 text-slate-800 max-w-3xl">
          {post[language].title}
        </h1>
        <PostPageAudioPrompt
          title={post[language].title}
          mp3Url={post[language].mp3Url}
        />
        <div
          dangerouslySetInnerHTML={{ __html: post[language].content }}
          className="prose-lg text-justify prose-slate max-w-3xl mt-8"
        />
      </div>
    </div>
  </div>
);

export default PostPageTemplate;

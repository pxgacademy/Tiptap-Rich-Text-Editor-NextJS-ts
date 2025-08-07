"use client";

import RichTextEditor from "@/components/rich-text-editor";
import { useState } from "react";

export default function Home() {
  const [post, setPost] = useState("");

  const onChange = (content: string) => {
    setPost(content);
  };

  return (
    <div className="m-5 p-5 max-w-3xl mx-auto bg-gray-100 rounded-lg border border-gray-200 shadow-md">
      <h1 className="mb-3 text-3xl font-bold font-mono">
        This is Rich Text Editor
      </h1>

      <RichTextEditor content={post} onChange={onChange} />
    </div>
  );
}

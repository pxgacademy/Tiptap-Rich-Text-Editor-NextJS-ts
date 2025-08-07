// rich-text-editor/index.tsx

"use client";

import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./menu_bar";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function RichTextEditor({
  content,
  onChange,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-3",
          },
        },

        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-3",
          },
        },
      }),

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),

      Highlight,
    ],

    editorProps: {
      attributes: {
        class: "min-h-[156px] border rounded-md p-3 bg-background",
      },
    },

    content,

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },

    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  });

  return (
    <div className="mt-2">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

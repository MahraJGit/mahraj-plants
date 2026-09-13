"use client";

import { useRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import {
    HiOutlineLink,
    HiOutlinePhotograph,
} from "react-icons/hi";
import { cn } from "@/app/lib/utils";
import { readImageFiles } from "./AdminMedia";

type RichTextEditorProps = {
    value: string;
    error?: string;
    fill?: boolean;
    onChange: (html: string) => void;
};

const toolbarBtn =
    "inline-flex size-8 cursor-pointer items-center justify-center rounded-lg text-xs font-semibold text-primary/70 hover:bg-cream hover:text-primary disabled:opacity-40";

export default function RichTextEditor({
    value,
    error,
    fill = false,
    onChange,
}: RichTextEditorProps) {
    const imageInputRef = useRef<HTMLInputElement>(null);

    const editor = useEditor({
        immediatelyRender: false,
        shouldRerenderOnTransaction: true,
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: false,
                autolink: true,
            }),
            Placeholder.configure({
                placeholder: "Write your article…",
            }),
            Image.configure({ allowBase64: true }),
        ],
        content: value,
        onUpdate: ({ editor: instance }) => onChange(instance.getHTML()),
        editorProps: {
            attributes: {
                class: fill ? "min-h-full" : "min-h-[22rem]",
            },
        },
    });

    async function insertImages(files: FileList | null) {
        if (!files?.length || !editor) return;
        const sources = await readImageFiles(files);
        sources.forEach((src) => {
            editor.chain().focus().setImage({ src }).run();
        });
    }

    function addLink() {
        if (!editor) return;
        const previous = editor.getAttributes("link").href as string | undefined;
        const href = window.prompt("Link URL", previous ?? "https://");
        if (href === null) return;
        if (!href) {
            editor.chain().focus().unsetLink().run();
            return;
        }
        editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
    }

    return (
        <section
            className={cn(
                "flex flex-col overflow-hidden rounded-[1.5rem] border bg-white",
                fill && "h-full min-h-[28rem]",
                error ? "border-red-400" : "border-primary/8",
            )}
        >
            <div className="flex flex-wrap items-center gap-1 border-b border-primary/8 px-5 py-2.5">
                <ToolbarButton
                    label="Bold"
                    active={editor?.isActive("bold")}
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                >
                    B
                </ToolbarButton>
                <ToolbarButton
                    label="Italic"
                    active={editor?.isActive("italic")}
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                >
                    I
                </ToolbarButton>
                <ToolbarButton
                    label="Underline"
                    active={editor?.isActive("underline")}
                    onClick={() => editor?.chain().focus().toggleUnderline().run()}
                >
                    U
                </ToolbarButton>
                <ToolbarButton
                    label="Heading 2"
                    active={editor?.isActive("heading", { level: 2 })}
                    onClick={() =>
                        editor?.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                >
                    H2
                </ToolbarButton>
                <ToolbarButton
                    label="Heading 3"
                    active={editor?.isActive("heading", { level: 3 })}
                    onClick={() =>
                        editor?.chain().focus().toggleHeading({ level: 3 }).run()
                    }
                >
                    H3
                </ToolbarButton>
                <ToolbarButton
                    label="Bullet list"
                    active={editor?.isActive("bulletList")}
                    onClick={() => editor?.chain().focus().toggleBulletList().run()}
                >
                    ••
                </ToolbarButton>
                <ToolbarButton
                    label="Numbered list"
                    active={editor?.isActive("orderedList")}
                    onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                >
                    1.
                </ToolbarButton>
                <ToolbarButton
                    label="Quote"
                    active={editor?.isActive("blockquote")}
                    onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                >
                    “
                </ToolbarButton>
                <button type="button" aria-label="Insert link" onClick={addLink} className={toolbarBtn}>
                    <HiOutlineLink aria-hidden className="size-4" />
                </button>
                <button
                    type="button"
                    aria-label="Insert image"
                    onClick={() => imageInputRef.current?.click()}
                    className={toolbarBtn}
                >
                    <HiOutlinePhotograph aria-hidden className="size-4" />
                </button>
            </div>

            <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                multiple
                className="sr-only"
                onChange={(event) => {
                    void insertImages(event.target.files);
                    event.target.value = "";
                }}
            />

            <div className={cn("admin-rte", fill && "min-h-0 flex-1")}>
                <EditorContent editor={editor} />
            </div>
            {error ? (
                <p className="border-t border-red-100 px-5 py-2 text-xs text-red-600">
                    {error}
                </p>
            ) : null}
        </section>
    );
}

function ToolbarButton({
    children,
    label,
    active,
    onClick,
}: {
    children: React.ReactNode;
    label: string;
    active?: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            aria-label={label}
            onClick={onClick}
            className={cn(toolbarBtn, active && "bg-cream text-primary")}
        >
            {children}
        </button>
    );
}

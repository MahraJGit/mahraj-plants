"use client";

import { useEffect, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import {
    HiOutlineCode,
    HiOutlineLink,
    HiOutlinePhotograph,
} from "react-icons/hi";
import { HiOutlineListBullet, HiOutlineNumberedList } from "react-icons/hi2";
import { cn } from "@/app/lib/utils";
import { sanitizeHtmlSnippet } from "@/app/lib/blogs/html-snippet";
import AdminButton from "@/app/components/admin/ui/AdminButton";
import { uploadBlogImage } from "@/app/lib/blogs/upload-image";
import { HtmlSnippet } from "./HtmlSnippet";

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
    const [snippetOpen, setSnippetOpen] = useState(false);
    const [snippetDraft, setSnippetDraft] = useState("");
    const [snippetError, setSnippetError] = useState("");
    const [snippetExisting, setSnippetExisting] = useState(false);
    const [imageError, setImageError] = useState("");

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
            HtmlSnippet,
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
        setImageError("");
        for (const file of Array.from(files)) {
            try {
                const src = await uploadBlogImage(file);
                editor.chain().focus().setImage({ src }).run();
            } catch (error) {
                setImageError(
                    error instanceof Error
                        ? error.message
                        : "The image could not be uploaded. Try again.",
                );
            }
        }
    }

    useEffect(() => {
        if (!editor) return;
        editor.storage.htmlSnippet.openEditor = (html, existing) => {
            setSnippetDraft(html);
            setSnippetExisting(existing);
            setSnippetError("");
            setSnippetOpen(true);
        };
    }, [editor]);

    useEffect(() => {
        if (!snippetOpen) return;
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") setSnippetOpen(false);
        }
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [snippetOpen]);

    function openHtmlSnippet() {
        if (!editor) return;
        const existing = editor.isActive("htmlSnippet");
        editor.storage.htmlSnippet.openEditor(
            existing ? String(editor.getAttributes("htmlSnippet").html ?? "") : "",
            existing,
        );
    }

    function saveHtmlSnippet() {
        if (!editor) return;
        const clean = sanitizeHtmlSnippet(snippetDraft);
        if (!clean) {
            setSnippetError("Paste HTML, such as a table.");
            return;
        }

        if (snippetExisting && editor.isActive("htmlSnippet")) {
            editor.chain().focus().updateAttributes("htmlSnippet", { html: clean }).run();
        } else {
            editor
                .chain()
                .focus()
                .insertContent({ type: "htmlSnippet", attrs: { html: clean } })
                .run();
        }

        setSnippetOpen(false);
    }

    function removeHtmlSnippet() {
        if (!editor) return;
        editor.chain().focus().deleteSelection().run();
        setSnippetOpen(false);
    }

    function applyHeading(level: 1 | 2 | 3) {
        if (!editor) return;

        if (editor.isActive("codeBlock")) {
            const text = editor.state.selection.$from.parent.textContent.trim();
            const wrapped = text.match(/^<h[1-6]>([\s\S]*)<\/h[1-6]>$/i);
            editor.chain().focus().toggleCodeBlock().run();
            if (wrapped) {
                const from = editor.state.selection.$from.start();
                const to = editor.state.selection.$from.end();
                editor.chain().focus().insertContentAt({ from, to }, wrapped[1]).run();
            }
        }

        if (editor.isActive("heading", { level })) {
            editor.chain().focus().setParagraph().run();
            return;
        }

        editor.chain().focus().setHeading({ level }).run();
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
                "flex flex-col rounded-[1.5rem] border bg-white",
                fill && "min-h-[28rem] flex-1",
                error ? "border-red-400" : "border-primary/8",
            )}
        >
            <div className="sticky top-4 z-20 flex flex-wrap items-center gap-1 rounded-t-[1.5rem] border-b border-primary/8 bg-white px-5 py-2.5">
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
                    label="Heading 1"
                    active={editor?.isActive("heading", { level: 1 })}
                    onClick={() => applyHeading(1)}
                >
                    H1
                </ToolbarButton>
                <ToolbarButton
                    label="Heading 2"
                    active={editor?.isActive("heading", { level: 2 })}
                    onClick={() => applyHeading(2)}
                >
                    H2
                </ToolbarButton>
                <ToolbarButton
                    label="Heading 3"
                    active={editor?.isActive("heading", { level: 3 })}
                    onClick={() => applyHeading(3)}
                >
                    H3
                </ToolbarButton>
                <ToolbarButton
                    label="Bullet list"
                    active={editor?.isActive("bulletList")}
                    onClick={() => editor?.chain().focus().toggleBulletList().run()}
                >
                    <HiOutlineListBullet aria-hidden className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Numbered list"
                    active={editor?.isActive("orderedList")}
                    onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                >
                    <HiOutlineNumberedList aria-hidden className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Quote"
                    active={editor?.isActive("blockquote")}
                    onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                >
                    “
                </ToolbarButton>
                <ToolbarButton
                    label="Code block"
                    active={editor?.isActive("codeBlock")}
                    onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
                >
                    <HiOutlineCode aria-hidden className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Custom HTML"
                    active={editor?.isActive("htmlSnippet")}
                    onClick={openHtmlSnippet}
                    className="w-auto px-2"
                >
                    <span className="text-[10px] tracking-tight">HTML</span>
                </ToolbarButton>
                <ToolbarButton label="Insert link" onClick={addLink}>
                    <HiOutlineLink aria-hidden className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Insert image"
                    onClick={() => imageInputRef.current?.click()}
                >
                    <HiOutlinePhotograph aria-hidden className="size-4" />
                </ToolbarButton>
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

            {imageError ? (
                <p className="border-b border-red-100 px-5 py-2 text-xs text-red-600">
                    {imageError}
                </p>
            ) : null}

            <div className={cn("admin-rte overflow-hidden rounded-b-[1.5rem]", fill && "min-h-0 flex-1")}>
                <EditorContent editor={editor} />
            </div>
            {error ? (
                <p className="border-t border-red-100 px-5 py-2 text-xs text-red-600">
                    {error}
                </p>
            ) : null}

            {snippetOpen ? (
                <HtmlSnippetDialog
                    value={snippetDraft}
                    error={snippetError}
                    existing={snippetExisting}
                    onChange={(value) => {
                        setSnippetDraft(value);
                        setSnippetError("");
                    }}
                    onClose={() => setSnippetOpen(false)}
                    onSave={saveHtmlSnippet}
                    onRemove={removeHtmlSnippet}
                />
            ) : null}
        </section>
    );
}

function ToolbarButton({
    children,
    label,
    active,
    onClick,
    className,
}: {
    children: React.ReactNode;
    label: string;
    active?: boolean;
    onClick: () => void;
    className?: string;
}) {
    return (
        <button
            type="button"
            aria-label={label}
            onClick={onClick}
            className={cn(
                toolbarBtn,
                "group relative",
                active && "bg-cream text-primary",
                className,
            )}
        >
            {children}
            <span
                role="tooltip"
                className="pointer-events-none absolute top-full left-1/2 z-30 mt-1.5 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-primary px-2 py-1 text-[11px] font-medium tracking-normal text-white normal-case shadow-sm group-hover:block"
            >
                {label}
            </span>
        </button>
    );
}

const snippetPlaceholder = `<table>
  <thead>
    <tr><th>Plant</th><th>Water</th></tr>
  </thead>
  <tbody>
    <tr><td>Rose</td><td>Twice a week</td></tr>
  </tbody>
</table>`;

function HtmlSnippetDialog({
    value,
    error,
    existing,
    onChange,
    onClose,
    onSave,
    onRemove,
}: {
    value: string;
    error: string;
    existing: boolean;
    onChange: (value: string) => void;
    onClose: () => void;
    onSave: () => void;
    onRemove: () => void;
}) {
    const preview = sanitizeHtmlSnippet(value);

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-primary/40 p-4 sm:items-center">
            <button
                type="button"
                aria-label="Close HTML snippet"
                className="absolute inset-0 cursor-default"
                onClick={onClose}
            />
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="html-snippet-title"
                className="relative z-10 flex max-h-[min(40rem,calc(100vh-2rem))] w-full max-w-2xl flex-col overflow-hidden rounded-[1.5rem] bg-white shadow-[0_20px_60px_rgba(10,37,14,0.18)]"
            >
                <div className="border-b border-primary/8 px-5 py-4">
                    <h2 id="html-snippet-title" className="text-lg font-bold text-primary">
                        Custom HTML
                    </h2>
                    <p className="mt-1 text-sm text-primary/60">
                        Paste a table or any other HTML. It is rendered on the article. The code button still shows code as text.
                    </p>
                </div>
                <div className="grid min-h-0 flex-1 gap-4 overflow-y-auto px-5 py-4">
                    <label className="block">
                        <span className="mb-2 block text-xs font-semibold text-primary">HTML</span>
                        <textarea
                            value={value}
                            onChange={(event) => onChange(event.target.value)}
                            placeholder={snippetPlaceholder}
                            rows={8}
                            className="w-full resize-y rounded-2xl border border-primary/10 bg-cream/40 px-3 py-3 font-mono text-xs leading-5 text-primary outline-none focus:border-secondary"
                            autoFocus
                        />
                    </label>
                    {error ? <p className="text-xs text-red-600">{error}</p> : null}
                    {preview ? (
                        <div>
                            <p className="mb-2 text-xs font-semibold text-primary">Preview</p>
                            <div
                                className="blog-custom-html rounded-2xl border border-primary/8 bg-white p-3"
                                dangerouslySetInnerHTML={{ __html: preview }}
                            />
                        </div>
                    ) : null}
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-primary/8 px-5 py-4">
                    {existing ? (
                        <AdminButton variant="danger" size="sm" onClick={onRemove}>
                            Remove
                        </AdminButton>
                    ) : (
                        <span />
                    )}
                    <div className="flex items-center gap-2">
                        <AdminButton variant="ghost" size="sm" onClick={onClose}>
                            Cancel
                        </AdminButton>
                        <AdminButton size="sm" onClick={onSave}>
                            {existing ? "Update" : "Insert"}
                        </AdminButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

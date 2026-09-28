"use client";

import { Node, mergeAttributes, type NodeViewProps } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import { encodeHtmlSnippet, decodeHtmlSnippet } from "@/app/lib/blogs/html-snippet";

export type HtmlSnippetStorage = {
    openEditor: (html: string, existing: boolean) => void;
};

declare module "@tiptap/core" {
    interface Storage {
        htmlSnippet: HtmlSnippetStorage;
    }
}

export const HtmlSnippet = Node.create<Record<string, never>, HtmlSnippetStorage>({
    name: "htmlSnippet",
    group: "block",
    atom: true,
    selectable: true,

    addStorage() {
        return {
            openEditor: () => undefined,
        };
    },

    addAttributes() {
        return {
            html: {
                default: "",
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: "div[data-html-snippet]",
                getAttrs: (element) => {
                    if (!(element instanceof HTMLElement)) return false;
                    const encoded = element.getAttribute("data-html-snippet");
                    if (!encoded) return false;
                    try {
                        return { html: decodeHtmlSnippet(encoded) };
                    } catch {
                        return false;
                    }
                },
            },
        ];
    },

    renderHTML({ node }) {
        return [
            "div",
            mergeAttributes({
                class: "blog-custom-html",
                "data-html-snippet": encodeHtmlSnippet(String(node.attrs.html ?? "")),
            }),
        ];
    },

    addNodeView() {
        return ReactNodeViewRenderer(HtmlSnippetView);
    },
});

function HtmlSnippetView({ editor, node, getPos, selected }: NodeViewProps) {
    const html = String(node.attrs.html ?? "");

    function edit() {
        const pos = getPos();
        if (typeof pos === "number") {
            editor.chain().setNodeSelection(pos).run();
        }
        editor.storage.htmlSnippet.openEditor(html, true);
    }

    return (
        <NodeViewWrapper
            className="blog-custom-html"
            data-selected={selected ? "true" : undefined}
        >
            <div dangerouslySetInnerHTML={{ __html: html }} />
            <button
                type="button"
                onClick={edit}
                className="mt-2 cursor-pointer rounded-full bg-cream px-3 py-1 text-[11px] font-semibold text-primary"
            >
                Edit HTML
            </button>
        </NodeViewWrapper>
    );
}

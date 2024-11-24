"use client";
import React from "react";
import dynamic from "next/dynamic";

const LinkPreview = dynamic(
    () => import("@/components/ui/link-preview").then((m) => m.LinkPreview),
    {
        loading: () => <div>Loading...</div>,
    }
);

export function LinkPreviewDemo() {
    return (
        <div className="flex justify-center items-center h-[20rem] flex-col px-4">
            <div className="text-neutral-500 dark:text-neutral-400 text-xl md:text-3xl max-w-3xl mx-auto mb-10">
                努力不一定会被看见，但是{" "}
                <LinkPreview url="https://poki.com" className="font-bold">
                    摸鱼
                </LinkPreview>{" "}
                一定会被发现。 —— Code Veil。
            </div>
            <div className="text-neutral-500 dark:text-neutral-400 text-xl md:text-3xl max-w-3xl mx-auto">
                站长的初心是深入研究 Java 生态，尤其是经典的{" "}
                <LinkPreview
                    url="https://spring.io/"
                    className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
                >
                    Spring 生态
                </LinkPreview>{" "}
                等技术领域。
            </div>
        </div>
    );
}

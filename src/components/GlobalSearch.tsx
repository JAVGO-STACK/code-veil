"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Article } from "@/types/article";
import Link from "next/link";
import dynamic from "next/dynamic";

const IconHome = dynamic(() => import("@/components/icon/IconHome"));
const IconAbout = dynamic(() => import("@/components/icon/IconAbout"));
const IconProject = dynamic(() => import("@/components/icon/IconProject"));
const IconArticles = dynamic(() => import("@/components/icon/IconArticles"));
const IconContact = dynamic(() => import("@/components/icon/IconContact"));
const IconGithub = dynamic(() => import("@/components/icon/IconGithub"));
const IconCSDN = dynamic(() => import("@/components/icon/IconCSDN"));
const IconInfoQ = dynamic(() => import("@/components/icon/IconInfoQ"));

interface GlobalSearchProps {
    articles: Article[];
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({ articles }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const router = useRouter();

    const filteredArticles = useMemo(() => {
        if (!searchTerm) return [];
        return articles.filter((article: Article) =>
            article.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, articles]);

    const handleSelectArticle = (slug: string) => {
        router.push(`/blog/${slug}`);
        setSearchTerm("");
        setSelectedIndex(0);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (filteredArticles.length === 0) return;
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((prevIndex) => (prevIndex + 1) % filteredArticles.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex((prevIndex) =>
                (prevIndex + filteredArticles.length - 1) % filteredArticles.length
            );
        } else if (e.key === "Enter") {
            e.preventDefault();
            const selectedArticle = filteredArticles[selectedIndex];
            if (selectedArticle) {
                handleSelectArticle(selectedArticle.slug);
            }
        }
    };

    const links = useMemo(
        () => [
            {
                label: "Home",
                href: "/",
                icon: (
                    <IconHome className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                ),
            },
            {
                label: "About",
                href: "/about",
                icon: (
                    <IconAbout className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                ),
            },
            {
                label: "Projects",
                href: "/projects",
                icon: (
                    <IconProject className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                ),
            },
            {
                label: "Articles",
                href: "/blog",
                icon: (
                    <IconArticles className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                ),
            },
            {
                label: "Contact",
                href: "/contact",
                icon: (
                    <IconContact className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                ),
            },
        ],
        []
    );

    return (
        <div className="rounded-xl shadow-sm mb-2.5 flex items-center p-4 pr-16 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700">
            <div className="flex space-x-4">
                {links.map((link) => (
                    <Link
                        href={link.href}
                        key={link.label}
                        className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-neutral-700 cursor-pointer transition ease-in-out duration-200 rounded"
                    >
                        {link.icon}
                        <span className="ml-2 text-neutral-700 dark:text-neutral-200">
                            {link.label}
                        </span>
                    </Link>
                ))}
            </div>
            <div className="flex-1 flex justify-end">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="搜索文章..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setSelectedIndex(0);
                        }}
                        onKeyDown={handleKeyDown}
                        className="w-72 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-200"
                    />
                    {filteredArticles.length > 0 && (
                        <div className="absolute z-10 mt-2 w-full bg-white dark:bg-neutral-800 border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto scrollbar-hide">
                            {filteredArticles.map((article: Article, index: number) => (
                                <div
                                    key={article.id}
                                    className={`p-2 cursor-pointer transition ease-in-out duration-200 ${selectedIndex === index
                                        ? "bg-gray-200 dark:bg-neutral-700"
                                        : "hover:bg-gray-100 dark:hover:bg-neutral-700"
                                        }`}
                                    onClick={() => handleSelectArticle(article.slug)}
                                >
                                    {article.title}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
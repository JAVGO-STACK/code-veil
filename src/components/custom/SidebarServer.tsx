import React, { useMemo } from "react";
import { getAllArticles } from "@/lib/generateArticles";
import { SidebarDemo } from "./Sidebar";
import { Article } from "@/types/article";

interface SidebarDemoServerProps {
    children: React.ReactNode;
}

export default async function SidebarDemoServer({ children }: SidebarDemoServerProps) {
    const articles: Article[] = await useMemo(() => getAllArticles(), []);
    return <SidebarDemo articles={articles}>{children}</SidebarDemo>;
}
"use client";
import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/Footer";
import { GlobalSearch } from "@/components/GlobalSearch";
import { Article } from "@/types/article";

const IconHome = dynamic(() => import("@/components/icon/IconHome"));
const IconAbout = dynamic(() => import("@/components/icon/IconAbout"));
const IconProject = dynamic(() => import("@/components/icon/IconProject"));
const IconArticles = dynamic(() => import("@/components/icon/IconArticles"));
const IconContact = dynamic(() => import("@/components/icon/IconContact"));
const IconGithub = dynamic(() => import("@/components/icon/IconGithub"));
const IconCSDN = dynamic(() => import("@/components/icon/IconCSDN"));
const IconInfoQ = dynamic(() => import("@/components/icon/IconInfoQ"));

interface SidebarDemoProps {
  children: React.ReactNode;
  articles: Article[];
}

export function SidebarDemo({ children, articles }: SidebarDemoProps) {
  const links = useMemo(() => [
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
  ], []);

  const socialLinks = useMemo(() => [
    {
      label: "GitHub",
      href: "https://github.com/JAVGO-STACK",
      icon: (
        <IconGithub className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "CSDN",
      href: "https://blog.csdn.net/ly1347889755?spm=1000.2115.3001.5343",
      icon: (
        <IconCSDN className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "InfoQ",
      href: "https://www.infoq.cn/profile/BA98042083560F/publish",
      icon: (
        <IconInfoQ className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ], []);

  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-full mx-auto border border-neutral-200 dark:border-neutral-700",
        "h-screen" // for your use case, use h-screen instead of h-[60vh]
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {/* 根据侧边栏状态显示不同的 Logo */}
            {open ? <Logo /> : <LogoIcon />}
            {/* 渲染侧边栏链接 */}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
            {/* 添加社交链接分割区域 */}
            <div className="mt-8 border-t border-neutral-200 dark:border-neutral-700 pt-4 flex flex-col gap-2">
              {socialLinks.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            {/* 侧边栏底部作者信息 */}
            <SidebarLink
              link={{
                label: "沉默的老李",
                href: "#",
                icon: (
                  <Image
                    src="/images/logos/avatar.jpg"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      {/* 渲染主内容区域 */}
      <div className="flex flex-1 flex-col ml-2.5">
        {/* 顶部搜索区域 */}
        <GlobalSearch articles={articles} />
        {/* 底部主要内容区域 */}
        <div className="shadow-lg p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full overflow-y-auto scrollbar-hide">
          {children}
          <Footer />
        </div>
      </div>
    </div>
  );
}

// 定义完整的 Logo 组件
export const Logo = React.memo(() => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <Image
        src="/images/logos/favicon.ico"
        alt="Avatar"
        height="30"
        width="30"
        className="object-cover object-top rounded-full flex-shrink-0"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Code Veil
      </motion.span>
    </Link>
  );
});

// 定义收缩状态的 Logo 组件
export const LogoIcon = React.memo(() => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <Image
        src="/images/logos/favicon.ico"
        alt="Avatar"
        height="30"
        width="30"
        className="object-cover object-top rounded-full flex-shrink-0"
      />
    </Link>
  );
});
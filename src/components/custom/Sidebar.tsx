"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

import IconHome from "@/components/icon/IconHome";
import IconAbout from "@/components/icon/IconAbout";
import IconProject from "@/components/icon/IconProject";
import IconArticles from "@/components/icon/IconArticles";
import IconContact from "@/components/icon/IconContact";

// 定义侧边栏组件
export function SidebarDemo({ children }: { children: React.ReactNode }) {
  // 定义侧边栏链接数组
  const links = [
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
  ];

   // 状态管理，控制侧边栏的打开和关闭
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-full mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
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
      <div className="flex flex-1">
        <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
          {children}
        </div>
      </div>
    </div>
  );
}

// 定义完整的 Logo 组件
export const Logo = () => {
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
};

// 定义收缩状态的 Logo 组件
export const LogoIcon = () => {
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
};

// 定义一个虚拟的仪表盘组件
const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <div className="flex gap-2">
          {[...new Array(4)].map((i) => (
            <div
              key={"first-array" + i}
              className="h-20 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
        <div className="flex gap-2 flex-1">
          {[...new Array(2)].map((i) => (
            <div
              key={"second-array" + i}
              className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

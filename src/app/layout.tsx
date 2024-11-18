// 首页布局
import { SidebarDemo } from "@/components/custom/Sidebar";
import "./globals.css";
import "prismjs/themes/prism-tomorrow.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

// 元数据
export const metadata: Metadata = {
  title: "Code Veil - Developer",
  description: "Code Veil is a developer, writer and speaker. He is a digital nomad and travels around the world while working remotely.",
};

// 布局
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body
        className={twMerge(
          inter.className,
          "flex antialiased bg-gray-100"
        )}
      >
        <SidebarDemo>
          {children}
        </SidebarDemo>
      </body>
    </html>
  );
}

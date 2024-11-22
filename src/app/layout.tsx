import { SidebarDemo } from "@/components/custom/Sidebar";
import SidebarServer from "@/components/custom/SidebarServer";
import "./globals.css";
import "prismjs/themes/prism-tomorrow.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Code Veil - Developer",
  description: "Code Veil is a developer, writer and speaker. He is a digital nomad and travels around the world while working remotely.",
};

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
        <SidebarServer>
          {children}
        </SidebarServer>
      </body>
    </html>
  );
}
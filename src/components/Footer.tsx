"use client";

import React from "react";
import Image from "next/image";
// 使用 react-icons 作为示例，你可以替换为自定义图标组件
import { FiShield, FiGlobe } from "react-icons/fi";

export const Footer = () => {
  return (
    <footer className="p-4 text-center text-xs text-neutral-500 border-t border-neutral-100">
      <div className="flex flex-col items-center space-y-2">
        {/* Logo 和版权信息 */}
        <div className="flex items-center space-x-2">
          <Image
            src="/images/logos/favicon.ico"
            alt="Avatar"
            height="25"
            width="25"
            className="object-cover object-top rounded-full"
          />
          <span className="font-semibold">{new Date().getFullYear()}</span>
          <span>&#8212; Built by Code Veil</span>
        </div>

        {/* 备案信息 */}
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
          {/* 公安备案 */}
          <div className="flex items-center space-x-1">
            <FiShield className="text-neutral-700 dark:text-neutral-200 h-4 w-4" aria-hidden="true" />
            <span>京公网安备 11000000000000号</span>
          </div>

          {/* 网安备案 */}
          <div className="flex items-center space-x-1">
            <FiGlobe className="text-neutral-700 dark:text-neutral-200 h-4 w-4" aria-hidden="true" />
            <span>京网文[2023]1234-5678号</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

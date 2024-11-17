"use client";

import React, { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";
import { extractText } from "@/utils/extractText";

interface CodeBlockProps {
  className?: string;
  children: React.ReactNode;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ className, children }) => {
  const [isCopied, setIsCopied] = useState(false);
  const language = className ? className.replace(/language-/, "") : "";
  const code = extractText(children);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("复制失败！", err);
    }
  };

  return (
    <div className="relative">
      <pre className={`relative overflow-auto bg-gray-800 text-white p-4 rounded-md ${language}`}>
        <code className={language}>{children}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 bg-gray-700 text-white rounded-md p-1 hover:bg-gray-600 focus:outline-none transition"
        aria-label="复制代码"
      >
        {isCopied ? <FiCheck /> : <FiCopy />}
      </button>
    </div>
  );
};

export default CodeBlock;

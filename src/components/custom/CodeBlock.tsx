"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { extractText } from "@/utils/extractText";

const FiCopy = dynamic(() => import("react-icons/fi").then((mod) => mod.FiCopy));
const FiCheck = dynamic(() => import("react-icons/fi").then((mod) => mod.FiCheck));

interface CodeBlockProps {
  className?: string;
  children: React.ReactNode;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ className, children }) => {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const language = className ? className.replace(/language-/, "") : "";
  const code = extractText(children);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setIsCopied(true);
      timeoutRef.current = setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("复制失败！", err);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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

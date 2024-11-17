"use client";
import React from "react";
import Link from "next/link";
import { TreeNode } from "@/types/treeNode";
import { usePathname } from "next/navigation";

type SidebarMenuProps = {
  treeData: TreeNode[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  treeData,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="搜索文章"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-300 rounded"
      />
      {treeData.map((node, index) => (
        <TreeNodeComponent key={index} node={node} level={0} />
      ))}
    </div>
  );
};

type TreeNodeProps = {
  node: TreeNode;
  level: number;
};

const TreeNodeComponent: React.FC<TreeNodeProps> = ({ node, level }) => {
  const [expanded, setExpanded] = React.useState(true);
  const hasChildren = node.children && node.children.length > 0;
  const pathname = usePathname();
  const isActive = `/blog/${node.slug}` === pathname;

  return (
    <div style={{ marginLeft: level * 16 }}>
      <div
        className={`flex items-center cursor-pointer hover:bg-gray-100 p-1 rounded ${
          isActive ? "bg-blue-100" : ""
        }`}
        onClick={() => {
          if (hasChildren) setExpanded(!expanded);
        }}
      >
        {hasChildren && (
          <span
            className={`mr-2 transform transition-transform duration-200 ${
              expanded ? "rotate-90" : ""
            }`}
          >
            ▶
          </span>
        )}
        {node.blog ? (
          <Link href={`/blog/${node.slug}`}>
            <span className="text-blue-600 hover:underline">{node.title}</span>
          </Link>
        ) : (
          <span className="font-bold">{node.name}</span>
        )}
      </div>
      {hasChildren && expanded && (
        <div className="transition-all duration-200">
          {node.children.map((childNode, index) => (
            <TreeNodeComponent
              key={index}
              node={childNode}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

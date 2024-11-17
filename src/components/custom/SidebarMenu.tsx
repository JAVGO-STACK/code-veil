"use client";
import React from "react";
import Link from "next/link";
import { TreeNode } from "@/types/treeNode";
import { usePathname } from "next/navigation";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";
import clsx from "clsx";

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
    <div>
      <input
        type="text"
        placeholder="搜索文章"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <nav>
        {treeData.map((node, index) => (
          <TreeNodeComponent key={index} node={node} level={0} />
        ))}
      </nav>
    </div>
  );
};

type TreeNodeProps = {
  node: TreeNode;
  level: number;
};

const TreeNodeComponent: React.FC<TreeNodeProps> = ({ node, level }) => {
  const [expanded, setExpanded] = React.useState(level < 1); // 默认仅展开第一层
  const hasChildren = node.children && node.children.length > 0;
  const pathname = usePathname();
  const isActive = node.blog ? `/blog/${node.slug}` === pathname : false;

  return (
    <div className="mt-1">
      <div
        className={clsx(
          "flex items-center p-2 rounded cursor-pointer transition-colors duration-200",
          isActive
            ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
            : "hover:bg-blue-100 dark:hover:bg-neutral-700"
        )}
        onClick={() => {
          if (hasChildren) setExpanded(!expanded);
        }}
      >
        {hasChildren ? (
          expanded ? (
            <FiChevronDown className="mr-2" />
          ) : (
            <FiChevronRight className="mr-2" />
          )
        ) : (
          <span className="w-5 mr-2"></span>
        )}
        {node.blog ? (
          <Link href={`/blog/${node.slug}`}>
            <span className="text-sm font-medium">
              {node.title}
            </span>
          </Link>
        ) : (
          <span className="text-sm font-semibold">{node.name}</span>
        )}
      </div>
      {hasChildren && expanded && (
        <div className="ml-4">
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

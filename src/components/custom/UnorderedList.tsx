import React from "react";

interface UnorderedListProps {
  children: React.ReactNode;
}

const UnorderedList: React.FC<UnorderedListProps> = ({ children }) => {
  return (
    <ul className="list-disc space-y-2 text-blue-600 dark:text-blue-300">
      {children}
    </ul>
  );
};

export default UnorderedList;

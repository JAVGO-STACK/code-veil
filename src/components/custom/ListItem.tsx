import React from "react";

interface ListItemProps {
  children: React.ReactNode;
}

const ListItem: React.FC<ListItemProps> = ({ children }) => {
  return (
    <li className="marker:text-blue-500 dark:marker:text-blue-300">
      {children}
    </li>
  );
};

export default ListItem;

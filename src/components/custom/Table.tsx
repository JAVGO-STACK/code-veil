import React from "react";

const Table: React.FC<React.HTMLAttributes<HTMLTableElement>> = ({
  children,
  ...rest
}) => {
  return (
    <div className="overflow-x-auto">
      <table
        className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 table-auto"
        {...rest}
      >
        {children}
      </table>
    </div>
  );
};

const Thead: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  ...rest
}) => {
  return (
    <thead className="bg-gray-50 dark:bg-gray-800" {...rest}>
      {children}
    </thead>
  );
};

const Tbody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  ...rest
}) => {
  return (
    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700" {...rest}>
      {children}
    </tbody>
  );
};

const Tr: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({
  children,
  ...rest
}) => {
  return (
    <tr {...rest}>
      {children}
    </tr>
  );
};

const Th: React.FC<React.ThHTMLAttributes<HTMLTableHeaderCellElement>> = ({
  children,
  ...rest
}) => {
  return (
    <th
      scope="col"
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
      {...rest}
    >
      {children}
    </th>
  );
};

const Td: React.FC<React.TdHTMLAttributes<HTMLTableDataCellElement>> = ({
  children,
  ...rest
}) => {
  return (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300" {...rest}>
      {children}
    </td>
  );
};

export const CustomTableComponents = {
  table: Table,
  thead: Thead,
  tbody: Tbody,
  tr: Tr,
  th: Th,
  td: Td,
};

import React from "react";

interface OrderedListProps {
  children: React.ReactNode;
}

const OrderedList: React.FC<OrderedListProps> = ({ children }) => {
  return (
    <ol className="custom-counter">
      {children}
    </ol>
  );
};

export default OrderedList;

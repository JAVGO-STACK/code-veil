import React from "react";

export const extractText = (children: React.ReactNode): string => {
  if (typeof children === "string") {
    return children;
  }

  if (Array.isArray(children)) {
    return children.map(child => extractText(child)).join("");
  }

  if (React.isValidElement(children) && children.props.children) {
    return extractText(children.props.children);
  }

  return "";
};

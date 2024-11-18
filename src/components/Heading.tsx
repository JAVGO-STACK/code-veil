import React from "react";
import localFont from "next/font/local";
import { twMerge } from "tailwind-merge";

const CalSans = localFont({
  src: [{ path: "../../fonts/CalSans-SemiBold.woff2" }],
  display: "swap",
});

type HeadingProps = {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
} & React.ComponentPropsWithoutRef<React.ElementType>;

export const Heading: React.FC<HeadingProps> = ({
  className,
  children,
  as: Tag = "h1",
  ...rest
}) => {
  return (
    <Tag
      className={twMerge(
        CalSans.className,
        "text-base md:text-xl lg:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary",
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
};

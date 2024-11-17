import React from "react";

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className={`max-w-full w-full mx-auto px-4 md:px-10`}>
      {children}
    </main>
  );
};

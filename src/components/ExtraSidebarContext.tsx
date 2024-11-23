// 上下文，在 RootLayout 和 SidebarDemo 中共享 extraSidebar 内容
import React from "react";

export const ExtraSidebarContext = React.createContext<React.ReactNode>(null);
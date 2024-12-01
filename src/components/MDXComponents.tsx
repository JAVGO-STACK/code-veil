import React from "react";
import CodeBlock from "@/components/custom/CodeBlock";
import { CustomTableComponents } from "@/components/custom/Table";
import UnorderedList from "@/components/custom/UnorderedList";
import OrderedList from "@/components/custom/OrderedList";
import ListItem from "@/components/custom/ListItem";

interface PreProps {
    children: React.ReactNode;
}

const Pre = (props: PreProps) => {
    const { children } = props;
    const child = React.Children.only(children);

    if (
        React.isValidElement(child) &&
        child.type === "code" &&
        typeof child.props.className === "string" &&
        child.props.className.startsWith("language-")
    ) {
        return <CodeBlock {...child.props}>{child.props.children}</CodeBlock>;
    }

    return <pre {...props}>{children}</pre>;
}

export const components: Record<string, React.ComponentType<any>> = {
    pre: (props) => <Pre {...props} />,
    table: CustomTableComponents.table,
    thead: CustomTableComponents.thead,
    tbody: CustomTableComponents.tbody,
    tr: CustomTableComponents.tr,
    th: CustomTableComponents.th,
    td: CustomTableComponents.td,
    // TODO：↓ 有 Bug，有空再修
    // ul: UnorderedList,
    // ol: OrderedList,
    // li: ListItem,
}

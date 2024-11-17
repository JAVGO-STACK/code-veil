import React from "react";
import CodeBlock from "@/components/custom/CodeBlock";
import { CustomTableComponents } from "@/components/custom/Table";

const Pre = (props: any) => {
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
}

import { visit } from "unist-util-visit";
import { Element } from "hast";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function rehypeExtractHeadings(options: { headings: Heading[] }) {
  return (tree: Element) => {
    visit(tree, "element", (node: any) => {
      if (/^h[1-6]$/.test(node.tagName)) {
        const level = parseInt(node.tagName[1], 10);
        const id = node.properties?.id as string | undefined;
        let text = "";

        visit(node, "text", (child: any) => {
          text += child.value;
        });

        if (id) {
          options.headings.push({ id, text, level });
        }
      }
    });
  };
}

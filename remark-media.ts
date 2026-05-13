import { visit } from "unist-util-visit";
import type { Root, Parent } from "mdast";

const VIDEO_EXTENSIONS = new Set([".webm", ".mp4", ".mov"]);

function getMime(url: string) {
  if (url.endsWith(".webm")) return "video/webm";
  if (url.endsWith(".mp4")) return "video/mp4";
  if (url.endsWith(".mov")) return "video/quicktime";

  return "video/mp4";
}

function isVideo(url: string) {
  return Array.from(VIDEO_EXTENSIONS).some((ext) => url.endsWith(ext));
}

export default function remarkMedia() {
  return (tree: Root) => {
    visit(
      tree,
      "paragraph",
      (node: Parent, index?: number, parent?: Parent) => {
        if (!parent || index === undefined) return;

        const first = node.children?.[0];
        if (!first || first.type !== "image") return;

        if (!isVideo(first.url)) return;

        parent.children[index] = {
          type: "html",
          value: `</p><video controls preload="metadata">
  <source src="${first.url}" type="${getMime(first.url)}" />
</video><p>`,
        };
      },
    );
  };
}

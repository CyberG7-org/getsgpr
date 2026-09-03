import type { PageContent } from "@/content/types";
import { Shapes } from "@/components/ui/Shapes";
import { Blocks } from "@/components/blocks/Blocks";

export function Page({ content }: { content: PageContent }) {
  return (<><Shapes preset={content.shapes} /><main><Blocks blocks={content.blocks} /></main></>);
}

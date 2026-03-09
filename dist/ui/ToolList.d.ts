import type { ManagerResult, Tool } from "../types/tool.js";
type ToolItemValue = {
    type: "tool";
    tool: Tool;
} | {
    type: "back";
};
interface ToolListProps {
    /** Single group (one category opened). */
    group: ManagerResult;
    mode: "list" | "uninstall";
    onSelect: (value: ToolItemValue) => void;
}
export declare function ToolList({ group, mode, onSelect }: ToolListProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ToolList.d.ts.map
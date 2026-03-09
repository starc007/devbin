import type { ManagerResult, Tool } from "../types/tool.js";
interface AnalyzeProps {
    groups: readonly ManagerResult[];
    tools: readonly Tool[];
    onBack: () => void;
}
export declare function Analyze({ groups, tools, onBack }: AnalyzeProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Analyze.d.ts.map
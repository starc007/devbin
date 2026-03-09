import type { Tool } from "../types/tool.js";
interface UninstallConfirmProps {
    tool: Tool;
    onConfirm: (confirmed: boolean) => void;
}
export declare function UninstallConfirm({ tool, onConfirm }: UninstallConfirmProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=UninstallConfirm.d.ts.map
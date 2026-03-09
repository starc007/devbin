import type { ManagerResult } from "../types/tool.js";
type CategoryValue = {
    type: "category";
    group: ManagerResult;
} | {
    type: "back";
};
interface CategoryListProps {
    groups: readonly ManagerResult[];
    mode: "list" | "uninstall";
    onSelect: (value: CategoryValue) => void;
}
export declare function CategoryList({ groups, mode, onSelect }: CategoryListProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=CategoryList.d.ts.map
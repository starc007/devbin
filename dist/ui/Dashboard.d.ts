export type DashboardAction = "list" | "uninstall" | "analyze" | "refresh" | "exit";
interface DashboardProps {
    onSelect: (action: DashboardAction) => void;
}
export declare function Dashboard({ onSelect }: DashboardProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Dashboard.d.ts.map
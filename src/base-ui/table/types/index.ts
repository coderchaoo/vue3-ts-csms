type indexType = "number" | ((index: number) => number);

export type tableSizeType = "large" | "default" | "small";

export interface ITableColumnConfig {
  prop: string;
  label: string;
  width?: number | string;
  minWidth?: number | string;
  fixed?: true | "left" | "right";
  type?: "selection" | "index" | "expand";
  index?: indexType;
  slotName?: string;
}

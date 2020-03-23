import { AstNode } from "@j2a/j2a/dist/index";

export interface ParamInfo {
  type: string;
  key: string;
  comment?: string;
}
export interface LoopInfo {
  node: AstNode | undefined;
  clazz: string;
}

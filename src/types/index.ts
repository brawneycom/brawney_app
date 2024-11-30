export * from "./menus";
export * from "./account";

export type V1SuccessResponse<T> = {
  success: boolean;
  error: string;
  messages: string[];
  result: T;
};

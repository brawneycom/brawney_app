export * from "./menus";
export * from "./account";
export * from "./series";

export type RequestStatus = "idle" | "done" | "error" | "success" | "pending";

export type V1SuccessResponse<T> = {
  success: boolean;
  error: string;
  messages: string[];
  result: T;
};

export type ContextResult<T> = {
  loading: boolean;
  status: string;
  error: Error | undefined | null;
  data: T | undefined | null;
};

import { ActionType } from "@bennie-ui/types/attributes";

export type NotificationName = "session_expired" | "something_went_wrong";

export type ActiveNotification = {
  name: NotificationName | null;
  data: any;
  action?: ActionType;
  duration?: number;
};

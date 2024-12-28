import { FC } from "react";
import { NotificationWrapper } from "../NotificationWrapper";

export const SessionExpiredNotification: FC = () => {
  return (
    <NotificationWrapper name="session_expired">
      <p>Session Expired, please try login again</p>
    </NotificationWrapper>
  );
};

import React, { FC } from "react";
import { NotificationWrapper } from "../NotificationWrapper";

export const SomethingWentWrongNotification: FC = () => {
  return (
    <NotificationWrapper name="something_went_wrong">
      <p>Something went wrong</p>
    </NotificationWrapper>
  );
};

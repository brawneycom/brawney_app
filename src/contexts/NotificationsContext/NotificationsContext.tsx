import { createContext, useContext } from "react";
import { ActiveNotification } from "./NotificationsContext.types";

export type NotificationsContextProps = {
  activeNotification: ActiveNotification | null;
  setActiveNotification: (
    activeNotificationData: ActiveNotification | null,
  ) => void;
};

export const NotificationsContext = createContext<NotificationsContextProps>({
  activeNotification: null,
  setActiveNotification: (
    activeNotificationData: ActiveNotification | null,
  ) => {
    console.log("f: noop", activeNotificationData);
  },
});

export const useNotifications = () => useContext(NotificationsContext);

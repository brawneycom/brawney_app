import { FC, ReactElement } from "react";
import { NotificationName, useNotifications } from "~/contexts";
import { Toast } from "@bennie-ui/toast";

type NotificationWrapperProp = {
  children: ReactElement;
  name: NotificationName;
};

export const NotificationWrapper: FC<NotificationWrapperProp> = ({
  children,
  name,
}) => {
  const { activeNotification } = useNotifications();

  const isOpen = activeNotification?.name === name;

  return isOpen ? (
    <Toast
      action={activeNotification.action || "info"}
      duration={activeNotification.duration}
      dismissable
    >
      {children}
    </Toast>
  ) : null;
};

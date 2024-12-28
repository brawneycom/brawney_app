import React, { FC, useState, ReactNode, useEffect } from "react";
import { NotificationsContext } from "./NotificationsContext";
import { ActiveNotification } from "./NotificationsContext.types";

type NotificationsProviderProps = {
  children: ReactNode;
};

export const NotificationsProvider: FC<NotificationsProviderProps> = ({
  children,
}) => {
  //const default_duration = 6 * 1000;
  const [activeNotification, setActiveNotification] =
    useState<ActiveNotification | null>(null);

  return (
    <NotificationsContext.Provider
      value={{
        activeNotification,
        setActiveNotification,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

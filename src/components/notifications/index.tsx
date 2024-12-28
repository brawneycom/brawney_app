import { Section } from "@bennie-ui/section";
import { SomethingWentWrongNotification } from "./something-went-wrong";
import { SessionExpiredNotification } from "./session-expired";
//import { notificationContainerStyles } from './notification.styles';

export const Notifications = () => {
  return (
    <Section
      width={{ value: "full" }}
      position={{ style: "relative", top: "4", index: '10' }}
      flex={{ justifyContent: "around" }}
      data-testid="notifications"
    >
      <Section width={{ value: "4/6" }}>
        <SessionExpiredNotification />
        <SomethingWentWrongNotification />
      </Section>
    </Section>
  );
};

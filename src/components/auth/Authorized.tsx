import { FC, useEffect, ReactNode } from "react";
import * as sentry from "@sentry/react";
import { useAuth, useNotifications } from "../../contexts";
import { useNavigate } from "react-router-dom";

import { Styles } from "./authorized.styles";
import { Section } from "@bennie-ui/section";
import { Header } from "../header";

type AuthorizedProps = {
  children: ReactNode;
};
export const Authorized: FC<AuthorizedProps> = ({ children }) => {
  const navigate = useNavigate();
  const { setActiveNotification } = useNotifications();
  const { me } = useAuth();

  useEffect(() => {
    if (me.result.status === "error") {
      setActiveNotification({
        name: "session_expired",
        data: null,
        duration: 3,
      });
      navigate("/welcome");
    }
  }, [me]);

  if (me.result.loading) {
    return <>...Loading</>;
  }

  return (
    <Section className="absolute inset-0">
      <Section {...Styles.wrapper}>
        <Header />
        <Section
          flex={{ direction: "col", grow: "1" }}
          padding={{ top: "8", bottom: "4" }}
          height={{ value: "full" }}
        >
          {children}
        </Section>
      </Section>
    </Section>
  );
};

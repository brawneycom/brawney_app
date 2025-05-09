import { FC, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Section } from "@bennie-ui/section";
import { Header } from "~/components/header";
import { useAuth, useNotifications } from "~/contexts";
import { Styles } from "./authorized.styles";

type AuthorizedProps = {
  children: ReactNode;
};
export const Authorized: FC<AuthorizedProps> = ({ children }) => {
  const navigate = useNavigate();
  const { setActiveNotification } = useNotifications();
  const { me, status, loading, error, access_token, fetch, renew } = useAuth();

  useEffect(() => {
    if (access_token === null && loading === false) {
      navigate("/welcome");
    }
    if (me == null && loading == false && error === null) {
      navigate("/");
    }
  }, [access_token, me]);

  useEffect(() => {
    if (loading == false && error?.message.includes("token expired")) {
      navigate("/login");
    }

    if (loading == false && error?.message.includes("something went wrong")) {
      navigate("/error");
    }
  }, [loading, error]);

  if (status === "pending" && loading) {
    return <Section>Loading...</Section>;
  }
  return (
    <Section className="absolute inset-0">
      <Section {...Styles.wrapper}>
        <Header me={me} />
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

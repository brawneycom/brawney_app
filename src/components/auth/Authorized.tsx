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
  const { me, login, sign_up } = useAuth();

  useEffect(() => {
    if (me.status === "error") {
      setActiveNotification({
        name: "session_expired",
        data: null,
        duration: 3,
      });
      navigate("/welcome");
    }

    if (me.data) {
      if (me.data?.onboard_account === true) {
        navigate("/onboard");
      }
    }
  }, [me]);

  if (me.loading) {
    return <>...Loading</>;
  }

  return (
    <Section className="absolute inset-0">
      <Section {...Styles.wrapper}>
        <Header me={me.data} />
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

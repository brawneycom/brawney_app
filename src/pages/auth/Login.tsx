import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Text } from "@bennie-ui/text";
import { Button } from "@bennie-ui/button";
import { Section } from "@bennie-ui/section";
import { Page } from "~/components/page";
import { useAuth } from "~/contexts";

export function LoginScreen() {
  const navigate = useNavigate();
  const { me, loading, error, login } = useAuth();

  useEffect(() => {
    if (me && loading === false && error === null) {
      navigate("/");
    }
  }, [me]);

  return (
    <Page>
      <Section
        flex={{ justifyContent: "center", alignItems: "center" }}
        height={{ value: "1/6" }}
      >
        <Text size="2xl" weight="bold">
          Login
        </Text>
      </Section>

      <Section
        flex={{ justifyContent: "center", alignItems: "center" }}
        height={{ value: "2/6" }}
      >
        <Button
          size="sm"
          padding={{ x: "8", y: "2" }}
          colors={{ text: { color: "blue" }, background: { color: "white" } }}
          onClick={login}
        >
          Login with Google
        </Button>
      </Section>
    </Page>
  );
}

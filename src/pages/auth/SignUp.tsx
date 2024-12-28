import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Text } from "@bennie-ui/text";
import { Button } from "@bennie-ui/button";
import { Section } from "@bennie-ui/section";
import { Page } from "../../components/page";
import { useAuth } from "../../contexts";
import { SignUpCredentials } from "../../types";

export function SignUpScreen() {
  const navigate = useNavigate();
  const { sign_up, access_token } = useAuth();

  useEffect(() => {
    if (access_token !== null) {
      navigate("/");
    }
  }, [access_token]);

  return (
    <Page>
      <Section
        flex={{ justifyContent: "center", alignItems: "center" }}
        height={{ value: "1/6" }}
      >
        <Text size="2xl" weight="bold">
          Signup
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
          onClick={() => {
            const credentials: SignUpCredentials = {
              firstname: "carlos",
              lastname: "bolanos",
              email: "cbolanos2mx@gmail.com",
              password: "123456",
            };
            sign_up(credentials);
          }}
        >
          Signup with Google
        </Button>
      </Section>
    </Page>
  );
}

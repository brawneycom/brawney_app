import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Text } from "@bennie-ui/text";
import { Button } from "@bennie-ui/button";
import { Section } from "@bennie-ui/section";
import { useAuth } from "../contexts";

export function LoginScreen() {
  const navigate = useNavigate();
  const { me, login, access_token } = useAuth();

  useEffect(() => {
    if (access_token !== null) {
      navigate("/");
    }
  }, [access_token]);

  return (
    <Section
      padding={{ all: "12" }}
      height={{ value: "screen" }}
      flex={{ direction: "col", justifyContent: "between" }}
      colors={{ text: { color: "blue" } }}
      dark={{
        colors: {
          text: { color: "white" },
        },
      }}
    >
      <Section
        flex={{ justifyContent: "center", alignItems: "center" }}
        height={{ value: "1/6" }}
      >
        <Text size="2xl" weight="bold">
          Welcome to Brawney
        </Text>
      </Section>

      <Section flex={{ justifyContent: "center" }}>Logo</Section>
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
    </Section>
  );
}

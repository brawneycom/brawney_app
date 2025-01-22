import { useNavigate } from "react-router-dom";
import { Text } from "@bennie-ui/text";
import { Button } from "@bennie-ui/button";
import { Section } from "@bennie-ui/section";
import { Page } from "~/components/page";
export function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <Page>
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
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </Button>
        <Button
          size="sm"
          padding={{ x: "8", y: "2" }}
          colors={{ text: { color: "blue" }, background: { color: "white" } }}
          onClick={() => {
            navigate("/signup");
          }}
        >
          SignUp
        </Button>
      </Section>
    </Page>
  );
}

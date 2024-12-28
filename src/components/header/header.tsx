import { Link } from "@bennie-ui/text";
import { Button } from "@bennie-ui/button";
import { Section } from "@bennie-ui/section";
import { Icon } from "@bennie-ui/icons";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();
  return (
    <Section
      flex={{
        justifyContent: "between",
        alignItems: "center",
      }}
    >
      <Section>
        <Button
          onClick={() => {
            navigate("/profile");
          }}
        >
          <Icon
            type="solid"
            figure="UserIcon"
            colors={{ text: { color: "blue" } }}
            dark={{ colors: { text: { color: "white" } } }}
          />
        </Button>
      </Section>
      <Section>
        <Link
          size="2xl"
          weight="bold"
          onClick={() => {
            navigate("/");
          }}
        >
          Brawney
        </Link>
      </Section>
      <Section>
        <Button
          onClick={() => {
            navigate("/settings");
          }}
        >
          <Icon
            type="solid"
            figure="Cog6ToothIcon"
            colors={{ text: { color: "blue" } }}
            dark={{ colors: { text: { color: "white" } } }}
          />
        </Button>
      </Section>
    </Section>
  );
}

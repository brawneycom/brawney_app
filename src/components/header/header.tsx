import { Text } from "@bennie-ui/text";
import { Button } from "@bennie-ui/button";
import { Section } from "@bennie-ui/section";
import { Icon } from "@bennie-ui/icons";

export function Header() {
  return (
    <Section
      flex={{
        justifyContent: "between",
        alignItems: "center",
      }}
    >
      <Section>
        <Button>
          <Icon
            type="solid"
            figure="UserIcon"
            colors={{ text: { color: "blue" } }}
            dark={{ colors: { text: { color: "white" } } }}
          />
        </Button>
      </Section>
      <Section>
        <Text size="2xl" weight="bold">
          Brawney
        </Text>
      </Section>
      <Section>
        <Button>
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

import { Text } from "@bennie-ui/text";
import { Button } from "@bennie-ui/button";
import { Section } from "@bennie-ui/section";
import { Header } from "~/components/header";
import { useAuth } from "~/contexts";

import { Authorized } from "~/components/auth";
import { ComponentProperties } from "@bennie-ui/types";

const styles: ComponentProperties = {
  padding: { y: "4", x: "8" },
  height: { value: "screen" },
  flex: { direction: "col", justifyContent: "between" },
  colors: { text: { color: "blue" } },
  dark: {
    colors: {
      text: { color: "white" },
    },
  },
};
export function SettingsScreen() {
  const { me } = useAuth();
  return (
    <Authorized>
      <Section className="absolute inset-0" {...styles}>
        <Header me={me.data} />
        <Section
          flex={{ justifyContent: "center", alignItems: "center" }}
          height={{ value: "1/6" }}
        >
          <Text size="2xl" weight="bold">
            Settings
          </Text>
        </Section>

        <Section
          flex={{ justifyContent: "center", alignItems: "center" }}
          height={{ value: "2/6" }}
        >
          <Button
            size="sm"
            padding={{ x: "8", y: "2" }}
            colors={{
              text: { color: "blue" },
              background: { color: "white" },
            }}
          >
            Update Settings
          </Button>
        </Section>
      </Section>
    </Authorized>
  );
}

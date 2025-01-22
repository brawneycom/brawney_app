import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "@bennie-ui/text";
import { Button } from "@bennie-ui/button";
import { Section } from "@bennie-ui/section";
import { Icon } from "@bennie-ui/icons";
import { Account } from "~/types";

type HeaderProps = {
  me: Account | null | undefined;
};

export const Header: FC<HeaderProps> = ({ me }) => {
  const navigate = useNavigate();
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    if (me?.onboard_account == false) {
      setShowHeader(true);
    }
  }, [me]);

  return (
    showHeader && (
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
    )
  );
};

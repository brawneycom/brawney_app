import { FC, ReactNode } from "react";
import { Text } from "@bennie-ui/text";
import { Section } from "@bennie-ui/section";
import { Page } from "~/components/page";

type ErrorProps = {
  title: string;
  content: ReactNode;
  description: string;
};

export const Error: FC<ErrorProps> = ({ title, content, description }) => {
  return (
    <Page>
      <Section
        align="center"
        flex={{
          direction: "col",
          justifyContent: "around",
        }}
        height={{ value: "full" }}
      >
        <Text tag="p" size="2xl" weight="bold">
          {title}
        </Text>

        <>
          {content}

          <Text tag="pre" wrap="wrap" margin={{ top: "4" }}>
            {description}
          </Text>
        </>
      </Section>
    </Page>
  );
};

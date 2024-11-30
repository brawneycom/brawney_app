import { FC, ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Section } from "@bennie-ui/section";
import { Text } from "@bennie-ui/text";

type PageProps = {
  children: ReactNode;
};

export const Page = ({ children }: PageProps) => {
  return (
    <Section className="absolute inset-0">
      <Section
        height={{ value: "screen" }}
        padding={{ all: "12" }}
        colors={{
          text: {
            color: "white",
          },
        }}
      >
        <Section
          padding={{ all: "8" }}
          height={{ value: "full" }}
          border={{ style: "solid", width: { all: "2" } }}
          colors={{
            border: {
              color: "gray",
            },
          }}
        >
          {children}
        </Section>
      </Section>
    </Section>
  );
};

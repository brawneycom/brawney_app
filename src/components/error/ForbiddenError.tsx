import { Section } from "@bennie-ui/section";
import { errors } from "~/constants/constants.errors";
import { Error } from "./Error";

export const ForbiddenError = () => {
  const { forbidden } = errors;

  const content = (
    <Section
      margin={{ x: "auto" }}
      width={{ value: "9/12" }}
      height={{ value: "72" }}
      padding={{ all: "8" }}
    >
      Placeholder
    </Section>
  );

  return (
    <Error
      title={forbidden.title}
      content={content}
      description={forbidden.description}
    />
  );
};

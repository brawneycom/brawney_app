import { Section } from "@bennie-ui/section";
import { Error } from "./Error";
import { errors } from "../../constants/constants.errors";

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

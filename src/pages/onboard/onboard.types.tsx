import { InputOption } from "@bennie-ui/inputs";
export type SectionItem = {
  type: "text" | "select" | "radio_group";
  name: string;
  label: string;
  placeholder: string;
  value: string | null;
  options?: InputOption[];
};

export type OnboardingStateSectionKeys =
  | "basics"
  | "percentiles"
  | "measurements_upper_body"
  | "measurements_lower_body"
  | "confirm";

export type OnboardingState = {
  active: OnboardingStateSectionKeys;
  data: {
    basics: SectionItem[];
    percentiles: SectionItem[];
    measurements_upper_body: SectionItem[];
    measurements_lower_body: SectionItem[];
  };
};

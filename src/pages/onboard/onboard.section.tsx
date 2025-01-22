import { FC, ChangeEvent } from "react";

import { Input, RadioGroup, InputOption } from "@bennie-ui/inputs";
import { Section } from "@bennie-ui/section";
import {
  OnboardingState,
  OnboardingStateSectionKeys,
  SectionItem,
} from "./onboard.types";

type OnboardingSectionItems = {
  items: SectionItem[];
  state: OnboardingState;
  state_name: OnboardingStateSectionKeys;
  set_state: (state: OnboardingState) => void;
};

export const OnboardSection: FC<OnboardingSectionItems> = ({
  state,
  state_name,
  items,
  set_state,
}) => {
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "sex") {
      const new_state: OnboardingState = {
        ...state,
        data: {
          ...state.data,
          basics: state.data.basics.map((item) => {
            if (item.name === "sex") {
              item.options = item.options?.map((option: InputOption) => {
                option.selected = option.value === value;
                if (option.selected) {
                  item.value = value;
                }
                return option;
              });
            }
            return item;
          }),
        },
      };
      set_state(new_state);
    } else {
      // @ts-ignore
      const sub_state = state.data[state_name] as SectionItem[];
      const new_state = {
        ...state,
        data: {
          ...state.data,
          [state_name]: [
            ...sub_state.map((it) => {
              if (it.name === name) {
                return { ...it, value };
              }
              return it;
            }),
          ],
        },
      };
      set_state(new_state);
    }
  };

  return (
    <Section id="section">
      {items.map((it, idx) => {
        switch (it.type) {
          case "radio_group":
            return (
              <RadioGroup
                key={it.name}
                display="row"
                options={it.options || []}
                onChange={handleOnChange}
              />
            );

          default:
            return (
              <Section key={it.name} margin={{ top: idx === 0 ? "0" : "3" }}>
                <Input
                  label={it.label}
                  name={it.name}
                  placeholder={it.placeholder}
                  withClearMark
                  onChange={handleOnChange}
                  value={it.value || ""}
                />
              </Section>
            );
        }
      })}
    </Section>
  );
};

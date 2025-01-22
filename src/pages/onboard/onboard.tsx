import { FC, useState } from "react";

import { Button } from "@bennie-ui/button";
import { Section } from "@bennie-ui/section";
import { Heading, Text } from "@bennie-ui/text";
import { useAuth } from "~/contexts";
import { Authorized } from "~/components/auth";
import { OnboardingState } from "./onboard.types";
import { OnboardSection } from "./onboard.section";
import { Styles } from "./onboard.styles";
import { isBasicStateEmpty } from "./onboard.utils";
import { GetOnboardingDefaultState } from "./onboarding.constants";

type OnboardingConfirmProps = {
  state: OnboardingState;
};

const ConfirmSection: FC<OnboardingConfirmProps> = ({ state }) => {
  // TODO: replace this text with a body image would be nice
  return (
    <Section flex={{ direction: "col", alignItems: "center" }}>
      <Text>Sex: {state.data.basics[0].value}</Text>
      <Text>Age: {state.data.basics[1].value}</Text>
      <Text>Height: {state.data.basics[2].value}</Text>
      <Text>Weight: {state.data.basics[3].value}</Text>
      <Text>Body fat: {state.data.percentiles[0].value}</Text>
      <Text>Muscle mass: {state.data.percentiles[1].value}</Text>
      <Text>Chest: {state.data.measurements_upper_body[0].value}</Text>
      <Text>Arms: {state.data.measurements_upper_body[1].value}</Text>
      <Text>Stomach: {state.data.measurements_upper_body[2].value}</Text>
      <Text>Waist: {state.data.measurements_lower_body[0].value}</Text>
      <Text>Thights: {state.data.measurements_lower_body[1].value}</Text>
    </Section>
  );
};

export const OnboardPage: FC = () => {
  const { me } = useAuth();
  const default_state: OnboardingState = GetOnboardingDefaultState("en-US");
  const [state, set_state] = useState<OnboardingState>(default_state);

  const handleReset = () => {
    set_state(default_state);
  };

  const handleNext = () => {
    switch (state.active) {
      case "basics":
        set_state({ ...state, active: "percentiles" });
        break;
      case "percentiles":
        set_state({ ...state, active: "measurements_upper_body" });
        break;
      case "measurements_upper_body":
        set_state({ ...state, active: "measurements_lower_body" });
        break;
      case "measurements_lower_body":
        set_state({ ...state, active: "confirm" });
        break;
    }
  };

  const handlePrevious = () => {
    switch (state.active) {
      case "percentiles":
        set_state({ ...state, active: "basics" });
        break;
      case "measurements_upper_body":
        set_state({ ...state, active: "percentiles" });
        break;
      case "measurements_lower_body":
        set_state({ ...state, active: "measurements_upper_body" });
        break;
      case "confirm":
        set_state({ ...state, active: "measurements_lower_body" });
        break;
    }
  };

  const RenderSections = () => {
    switch (state.active) {
      case "basics":
        return (
          <OnboardSection
            state={state}
            state_name="basics"
            set_state={set_state}
            items={state.data.basics}
          />
        );
      case "percentiles":
        return (
          <OnboardSection
            state={state}
            state_name="percentiles"
            set_state={set_state}
            items={state.data.percentiles}
          />
        );
      case "measurements_upper_body":
        return (
          <OnboardSection
            state={state}
            state_name="measurements_upper_body"
            set_state={set_state}
            items={state.data.measurements_upper_body}
          />
        );
      case "measurements_lower_body":
        return (
          <OnboardSection
            state={state}
            state_name="measurements_lower_body"
            set_state={set_state}
            items={state.data.measurements_lower_body}
          />
        );
      case "confirm":
        return <ConfirmSection state={state} />;
    }
  };

  const RenderActions = () => {
    const prev = (
      <Button {...Styles.buttons.previous} onClick={handlePrevious}>
        Previous
      </Button>
    );
    const next = (
      <Button
        {...Styles.buttons.next}
        onClick={handleNext}
        disabled={isBasicStateEmpty(state)}
      >
        Next
      </Button>
    );
    const reset = (
      <Button {...Styles.buttons.reset} onClick={handleReset}>
        Reset
      </Button>
    );
    const save = <Button {...Styles.buttons.save}>Save</Button>;

    switch (state.active) {
      case "basics":
        return <>{next}</>;
      case "percentiles":
        return (
          <>
            {prev} {next}
          </>
        );
      case "measurements_upper_body":
        return (
          <>
            {prev} {next}
          </>
        );
      case "measurements_lower_body":
        return (
          <>
            {prev} {next}
          </>
        );
      case "confirm":
        return (
          <>
            {prev} {reset} {save}
          </>
        );
    }
  };

  return (
    me && (
      <Authorized>
        <Section {...Styles.wrapper.main}>
          <Section {...Styles.wrapper.wizard}>
            <Section {...Styles.wrapper.heading}>
              <Heading tag="h1">Welcome to Brawney</Heading>
              <Text {...Styles.texts.caption}>
                This information will let us know more about you.
              </Text>
            </Section>

            <Section>{RenderSections()}</Section>

            <Section flex={{ direction: "row", justifyContent: "end" }}>
              {RenderActions()}
            </Section>
          </Section>
        </Section>
      </Authorized>
    )
  );
};

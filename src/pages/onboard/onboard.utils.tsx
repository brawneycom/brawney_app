import { OnboardingState } from "./onboard.types";

const isNullOrEmpty = (item: unknown): boolean => {
  return item === null || item === undefined || item === 0 || item === "";
};

export const isBasicStateEmpty = (state: OnboardingState): boolean => {
  const { basics } = state.data;

  if (state.active === "basics") {
    return (
      isNullOrEmpty(basics[0].value) ||
      isNullOrEmpty(basics[1].value) ||
      isNullOrEmpty(basics[2].value) ||
      isNullOrEmpty(basics[3].value)
    );
  }

  return false;
};

import { OnboardingState } from "./onboard.types";

export const GetOnboardingDefaultState = (locale: string): OnboardingState => {
  return {
    active: "basics",
    data: {
      basics: [
        {
          type: "radio_group",
          name: "sex",
          label: "Sex",
          placeholder: "enter valid sex (male, female)",
          value: "male",
          options: [
            { name: "sex", label: "Male", value: "male", selected: false },
            {
              name: "sex",
              label: "Female",
              value: "female",
              selected: true,
            },
          ],
        },
        {
          type: "text",
          name: "age",
          label: "Age",
          placeholder: "enter valid age (1-100)",
          value: "42",
        },
        {
          type: "text",
          name: "height",
          label: "Height",
          placeholder: `enter valid height $(locale)`,
          value: "5'6",
        },
        {
          type: "text",
          name: "weight",
          label: "Weight",
          placeholder: "enter valid weight",
          value: "190",
        },
      ],
      percentiles: [
        {
          type: "text",
          name: "body_fat",
          label: "Body fat",
          placeholder: "enter valid body fat percentage",
          value: "4",
        },
        {
          type: "text",
          name: "muscle",
          label: "Muscle",
          placeholder: "enter valid muscle mass percentage",
          value: "5",
        },
      ],
      measurements_upper_body: [
        {
          type: "text",
          name: "chest",
          label: "Chest",
          placeholder: "enter chest measurement",
          value: "6",
        },
        {
          type: "text",
          name: "arms",
          label: "Biceps",
          placeholder: "enter biceps measurement",
          value: "7",
        },
        {
          type: "text",
          name: "stomach",
          label: "Stomach",
          placeholder: "enter stomach measurement",
          value: "8",
        },
      ],
      measurements_lower_body: [
        {
          type: "text",
          name: "waist",
          label: "Waist",
          placeholder: "enter waist measurement",
          value: "9",
        },
        {
          type: "text",
          name: "thights",
          label: "Thights",
          placeholder: "enter thights measurement",
          value: "10",
        },
      ],
    },
  };
};

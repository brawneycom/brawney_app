import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@bennie-ui/button";
//import { LineChart, AxisOptions } from "@bennie-ui/charts";

import { Styles } from "./home.styles";
import { useMainMenu } from "../../contexts";
import { Authorized } from "../../components/auth";
import { Chart, AxisOptions } from "react-charts";
import ResizableBox from "./resizable-box";
import MainPanel from "../../components/panels/MainPanel";
import { Section } from "@bennie-ui/section";

type DailyStars = {
  date: string;
  stars: number;
};

type Series = {
  label: string;
  data: DailyStars[];
};

export function HomeScreen() {
  const navigate = useNavigate();
  const { reset } = useMainMenu();

  const data: Series[] = [
    {
      label: "Weight",
      data: [
        {
          date: "Thu",
          stars: 40,
        },
        {
          date: "Fri",
          stars: 39.7,
        },
        {
          date: "Sat",
          stars: 39.4,
        },
        {
          date: "Sun",
          stars: 39.8,
        },
        {
          date: "Mon",
          stars: 39.5,
        },
        {
          date: "Tue",
          stars: 39.2,
        },
        {
          date: "Wed",
          stars: 39,
        },
        {
          date: "Foo",
          stars: 39.5,
        },
      ],
    },
    {
      label: "Body fat",
      data: [
        {
          date: "Thu",
          stars: 39,
        },
        {
          date: "Fri",
          stars: 39.5,
        },
        {
          date: "Sat",
          stars: 39.7,
        },
        {
          date: "Sun",
          stars: 39.8,
        },
        {
          date: "Mon",
          stars: 39.8,
        },
        {
          date: "Tue",
          stars: 39.9,
        },
        {
          date: "Wed",
          stars: 40,
        },
        {
          date: "Foo",
          stars: 40,
        },
      ],
    },
  ];

  const primaryAxis = React.useMemo(
    (): AxisOptions<DailyStars> => ({
      getValue: (datum) => datum.date,
      elementType: "line",
    }),
    [],
  );

  const secondaryAxes = React.useMemo(
    (): AxisOptions<DailyStars>[] => [
      {
        getValue: (datum) => datum.stars,
        elementType: "line",
      },
    ],
    [],
  );

  //const primaryAxis: AxisOptions<DailyStars> = {
  //getValue: (datum) => {
  //return datum.date;
  //},
  //type: "line",
  //};

  //const secondaryAxis: AxisOptions<DailyStars> = {
  //getValue: (datum) => {
  //return datum.stars;
  //},
  //type: "line",
  //max: 40.5,
  //min: 38.5,
  //};
  return (
    <Authorized>
      <MainPanel ui timespan>
        <MainPanel.Content>
          <ResizableBox>
            <Chart
              options={{
                data,
                primaryAxis,
                secondaryAxes,
              }}
            />
          </ResizableBox>
        </MainPanel.Content>
        <MainPanel.Actions>
          <Button
            {...Styles.actions.capture}
            full_width
            onClick={() => {
              reset();
              navigate("/capture");
            }}
          >
            Capture
          </Button>
        </MainPanel.Actions>
      </MainPanel>
    </Authorized>
  );
}

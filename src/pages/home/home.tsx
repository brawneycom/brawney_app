import React from "react";
import { Chart, AxisOptions } from "react-charts";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@bennie-ui/button";
import { Styles } from "./home.styles";
import { DailyValue } from "~/types";
import { Authorized } from "~/components/auth";
import { ResizableBox } from "./resizable-box";
import { useMainMenu, useSearch } from "~/contexts";
import MainPanel from "~/components/panels/MainPanel";

export function HomeScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { reset } = useMainMenu();
  const { loading, is_empty, series } = useSearch();

  const primaryAxis = React.useMemo(
    (): AxisOptions<DailyValue> => ({
      getValue: (datum) => datum.date,
      elementType: "line",
    }),
    [],
  );

  const secondaryAxes = React.useMemo(
    (): AxisOptions<DailyValue>[] => [
      {
        getValue: (datum) => datum.value,
        elementType: "line",
      },
    ],
    [],
  );

  return (
    <Authorized>
      <MainPanel ui timespan>
        <MainPanel.Content>
          {loading && <div>Loading</div>}

          {!loading && is_empty && <div>Empty</div>}
          {!loading && !is_empty && (
            <ResizableBox>
              <Chart
                options={{
                  data: series,
                  primaryAxis,
                  secondaryAxes,
                }}
              />
            </ResizableBox>
          )}
        </MainPanel.Content>
        <MainPanel.Actions>
          <Button
            {...Styles.actions.capture}
            full_width
            onClick={() => {
              // reset();
              navigate(`/capture?${searchParams.toString()}`);

            }}
          >
            Capture
          </Button>
        </MainPanel.Actions>
      </MainPanel>
    </Authorized>
  );
}

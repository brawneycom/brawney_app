import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Button } from "@bennie-ui/button";
import { useSearch } from "~/contexts";
import { Styles } from "./capture.styles";
import { DailyValue } from "~/types";
import { Authorized } from "~/components/auth";
import MainPanel from "~/components/panels/MainPanel";

export function CaptureScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { series } = useSearch();

  const category = searchParams.get("section");
  const [latestValue, setLatestValue] = useState<DailyValue | null>(null);
  console.log("f: series", series);

  useEffect(() => {
    if (series && series.length > 0) {
      const [serie] = series;
      const { data, label } = serie;
      setLatestValue(serie.data[serie.data.length - 1]);
    }
  }, [series]);

  console.log("f: data", { category, latestValue });
  return (
    <Authorized>
      <MainPanel navigation>
        <MainPanel.Content>Slider here</MainPanel.Content>
        <MainPanel.Actions>
          <>
            <Button
              {...Styles.actions.cancel}
              full_width
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancel
            </Button>
            <Button {...Styles.actions.save} full_width>
              Save
            </Button>
          </>
        </MainPanel.Actions>
      </MainPanel>
    </Authorized>
  );
}

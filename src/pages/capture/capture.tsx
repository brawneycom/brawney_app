import { useEffect, useState } from "react";
import dayjs from 'dayjs'
import { useNavigate, useSearchParams } from "react-router-dom";
import { Section } from "@bennie-ui/section"
import { Button } from "@bennie-ui/button";

import { useSearch } from "~/contexts";
import { DailyValue } from "~/types";
import { Styles } from "./capture.styles";
import { SHORT_DATE_FORMAT } from '~/constants'
import { Authorized } from "~/components/auth";
import MainPanel from "~/components/panels/MainPanel";

export function CaptureScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { series } = useSearch();
  const today = dayjs().format(SHORT_DATE_FORMAT);
  const category = searchParams.get("section");
  const [latestValues, setLatestValues] = useState<DailyValue[]>([]);

  useEffect(() => {
    if (series && series.length > 0) {
      for (const serie of series) {
        setLatestValues([...latestValues, serie.data[serie.data.length - 1]]);

      }
    }
  }, [series]);

  if (latestValues) {
    console.log("f: data", { series, category, latestValues });
  }

  return (
    <Authorized>
      <MainPanel navigation>
        <MainPanel.Content>
          {
            latestValues.map(it => {
              if (it.date === today) {
                return <Section>category {category}, value: {it.value || ''}</Section>
              }
              return <Section>Capture me {it.value}</Section>
            })
          }
        </MainPanel.Content>
        <MainPanel.Actions>
          <>
            <Button
              {...Styles.actions.cancel}
              full_width
              onClick={() => {
                navigate(`/?${searchParams.toString()}`);
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

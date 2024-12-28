import { Button } from "@bennie-ui/button";
import { CircularSlider } from "@bennie-ui/sliders";

import { useSearch } from "../../contexts";
import { Authorized } from "../../components/auth";
import MainPanel from "../../components/panels/MainPanel";
import { Styles } from "./capture.styles";

export function CaptureScreen() {
  const { search } = useSearch();

  return (
    <Authorized>
      <MainPanel navigation>
        <MainPanel.Content>
          <CircularSlider />
        </MainPanel.Content>
        <MainPanel.Actions>
          <>
            {search.state === "changed" && (
              <Button {...Styles.actions.cancel} full_width>
                Cancel
              </Button>
            )}
            {
              <Button
                {...Styles.actions.save}
                full_width
                disabled={search.state === "new"}
              >
                Save
              </Button>
            }
          </>
        </MainPanel.Actions>
      </MainPanel>
    </Authorized>
  );
}

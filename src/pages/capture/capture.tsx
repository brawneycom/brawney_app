import { Button } from "@bennie-ui/button";

import { useMainMenu, useSearch } from "~/contexts";
import { Authorized } from "~/components/auth";
import MainPanel from "~/components/panels/MainPanel";
import { Styles } from "./capture.styles";

export function CaptureScreen() {
  const { menu, category, sub_category } = useMainMenu();
  const { series } = useSearch();

  return (
    <Authorized>
      <MainPanel navigation>
        <MainPanel.Content>Slider here</MainPanel.Content>
        <MainPanel.Actions>
          <>
            <Button {...Styles.actions.cancel} full_width>
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

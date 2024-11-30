import { Button } from "@bennie-ui/button";
import { Section } from "@bennie-ui/section";
import { Header } from "../../components/header";
import { Authorized } from "../../components/auth";
import { MenuItemSection } from "../../components/MainMenu";
import { useMainMenu } from "../../contexts";
import { Styles } from "./home.styles";

export function HomeScreen() {
  const { menu, onItemChange } = useMainMenu();
  if (menu === null) {
    return null;
  }

  const get_categories = () => {
    let category = null;
    let sub_category = null;
    const [_, percentiles, measurements, __] = menu.categories.children;

    if (percentiles.selected) {
      category = percentiles;
    }

    if (measurements.selected) {
      category = measurements;
      sub_category = measurements;

      category.children.forEach((it) => {
        if (it.selected) {
          sub_category = it;
        }
      });
    }
    return { category, sub_category };
  };

  const { category, sub_category } = get_categories();

  return (
    <Authorized>
      <Section className="absolute inset-0">
        <Section {...Styles.wrapper}>
          <Header />
          <Section
            flex={{ direction: "col", grow: "1" }}
            padding={{ y: "8" }}
            height={{ value: "full" }}
          >
            <Section {...Styles.content.wrapper}>
              <MenuItemSection
                id="ui"
                item={menu.ui}
                properties={Styles.content.ui}
                onItemChange={onItemChange}
              />
              <MenuItemSection
                id="timespan"
                item={menu.timespan}
                properties={Styles.content.timespan}
                onItemChange={onItemChange}
              />
              <Section
                id="content"
                height={{ value: "max" }}
                flex={{
                  direction: "col",
                  justifyContent: "center",
                  alignItems: "center",
                  grow: "1",
                }}
              >
                Content
              </Section>

              <MenuItemSection
                id="categories"
                item={menu.categories}
                properties={Styles.content.categories}
                onItemChange={onItemChange}
              />

              {category && (
                <MenuItemSection
                  id={`categories.${category.name}`}
                  item={category}
                  properties={Styles.content.categories}
                  onItemChange={onItemChange}
                />
              )}
              {category && sub_category && (
                <MenuItemSection
                  id={`categories.${category.name}.${sub_category.name}`}
                  item={sub_category}
                  properties={Styles.content.categories}
                  onItemChange={onItemChange}
                />
              )}
            </Section>
          </Section>
          <Button {...Styles.capture}>Capture</Button>
        </Section>
      </Section>
    </Authorized>
  );
}

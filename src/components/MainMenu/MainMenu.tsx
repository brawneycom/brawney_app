import { FC } from "react";
import { Section } from "@bennie-ui/section";
import { MenuItemSection } from "./MenuItemSection";
import { MenuItemStyles } from "./MenuItems.styles";
import { useMainMenu } from "../../contexts";
import { MenuItem } from "../../types";

export const MainMenu: FC = () => {
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

      category.children.forEach((it: MenuItem) => {
        if (it.selected) {
          sub_category = it;
        }
      });
    }
    return { category, sub_category };
  };

  const { category, sub_category } = get_categories();

  return (
    <Section padding={{ y: "8" }} height={{ value: "full" }}>
      <Section {...MenuItemStyles.wrapper}>
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
          properties={MenuItemStyles.categories}
          onItemChange={onItemChange}
        />

        {category && (
          <MenuItemSection
            id={`categories.${category.name}`}
            item={category}
            properties={MenuItemStyles.categories}
            onItemChange={onItemChange}
          />
        )}
        {category && sub_category && (
          <MenuItemSection
            id={`categories.${category.name}.${sub_category.name}`}
            item={sub_category}
            properties={MenuItemStyles.categories}
            onItemChange={onItemChange}
          />
        )}
      </Section>
    </Section>
  );
};

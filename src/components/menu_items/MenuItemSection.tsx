import { FC } from "react";
import { Section } from "@bennie-ui/section";
import { ComponentProperties } from "@bennie-ui/types";
import { MenuItem as MenuItemType } from "~/types";
import { MenuItem } from "./MenuItem";

type MenuItemSectionProps = {
  id: string;
  properties: ComponentProperties;
  item: MenuItemType;
  onItemChange: (item: MenuItemType, parent_id: string) => void;
};

export const MenuItemSection: FC<MenuItemSectionProps> = ({
  id,
  properties,
  item,
  onItemChange,
}) => {
  return (
    <Section>
      <Section id={id} {...properties}>
        {item.children
          .filter((it) => it.is_active)
          .map((it: MenuItemType, index: number) => (
            <MenuItem
              parent_id={id}
              key={index}
              item={it}
              is_last_item={index == item.children.length - 1}
              onItemChange={onItemChange}
            />
          ))}
      </Section>
    </Section>
  );
};

import { FC } from "react";
import { Text } from "@bennie-ui/text";
import { Section } from "@bennie-ui/section";
import { IconFigure, Icon } from "@bennie-ui/icons";
import { ComponentProperties } from "@bennie-ui/types";
import { MenuItem as MenuItemType } from "~/types";

type MenuItemProps = {
  parent_id: string;
  item: MenuItemType;
  is_last_item: boolean;
  onItemChange: (item: MenuItemType, parent_id: string) => void;
};

export const MenuItem: FC<MenuItemProps> = ({
  parent_id,
  item,
  is_last_item,
  onItemChange,
}) => {
  const is_icon = item.content_type === 2;
  const is_active = item.selected;
  let props: ComponentProperties = is_last_item
    ? {
        flex: { alignItems: "center", justifyContent: "center" },
        padding: { all: "4" },
      }
    : {
        flex: { alignItems: "center", justifyContent: "center" },
        padding: { all: "4" },
        border: { width: { r: "2" } },
        colors: { border: { color: "gray" } },
      };

  return (
    <Section
      {...props}
      onClick={() => {
        onItemChange(item, parent_id);
      }}
    >
      {is_icon ? (
        <Icon
          figure={item.content as IconFigure}
          colors={{ text: { color: is_active ? "white" : "gray" } }}
        />
      ) : (
        <Text colors={{ text: { color: is_active ? "white" : "gray" } }}>
          {item.content}
        </Text>
      )}
    </Section>
  );
};

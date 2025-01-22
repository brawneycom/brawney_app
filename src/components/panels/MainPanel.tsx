import React, { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "@bennie-ui/text";
import { Section } from "@bennie-ui/section";
import { useMainMenu } from "~/contexts";
import { MenuItemSection } from "../menu_items";
import { Styles } from "./MainPanel.styles";

type MainPanelProps = {
  navigation?: boolean;
  ui?: boolean;
  timespan?: boolean;
  children?: ReactNode;
};

const getChildrenOnDisplayName = (
  children: ReactNode,
  displayName: string,
): ReactNode | null => {
  const child = React.Children.map(children, (child) => {
    // @ts-ignore
    return child?.type?.displayName === displayName ? child : null;
  });
  return (child && child.length > 0 && child[0]) || null;
};

const MainPanel: FC<MainPanelProps> = ({
  navigation,
  ui,
  timespan,
  children,
}) => {
  const navigate = useNavigate();
  const { menu, category, sub_category, reset, onItemChange } = useMainMenu();
  const content = getChildrenOnDisplayName(children, "MainPanelContent");
  const actions = getChildrenOnDisplayName(children, "MainPanelActions");

  return menu ? (
    <>
      <Section {...Styles.wrapper}>
        {navigation && (
          <Section {...Styles.navigation}>
            <Link
              onClick={() => {
                reset();
                navigate("/");
              }}
            >
              Back to results
            </Link>
          </Section>
        )}
        {ui && (
          <MenuItemSection
            id="ui"
            item={menu.ui}
            properties={Styles.ui}
            onItemChange={onItemChange}
          />
        )}
        {timespan && (
          <MenuItemSection
            id="timespan"
            item={menu.timespan}
            properties={Styles.timespan}
            onItemChange={onItemChange}
          />
        )}
        <Section {...Styles.content}>{content || "No-Content"}</Section>

        <MenuItemSection
          id="categories"
          item={menu.categories}
          properties={Styles.categories}
          onItemChange={onItemChange}
        />

        {category && (
          <MenuItemSection
            id={`categories.${category.name}`}
            item={category}
            properties={Styles.categories}
            onItemChange={onItemChange}
          />
        )}
        {category && sub_category && (
          <MenuItemSection
            id={`categories.${category.name}.${sub_category.name}`}
            item={sub_category}
            properties={Styles.categories}
            onItemChange={onItemChange}
          />
        )}
      </Section>
      {actions}
    </>
  ) : null;
};

const MainPanelContent: FC<{ children: ReactNode }> = ({ children }) => (
  <>{children}</>
);
MainPanelContent.displayName = "MainPanelContent";

const MainPanelActions: FC<{ children: ReactNode }> = ({ children }) => {
  return <Section {...Styles.actions}>{children}</Section>;
};
MainPanelActions.displayName = "MainPanelActions";

export default Object.assign(MainPanel, {
  Content: MainPanelContent,
  Actions: MainPanelActions,
});

import { MainMenu } from "./menus";

export enum Theme {
  light,
  dark,
}

export type Credentials = {
  email: string;
  password: string;
};

export type Role = {
  name: string;
};

export type Account = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  settings: {
    id: string;
    theme: Theme;
    menu_items: MainMenu;
  };
  roles: Role[];
};

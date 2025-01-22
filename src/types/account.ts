import { MenuItem } from "./menus";

export enum Theme {
  light,
  dark,
}

export type LoginCredentials = {
  email: string;
  password: string;
};

export type SignUpCredentials = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

export type Role = {
  name: string;
};

export type I18n = {
  id: string;
  locale: number;
  system: number;
};

export type Account = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  settings: {
    id: string;
    i18n: I18n;
    theme: Theme;
    menu_items: MenuItem[];
  };
  is_active: boolean;
  onboard_account: boolean;
  roles: Role[];
};

export type AccountDataEntry = {
  id: string;
  date: string;
  entry: number;
  category: string;
  system: number;
  system_unit: number;
};

export type AccountDataSeries = {
  label: string;
  entries: AccountDataEntry[];
};

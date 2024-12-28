export type Category = {
  name: string;
  value: string;
};

export type SearchPayload = {
  ui: Category;
  timespan: Category;
  categories: Category[];
};

export type CaptureState = "new" | "changed" | "saved";

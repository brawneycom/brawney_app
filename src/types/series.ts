export type Entry = {
  category: string;
  date: string;
  entry: number;
  id: string;
  system: number;
  system_unit: number;
};

export type DailyValue = {
  date: string;
  value: number;
};

export type Serie = {
  label: string;
  data: DailyValue[];
};

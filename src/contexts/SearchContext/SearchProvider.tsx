import axios, { AxiosResponse } from "axios";
import dayjs from "dayjs";
import { FC, ReactNode, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SearchContext } from "./SearchContext";
import { useMainMenu } from "../MainMenuContext";
import { SearchPayload } from "./SearchContext.types";
import { BuildSearchPayload } from "./SearchContext.utils";
import { read_access_token } from "~/utils/access_token";
import {
  AccountDataSeries,
  DailyValue,
  Serie,
  V1SuccessResponse,
} from "~/types";
import { API_URL } from "~/constants";

export type SearchProviderProps = {
  children: ReactNode;
};

const getKey = (payload: SearchPayload | null): string => {
  if (payload) {
    const key = `ui:${payload.ui.value}, timespan:${payload.timespan.value}, categories:${payload.categories.map((it) => it.name).join("|")}'`;
    return key;
  }
  return "";
};

export const SearchProvider: FC<SearchProviderProps> = ({ children }) => {
  const { menu } = useMainMenu();
  const [payload, setPayload] = useState<SearchPayload | null>(null);
  const [series, setSeries] = useState<Serie[]>([]);
  const [is_empty, setIsEmpty] = useState<boolean>(true);

  const { data, status, isLoading, refetch } = useQuery({
    queryKey: [
      "search",
      payload?.ui.name,
      payload?.timespan.name,
      payload?.categories.map((it) => it.name),
    ],
    queryFn: (): Promise<
      AxiosResponse<V1SuccessResponse<AccountDataSeries[]>>
    > => {
      return axios.post(`${API_URL}/account/me/entries`, payload, {
        headers: {
          Authorization: `Bearer ${read_access_token()}`,
        },
      });
    },
    enabled: payload !== null,
    select: (data) => data.data,
  });

  useEffect(() => {
    if (menu) {
      setIsEmpty(true);
      setPayload(BuildSearchPayload(menu));
    }
  }, [menu]);

  useEffect(() => {
    if (payload) {
      refetch();
    }
  }, [payload]);

  useEffect(() => {
    if (data?.result && data.result.length > 0) {
      var new_series = data?.result.map((it) => {
        var serie: Serie = {
          label: it.label,
          data: it.entries.map((ot) => {
            var daily_data: DailyValue = {
              date: dayjs(ot.date).format("MMM-DD"),
              value: ot.entry,
            };
            return daily_data;
          }),
        };
        return serie;
      });
      setSeries(new_series);

      var serie_with_data = new_series.filter((it) => it.data.length > 0);
      if (serie_with_data.length > 0) {
        setIsEmpty(false);
      }
    }
  }, [data]);

  return (
    <SearchContext.Provider
      value={{
        series,
        loading: isLoading,
        is_empty: is_empty,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

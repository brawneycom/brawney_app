import dayjs from "dayjs";
import axios, { AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import { FC, ReactNode, useEffect, useState } from "react";

import { useAuth } from "../AuthContext/";
import { useMainMenu } from "../MainMenuContext";
import { SearchContext } from "./SearchContext";
import { SearchPayload } from "./SearchContext.types";
import { BuildSearchPayload } from "./SearchContext.utils";
import {
  AccountDataSeries,
  DailyValue,
  Serie,
  V1SuccessResponse,
} from "~/types";
import { API_URL, EMPTY_DATETIME, SHORT_DATE_FORMAT } from "~/constants";

export type SearchProviderProps = {
  children: ReactNode;
};

export const SearchProvider: FC<SearchProviderProps> = ({ children }) => {
  const { access_token } = useAuth();
  const { menu } = useMainMenu();
  const [payload, setPayload] = useState<SearchPayload | null>(null);
  const [series, setSeries] = useState<Serie[]>([]);
  const [is_empty, setIsEmpty] = useState<boolean>(true);

  const { data, isLoading, refetch } = useQuery({
    queryKey: [
      "search",
      payload?.ui.name,
      payload?.timespan.name,
      payload?.categories.map((it) => it.name).join(','),
    ],
    queryFn: (): Promise<
      AxiosResponse<V1SuccessResponse<AccountDataSeries[]>>
    > => {
      return axios.post(`${API_URL}/v1/account/me/entries`, payload, {
        headers: {
          Authorization: `Bearer ${access_token}`,
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
            let date = ot.date.includes(EMPTY_DATETIME) ?
              dayjs(ot.date).add(1, 'day').format(SHORT_DATE_FORMAT) :
              dayjs(ot.date).format(SHORT_DATE_FORMAT);

            var daily_data: DailyValue = {
              date,
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

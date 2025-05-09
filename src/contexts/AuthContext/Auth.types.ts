import { RequestStatus, Account } from "~/types";

export type AuthState = {
  me: Account | null;
  loading: boolean;
  error: Error | null;
  status: RequestStatus;
  access_token: null | string;
};

import { FC, useEffect, ReactNode } from "react";
import * as sentry from "@sentry/react";
import { useAuth } from "../../contexts";
import { useNavigate } from "react-router-dom";

type AuthorizedProps = {
  children: ReactNode;
};
export const Authorized: FC<AuthorizedProps> = ({ children }) => {
  const navigate = useNavigate();
  const { access_token, me } = useAuth();
  const { status, error } = me;

  useEffect(() => {
    if (me.isError || access_token === null || me.data?.status === 204) {
      navigate("/login");
    }
  }, [me, access_token]);

  useEffect(() => {
    if (status === "error") {
      sentry.captureException(error);
      navigate("/forbidden");
    }
  }, [status, error]);

  if (me.isLoading) {
    return <>...Loading</>;
  }
  return <>{children}</>;
};

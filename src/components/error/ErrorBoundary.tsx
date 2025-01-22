import { FC, ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { Page } from "~/components/page";
import { InternalServerError } from "./InternalServerError";

type BrawneyErrorProps = {
  children: ReactNode;
};

const fallbackRender = ({ error }: { error: Error }) => {
  console.log("f: error", error.message);
  return (
    <Page>
      <InternalServerError />
    </Page>
  );
};

export const BrawneyErrorBoundary: FC<BrawneyErrorProps> = ({ children }) => {
  return (
    <ErrorBoundary fallbackRender={fallbackRender}>{children} </ErrorBoundary>
  );
};

import { PropsWithChildren } from "react";

const PageHeader = ({ children }: PropsWithChildren) => {
  return <h2 className="text-4xl font-light">{children}</h2>;
};

export default PageHeader;

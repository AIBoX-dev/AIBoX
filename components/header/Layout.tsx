import { ReactNode } from "react";
import { Box } from "./Box";

interface Props {
  children: ReactNode | ReactNode[];
}

export const Layout = ({ children }: Props) => (
  <Box
    css={{
      maxW: "100%"
    }}
  >
    {children}
  </Box>
);

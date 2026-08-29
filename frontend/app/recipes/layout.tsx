import { Box } from "@mui/material";
import Header from "../features/recipes/components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box>
      <Header/>
      {children}
    </Box>
  );
}
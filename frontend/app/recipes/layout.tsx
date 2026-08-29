import { Box, Container } from "@mui/material";
import Header from "../features/recipes/components/Header";
import Menubar from "../features/recipes/components/Menubar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header/>
      <Box sx={{px:10,py:2}}>
        {children}
      </Box>
      <Menubar/>
    </>
  );
}
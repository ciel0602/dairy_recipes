import { Box, Container } from "@mui/material";
import Image from "next/image";
import logo from "@/app/assets/logo.png"

export default function Header() {
  return (
    <Container sx={{width:"100vw", backgroundColor:"#FFFFFF"}}>
      <Box>
        <Image src={logo} alt="ロゴ画像" width={100}  loading="eager"/>
      </Box>
    </Container>
  )
}
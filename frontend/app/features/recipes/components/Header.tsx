import { Box } from "@mui/material";
import Image from "next/image";
import logo from "@/app/assets/logo.png"

export default function Header() {
  return (
    <Box sx={{px:4,width:"100%", backgroundColor:"#FFFFFF"}}>
      <Box>
        <Image src={logo} alt="ロゴ画像" width={100}  loading="eager"/>
      </Box>
    </Box>
  )
}
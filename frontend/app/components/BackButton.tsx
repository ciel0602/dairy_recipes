import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

export default function BackButton(){
  const router = useRouter();
  return(
    <Box>
      <Button variant="text" startIcon={<ArrowBackRoundedIcon/>} onClick={() => router.back()}>戻る</Button>
    </Box>
  )
}
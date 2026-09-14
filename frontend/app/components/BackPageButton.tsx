'use client'
import { Box, Button } from "@mui/material";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useRouter } from "next/navigation";

export default function BackPageButton() {
  const router = useRouter();
  return (
    <Box>
        <Button variant="text" startIcon={<ArrowBackRoundedIcon/>} onClick={() => router.back()}>戻る</Button>
      </Box>
  )
}
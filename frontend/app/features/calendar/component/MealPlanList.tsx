import { Box, Typography } from "@mui/material";

export default function MealPlanList(){
  return(
    <>
    <Box sx={{
      backgroundColor:"#F5EFE8",
      height:"100%",
      px:3,
      py:2,
      borderRadius:"8px,0"
    }}>
      <Typography>レシピが登録されていません</Typography>
    </Box>
    </>
  )
}
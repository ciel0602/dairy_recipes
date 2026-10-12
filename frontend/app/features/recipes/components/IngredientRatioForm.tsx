'use client'
import { IconButton, Stack, Typography } from "@mui/material";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';

type Props = {
  amountRatio:number;
  setAmountRatio:React.Dispatch<React.SetStateAction<number>>;
}
export default function IngredientRatioForm({amountRatio,setAmountRatio}:Props){
  
  return(
    <Stack direction="row" sx={{justifyContent:"space-between",alignItems:"center",backgroundColor:"common.white",border:"#E5DED7,1px,solid",borderRadius:"12px"}}>
      <IconButton onClick={() => setAmountRatio((prev) => Math.max(0.5, Number(prev) - 1))}>
        <RemoveRoundedIcon color="primary"/>
      </IconButton>
      <Typography>{amountRatio}人分</Typography>
      {/* prevが文字列になるのでNumberで数値化 */}
      <IconButton onClick={() => setAmountRatio((prev) => Math.min(100, Number(prev) + 1))}>
        <AddRoundedIcon color="primary"/>
      </IconButton>
    </Stack>
    
  )
}
import SoupKitchenRoundedIcon from '@mui/icons-material/SoupKitchenRounded';
import { Box, Stack, Typography } from '@mui/material';

export default function RecipeDetailsCard(){
  return(
    <>
    <Stack direction="row" sx={{backgroundColor:"background.paper",justifyContent:"flex-start",alignItems:"center",pl:3,py:2,borderRadius:"10px"}}>
      <Box sx={{height:"fit-content"}}>
        <SoupKitchenRoundedIcon color='primary' sx={{width:"64px"}}/>
      </Box>
      <Box>
        <Typography sx={{fontSize:12,color:'text.secondary'}}>調理回数</Typography>
        <Typography sx={{fontSize:18, color:'primary.main'}}>1回</Typography>
      </Box>
    </Stack>
    </>
  )
}
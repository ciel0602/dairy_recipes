import { Box, Card, CardActionArea, CardContent, CardMedia, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import RatingStar from "../../recipes/components/RatingStar";
import { MealPlanType } from "@/app/types/MealPlanType";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';


type MealPlanCardProps = {
  mealPlan:MealPlanType
}
export default function MealPlanCard({mealPlan}:MealPlanCardProps){
  const router = useRouter();
  console.log(mealPlan.recipe.thumbnailUrl)
  return(
    <Card sx={{mb:1}}>
      <Stack direction="row" sx={{justifyContent:"space-between",alignItems:"center",pr:2}}>
      <CardActionArea onClick={() => router.push(`/recipes/${mealPlan.recipe.id}`)  }>
          <Stack direction="row" sx={{justifyContent:"flex-start",alignItems:"center",px:2,py:1.5,borderRadius:"12px"}}>
            {/* サムネイルURLの有無によって画像切り替え */}
            <Box sx={{width:64,height:64,borderRadius:"12px",overflow:"hidden",position: "relative",}}>
              {mealPlan.recipe.thumbnailUrl ? <CardMedia component="img" image={mealPlan.recipe.thumbnailUrl} sx={{minWidth:"100%",minHeight:"100%",objectPosition:"center",objectFit:"cover"}} /> : <Image src="/images/noImage.png" alt="テスト画像" fill sizes="64px" style={{objectFit:"contain"}} />}
            </Box>
            <CardContent sx={{p:0, '&:last-child': { pb: 0 },ml:1,mt:0.5 }}>
              <Typography component="h3"sx={{fontSize:14,fontWeight:600,color:"text.primary",ml:0.3}}>{mealPlan.recipe.title}</Typography>
              <Stack direction="column" sx={{justifyContent:"flex-start",alignItems:"flex-start"}}>
                <Typography component="small"sx={{color:"text.secondary",fontSize:12,ml:0.3}}>{mealPlan.recipe.createdAt.split("T")[0]}</Typography>
                <RatingStar rating={mealPlan.recipe.rating}/>
              </Stack>
            </CardContent>
          </Stack>
        </CardActionArea>
        <Tooltip title="この日から削除">
          <IconButton sx={{backgroundColor:"#FEF2F2"}}>
            <ClearRoundedIcon color="error"/>
          </IconButton>
        </Tooltip>
      </Stack>
    </Card>
  )
}
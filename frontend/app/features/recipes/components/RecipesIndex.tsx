import { Box, Stack, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import RatingStar from "./RatingStar";
import { useRouter } from "next/navigation";
import { RecipeIndexType } from "@/app/types/RecipeType";
import Image from "next/image";

type RecipesIndexProps = {
  recipes: RecipeIndexType[]
}

export default function RecipesIndex({recipes}:RecipesIndexProps){
  const router = useRouter();
  return(
    <Box>
      <Grid container spacing={1} sx={{width:"100%"}}>
        {recipes.map((recipe)=> (
          <Grid item md={12} xs={12} key={recipe.id}>
            <Card>
              <CardActionArea onClick={() =>  router.push(`/recipes/${recipe.id}`)}>
                <Stack direction="row" sx={{justifyContent:"flex-start",alignItems:"center",px:2,py:1.5,borderRadius:"12px"}}>
                  {/* サムネイルURLの有無によって画像切り替え */}
                  <Box sx={{width:48,height:48,borderRadius:"8px",overflow:"hidden",position: "relative",}}>
                    {recipe.thumbnailUrl ? <CardMedia component="img" image={recipe.thumbnailUrl} sx={{minWidth:"100%",minHeight:"100%",objectPosition:"center",objectFit:"cover"}} /> : <Image src="/images/noImage.png" alt="画像がありません" fill sizes="48px" style={{objectFit:"contain"}} />}
                  </Box>
                  <CardContent sx={{p:0, '&:last-child': { pb: 0 },ml:1,mt:0.5 }}>
                    <Typography component="h3"sx={{fontSize:14,fontWeight:500}}>{recipe.title}</Typography>
                    <Stack direction="row" sx={{justifyContent:"flex-start",alignItems:"center"}}>
                      <Typography component="small"sx={{mr:1,color:"#9A8F84",fontSize:12,lineHeight:1.5}}>{recipe.createdAt.split("T")[0]}</Typography>
                      <RatingStar rating={recipe.rating}/>
                    </Stack>
                  </CardContent>
                </Stack>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
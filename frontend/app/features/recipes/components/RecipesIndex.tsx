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
    {recipes.map((recipe)=> (
      <Card key={recipe.id} sx={{mb:1.5}}>
        <CardActionArea onClick={() =>  router.push(`/recipes/${recipe.id}`)}>
          <Stack direction="row" sx={{justifyContent:"flex-start",alignItems:"center",px:2,py:1.5,borderRadius:"12px"}}>
            {/* サムネイルURLの有無によって画像切り替え */}
            <Box sx={{width:64,height:64,borderRadius:"12px",overflow:"hidden",position: "relative",}}>
              {recipe.thumbnailUrl ? <CardMedia component="img" image={recipe.thumbnailUrl} sx={{minWidth:"100%",minHeight:"100%",objectPosition:"center",objectFit:"cover"}} /> : <Image src="/images/noImage.png" alt="テスト画像" fill sizes="64px" style={{objectFit:"contain"}} />}
            </Box>
            <CardContent sx={{p:0, '&:last-child': { pb: 0 },ml:1,mt:0.5 }}>
              <Typography component="h3"sx={{fontSize:14,fontWeight:600,color:"text.primary",ml:0.3}}>{recipe.title}</Typography>
              <Stack direction="column" sx={{justifyContent:"flex-start",alignItems:"flex-start"}}>
                <Typography component="small"sx={{color:"text.secondary",fontSize:12,ml:0.3}}>{recipe.createdAt.split("T")[0]}</Typography>
                <RatingStar rating={recipe.rating}/>
              </Stack>
            </CardContent>
          </Stack>
        </CardActionArea>
      </Card>
    ))}
    </Box>
  )
}
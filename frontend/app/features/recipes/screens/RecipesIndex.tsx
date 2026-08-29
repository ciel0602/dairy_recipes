import useRecipes from "@/app/hooks/useRecipes";
import { Box, Stack, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import RatingStar from "../components/RatingStar";

export default function RecipesIndex(){
  const {recipes} = useRecipes();
  return(
    <Box>
      <Typography component="h2">最近の調理</Typography>
      <Grid container spacing={1} sx={{width:"100%"}}>
        {recipes.map((recipe)=> (
          <Grid item md={12} xs={12} key={recipe.id}>
            <Card>
              <CardActionArea>
                <Stack direction="row" sx={{justifyContent:"flex-start",alignItems:"center",px:2,py:1.5,borderRadius:"12px"}}>
                  <CardMedia component="img" image={recipe.thumbnailUrl} sx={{width:48,height:48,borderRadius:"8px"}} />
                  <CardContent sx={{p:0, '&:last-child': { pb: 0 },ml:1,mt:0.5 }}>
                    <Typography component="h3"sx={{fontSize:14,fontWeight:500}}>{recipe.title}</Typography>
                    <Stack direction="row" sx={{justifyContent:"flex-start",alignItems:"center"}}>
                      <Typography component="small"sx={{mr:1,color:"#9A8F84",fontSize:12,lineHeight:1.5}}>{recipe.createdAt.split("T")[0]}</Typography>
                      <RatingStar rating={recipe.currentRating}/>
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
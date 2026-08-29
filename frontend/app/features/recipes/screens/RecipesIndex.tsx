import useRecipes from "@/app/hooks/useRecipes";
import { Box, Typography } from "@mui/material";

export default function RecipesIndex(){
  const {recipes} = useRecipes();
  return(
    <Box>
      <Typography component="h2">最近の調理</Typography>
      {recipes.map((recipe)=> (
        <Box key={recipe.id}>
          <Typography component="h3">{recipe.title}</Typography>
        </Box>
      ))}
    </Box>
  )
}
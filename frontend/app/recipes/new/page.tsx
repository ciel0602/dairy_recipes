import RecipesNewForm from "@/app/features/recipes/components/RecipeNewForm";
import { Typography } from "@mui/material";

export default function RecipeNewPage(){
  return(
    <>
    <Typography sx={{fontSize:24,color:"text.primary"}}>レシピを追加</Typography>
    <Typography>version1として保存されます</Typography>
      <RecipesNewForm/>
    </>
    
  )
}
import BackPageButton from "@/app/components/BackPageButton";
import RecipeImageForm from "@/app/features/recipes/components/RecipeImageForm";
import RecipesNewForm from "@/app/features/recipes/components/RecipeImageForm";
import { Typography } from "@mui/material";

export default function recipesNewPage() {
  return (
    <>
    <BackPageButton/>
    <Typography component="h2">レシピを追加</Typography>
    <RecipeImageForm/>
    </>
  )
}
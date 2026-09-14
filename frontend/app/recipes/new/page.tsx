import BackPageButton from "@/app/components/BackPageButton";
import RecipesNewForm from "@/app/features/recipes/components/RecipesNewForm";
import { Typography } from "@mui/material";

export default function recipesNewPage() {
  return (
    <>
    <BackPageButton/>
    <Typography component="h2">レシピを追加</Typography>
    <RecipesNewForm/>
    </>
  )
}
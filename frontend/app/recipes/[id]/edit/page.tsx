'use client'
import RecipesEditForm from "@/app/features/recipes/components/RecipeEditForm";
import fetcher from "@/app/features/recipes/utils/fetcher";
import { RecipeType, TagType } from "@/app/types/RecipeType";
import { Typography } from "@mui/material";
import camelcaseKeys from "camelcase-keys";
import { useParams } from "next/navigation";
import useSWR from 'swr';

export default function RecipeEditPage() {
  const { id } = useParams();
  // タグを全て取得する
    const tagUrl = process.env.NEXT_PUBLIC_API_BASE_URL + '/api/v1/tags';
    const {data:tagData, error:tagError, isLoading:tagLoading} = useSWR(tagUrl,fetcher);

  //レシピデータを取得する
    const recipeUrl = process.env.NEXT_PUBLIC_API_BASE_URL + `/api/v1/recipes/${id}`;
    const {data:recipeData, error:recipeError,isLoading: recipeLoading} = useSWR(recipeUrl, fetcher);

    if(tagError) return <div>An error occurred.</div>
    if(tagLoading) return <div>Loading...</div>
    if (!tagData) return <div>タグがありません。</div>
    const tags:TagType[] = camelcaseKeys(tagData ?? [])

    if(recipeError) return <div>An error occurred</div>
    if(recipeLoading) return <div>Loading...</div>
    if (!recipeData) return <div>レシピデータがありません。</div>
    const recipe:RecipeType = camelcaseKeys(recipeData)

  return(
    <>
    <Typography sx={{fontSize:24,color:"text.primary"}}>レシピを編集</Typography>
    <Typography>この編集は調理ログには残りません。</Typography>
    <RecipesEditForm tags={tags} recipe={recipe}/>
    </>
  )
}
'use client'
import RecipesNewForm from "@/app/features/recipes/components/RecipeNewForm";
import fetcher from "@/app/features/recipes/utils/fetcher";
import { Typography } from "@mui/material";
import useSWR from 'swr';
import camelcaseKeys from "camelcase-keys";
import { TagType } from "@/app/types/RecipeType";

export default function RecipeNewPage(){
  // タグを全て取得する
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/api/v1/tags';
    const {data, error,isLoading} = useSWR(url,fetcher);
    if(error) return <div>An error occurred.</div>
    if(isLoading) return <div>Loading...</div>
    if (!data) return <div>タグがありません。</div>
    const tags:TagType[] = camelcaseKeys(data ?? [])

  return(
    <>
    <Typography sx={{fontSize:24,color:"text.primary"}}>レシピを追加</Typography>
    <Typography>version1として保存されます</Typography>
      <RecipesNewForm tags={tags}/>
    </>
    
  )
}
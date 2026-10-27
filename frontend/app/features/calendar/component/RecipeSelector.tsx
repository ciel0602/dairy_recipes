'use client'
import { useState } from "react";
import useSWR from 'swr';
import SearchBar from "../../recipes/components/SearchBar";
import fetcher from "../../recipes/utils/fetcher";
import camelcaseKeys from "camelcase-keys";
import RecipeCard from "./RecipeCard";
import { RecipeIndexType } from "@/app/types/RecipeType";

type RecipeSelectorProps = {
  selectedRecipeIds:number[];
  setSelectedRecipeIds:React.Dispatch<React.SetStateAction<number[]>>
}
export default function RecipeSelector({selectedRecipeIds,setSelectedRecipeIds}:RecipeSelectorProps){
  const searchParams = new URLSearchParams();
  const [search,setSearch] = useState("");

  if(search){
    searchParams.set("q",search);
  }
  //レシピ一覧の取得
  const SearchUrl = process.env.NEXT_PUBLIC_API_BASE_URL + `/api/v1/recipes?${searchParams.toString()}`
  const {data:searchData, isLoading:searchIsLoading } = useSWR([SearchUrl], fetcher);

  if(!searchData) return <div>データがありません。</div>
  const  recipes:RecipeIndexType[] = camelcaseKeys(searchData.recipes)

  
  return (
    <>
    <SearchBar  search={search} setSearch={setSearch} isLoading={searchIsLoading} />
    {recipes.map((recipe) => (
      <RecipeCard key={recipe.id} recipe={recipe}  selectedRecipeIds={selectedRecipeIds} setSelectedRecipeIds={setSelectedRecipeIds}  />
    ))}
    </>
  )
}
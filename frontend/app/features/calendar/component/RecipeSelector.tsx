'use client'
import { useState } from "react";
import useSWR from 'swr';
import SearchBar from "../../recipes/components/SearchBar";
import fetcher from "../../recipes/utils/fetcher";
import camelcaseKeys from "camelcase-keys";

export default function RecipeSelector(){
  const searchParams = new URLSearchParams();
  const [search,setSearch] = useState("");

  if(search){
    searchParams.set("q",search);
  }

  const SearchUrl = process.env.NEXT_PUBLIC_API_BASE_URL + `/api/v1/recipes?${searchParams.toString()}`
  const {data:searchData, isLoading:searchIsLoading } = useSWR([SearchUrl], fetcher);

  if(!searchData) return <div>データがありません。</div>
  const  recipes = camelcaseKeys(searchData.recipes)
  console.log(recipes)

  return (
    <>
    <SearchBar  search={search} setSearch={setSearch} isLoading={searchIsLoading} />
    
    </>
  )
}
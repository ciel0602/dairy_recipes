'use client'
import { Box, Button,Typography } from "@mui/material";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useState } from "react";
import SearchBar from "@/app/features/recipes/components/SearchBar";
import useSWR from 'swr';
import fetcher from "@/app/features/recipes/utils/fetcher";
import RecipesIndex from "@/app/features/recipes/components/RecipesIndex";
import camelcaseKeys from "camelcase-keys";
import TagSelector from "@/app/features/recipes/components/TagSelector";
import { RatingType, SortOrderType, TagType } from "@/app/types/RecipeType";
import RatingSelector from "@/app/features/recipes/components/RatingSelector";
import SortSelector from "@/app/features/recipes/components/SortSelector";


export default function RecipesIndexPage() {
  const searchParams = new URLSearchParams();
  const [search,setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrderType>("newest");
  const [selectedTagIds,setSelectedTagIds]= useState<number[]>([]);
  const [selectedRatings,setSelectedRatings]= useState<RatingType[]>([]);
  
  // タグを全て取得する
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/api/v1/tags';
    const {data:tagData, error:tagError,isLoading:tagIsLoading} = useSWR([url],fetcher);

    const tags:TagType[] = camelcaseKeys(tagData ?? []);

    //キーワード検索機能
  if(search){
    searchParams.set("q",search);
  }
  //タグ検索機能
  selectedTagIds.forEach((id) => {
    searchParams.append("tag_ids[]",String(id));
  });
  //評価別検索機能
  selectedRatings.forEach((rating) => {
    searchParams.append("ratings[]",String(rating));
  });

  const SearchUrl = process.env.NEXT_PUBLIC_API_BASE_URL + `/api/v1/recipes?${searchParams.toString()}`;
  const {data:searchData, isLoading:searchIsLoading } = useSWR([SearchUrl,sortOrder], fetcher);

  if(tagError) return <div>An error occurred.</div>
  if(tagIsLoading) return <div>Loading...</div>
  if (!tagData) return <div>タグがありません。</div>

  if(searchIsLoading ) return <div>loading...</div>
  if(!searchData) return <div>データがありません。</div>
  const  recipes = camelcaseKeys(searchData)


  return(
    <>
    <Typography>レシピ帳</Typography>
    <Box sx={{mb:2}}>
      <Button variant="contained" color="primary" startIcon={<AddRoundedIcon/>}>追加</Button>
    </Box>
    <SearchBar search={search} setSearch={setSearch} isLoading={searchIsLoading} />
    <SortSelector sortOrder={sortOrder} setSortOrder={setSortOrder} />
    <TagSelector tags={tags} selectedTagIds={selectedTagIds} onChange={setSelectedTagIds}/>
    <RatingSelector selectedRatings={selectedRatings} setSelectedRatings={setSelectedRatings} />
    <RecipesIndex recipes={recipes}/>
  </>
  )
}
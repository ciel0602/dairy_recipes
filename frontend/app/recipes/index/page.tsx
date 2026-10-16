'use client'
import { Box, Button,Typography } from "@mui/material";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useState } from "react";
import SearchBar from "@/app/features/recipes/components/SearchBar";
import useSWR from 'swr';
import fetcher from "@/app/features/recipes/utils/fetcher";
import RecipesIndex from "@/app/features/recipes/components/RecipesIndex";
import camelcaseKeys from "camelcase-keys";

export default function RecipesIndexPage() {
  const searchParams = new URLSearchParams();
  const [search,setSearch] = useState("");

  if(search){
    searchParams.set("q",search);
  }
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + `/api/v1/recipes?${searchParams.toString()}`;
  const {data, isLoading } = useSWR(url, fetcher);
  if(isLoading) return <div>loading...</div>
  if(!data) return <div>データがありません。</div>
  const recipes = camelcaseKeys(data);

  return(
    <>
    <Typography>レシピ帳</Typography>
    <Box sx={{mb:2}}>
      <Button variant="contained" color="primary" startIcon={<AddRoundedIcon/>}>追加</Button>
    </Box>
    <SearchBar search={search} setSearch={setSearch} isLoading={isLoading} />
    <RecipesIndex recipes={recipes}/>
  </>
  )
}
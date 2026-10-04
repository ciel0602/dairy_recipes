'use client'
import useSWR from 'swr'
import fetcher from "../features/recipes/utils/fetcher";
import camelcaseKeys from "camelcase-keys";
import { Box, Typography } from "@mui/material";
import RecipesIndex from "../features/recipes/components/RecipesIndex";

export default function RecipesPage(){
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/api/v1/recipes'
  const { data, error, isLoading } = useSWR(url, fetcher);
  if(error) return <div>An error occurred.</div>
  if(isLoading) return <div>Loading...</div>
  if (!data) return <div>データがありません。</div>
  //レスポンスデータがnullの場合はから配列を返す
  const recipes = camelcaseKeys(data ?? [])

  return (
    <Box>
      <Typography sx={{color:"#9A8F84",fontSize:14}}>今日も、大切な人のために。</Typography>
      <Typography component="h1">
        <span style={{fontSize:36,color:"#1A1814"}}>おかえり、</span>
        <br />
        <span style={{fontSize:36,color:"#C4622D"}}>料理日記</span>
      </Typography>
      <Typography component="h2">最近の調理</Typography>
      <RecipesIndex recipes={recipes} />
    </Box>
  )
}
'use client'
import { Box, Button,Pagination,Stack,Typography } from "@mui/material";
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
import { useRouter } from "next/navigation";


export default function RecipesIndexPage() {
  const searchParams = new URLSearchParams();
  const [search,setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrderType>("newest");
  const [selectedTagIds,setSelectedTagIds]= useState<number[]>([]);
  const [selectedRatings,setSelectedRatings]= useState<RatingType[]>([]);
  const [page, setPage] = useState(1);
  const router = useRouter();
  
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
  //ページネーション機能
  const handleChange = (e:React.ChangeEvent<unknown>,value:number) => {
    setPage(value);
  }

  //レシピデータのフェッチ
  const SearchUrl = process.env.NEXT_PUBLIC_API_BASE_URL + `/api/v1/recipes?${searchParams.toString()}`;
  const {data:searchData, isLoading:searchIsLoading } = useSWR([SearchUrl,sortOrder,page], fetcher);

  if(tagError) return <div>An error occurred.</div>
  if(tagIsLoading) return <div>Loading...</div>
  if (!tagData) return <div>タグがありません。</div>

  if(searchIsLoading ) return <div>loading...</div>
  if(!searchData) return <div>データがありません。</div>
  const  recipes = camelcaseKeys(searchData.recipes)
  const totalPage = searchData.pagination.total_pages



  return(
    <Box sx={{mb:12}}>
    <Typography sx={{fontSize:24}}>レシピ帳</Typography>
    <Stack direction="row" sx={{width:"100%",mb:2,justifyContent:"flex-end"}}>
      <Button variant="outlined" color="primary" startIcon={<AddRoundedIcon/>} onClick={() => router.push("/recipes/new")}>レシピを追加する</Button>
    </Stack>
    <Box sx={{mb:3}}>
      <SearchBar search={search} setSearch={setSearch} isLoading={searchIsLoading} />
    </Box>
    
    <Box sx={{mb:1}}>
      <SortSelector sortOrder={sortOrder} setSortOrder={setSortOrder} />
    </Box>

    <Stack direction="row" sx={{justifyContent:"flex-start",alignItems:"flex-start"}}>
      <TagSelector tags={tags} selectedTagIds={selectedTagIds} onChange={setSelectedTagIds}/>
    </Stack>
    
    <Box sx={{mb:3}}>
      <RatingSelector selectedRatings={selectedRatings} setSelectedRatings={setSelectedRatings} />
    </Box>
    
    <RecipesIndex recipes={recipes}/>
    <Stack direction="row" sx={{width:"100%",justifyContent:"center",alignItems:"center"}}>
      <Pagination
      variant="outlined"
      shape="rounded"
      color="primary"
      count={totalPage ?? 1}
      page={page}
      onChange={handleChange}
      />
    </Stack>
  </Box>
  )
}
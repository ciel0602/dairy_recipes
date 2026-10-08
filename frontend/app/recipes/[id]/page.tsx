'use client'
import RecipeDetail from "@/app/features/recipes/components/RecipeDetail";
import fetcher from "@/app/features/recipes/utils/fetcher";
import camelcaseKeys from "camelcase-keys";
import { useParams } from "next/navigation";
import useSWR from 'swr'

export default function RecipePage(){
  const { id } = useParams();
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + `/api/v1/recipes/${id}`;
  const { data, error, isLoading } = useSWR(url,fetcher);
  if(error) return <div>An error occurred.</div>
  if(isLoading) return <div>Loading...</div>
  if (!data) return <div>データがありません。</div>
  const recipe = camelcaseKeys(data ?? [])

  return (
    <>
      <RecipeDetail recipe={recipe}/>
    </>
  )
}
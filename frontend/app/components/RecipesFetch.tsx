'use client'
import { useEffect } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import useRecipeState from "../hooks/useRecipes";

export default function RecipesFetch(){
  const [recipes, setRecipes] = useRecipeState();

  useEffect(()=> {
    // ユーザーがフェッチ済みなら何もしない
    if(recipes.isFetched){
      return
    }

    const url = process.env.NEXT_PUBLIC_API_BASE_URL +"/api/v1/recipes"
    axios
      .get(url)
      .then((res:AxiosResponse)=> {
        setRecipes({
          ...recipes,
          ...res.data,
          isFetched:true
        })
      })
      .catch((err:AxiosError<{error:string}>) => {
        console.log(err.message)
        setRecipes({
          ...recipes,
          isFetched:true
        })
      })
    }, [recipes,setRecipes])

  return<></>
}
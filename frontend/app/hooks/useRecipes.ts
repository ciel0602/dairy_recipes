'use client'
import useSWR from 'swr';
import fetcher from '../features/recipes/utils/fetcher';
import { SortOrderType } from '../types/RecipeType';
import camelcaseKeys from 'camelcase-keys';

type useRecipeType = {
  url:string;
  sortOrder?:SortOrderType;
  page?:number;
}
export default function useRecipes({url,sortOrder,page}:useRecipeType){
  const {data, error, isLoading } = useSWR([url,sortOrder,page],fetcher);

  return {
    recipes: camelcaseKeys(data ?? []),
    isLoading,
    error
  };
}
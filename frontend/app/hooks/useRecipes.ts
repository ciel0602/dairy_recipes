"use client";

import useSWR from "swr";
import type { RecipeType } from "../types/RecipeType";
import axios, { type AxiosError } from "axios";
import camelcaseKeys from "camelcase-keys";

export default function useRecipes() {
  const fetcher = async (): Promise<RecipeType[]> => {
    const url =
      process.env.NEXT_PUBLIC_API_BASE_URL + "/api/v1/recipes";

    try {
      const res = await axios.get<RecipeType[]>(url);
      const result = camelcaseKeys(res.data);
      return result;

    } catch (err) {
      const error = err as AxiosError<{ error: string }>;

      console.log(error.message);

      throw error;
    }
  };

  const { data: recipes = [], error, isLoading, mutate,} = useSWR<RecipeType[]>("/api/v1/recipes",fetcher);

  return {
    recipes,
    error,
    isLoading,
    mutate,
  };
}
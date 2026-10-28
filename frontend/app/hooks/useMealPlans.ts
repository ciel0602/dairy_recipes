'use client'
import useSWR from 'swr';
import fetcher from '../features/recipes/utils/fetcher';
import { MealPlanType } from '../types/MealPlanType';
import camelcaseKeys from 'camelcase-keys';
export default function useMealPlans(){
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/api/v1/meal_plans'
  const {data, error, isLoading } = useSWR<MealPlanType[]>([url],fetcher);

  return {
    mealPlans: camelcaseKeys(data ?? [],{deep:true}),
    isLoading,
    error
  };
}
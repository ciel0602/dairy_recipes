import { RatingType } from "./RecipeType";

export type MealPlanType = {
  id:number;
  plannedDate:string;
  recipe:{
    id:number;
    title:string;
    thumbnailUrl:string;
    rating:RatingType;
    createdAt:string;
  }
}
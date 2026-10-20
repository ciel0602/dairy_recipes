export type IngredientType = {
  name: string;
  amount: number | null;
  unit: string;
};

export type StepType = {
  step: number;
  description: string | null;
};

export type RatingType =  1 | 2 | 3 | 4 | 5 ;


export type RecipeIndexType = {
  id:number;
  title: string;
  rating: RatingType;
  thumbnailUrl?:string;
  createdAt:string;
}

export type TagType = {
  id:number;
  name:string;
}

export type RecipeType = {
  id: number;
  userId: number;
  title: string;
  description: string | null;
  tags: TagType[];
  amountRatio:number;
  ingredients: IngredientType[] | null;
  steps: StepType[]
  rating: RatingType;
  versionId: number | null;
  createdAt: string;
  updatedAt: string;
  thumbnailUrl?:string;
};

export type RecipeInputType = {
  title: string;
  description: string | null;
  tag_ids:number[];
  rating?:RatingType;
  amountRatio:number;
  ingredients: IngredientType[] | null;
  steps:StepType[] | null;
};

export type SortOrderType = 
"newest" | "oldest" | "rating" | "cookingCount";
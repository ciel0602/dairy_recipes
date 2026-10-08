export type IngredientType = {
  name: string;
  amount: number | null;
  unit: string;
};

export type StepType = {
  step: number;
  description: string | null;
};

export type RecipeIndexType = {
  id:number;
  title: string;
  rating: 1 | 2 | 3 | 4 | 5;
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
  ingredients: IngredientType[] | null;
  steps: StepType[]
  rating: 1 | 2 | 3 | 4 | 5;
  versionId: number | null;
  createdAt: string;
  updatedAt: string;
  thumbnailUrl?:string;
};
export type RecipeInputType = {
  title: string;
  description: string | null;
  rating:0 | 1 | 2 | 3 | 4 | 5;
  ingredients: IngredientType[] | null;
  steps:StepType[] | null;
};

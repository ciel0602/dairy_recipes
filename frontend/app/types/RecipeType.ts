export type IngredientType = {
  name: string;
  amount: number | null;
  unit: string;
};

export type StepType = {
  step: number;
  description: string | null;
};

export type StepGroupType = {
  title: string;
  steps: StepType[];
};

export type RecipeType = {
  id: number;
  userId: number;
  title: string;
  description: string | null;
  currentIngredients: IngredientType[] | null;
  currentSteps: StepGroupType[] | null;
  currentRating: 1 | 2 | 3 | 4 | 5;
  currentVersionId: number | null;
  createdAt: string;
  updatedAt: string;
  thumbnailUrl:string;
};

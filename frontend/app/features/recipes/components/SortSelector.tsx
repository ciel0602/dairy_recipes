import { SortOrderType } from "@/app/types/RecipeType";
import { Chip, Stack } from "@mui/material";


type SortSelectorProps = {
  sortOrder:SortOrderType;
  setSortOrder:React.Dispatch<React.SetStateAction<SortOrderType>>
}
export default function SortSelector({sortOrder,setSortOrder}:SortSelectorProps){
  const sortOptions: SortOrderType[] = [
    "newest",
    "oldest",
    "rating",
    "cookingCount"
  ];
  const sortLabels: Record<SortOrderType, string> = {
    newest: "新着順",
    oldest: "古い順",
    rating: "評価順",
    cookingCount: "調理回数順",
  };
  
  return(
    <Stack direction="row">
      {sortOptions.map((sort) => (
        <Chip
          key={sort}
          label={sortLabels[sort]}
          clickable
          color={sortOrder === sort ? "primary" : "default"}
          onClick={() => setSortOrder(sort)}
          />
      ))}
    </Stack>
  )
}
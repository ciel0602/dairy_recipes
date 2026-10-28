import { MealPlanType } from "@/app/types/MealPlanType";
import { Box, Typography } from "@mui/material";
import MealPlanCard from "./MealPlanCard";


type MealPlanListProps = {
  mealPlans:MealPlanType[]
}
export default function MealPlanList({mealPlans}:MealPlanListProps){
  const length = mealPlans.length
  return(
    <>
    <Box sx={{
      backgroundColor:"#F5EFE8",
      height:"100%",
      px:3,
      py:2,
      borderRadius:"8px,0"
    }}>
      {length === 0 ? <Typography>レシピがありません。</Typography> : null }
      {mealPlans.map((mealPlan) => (
        <MealPlanCard key={mealPlan.id} mealPlan={mealPlan}/>
      ))}
    </Box>
    </>
  )
}
'use client'
import { Box, Button, Divider, Grid, Stack,  Typography } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import IcecreamRoundedIcon from '@mui/icons-material/IcecreamRounded';
import TakeoutDiningRoundedIcon from '@mui/icons-material/TakeoutDiningRounded';
import RecipeInfo from "../components/RecipeInfo";
import { RecipeType } from "@/app/types/RecipeType";
import BackButton from "@/app/components/BackButton";
import RecipeThumbnail from "./RecipeThumbnail";
import IngredientRatioForm from "./IngredientRatioForm";
import { useState } from "react";


type RecipeProps = {
  recipe: RecipeType
}

export default function RecipeDetail({recipe}:RecipeProps){
const [amountRatio,setAmountRatio] = useState<number>(recipe.amountRatio);

  return(
    <Box sx={{pb:12}}>
      <BackButton/>
      <Box mb={3}>
        <RecipeThumbnail recipe={recipe}/>
      </Box>
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={4}>
          <RecipeInfo/>
        </Grid>
        <Grid item xs={12} md={4}>
          <RecipeInfo/>
        </Grid>
        <Grid item xs={12} md={4}>
          <RecipeInfo/>
        </Grid>
      </Grid>
      <Box mb={3}>
        <Button fullWidth startIcon={<CalendarMonthIcon/>} sx={{backgroundColor:'#F2EDE6',fontSize:14,py:1.5}}>
      カレンダーに追加する
      </Button>
      </Box>
      {/* 材料 */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <Stack direction="row" sx={{justifyContent:"space-between",alignItems:"center",mb:1}}>
            <Stack direction="row">
            <IcecreamRoundedIcon color="primary"/>
            <Typography component="h3" sx={{fontSize:18,fontWeight:500,}}>材料</Typography>
          </Stack>
          <IngredientRatioForm amountRatio={amountRatio} setAmountRatio={setAmountRatio}/>
          </Stack>
          <Box sx={{backgroundColor:"background.paper",px:3,py:2,borderRadius:"10px"}}>
            <ul style={{ listStyleType: 'disc',paddingLeft:"8px", color:"#E85D04" }}>
              {recipe.ingredients?.map((ingredient,index)=> (
                <li key={index}>
                  <Stack direction="row"sx={{justifyContent:"space-between"}}>
                      <Typography sx={{color:"text.primary"}}>{ingredient.name}</Typography>
                      {ingredient.amount ? <Typography sx={{color:"text.primary"}}>{ingredient.amount * (amountRatio / recipe.amountRatio)}{ingredient.unit}</Typography> :<Typography>{ingredient.unit}</Typography>}
                      
                  </Stack>
                </li>
              ))}
            </ul>
          </Box>
        </Grid>
        <Grid item xs={12} md={7}>
          <Stack direction="row" sx={{mb:1}}>
            <TakeoutDiningRoundedIcon color="primary"/>
            <Typography component="h3" sx={{fontSize:18,fontWeight:500,}}>手順</Typography>
          </Stack>
          <Box sx={{backgroundColor:"background.paper",px:3,py:2,borderRadius:"10px"}}>
            <ol>
              {recipe.steps?.map((step) => (
                <Box key={step.step}>
                  <Stack direction="row" sx={{mb:1}}>
                    <Typography sx={{color:"primary.main", fontWeight:600}}>{step.step}.</Typography>
                    <Typography>{step.description}</Typography>
                  </Stack>
                  <Divider sx={{mb:1}}/>
                </Box>
              ))}
            </ol>
          </Box>
        </Grid>
        </Grid>
    </Box>
  )
}

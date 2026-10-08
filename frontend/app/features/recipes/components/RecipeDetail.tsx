'use client'
import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import IcecreamRoundedIcon from '@mui/icons-material/IcecreamRounded';
import TakeoutDiningRoundedIcon from '@mui/icons-material/TakeoutDiningRounded';
import RecipeInfo from "../components/RecipeInfo";
import { RecipeType } from "@/app/types/RecipeType";
import BackButton from "@/app/components/BackButton";

type RecipeProps = {
  recipe: RecipeType
}

export default function RecipeDetail({recipe}:RecipeProps){
  return(
    <Box sx={{pb:12}}>
      <BackButton/>
      <Box sx={{position:"relative"}}>
        <Box component="img" src={recipe.thumbnailUrl} sx={{width:"100%",aspectRatio:"16 / 6",borderRadius:"16px", objectFit:"cover"}} />
        <Box sx={{position:"absolute",left:"16px",bottom:"16px"}}>
          <Typography component="h2" sx={{fontSize:30,fontWeight:600,color:'common.white'}}>{recipe.title}</Typography>
          <Box sx={{width: "fit-content",px:1,py:0.5,borderRadius:"20px",background:"rgba(255,255,255,0.5)",textAlign:"center"}}>
            {recipe.tags.map((tag)=> (
              <Typography key={tag.id} sx={{display:"block",color:'text.primary', fontSize:12}}>{tag.name}</Typography>
            ))}
          </Box>
        </Box>
      </Box>
      <Grid container spacing={2}>
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
      <Button fullWidth startIcon={<CalendarMonthIcon/>} sx={{backgroundColor:'#F2EDE6'}}>
      カレンダーに追加する
      </Button>
      <Grid container spacing={2}>
        <Grid item md={5}>
          <Stack direction="row" sx={{mb:1}}>
            <IcecreamRoundedIcon color="primary"/>
            <Typography component="h3" sx={{fontSize:18,fontWeight:500,}}>材料</Typography>
          </Stack>
          <Box sx={{backgroundColor:"background.paper",px:3,py:2,borderRadius:"10px"}}>
            <ul style={{ listStyleType: 'disc',paddingLeft:"8px", color:"#E85D04" }}>
              {recipe.ingredients?.map((ingredient,index)=> (
                <li key={index}>
                  <Stack direction="row"sx={{justifyContent:"space-between"}}>
                      <Typography sx={{color:"text.primary"}}>{ingredient.name}</Typography>
                      <Typography sx={{color:"text.primary"}}>{ingredient.amount}{ingredient.unit}</Typography> 
                  </Stack>
                </li>
              ))}
            </ul>
          </Box>
        </Grid>
        <Grid item md={7}>
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

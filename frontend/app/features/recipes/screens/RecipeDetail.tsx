'use client'
import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useParams, useRouter } from "next/navigation";
import { RecipeType } from "@/app/types/RecipeType";
import camelcaseKeys from "camelcase-keys";
import axios, { AxiosError } from "axios";
import useSWR from 'swr'
import RecipeDetailsCard from "../components/RecipeDetailsCard";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import IcecreamRoundedIcon from '@mui/icons-material/IcecreamRounded';
import TakeoutDiningRoundedIcon from '@mui/icons-material/TakeoutDiningRounded';
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';


export default function RecipeDetail(){
  const router = useRouter();
  const { id } = useParams();
  const fetcher = async () : Promise<RecipeType> => {
    const url =
      process.env.NEXT_PUBLIC_API_BASE_URL + `/api/v1/recipes/${id}`; 
      try{
        const res = await axios.get<RecipeType>(url);
        const result = camelcaseKeys(res.data,{
          deep: true,
        });
        return result;

      } catch (err) {
        const error = err as AxiosError<{ error: string }>;
  
        console.log(error.message);
  
        throw error;
      }
  }
  const { data: recipe, error, isLoading } = useSWR<RecipeType>(id ? `/api/v1/recipes/${id}` : null, fetcher);

  if (isLoading) { return <div>Loading...</div>; } 
  
  if (error) { return <div>レシピの取得に失敗しました。</div>; } 
  
  if (!recipe) { return <div>レシピが見つかりません。</div>; }

  return(
    <Box sx={{pb:12}}>
      <Box>
        <Button variant="text" startIcon={<ArrowBackRoundedIcon/>} onClick={() => router.back()}>戻る</Button>
      </Box>
      <Box sx={{position:"relative"}}>
        <Box component="img" src={recipe.thumbnailUrl} sx={{width:"100%",aspectRatio:"16 / 6",borderRadius:"16px", objectFit:"cover"}} />
        <Box sx={{position:"absolute",left:"16px",bottom:"16px"}}>
          <Typography component="h2" sx={{fontSize:30,fontWeight:600,color:'common.white'}}>{recipe.title}</Typography>
          <Box sx={{width: "fit-content",px:1,py:0.5,borderRadius:"20px",background:"rgba(255,255,255,0.5)",textAlign:"center"}}>
            <Typography sx={{display:"block",color:'text.primary', fontSize:12}}>和食</Typography>
          </Box>
        </Box>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <RecipeDetailsCard/>
        </Grid>
        <Grid item xs={12} md={4}>
          <RecipeDetailsCard/>
        </Grid>
        <Grid item xs={12} md={4}>
          <RecipeDetailsCard/>
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
              {recipe.currentIngredients?.map((ingredient)=> (
                <li key={ingredient.name}>
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
              {recipe.currentSteps?.map((stepGroup) => (
                <li key={stepGroup.title}>
                  <Typography sx={{fontSize:16,fontWeight:600, mb:0.5}}>{stepGroup.title}</Typography>
                  <Divider sx={{mb:1}}/>
                  {stepGroup.steps.map((step)=> (
                    <Stack key={step.step} direction="row" sx={{mb:1}}>
                      <Typography sx={{color:"primary.main", fontWeight:600}}>{step.step}.</Typography>
                      <Typography>{step.description}</Typography>
                    </Stack>
                  ))}
                </li>
              ))}
            </ol>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

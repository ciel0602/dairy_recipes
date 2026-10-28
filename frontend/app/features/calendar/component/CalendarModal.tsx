import { Box, Button, Divider, IconButton, Modal, Stack, Typography } from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useState } from "react";
import MealPlanList from "./MealPlanList";
import RecipeSelector from "./RecipeSelector";
import { useSnackbarState } from "@/app/hooks/useSnackbarState";
import { LoadingButton } from "@mui/lab";
import axios, { AxiosError, AxiosResponse } from "axios";
import { MealPlanType } from "@/app/types/MealPlanType";

type CalendarModalProps = {
  mealPlans: MealPlanType[];
  dateStr:string;
  modalOpen: boolean;
  setModalOpen:React.Dispatch<React.SetStateAction<boolean>>
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "80vw",
  maxHeight: "90vh",
  overflowY: "auto",
  'bgcolor':"background.default",
};

export default function CalendarModal({mealPlans,dateStr,modalOpen,setModalOpen}:CalendarModalProps){
  const [mode, setMode] = useState<"planView"|"selectView">("planView");
  const [,setSnackbar] = useSnackbarState();
  const [selectedRecipeIds,setSelectedRecipeIds] = useState<number[]>([]);
  const [isLoading,setIsLoading] = useState(false);

  const formattedDate = dateStr.replace(
    /^(\d{4})-(\d{2})-(\d{2})$/,
    (_, year, month, day) =>
      `${year}年${Number(month)}月${Number(day)}日`
    );

  //カレンダーにレシピを追加
  const handleClick = async() => {
    setIsLoading(true);
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/api/v1/meal_plans'
    const headers = {
      'Content-Type':'application/json',
      'access-token':localStorage.getItem('access-token'),
      'client':localStorage.getItem('client'),
      'uid':localStorage.getItem('uid'),
    }
    const data ={
      "recipe_ids":selectedRecipeIds,
      "planned_date":dateStr
    }
    await axios({method:"POST",url:url,headers:headers,data:data})
    .then((response:AxiosResponse) => {
      const accessToken  = response.headers["access-token"]
      const client  = response.headers["client"]
      const uid  = response.headers["uid"]
      if (accessToken && client && uid) {
        localStorage.setItem("access-token", accessToken);
        localStorage.setItem("client", client);
        localStorage.setItem("uid", uid);
      }
      setSnackbar({
        severity:"success",
        message:"カレンダーに追加しました。"
      })
      window.location.reload();
    })
    .catch((error:AxiosError<{error:string}>) => {
      console.log(error.message)
      setSnackbar({
        message:"レシピ登録に失敗しました。",
        severity:"error"
      })
    })
    .finally(()=> {
      setModalOpen(false);
      setIsLoading(false);
    })
  }
  const selectedMealPlans = mealPlans.filter((mealPlan) => (
    mealPlan.plannedDate === dateStr
  ));

  return(
    <>
    <Modal open={modalOpen}>
      <Box sx={{...style,borderRadius:"8px",maxWidth:"600px"}}>
        <Stack direction="row" sx={{justifyContent:"space-between",alignItems:"center",px:3,py:2}}>
          <Box>
            <Typography sx={{fontSize:20,fontWeight:600}}>{formattedDate}</Typography>
            <Typography sx={{fontSize:12,fontWeight:400,color:"text.secondary"}}>{selectedMealPlans.length}件のレシピ</Typography>
          </Box>
          <IconButton onClick={()=> setModalOpen(false)}>
            <CloseRoundedIcon />
          </IconButton>
        </Stack>
        <Divider />

        {/* プランビュー */}
        {mode === "planView" && 
        <>
        <MealPlanList mealPlans={selectedMealPlans} />
        <Divider/>
        <Box sx={{px:3,py:1,backgroundColor:"background.default"}}>
          <Button 
            variant="contained" 
            fullWidth 
            onClick={() => setMode("selectView")}
            sx={{borderRadius:"8px"}}>レシピを追加する</Button>
        </Box>
        </>}

        {/* セレクトビュー */}
        {mode === "selectView" && 
        <>
        <Box sx={{
          backgroundColor:"#F5EFE8",
          px:3,
          py:1}}>
            <RecipeSelector selectedRecipeIds={selectedRecipeIds} setSelectedRecipeIds={setSelectedRecipeIds} />
          </Box>
          <Divider />
        <Stack direction="row" sx={{backgroundColor:"background.default",px:1.5,py:1,gap:1}}>
          <Button 
          variant="outlined" 
          fullWidth
          onClick={() => setMode("planView")}>キャンセル</Button>
          <LoadingButton
          loading={isLoading}
          variant="contained" 
          fullWidth
          onClick={() => handleClick()}>この日に追加する</LoadingButton>
        </Stack>
        </>
        }
        
      </Box>
    </Modal>
    </>
  )
}
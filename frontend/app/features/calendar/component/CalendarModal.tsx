import { Box, Button, Divider, IconButton, Modal, Stack, Typography } from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useState } from "react";
import MealPlanList from "./MealPlanList";
import RecipeSelector from "./RecipeSelector";
import { useSnackbarState } from "@/app/hooks/useSnackbarState";

type CalendarModalProps = {
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

export default function CalendarModal({dateStr,modalOpen,setModalOpen}:CalendarModalProps){
  const [mode, setMode] = useState<"planView"|"selectView">("planView");
  const [,setSnackbar] = useSnackbarState();
  

  const formattedDate = dateStr.replace(
    /^(\d{4})-(\d{2})-(\d{2})$/,
    (_, year, month, day) =>
      `${year}年${Number(month)}月${Number(day)}日`
    );
  return(
    <>
    <Modal open={modalOpen}>
      <Box sx={{...style,borderRadius:"8px",maxWidth:"600px"}}>
        <Stack direction="row" sx={{justifyContent:"space-between",alignItems:"center",px:3,py:2}}>
          <Box>
            <Typography sx={{fontSize:20,fontWeight:600}}>{formattedDate}</Typography>
            <Typography sx={{fontSize:12,fontWeight:400,color:"text.secondary"}}>0件のレシピ</Typography>
          </Box>
          <IconButton onClick={()=> setModalOpen(false)}>
            <CloseRoundedIcon />
          </IconButton>
        </Stack>
        <Divider />

        {/* プランビュー */}
        {mode === "planView" && 
        <>
        <MealPlanList />
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
            <RecipeSelector />
          </Box>
          <Divider />
        <Stack direction="row" sx={{backgroundColor:"background.default",px:1.5,py:1,gap:1}}>
          <Button 
          variant="outlined" 
          fullWidth
          onClick={() => setMode("planView")}>キャンセル</Button>
          <Button 
          variant="contained" 
          fullWidth
          onClick={() => {
            setSnackbar({
              severity:"success",
              message:"カレンダーに追加しました。"
            })
            setModalOpen(false);
          }}>この日に追加する</Button>
        </Stack>
        </>
        }
        
      </Box>
    </Modal>
    </>
  )
}
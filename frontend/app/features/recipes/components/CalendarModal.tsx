import { Box, Button, Divider, IconButton, Modal, Stack, Typography } from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

type CalendarModalProps = {
  dateStr:string;
  modalOpen: boolean;
  setModalOpen:React.Dispatch<React.SetStateAction<boolean>>
}
const style = {
  position: 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "80%",
  height:"80%",
  'bgcolor':"background.default",
};

export default function CalendarModal({dateStr,modalOpen,setModalOpen}:CalendarModalProps){
  return(
    <>
    <Modal open={modalOpen}>
      <Box sx={{...style,borderRadius:"8px",maxWidth:"600px"}}>
        <Stack direction="row" sx={{justifyContent:"space-between",alignItems:"center",px:3,py:2}}>
          <Box>
            <Typography sx={{fontSize:20,fontWeight:600}}>{dateStr}</Typography>
            <Typography sx={{fontSize:12,fontWeight:400,color:"text.secondary"}}>0件のレシピ</Typography>
          </Box>
          <IconButton onClick={()=> setModalOpen(false)}>
            <CloseRoundedIcon />
          </IconButton>
        </Stack>
        <Divider/>
        <Box sx={{backgroundColor:"#F5EFE8",height:"100%",px:3,py:2,borderRadius:"8px,0"}}>
          <Typography>レシピが登録されていません</Typography>
        </Box>
        <Box sx={{px:3,py:1,backgroundColor:"background.default"}}>
          <Button variant="contained"fullWidth sx={{borderRadius:"8px"}}>レシピを追加する</Button>
        </Box>
      </Box>
    </Modal>
    </>
  )
}
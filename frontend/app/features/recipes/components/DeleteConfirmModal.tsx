'use client'
import { useSnackbarState } from "@/app/hooks/useSnackbarState";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useParams, useRouter } from "next/navigation";

type ModalProps = {
  modalOpen:boolean;
  setModalOpen:(open:boolean) => void;
}
export default function DeleteConfirmModal({modalOpen,setModalOpen}:ModalProps){

  const handleClose = () => setModalOpen(false);
  const {id} = useParams();
  const router  = useRouter();
  const [,setSnackbar] = useSnackbarState();

  const handleDelete = async() => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + `/api/v1/recipes/${id}`
    const headers = {
      'Content-Type':'application/json',
      'access-token':localStorage.getItem('access-token'),
      'client':localStorage.getItem('client'),
      'uid':localStorage.getItem('uid'),
    }
    await axios({method:'DELETE',url:url,headers:headers})
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
          message:'レシピを削除しました。',
          severity:'success'
        })
    })
    .catch((e:AxiosError<{error:string}>) => {
      console.log(e.message)
      setSnackbar({
        message:'レシピ削除に失敗しました。',
        severity:'error'
      })
    })
    .finally(() => {
      setModalOpen(false);
      router.push("/recipes");
    })
  } 

  return(
    <Modal open={modalOpen} onClose={handleClose}>
      <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "calc(100% - 32px)",
          maxWidth: 400,
          bgcolor: "background.paper",
          borderRadius: "12px",
          boxShadow: 24,
          p: 3,
          outline: "none",
        }}>
        <Typography component="h1" sx={{fontSize:20,fontWeight:400,mb:1}}>レシピを削除しますか？</Typography>
        <Typography sx={{color:"red",mb:1}}>この操作は取り消せません。</Typography>
        <Stack direction="row" sx={{justifyContent:"center",alignItems:"center",gap:2}}>
          <Button type="button" variant="contained" onClick={() =>handleClose()}sx={{width:"135px",backgroundColor:"#F5EFE8",color:"#9A9188",fontSize:14,"&:hover":{backgroundColor:"#91887f",color:"common.white"}}} >キャンセル</Button>
          <Button type="button" variant="contained"onClick={() => handleDelete()} sx={{width:"135px",backgroundColor:"#FEF2F2",color:"#DC2626",fontSize:14,"&:hover":{backgroundColor:"#fcdbdb"}}}>削除</Button>
        </Stack>
      </Box>
    </Modal>
  )
}
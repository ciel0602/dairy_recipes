"use client"
import { Box, Button, Card, CardContent, Modal, Stack, Typography } from "@mui/material"
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { useState } from "react";
import { useSnackbarState } from "@/app/hooks/useSnackbarState";
import parseRecipe from "../api/parseRecipe";



export default function RecipesNewForm() {

  

  const [image, setImage] = useState<File | null>();
  const [isDragging, setIsDragging] = useState(false);
  const [,setSnackbar] = useSnackbarState();
  // ファイルをドラッグされた時に色を替えるための処理
  const handleDragOver = (event:React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  }
  // ドラッグを領域外に外した色を替える処理
  const handleDragLeave = () => {
    setIsDragging(false);
  }
// ファイルをドロップした時の処理
  const handleDrop = (event:React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0]

    if(!file) return;

    
    if (!file.type.startsWith("image/")) {
    setSnackbar({message:"画像を選択してください",severity:"error"})
    return;
  }
    if (file.size > 10 * 1024 * 1024) {
    setSnackbar({message:"画像サイズは10MB以下にしてください",severity:"error"})
    return;
}
    setImage(file);
  }
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
    setSnackbar({message:"画像を選択してください",severity:"error"})
    return;
  }
    if (file.size > 10 * 1024 * 1024) {
    setSnackbar({message:"画像サイズは10MB以下にしてください",severity:"error"})
    return;
} 

    setImage(file);
  };

  const handleSubmit = (event: React.SubmitEvent) => {
    event.preventDefault();
    if (!image) {
    return;
  }
    parseRecipe(image);
  }

  return(
    <Box>
      <Box>
      <Stack direction="row">
        <CameraAltIcon color="primary"/>
        <Typography component="h2"sx={{fontSize:24,fontWeight:600,color:"text.primary"}}>画像からレシピを生成する</Typography>
      </Stack>
      <Box>
        <Typography sx={{fontSize:14}}>レシピの写真やスクリーンショットをアップロードすると、AIが自動でレシピを作成します。</Typography>
      </Box>
    </Box>
    <Card>
      <CardContent>
        <Stack component="form" direction="column" sx={{justifyContent:"center",alignItems:"center", gap:1}}
        onSubmit={handleSubmit}>
          <Box 
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          sx={{
            border: "2px dashed",
              borderColor:isDragging ? "primary.main" : "divider",
              borderRadius: "20px",
              p: 4,
              textAlign: "center",
              backgroundColor: isDragging
                ? "rgba(232, 93, 4, 0.08)"
                : "background.default",
              transition: "0.2s",
              cursor: "pointer",
          }}>
            <Stack direction="column" sx={{justifyContent:"center",alignItems:"center", gap:1}}>
              <ImageOutlinedIcon color="primary"/>
            <Typography>画像をドラッグ＆ドロップするか<br/>クリックして選択してください</Typography>
            <Button component="label" variant="outlined" sx={{width:"50%"}}>
              <input type="file" accept="image/*" hidden onChange={handleImageChange}/>ファイルを選択</Button>
            <Typography component="small">対応ファイル：JPG、PNG、WEBP（最大10MB）</Typography>
            </Stack>
            {image ? <Typography>{image.name}</Typography> : null}
          </Box>
          <Button type="submit" variant="contained">画像をアップロード</Button>
        </Stack>
      </CardContent>
    </Card>
    <Modal open={true} >
      <Box>
        
      </Box>
    </Modal>
    </Box>
  )
}
import { RecipeType } from "@/app/types/RecipeType";
import { Box, Chip, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Stack, Typography } from "@mui/material";
import Image from "next/image";
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useState } from "react";
import DeleteConfirmModal from "@/app/features/recipes/components/DeleteConfirmModal";

type RecipeProps = {
  recipe: RecipeType
}

export default function RecipeThumbnail({recipe}:RecipeProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleModalOpen = () => setModalOpen(true)
  return(
    <Box sx={{position:"relative",width:"100%",aspectRatio:"16 / 6",overflow:"hidden",backgroundColor:"#bcbcbc",borderRadius:"16px"}}>
      {/* サムネイルの有無で画像切り替え */}
        {recipe.thumbnailUrl ? 
          <Box component="img" src={recipe.thumbnailUrl } sx={{width:"100%", objectFit:"cover"}} /> : 
            <Image src="/images/noImage.png"alt="画像がありません" fill sizes="100vw" style={{width:"100%", objectFit: "contain" }}/>
        }
        <Box sx={{position:"absolute",right:"16px",top:"16px"}}>
          <Stack direction="row" sx={{justifyContent:"flex-end",alignItems:"center",gap:1}}>
            <Chip label="version 1" sx={{color:"primary.main",backgroundColor:"common.white", fontSize:12}}/>
              <IconButton sx={{width:"32px",height:"32px",backgroundColor:"common.white",borderRadius:"8px"}} onClick={handleClick}>
                <MoreHorizRoundedIcon/>
              </IconButton>
              <Menu 
              open={open} 
              anchorEl={anchorEl} 
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              slotProps={{
                paper:{
                  sx:{ mt:1 }
                }
              }}>
                <MenuItem>
                  <ListItemIcon>
                    <EditRoundedIcon fontSize="small" color="primary"/>
                  </ListItemIcon>
                  <ListItemText>
                    レシピを編集
                  </ListItemText>
                  </MenuItem>
                  
                  <MenuItem onClick={handleModalOpen}>
                  <ListItemIcon>
                    <DeleteOutlinedIcon fontSize="small" color="error"/>
                  </ListItemIcon>
                  <ListItemText sx={{color:"error"}}>レシピを削除</ListItemText>
                </MenuItem>
            </Menu>
          </Stack>
        </Box>
        <DeleteConfirmModal
          modalOpen={modalOpen} 
          setModalOpen={setModalOpen}/>
        <Box sx={{position:"absolute",left:"16px",bottom:"16px"}}>
          <Typography component="h2" sx={{fontSize:30,fontWeight:600,color:'common.white'}}>{recipe.title}</Typography>
          <Box sx={{width: "fit-content",px:1,py:0.5,borderRadius:"20px",background:"rgba(255,255,255,0.2)",textAlign:"center"}}>
            {recipe.tags.map((tag)=> (
              <Typography key={tag.id} sx={{display:"block",color:'common.white', fontSize:12,opacity:1}}>{tag.name}</Typography>
            ))}
          </Box>
        </Box>
      </Box>
  )
}
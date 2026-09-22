import { Box, Button, Modal } from "@mui/material";
import RecipesNewForm from "./RecipeNewForm";
import { RecipeInputType } from "@/app/types/RecipeType";
type RecipeModalProps = {
  isOpen:boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  recipe: RecipeInputType | undefined;
};

export default function RecipeModal({isOpen,setIsOpen,recipe}:RecipeModalProps){
  const handleClose = () => {
    setIsOpen(false);
  }
  return (
    <Modal open={isOpen} >
      <Box>
        <Box sx={{width:"90%",height:"90%",backgroundColor:"common.white"}}>
          <RecipesNewForm recipe={recipe}/>
          <Button type="button" onClick={handleClose}>キャンセル</Button>
        </Box>
      </Box>
    </Modal>
  )
}
import { RecipeInputType } from "@/app/types/RecipeType";
import { LoadingButton } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

type RecipeNewFormProps = {
  recipe: RecipeInputType | undefined;
};

export default function RecipesNewForm({recipe}:RecipeNewFormProps){
  const {handleSubmit, control} = useForm();

  const onSubmit = () => {
    console.log("送信")
  }

  return(
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box mb={4}>
        <label htmlFor="title">料理名</label>
        <Controller
          name="title"
          control={control}
          render={({field,fieldState}) => (
            <TextField 
            {...field}
            id="title"
            type="text"
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
            fullWidth  
            placeholder=""
            value={recipe?.title ?? "" }
            variant='outlined'/>
          )}
          />
      </Box>
      <Box mb={4}>
        <label htmlFor="description">説明</label>
        <Controller
          name="description"
          control={control}
          render={({field,fieldState}) => (
            <TextField 
            {...field}
            id="description"
            type="text"
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
            fullWidth  
            placeholder=""
            value={recipe?.description ?? "" }
            variant='outlined'/>
          )}
          />
      </Box>
      <Box mb={4}>
        <label htmlFor="ingredients">材料</label>
        <Controller
          name="ingredients"
          control={control}
          render={({field,fieldState}) => (
            <TextField 
            {...field}
            id="ingredients"
            type="text"
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
            fullWidth  
            placeholder=""
            value={recipe?.currentIngredients ?? "" }
            variant='outlined'/>
          )}
          />
      </Box>
      <Box mb={4}>
        <label htmlFor="steps">手順</label>
        <Controller
          name="steps"
          control={control}
          render={({field,fieldState}) => (
            <TextField 
            {...field}
            id="steps"
            type="text"
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
            fullWidth  
            placeholder=""
            value={recipe?.currentSteps ?? "" }
            variant='outlined'/>
          )}
          />
      </Box>
      <Box>
        <LoadingButton variant="contained" type="submit">レシピを追加</LoadingButton>
      </Box>
    </Box> 
  )
}
'use client'
import { Box, InputAdornment, Stack, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import SoupKitchenRoundedIcon from '@mui/icons-material/SoupKitchenRounded';
import IcecreamRoundedIcon from '@mui/icons-material/IcecreamRounded';
import TakeoutDiningRoundedIcon from '@mui/icons-material/TakeoutDiningRounded';
import { LoadingButton } from "@mui/lab";

export default function RecipesNewForm() {

  type RecipeForm = { recipeName: string; ingredients: string; steps: string; };

  const { handleSubmit, control } = useForm({
    defaultValues:{recipeName:'',ingredients:'',steps:'' }
  })
  const onSubmit = async (formData: RecipeForm) => {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    console.log('status:', response.status);
    console.log('response:', data);

    if (!response.ok) {
      throw new Error(data.error || 'AIレシピ生成に失敗しました');
    }

    console.log(data.formatData);

  } catch (error) {
    console.error(error);
  }
};
  return(
    <>
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box mb={4}>
        <label htmlFor="recipeName">料理名</label>
        <Controller 
          name="recipeName"
          control={control}
          // rules={recipeValidationRules}
          render={({field, fieldState}) => (
            <TextField
            {...field}
            id="recipeName"
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
            fullWidth
            placeholder="例：ハンバーグ"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SoupKitchenRoundedIcon color="primary"/>
                </InputAdornment>
              )
            }}/>
          )}
        />
      </Box>
      <Box mb={4}>
        <label htmlFor="ingredients">材料</label>
        <Controller 
          name="ingredients"
          control={control}
          // rules={recipeValidationRules}
          render={({field, fieldState}) => (
            <TextField
            {...field}
            id="ingredients"
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
            fullWidth
            placeholder="合挽肉　400g
玉ねぎ　1/2個"
            multiline
            rows={4}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"
                sx={{
                  alignSelf: 'flex-start',
                  mt: 1.5,
                }}>
                  <IcecreamRoundedIcon color="primary"/>
                </InputAdornment>
              )
            }}/>
          )}
        />
      </Box>
      <Box mb={4}>
        <label htmlFor="steps">手順(一行ずつ入力)</label>
        <Controller 
          name="steps"
          control={control}
          // rules={recipeValidationRules}
          render={({field, fieldState}) => (
            <TextField
            {...field}
            id="steps"
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
            fullWidth
            placeholder="1.玉ねぎを炒める
2.ひき肉に塩を加えてよくこねる"
            multiline
            rows={4}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"
                sx={{
                  alignSelf: 'flex-start',
                  mt: 1.5,
                }}>
                  <TakeoutDiningRoundedIcon  color="primary"/>
                </InputAdornment>
              )
            }}/>
          )}
        />
      </Box>
      <Stack direction="row" mb={15} sx={{width:'100%',justifyContent:'center',alignItems:'center'}}>
        <LoadingButton fullWidth variant='contained' sx={{height:'44px'}} type="submit">レシピを追加</LoadingButton>
    </Stack>
    </Box>
    </>
  )
}
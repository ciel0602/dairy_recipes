'use client'
import { useSnackbarState } from "@/app/hooks/useSnackbarState";
import { RecipeInputType } from "@/app/types/RecipeType";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

export default function RecipesNewForm(){
  const [,setSnackbar] = useSnackbarState();
  const [isLoading, setIsLoading] = useState(false);

  const {handleSubmit, control} = useForm<RecipeInputType>({
    defaultValues: {
      title:"",
      description:"",
      ingredients:[
        {
          name:"",
          amount: null,
          unit:"",
        },
      ],
      steps:[
        {
          step:1,
          description:"",
        }
      ]
    }
  });
  const { fields:ingredientsFields, append:appendIngredient, remove:removeIngredient } = useFieldArray({ control, name: "ingredients"});
  const { fields:stepFields, append:appendStep, remove:removeStep } = useFieldArray({ control, name: "steps"});

  const onSubmit = async(data:RecipeInputType) => {
    setIsLoading(true);
    const formattedSteps = data.steps?.map((step,index) => (
      {
        step: index + 1,
        description:step.description
      }
    ));
    const recipeData = {
      ...data,
      steps:formattedSteps
    }
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/api/v1/recipes'
    const headers = {
      'Content-Type':'application/json',
      'access-token':localStorage.getItem('access-token'),
      'client':localStorage.getItem('client'),
      'uid':localStorage.getItem('uid'),
    }
    await axios({method:'POST',url:url,data:recipeData,headers:headers})
      .then((response:AxiosResponse) => {
        //リクエストごとにトークン更新
        const accessToken  = response.headers["access-token"]
        const client  = response.headers["client"]
        const uid  = response.headers["uid"]
        if (accessToken && client && uid) {
          localStorage.setItem("access-token", accessToken);
          localStorage.setItem("client", client);
          localStorage.setItem("uid", uid);
        }
        setSnackbar({
          message:'レシピを登録しました。',
          severity:'success'
        })
      })
      .catch((e:AxiosError<{error:string}>)=> {
        console.log(e.message)
        setSnackbar({
          message:'ログイン認証に失敗しました。',
          severity:'error'
        })
      })
      .finally(()=> {
        setIsLoading(false)
      })
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
            variant='outlined'/>
          )}
          />
      </Box>
      <Box mb={4}>
        <Typography>材料</Typography>
        {ingredientsFields.map((field,index) => (
          <Stack key={index} direction="row" spacing={2} mb={2}>
            <Controller
              name={`ingredients.${index}.name`}
              control={control}
              render={({field,fieldState}) => (
                <TextField 
                {...field}
                type="text"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                fullWidth  
                placeholder=""
                label="材料名"
                variant='outlined'/>
                )}
              />
              <Controller
              name={`ingredients.${index}.amount`}
              control={control}
              render={({field,fieldState}) => (
                <TextField 
                {...field}
                type="number"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                fullWidth  
                placeholder=""
                label="量"
                value={field.value ?? ""}
                variant='outlined'/>
                )}
              />
              <Controller
              name={`ingredients.${index}.unit`}
              control={control}
              render={({field,fieldState}) => (
                <TextField 
                {...field}
                type="text"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                fullWidth  
                placeholder=""
                label="単位"
                variant='outlined'/>
                )}
              />
              <Button
              type="button"
              onClick={() => removeIngredient(index)}
            >
              削除
            </Button>
          </Stack>       
        ))}
        <Button variant="text" onClick={() =>appendIngredient({
              name: "",
              amount: null,
              unit: "",
            })}>
          ＋材料を追加
        </Button>
        <Box>
</Box>
      </Box>
      <Box mb={4}>
        <Typography>手順</Typography>
        {stepFields.map((field,index) => (
          <Stack key={index} direction="row"mb={2}>
            <Typography>{index + 1}.</Typography>
            <Controller
          name={`steps.${index}.description`}
          control={control}
          render={({field,fieldState}) => (
            <TextField 
            {...field}
            type="text"
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
            fullWidth  
            placeholder=""
            label="手順"
            variant='outlined'/>
          )}
          />
          <Button variant="text" onClick={() => removeStep(index)}>削除</Button>
          </Stack>
        ))}
        <Button variant="text" onClick={() => appendStep({
          step: stepFields.length + 1,
          description: "",})}>
          ＋手順を追加
        </Button>
      </Box>
      <Box>
        <LoadingButton variant="contained" loading={isLoading} type="submit" sx={{mb:5}}>レシピを追加</LoadingButton>
      </Box>
    </Box> 
  )
}
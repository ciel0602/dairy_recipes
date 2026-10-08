'use client'
import BackButton from "@/app/components/BackButton";
import { useSnackbarState } from "@/app/hooks/useSnackbarState";
import { RecipeInputType } from "@/app/types/RecipeType";
import { LoadingButton } from "@mui/lab";
import { Box, Button, IconButton, Rating, Stack, TextField, Tooltip, Typography } from "@mui/material";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import RecipeValidationRules from "../utils/RecipeValidationRules";

export default function RecipesNewForm(){
  const [,setSnackbar] = useSnackbarState();
  const [isLoading, setIsLoading] = useState(false);

  const {handleSubmit, control,reset} = useForm<RecipeInputType>({
    defaultValues: {
      title:"",
      description:"",
      rating:0,
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
        reset()
      })
  }

  return(
    <>
    <BackButton/>
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{pb:14}}>
      <Box mb={4}>
        <label htmlFor="title">料理名</label>
        <Controller
          name="title"
          control={control}
          rules={RecipeValidationRules.title}
          render={({field,fieldState}) => (
            <TextField 
            {...field}
            id="title"
            type="text"
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
            fullWidth  
            placeholder="例:ハンバーグ"
            variant='outlined'
            sx={{fontSize:12}}/>
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
            placeholder="どんな料理か簡単に説明"
            variant='outlined'/>
          )}
          />
      </Box>
      {/* ここから星評価のフォーム */}
      <Box>
        <Typography>評価</Typography>
        <Controller 
        name="rating"
        control={control}
        defaultValue={0}
        render={({field}) => (
          <Rating 
            {...field}
            value={field.value}
            // 未選択は0となる処理
            onChange={(_, value) => {
              field.onChange(value ?? 0)
            }}/>
        )} />
      </Box>
      <Box mb={4}>
        <Typography>材料</Typography>
        {ingredientsFields.map((field,index) => (
          <Stack key={index} direction="row" spacing={2} mb={2} sx={{justifyContent:"flex-start",alignItems:"center"}}>
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
                label="材料名"
                placeholder="醤油"
                variant='outlined'/>
                )}
              />
              <Controller
              name={`ingredients.${index}.amount`}
              control={control}
              rules={RecipeValidationRules.amount}
              render={({field,fieldState}) => (
                <TextField 
                {...field}
                type="number"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                fullWidth  
                label="量"
                placeholder="2"
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
                label="単位"
                placeholder="大さじ"
                variant='outlined'/>
                )}
              />
            <Tooltip title="削除">
              <IconButton sx={{width:"28px",height:"28px",
              "&:hover": {
                backgroundColor: "#FEF0E6",
              },
              "&.Mui-focusVisible": {
                backgroundColor: "#FEF0E6",
              },}}
              onClick={() => removeIngredient(index)}>
                <RemoveRoundedIcon color="primary"/>
              </IconButton>
            </Tooltip>
            
          </Stack>       
        ))}
        <Button variant="text" type="button" onClick={() =>appendIngredient({
              name: "",
              amount: null,
              unit: "",
            })} sx={{width:"100%",border:"1px dashed #E5DED7",borderRadius:"12px",backgroundColor:"#FEF0E6"}}>
          ＋材料を追加
        </Button>
        <Box>
</Box>
      </Box>
      <Box mb={4}>
        <Typography>手順</Typography>
        {stepFields.map((field,index) => (
          <Stack key={index} direction="row"mb={2} sx={{justifyContent:"flex-start",alignItems:"center",gap:1}}>
            <Box sx={{backgroundColor:'#FEF0E6',width:"32px",height:"28px",textAlign:"center",borderRadius:"50%"}}>
              <Typography sx={{fontSize:18,color:"primary.main"}}>{index + 1}</Typography>
            </Box>
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
            placeholder={`手順${index + 1}を入力`}
            variant='outlined'/>
          )}
          />
          <Tooltip title="削除">
              <IconButton sx={{width:"28px",height:"28px",
              "&:hover": {
                backgroundColor: "#FEF0E6",
              },
              "&.Mui-focusVisible": {
                backgroundColor: "#FEF0E6",
              },}}
              onClick={() => removeStep(index)}>
                <RemoveRoundedIcon color="primary"/>
              </IconButton>
            </Tooltip>
          </Stack>
        ))}
        <Button variant="text" type="button" onClick={() => appendStep({
          step: stepFields.length + 1,
          description: "",})} sx={{width:"100%",border:"1px dashed #E5DED7",borderRadius:"12px",backgroundColor:"#FEF0E6"}}>
          ＋手順を追加
        </Button>
      </Box>
      <Stack direction="row" sx={{justifyContent:"center",alignItems:"center", gap:2}}>
        <Button fullWidth variant="text" sx={{backgroundColor:"#F5EFE8",color:"#9A9188",borderRadius:"12px"}}onClick={() => reset()}>キャンセル</Button>
        <LoadingButton fullWidth variant="text"  loading={isLoading} type="submit" sx={{backgroundColor:"primary.main",color:"common.white",borderRadius:"12px",opacity:0.8,"&:hover":{opacity:1,backgroundColor:"primary.main"}}}>レシピを追加</LoadingButton>
      </Stack>
    </Box> 
    </>
  )
}
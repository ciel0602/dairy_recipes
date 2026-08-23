'use client'
import useUserState from "@/app/hooks/useGlobalState";
import { Box, Link, Stack, TextField,  } from "@mui/material";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import loginValidationRules from "../util/LoginValidationRules";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { useSnackbarState } from "@/app/hooks/useSnackbarState";

export default function LoginForm(){
  const router = useRouter();
  const [user,setUser] = useUserState();
  const [isLoading, setIsLoading] = useState(false);
  const [,setSnackbar] = useSnackbarState();

  type LoginFormData = {
    email: string;
    password: string;
  }
  const { handleSubmit, control } = useForm<LoginFormData>({
      defaultValues: {email: '', password: '' }
    })

  const onSubmit:SubmitHandler<LoginFormData> = (data) => {
    const LogIn = async(data:LoginFormData) =>{
      setIsLoading(true)
      const url =  process.env.NEXT_PUBLIC_API_BASE_URL + '/api/v1/auth/sign_in'
      const headers = {'Content-Type': 'application/json'}

    await axios({method:'POST', url:url,data:data,headers:headers})
      .then((res:AxiosResponse) => {
        localStorage.setItem('access-token', res.headers['access-token'])
        localStorage.setItem('client', res.headers['client'])
        localStorage.setItem('uid', res.headers['uid'])
        setUser({
          ...user,
          isFetched:false,
        })
        router.push('/recipes')
        setSnackbar({
          message:'ログインしました。',
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
      setIsLoading(false)
    }
    LogIn(data)
  }
  

  return(
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Box mb={4}>
              <label htmlFor="email">メールアドレス</label>
              <Controller
                name="email"
                control={control}
                rules={loginValidationRules.email}
                render={({field,fieldState}) => (
                  <TextField 
                  {...field}
                  id="email"
                  error={fieldState.invalid}
                  helperText={fieldState.error?.message}
                  fullWidth  
                  placeholder="your@email.com"
                  variant='outlined'/>
                )}
                />
            </Box>
            <Box mb={1.5}>
              <label htmlFor="password">パスワード</label>
              <Controller
                name="password"
                control={control}
                rules={loginValidationRules.password}
                render={({field,fieldState}) => (
                  <TextField 
                  {...field}
                  id="password"
                  error={fieldState.invalid}
                  helperText={fieldState.error?.message}
                  fullWidth  
                  placeholder="パスワード"
                  variant='outlined'/>
                )}
                />
            </Box>
            <Stack direction="row" mb={4} sx={{width:'100%',justifyContent:'end'}}>
              <Link>パスワードをお忘れですか？</Link>
            </Stack>
            <Stack direction="row"  mb={2}  sx={{justifyContent:'center'}}>
              <LoadingButton loading={isLoading} fullWidth variant='contained' type='submit' sx={{height:'44px'}}>ログイン</LoadingButton>
            </Stack>
          </Box> 
  )
}
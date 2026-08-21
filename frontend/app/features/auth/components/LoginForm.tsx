'use client'
import useUserState from "@/app/hooks/useGlobalState";
import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export default function LoginForm(){
  const router = useRouter();
  const [user,setUser] = useUserState();

  type LoginFormData = {
    email: string;
    password: string;
  }
  const { handleSubmit, control } = useForm<LoginFormData>({
      defaultValues: {email: '', password: '' }
    })

  const onSubmit:SubmitHandler<LoginFormData> = (data) => {
    const url =  process.env.NEXT_PUBLIC_API_BASE_URL + '/api/v1/auth/sign_in'
    const headers = {'Content-Type': 'application/json'}

    axios({method:'POST', url:url,data:data,headers:headers})
      .then((res:AxiosResponse) => {
        localStorage.setItem('access-token', res.headers['access-token'])
        localStorage.setItem('client', res.headers['client'])
        localStorage.setItem('uid', res.headers['uid'])
        setUser({
          ...user,
          isFetched:false,
        })
        router.push('/recipes')
      })
      .catch((e:AxiosError<{error:string}>)=> {
        console.log(e.message)
      })
  }
  

  return(
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Controller
                name="email"
                control={control}
                render={({field}) => (
                  <TextField 
                  {...field}
                  label="email"
                  fullWidth  
                  variant='outlined'/>
                )}
                />
            </Box>
            <Box>
              <Controller
                name="password"
                control={control}
                render={({field}) => (
                  <TextField 
                  {...field}
                  label="password"
                  fullWidth  
                  variant='outlined'/>
                )}
                />
            </Box>
            <Link>パスワードをお忘れですか？</Link>
            <Box>
              <Button variant='contained' type='submit'>ログイン</Button>
              <Stack direction="row">
                <Typography>アカウントをお持ちでない方は</Typography>
                <Link>新規登録</Link>
              </Stack>
            </Box>
          </Box> 
  )
}
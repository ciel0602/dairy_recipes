'use client'
import useUserState from "@/app/hooks/useGlobalState";
import { Box, Button, Link, Stack, TextField,  } from "@mui/material";
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
            <Box mb={4}>
              <label htmlFor="email">メールアドレス</label>
              <Controller
                name="email"
                control={control}
                render={({field}) => (
                  <TextField 
                  {...field}
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
                render={({field}) => (
                  <TextField 
                  {...field}
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
              <Button fullWidth variant='contained' type='submit' sx={{height:'44px'}}>ログイン</Button>
            </Stack>
          </Box> 
  )
}
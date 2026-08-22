'use client'
import { Box, Button,  Stack, TextField,} from "@mui/material";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export default function SigninForm(){
  const router = useRouter();
  type SigninFormData = {
    name:string;
    email: string;
    password:string;
    confirmPassword:string;
  }

  const { handleSubmit, control } = useForm<SigninFormData>({
      defaultValues: {name:'', email: '', password: '',confirmPassword:'' }
    })
  const onSubmit:SubmitHandler<SigninFormData> =(data) => {
    const SignUp = async(data: SigninFormData) => {

    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/api/v1/auth'
    const headers = {'Content-Type': 'application/json'}
    const confirmSuccessUrl = process.env.NEXT_PUBLIC_FRONT_BASE_URL + '/sign_in'

    await axios({
      method:'POST',
      url:url,
      headers:headers,
      data:{ ...data,confirm_success_url:confirmSuccessUrl}
    })
    .then((res:AxiosResponse)=> {
      localStorage.setItem('access-token',res.headers['access-token'] || '',)
      localStorage.setItem('client',res.headers['client'] || '',)
      localStorage.setItem('uid',res.headers['uid'] || '',)
      router.push('/recipes')
    })
    .catch((e:AxiosError<{error:string}>) => {
      console.log(e.message)
    })
  }
  SignUp(data)
}
  return(
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Box mb={4}>
              <label htmlFor="name">ユーザーネーム</label>
              <Controller
                name="name"
                control={control}
                render={({field}) => (
                  <TextField 
                  {...field}
                  id="name"
                  label="ユーザーネーム"
                  fullWidth  
                  placeholder="料理好きさん"
                  variant='outlined'/>
                )}
                />
            </Box>
            <Box  mb={4}>
              <label htmlFor="email">メールアドレス</label>
              <Controller
                name="email"
                control={control}
                render={({field}) => (
                  <TextField 
                  {...field}
                  id="email"
                  label="メールアドレス"
                  fullWidth  
                  placeholder="your@email.com"
                  variant='outlined'/>
                )}
                />
            </Box>
            <Box mb={4}>
              <label htmlFor="password">パスワード</label>
              <Controller
                name="password"
                control={control}
                render={({field}) => (
                  <TextField 
                  {...field}
                  id="password"
                  label="パスワード"
                  fullWidth  
                  placeholder="パスワード（8文字以上）"
                  variant='outlined'/>
                )}
                />
            </Box>
            <Box mb={4}>
              <label htmlFor="confirmPassword">パスワード（確認）</label>
              <Controller
                name="confirmPassword"
                control={control}
                render={({field}) => (
                  <TextField 
                  id="confirmPassword"
                  {...field}
                  label="パスワード確認"
                  fullWidth  
                  placeholder="パスワード（8文字以上）"
                  variant='outlined'/>
                )}
                />
            </Box>
            <Stack direction="row" mb={1.5} sx={{width:'100%',justifyContent:'center',alignItems:'center'}}>
              <Button fullWidth variant='contained' sx={{height:'44px'}} type="submit">アカウントを作成</Button>
            </Stack>
          </Box>
  )
}
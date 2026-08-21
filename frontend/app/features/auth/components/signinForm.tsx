'use client'
import { Box, Button,  Stack, TextField,} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

export default function SigninForm(){
  type SigninFormData = {
    mode:'signin';
    name:string;
    email: string;
    password:string;
    confirmPassword:string;
  }

  const { handleSubmit, control } = useForm<SigninFormData>({
      defaultValues: {name:'', email: '', password: '',confirmPassword:'' }
    })
  const onSubmit = (data:SigninFormData) => {
    console.log('サインインデータ:', data)
  }
  return(
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Box mb={4}>
              <label htmlFor="username">ユーザーネーム</label>
              <Controller
                name="name"
                control={control}
                render={({field}) => (
                  <TextField 
                  {...field}
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
                  {...field}
                  label="パスワード確認"
                  fullWidth  
                  placeholder="パスワード（8文字以上）"
                  variant='outlined'/>
                )}
                />
            </Box>
            <Stack direction="row" mb={1.5} sx={{width:'100%',justifyContent:'center',alignItems:'center'}}>
              <Button fullWidth variant='contained' sx={{height:'44px'}}>アカウントを作成</Button>
            </Stack>
          </Box>
  )
}
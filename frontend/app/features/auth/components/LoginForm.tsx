'use client'
import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

export default function LoginForm(){
  type LoginFormData = {
    mode:'login';
    email: string;
    password: string;
  }
  const { handleSubmit, control } = useForm<LoginFormData>({
      defaultValues: {mode:'login', email: '', password: '' }
    })
  const onSubmit = (data:LoginFormData) => {
    console.log('サインインデータ:', data)
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
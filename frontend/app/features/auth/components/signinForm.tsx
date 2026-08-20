'use client'
import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
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
            <Box>
              <Controller
                name="name"
                control={control}
                render={({field}) => (
                  <TextField 
                  {...field}
                  label="name"
                  fullWidth  
                  variant='outlined'/>
                )}
                />
            </Box>
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
            <Box>
              <Controller
                name="confirmPassword"
                control={control}
                render={({field}) => (
                  <TextField 
                  {...field}
                  label="confirmPassword"
                  fullWidth  
                  variant='outlined'/>
                )}
                />
            </Box>
            <Box>
              <Button variant='contained'>アカウントを作成</Button>
              <Stack direction="row">
                <Typography>すでにアカウントをお持ちの方は</Typography>
                <Link>ログイン</Link>
              </Stack>
            </Box>
          </Box>
  )
}
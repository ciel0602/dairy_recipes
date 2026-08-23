'use client'
import { Box, IconButton, InputAdornment, Stack, TextField,} from "@mui/material";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";
import validationRules from "../util/SignupValidationRules";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { useSnackbarState } from "@/app/hooks/useSnackbarState";
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';


export default function SignupForm(){
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [,setSnackbar] = useSnackbarState();
  const [showPassword, setShowPassword] = useState(false);

  type SigninFormData = {
    name:string;
    email: string;
    password:string;
    confirmPassword:string;
  }

  const { handleSubmit, control } = useForm<SigninFormData>({
      defaultValues: {name:'', email: '', password: '',confirmPassword:'' }
    })

  // パスワードと確認パスワードが一致しているかチェック
    const password = useWatch({control, name:'password'});
    const confirmPassword = useWatch({control, name:'confirmPassword'});

  const onSubmit:SubmitHandler<SigninFormData> =(data) => {
    const SignUp = async(data: SigninFormData) => {
      setIsLoading(true)
      const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/api/v1/auth'
      const headers = {'Content-Type': 'application/json'}
      const confirmSuccessUrl = process.env.NEXT_PUBLIC_FRONT_BASE_URL + '/recipes'

      await axios({
        method:'POST',
        url:url,
        headers:headers,
        data:{ ...data,confirm_success_url:confirmSuccessUrl}
      })
      .then(()=> {
        router.push('/')
        setSnackbar({
          message: '認証メールを送信しました。',
          severity: 'success'
        })
      })
      .catch((e:AxiosError<{error:string}>) => {
        console.log(e.message)
        setSnackbar({
          message: 'エラーが発生しました。',
          severity: 'error'
        })
      })
      setIsLoading(false)
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
                rules={validationRules.name}
                render={({field,fieldState}) => (
                  <TextField 
                  {...field}
                  id="name"
                  error={fieldState.invalid}
                  helperText={fieldState.error?.message}
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
                rules={validationRules.email}
                render={({field, fieldState}) => (
                  <TextField 
                  {...field}
                  id="email"
                  type="email"
                  error={fieldState.invalid}
                  helperText={fieldState.error?.message}
                  fullWidth  
                  placeholder="your@email.com"
                  variant='outlined'
                  />
                )}
                />
            </Box>
            <Box mb={4}>
              <label htmlFor="password">パスワード</label>
              <Controller
                name="password"
                control={control}
                rules={validationRules.password}
                render={({field,fieldState}) => (
                  <TextField 
                  {...field}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  error={fieldState.invalid}
                  helperText={fieldState.error?.message}
                  fullWidth  
                  placeholder="パスワード（8文字以上）"
                  variant='outlined'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton 
                          onClick={()=> setShowPassword((prev)=> !prev)} edge="end">
                            {showPassword ? <VisibilityRoundedIcon/> : <VisibilityOffRoundedIcon/> }
                        </IconButton>
                      </InputAdornment>
                    )
                  }}/>
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
                  type={showPassword ? "text" : "password"}
                  {...field}
                  fullWidth  
                  placeholder="パスワード（8文字以上）"
                  variant='outlined'
                  error = {password !== confirmPassword}
                  helperText={password !== confirmPassword ? 'パスワードが一致しません': ''}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton 
                          onClick={()=> setShowPassword((prev)=> !prev)} edge="end">
                            {showPassword ? <VisibilityRoundedIcon/> : <VisibilityOffRoundedIcon/> }
                        </IconButton>
                      </InputAdornment>
                    )
                  }}/>
                )}
                />
            </Box>
            <Stack direction="row" mb={1.5} sx={{width:'100%',justifyContent:'center',alignItems:'center'}}>
              <LoadingButton loading={isLoading} fullWidth variant='contained' sx={{height:'44px'}} type="submit" disabled={password !== confirmPassword}>アカウントを作成</LoadingButton>
            </Stack>
          </Box>
  )
}
'use client'
import { Box,  Button,  Container,  Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { useState } from 'react'
import LoginForm from './components/LoginForm';
import SigninForm from './components/signupForm';


export default function AuthSegmentedControl(){

  // トグルボタン機能
  type authModeType = 'login' | 'signin'; 
  const [authMode, setAuthMode] = useState<authModeType>('login');

  return(
    <Stack direction="row" sx={{justifyContent:'center',alignItems:'center'}}>
      <Container sx={{width:'480px',backgroundColor:'#ffffff',boxShadow:'0px 5px 10px 0px rgba(0, 0, 0, 0.12)',borderRadius:'24px',px:4,py:6}}>
          {/* ログインフォームタイトル */}
          {authMode === 'login' && 
          <Box mb={4}>
            <Typography component="h1"sx={{fontSize:24,fontWeight:400,color:'#1A1814'}}>おかえりなさい</Typography>
            <Typography component="p" sx={{fontSize:14,fontWeight:400,color:'#9A8F84'}}>大切な人のための料理日記</Typography>
          </Box> 
          }
          {/* サインインフォームタイトル */}
          {authMode === 'signin' && 
          <Box mb={4}>
            <Typography component="h1"sx={{fontSize:24,fontWeight:400,color:'#1A1814'}}>始めましょう</Typography>
            <Typography component="p" sx={{fontSize:14,fontWeight:400,color:'#9A8F84'}}>今日から料理日記をつけてみませんか</Typography>
          </Box>
          }
          {/* トグルボタン */}
          <ToggleButtonGroup
          value={authMode}
            exclusive
            fullWidth
            
            sx={{backgroundColor:'#eee9e6',
                borderRadius:'12px',
                padding:'4px',
                border:'none',
                marginBottom:'24px',
                '& .MuiToggleButtonGroup-grouped':{
                  border:'none',
                  borderRadius:'8px',
                }
            }}>
            <ToggleButton value="login" onClick={() => setAuthMode('login')}
              sx={{py:1.2,
                  fontSize:'15px',
                  fontWeight:'bold',
                  color:'#757575',
                  textTransform:'none',
                  '&.Mui-selected':{
                    backgroundColor:'#ffffff',
                    color:'#1a1a1a',
                    boxShadow:'0 2px 6px rgba(0,0,0,0.08)',
                    '&:hover': {
                      backgroundColor:'#ffffff'}}
              }}>ログイン</ToggleButton>
            <ToggleButton value="signin" onClick={() => setAuthMode('signin')}
              sx={{py:1.2,
                  fontSize:'15px',
                  fontWeight:'bold',
                  color:'#757575',
                  textTransform:'none',
                  '&.Mui-selected':{
                    backgroundColor:'#ffffff',
                    color:'#1a1a1a',
                    boxShadow:'0 2px 6px rgba(0,0,0,0.08)',
                    '&:hover': {
                      backgroundColor:'#ffffff'}}
              }}>サインアップ</ToggleButton>
          </ToggleButtonGroup>

          {/* ログインフォーム */}
          {authMode === 'login' && (
            <>
            <LoginForm/>
            <Stack direction="row" sx={{justifyContent:"center",alignItems:"center"}}>
                <Typography>アカウントをお持ちでない方は</Typography>
                <Button onClick={() => setAuthMode('signin')} 
                sx={{
                  color: '#d35400', 
                  fontSize: '14px',
                  fontWeight: 'bold',
                  height:'24px',
                  p: 0, 
                  ml: 0.3, 
                  minWidth: 'auto',
                  textTransform: 'none', 
                  '&:hover': {
                    backgroundColor: 'transparent', 
                    textDecoration: 'underline', 
                  },
        }}>新規登録</Button>
              </Stack>
            </>)
          }
          
          {/* サインアップフォーム */}
          {authMode === 'signin' && (
            <>              
              <SigninForm/>
              <Stack direction="row"sx={{justifyContent:"center",alignItems:"center"}}>
                <Typography>すでにアカウントをお持ちの方は</Typography>
                <Button onClick={()=> setAuthMode('login')}
                  sx={{
                  color: '#d35400', 
                  fontSize: '14px',
                  fontWeight: 'bold',
                  height:'24px',
                  p: 0, 
                  ml: 0.3, 
                  minWidth: 'auto',
                  textTransform: 'none', 
                  '&:hover': {
                    backgroundColor: 'transparent', 
                    textDecoration: 'underline', 
                  },
        }}>ログイン</Button>
              </Stack>
            </>)
          }
        </Container>
    </Stack>
  )
}
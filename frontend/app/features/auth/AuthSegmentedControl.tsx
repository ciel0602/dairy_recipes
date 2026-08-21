'use client'
import { Box,  Container, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { useState } from 'react'
import LoginForm from './components/LoginForm';
import SigninForm from './components/signinForm';


export default function AuthSegmentedControl(){

  // トグルボタン機能
  type authModeType = 'login' | 'signin'; 
  const [authMode, setAuthMode] = useState<authModeType>('login');

  return(
    <Container>
          {/* ログインフォームタイトル */}
          {authMode === 'login' && 
          <Box>
            <Typography component="h1">おかえりなさい</Typography>
            <Typography component="p">大切な人のための料理日記</Typography>
          </Box> 
          }
          {/* サインインフォームタイトル */}
          {authMode === 'signin' && 
          <Box>
            <Typography component="h1">始めましょう</Typography>
            <Typography component="p">今日から料理日記をつけてみませんか</Typography>
          </Box>
          }
          {/* トグルボタン */}
          <ToggleButtonGroup
          value={authMode}
            exclusive
            fullWidth>
            <ToggleButton value="login" onClick={() => setAuthMode('login')}>ログイン</ToggleButton>
            <ToggleButton value="signin" onClick={() => setAuthMode('signin')}>サインイン</ToggleButton>
          </ToggleButtonGroup>

          {/* ログインフォーム */}
          {authMode === 'login' && <LoginForm/>
          }
          
          {/* サインインフォーム */}
          {authMode === 'signin' && <SigninForm/>
          }
        </Container>
  )
}
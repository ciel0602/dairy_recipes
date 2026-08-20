import { Box, Button, Container, Link, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { useState } from 'react'
import { Controller } from 'react-hook-form'

export default function AuthSegmentedControl(){

  type authModeType = 'login' | 'signin'
  const [authMode, setAuthMode] = useState<authModeType>('login');
const toggleAuthMode = () => {
  setAuthMode((prev) => (prev === 'login'? 'signin' : 'login'));
  console.log('now is ' + authMode);
}

  return(
    <Container>
          {/* ログインフォーム */}
          {authMode === 'login' && 
          <Box>
            <Typography component="h1">おかえりなさい</Typography>
            <Typography component="p">大切な人のための料理日記</Typography>
          </Box> 
          }
          
          {authMode === 'signin' && 
          <Box>
            <Typography component="h1">始めましょう</Typography>
            <Typography component="p">今日から料理日記をつけてみませんか</Typography>
          </Box>
          }
          
          <ToggleButtonGroup
          value={authMode}
            exclusive
            onChange={toggleAuthMode}
            fullWidth>
            <ToggleButton value="login">ログイン</ToggleButton>
            <ToggleButton value="signin">サインイン</ToggleButton>
          </ToggleButtonGroup>
          {authMode === 'login' &&  
          <Box component="form">
            <Box>
              <TextField variant='outlined'/>
            </Box>
            <Box>
              <TextField variant='outlined'/>
            </Box>
            <Link>パスワードをお忘れですか？</Link>
            <Box>
              <Button variant='contained'>ログイン</Button>
              <Stack direction="row">
                <Typography>アカウントをお持ちでない方は</Typography>
                <Link>新規登録</Link>
              </Stack>
            </Box>
          </Box> 
          }
          
          {/* サインインフォーム */}
          {authMode === 'signin' && 
          <Box component="form">
            <Box>
              <TextField variant='outlined'/>
            </Box>
            <Box>
              <TextField variant='outlined'/>
            </Box>
            <Box>
              <TextField variant='outlined'/>
            </Box>
            <Box>
              <TextField variant='outlined'/>
            </Box>
            <Box>
              <Button variant='contained'>アカウントを作成</Button>
              <Stack direction="row">
                <Typography>すでにアカウントをお持ちの方は</Typography>
                <Link>ログイン</Link>
              </Stack>
            </Box>
          </Box>
          }
        </Container>
  )
}
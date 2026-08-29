import { AppBar, Box, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';


export default function Menubar(){
  const menubarItems = [
    {
      title:"ホーム",
      selectedIcon:<HomeIcon/>,
      unselectedIcon:<HomeOutlinedIcon/>
    },
    {
      title:"レシピ一覧",
      selectedIcon:<RestaurantIcon/>,
      unselectedIcon:<RestaurantOutlinedIcon/>
    },
    {
      title:"追加",
      selectedIcon:<AddCircleRoundedIcon/>,
      unselectedIcon:<AddCircleRoundedIcon color="primary"/>
    },
    {
      title:"カレンダー",
      selectedIcon:<CalendarMonthIcon/>,
      unselectedIcon:<CalendarMonthOutlinedIcon/>
    },
    {
      title:"アカウント",
      selectedIcon:<PersonRoundedIcon/>,
      unselectedIcon:<PersonOutlineRoundedIcon/>
    },
  ]
  return(
    <Box>
      <AppBar position="fixed" sx={{top:"auto",bottom:0,pb:3, backgroundColor:"#FFFFFF",boxShadow:"none"}}>
        <Toolbar sx={{justifyContent:"space-between",width:"100%",maxWidth:"960px",margin:"0 auto"}}>

            {menubarItems.map((menubarItem,index) => (
            <Stack direction="column" key={index} sx={{width:64,justifyContent:"center",alignItems:"center"}}>
              <IconButton sx={{color:"#B5A898",pb:0}}>
                {menubarItem.unselectedIcon}
              </IconButton>
              <Typography sx={{color:"#B5A898",fontSize:12}}>{menubarItem.title}</Typography>
            </Stack>
          ))}
        </Toolbar>
      </AppBar>
    </Box>
    )
}
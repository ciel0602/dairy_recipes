'use client'
import { Box, Tab, Tabs, } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import { useState } from "react";


export default function Menubar(){
  const menubarItems = [
    {
      title:"ホーム",
      Icon:<HomeIcon/>,
      outlinedIcon:<HomeOutlinedIcon/>
    },
    {
      title:"レシピ一覧",
      Icon:<RestaurantIcon/>,
      outlinedIcon:<RestaurantOutlinedIcon/>
    },
    {
      title:"追加",
      Icon:<AddCircleRoundedIcon color="primary"/>,
    },
    {
      title:"カレンダー",
      Icon:<CalendarMonthIcon/>,
      outlinedIcon:<CalendarMonthOutlinedIcon/>
    },
    {
      title:"アカウント",
      Icon:<PersonRoundedIcon/>,
      outlinedIcon:<PersonOutlineRoundedIcon/>
    },
  ]
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return(
    <Box sx={{position:"fixed",top:"auto",bottom:0,pb:3, backgroundColor:"#FFFFFF",width:"100%"}}>
      <Tabs centered value={value} onChange={handleChange} aria-label="icon label tabs example" sx={{
    '& .MuiTab-root': {
      minWidth: 120,
    },
  }}>
        {menubarItems.map((menubarItem,index) => (
          <Tab key={index} icon={menubarItem.Icon} label={menubarItem.title}/>
        ))}
      </Tabs>
    </Box>
    )
}
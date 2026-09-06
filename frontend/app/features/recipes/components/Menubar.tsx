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
import { usePathname, useRouter } from "next/navigation";


export default function Menubar(){
  const menubarItems = [
    {
      title:"ホーム",
      path:"/recipes",
      Icon:<HomeIcon/>,
      outlinedIcon:<HomeOutlinedIcon/>
    },
    {
      title:"レシピ一覧",
      path:"/recipes/index",
      Icon:<RestaurantIcon/>,
      outlinedIcon:<RestaurantOutlinedIcon/>
    },
    {
      title:"追加",
      path:"/recipes/new",
      Icon:<AddCircleRoundedIcon color="primary"/>,
    },
    {
      title:"カレンダー",
      path:"/recipes/calender",
      Icon:<CalendarMonthIcon/>,
      outlinedIcon:<CalendarMonthOutlinedIcon/>
    },
    {
      title:"アカウント",
      path:"/recipes/account",
      Icon:<PersonRoundedIcon/>,
      outlinedIcon:<PersonOutlineRoundedIcon/>
    },
  ]
  const router = useRouter();
  const pathname  = usePathname();

  const currentIndex = menubarItems.findIndex( (item) => 
    item.path === pathname
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    const url = menubarItems[newValue].path;
    if(url) {
      router.push(url)
    }
  };
  return(
    <Box sx={{position:"fixed",top:"auto",bottom:0,pb:3, backgroundColor:"#FFFFFF",width:"100%"}}>
      <Tabs centered value={currentIndex === -1 ? 0 :currentIndex} onChange={handleChange} aria-label="icon label tabs example" sx={{
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
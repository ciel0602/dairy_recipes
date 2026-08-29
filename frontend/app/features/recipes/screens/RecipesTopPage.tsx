'use client'
import { Box, Typography } from "@mui/material";
import RecipesIndex from "./RecipesIndex";
import Menubar from "../components/Menubar";

export default function RecipesTopPage() {

  return(
    <>
    <Box>
      <Typography sx={{color:"#9A8F84",fontSize:14}}>今日も、大切な人のために。</Typography>
      <Typography component="h1">
        <span style={{fontSize:36,color:"#1A1814"}}>おかえり、</span>
        <br />
        <span style={{fontSize:36,color:"#C4622D"}}>料理日記</span>
      </Typography>
      <RecipesIndex/>
    </Box>
    <Menubar/>
    </>
  )
}
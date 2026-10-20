"use client"
import { TagType } from "@/app/types/RecipeType";
import { Box, Chip, ListItem, Stack, Typography } from "@mui/material";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { useState } from "react";

type tagsProps = {
  tags:TagType[]
  selectedTagIds:number[];
  onChange:(tagIds:number[]) => void;
}
export default function TagSelector({tags,selectedTagIds,onChange}:tagsProps){

  const [expand,setExpand] = useState(false);

  const handleClick = (tagId:number) =>{
    if(selectedTagIds.includes(tagId)){
      onChange(selectedTagIds.filter((id) => id !== tagId))
    }else{
      onChange([...selectedTagIds,tagId])
    }
  }

  return(
    <Box sx={{mb:1}}>
      <Stack direction="row" component="ul">
        <Typography sx={{whiteSpace:"nowrap",mt:0.5}}>タグ：</Typography>
        <Stack direction="row" sx={{justifyContent:"flex-start",alignContent:"flex-start",display: "flex",flexWrap: "wrap",overflow: "hidden",
        maxHeight: expand ? "none" : "32px",}}>
        {tags.map((tag)=> {
          const selected = selectedTagIds.includes(tag.id)
          return(
          <ListItem key={tag.id} sx={{px:0.3,py:0,width:"fit-content",maxWidth:"150px",mb:0.5}}>
            <Chip 
              label={tag.name} 
              clickable 
              onClick={() => handleClick(tag.id)} 
              icon={selected ? <CheckRoundedIcon/> : undefined }
              color={selected ? "primary" : undefined}/>
          </ListItem>
        );
        })}
        </Stack>
        {tags.length > 0 && (
          <Chip
          label={expand ? "閉じる" : "•••"}
          clickable
          onClick={() => setExpand((prev) => !prev)}/>
        )}
      </Stack>
    </Box>
  )
}
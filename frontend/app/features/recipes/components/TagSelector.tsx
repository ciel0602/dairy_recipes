"use client"
import { TagType } from "@/app/types/RecipeType";
import { Box, Chip, ListItem, Stack } from "@mui/material";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

type tagsProps = {
  tags:TagType[]
  selectedTagIds:number[];
  onChange:(tagIds:number[]) => void;
}
export default function TagSelector({tags,selectedTagIds,onChange}:tagsProps){

  const handleClick = (tagId:number) =>{
    if(selectedTagIds.includes(tagId)){
      onChange(selectedTagIds.filter((id) => id !== tagId))
    }else{
      onChange([...selectedTagIds,tagId])
    }
  }

  return(
    <Box>
      <Stack direction="row" spacing={1} component="ul">
        {tags.map((tag)=> {
          const selected = selectedTagIds.includes(tag.id)
          return(
          <ListItem key={tag.id}>
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
    </Box>
  )
}
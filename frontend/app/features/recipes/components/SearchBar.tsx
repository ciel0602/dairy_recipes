'use client'
import { LoadingButton } from "@mui/lab";
import { InputAdornment, Stack, TextField } from "@mui/material";
import { useState } from "react";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

type searchProps = {
  search:string;
  setSearch:React.Dispatch<React.SetStateAction<string>>;
  isLoading:boolean;
}

export default function SearchBar({search,setSearch,isLoading}:searchProps) {
  const [keyword, setKeyword] = useState("");
  
  const handleSubmit = (e:React.SubmitEvent) => {
    e.preventDefault();
    setSearch(keyword.trim());
  }
  return(
    <Stack 
      direction="row" 
      component="form" 
      onSubmit={handleSubmit}
      sx={{justifyContent:"center",
        alignItems:"center",
        gap:2,
        mb:2
      }}>
      <TextField 
        type="text"
        fullWidth
        placeholder="キーワードで検索..."
        defaultValue={search ?? ''}
        onChange={(event) => setKeyword(event.target.value.trim())}
        sx={{backgroundColor:"common.white",
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            height:"40px"
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon color="primary"/>
            </InputAdornment>
          )
        }}/>
      <LoadingButton 
      variant="contained" 
      type="submit" 
      loading={isLoading}
      sx={{height:"38px"}}>
        検索
      </LoadingButton>
    </Stack>
  )
}
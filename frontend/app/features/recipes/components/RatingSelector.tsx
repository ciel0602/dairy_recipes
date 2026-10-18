import { Chip, Stack, Typography } from "@mui/material";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { RatingType } from "@/app/types/RecipeType";


type RatingSelectorProps = {
  selectedRatings: RatingType[];
  setSelectedRatings:(ratings :RatingType[]) => void;
}
export default function RatingSelector({selectedRatings,setSelectedRatings}:RatingSelectorProps) {
  const ratings:RatingType[] =[1,2,3,4,5]  ;

  const handleClick = (rating:RatingType) =>{
    if(selectedRatings.includes(rating)){
      setSelectedRatings(selectedRatings.filter((id) => id !== rating))
    }else{
      setSelectedRatings([...selectedRatings,rating])
    }
  }


  return(
    <Stack direction="row"sx={{justifyContent:"flex-start",alignItems:"center",gap:1,mb:1}}>
      <Typography>評価：</Typography>
      <Stack direction="row"sx={{justifyContent:"flex-start",alignItems:"center",gap:1}}>
        {ratings.map((rating) => {
          const selected = selectedRatings.includes(rating)
          return(
              <Chip
                key={rating}
                clickable
                label={`星${rating}`}
                onClick={() => handleClick(rating)}
                icon={selected ? <CheckRoundedIcon/> : undefined }
                color={selected ? "primary" : undefined}/>
          )
        })}
      </Stack>
    </Stack>
  )
}
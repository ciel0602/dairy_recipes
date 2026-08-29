import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import { Stack } from '@mui/material';

type RatingStarProps = {
  rating: 1 | 2 | 3 | 4 | 5;
};

export default function RatingStar({rating}: RatingStarProps){
  return(
    <Stack direction="row" sx={{justifyContent:"flex-start",alignItems:"center"}}>
      {Array.from({length:rating}).map((_, index) => (
        <StarRateRoundedIcon key={`filled-${index}`} sx={{width:"15px",color:"#C4622D"}}/>
      ))}
      {Array.from({length:5 - rating}).map((_, index) => (
        <StarOutlineRoundedIcon key={`empty-${index}`} sx={{width:"15px",color:"#C4622D"}}/>
      ))}
    </Stack>
  )
}
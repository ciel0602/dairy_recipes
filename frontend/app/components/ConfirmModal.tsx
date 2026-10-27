import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import Image from "next/image";

type ConfirmModalProps = {
  open:boolean;
  iconSrc:string;
  title:string;
  message:string;
  primaryActionLabel:string;
  primaryAction: () => void;
  secondaryActionLabel:string;
  secondaryAction:() => void;
}

export default function ConfirmModal({open,iconSrc,title,message,primaryActionLabel,primaryAction,secondaryActionLabel,secondaryAction}:ConfirmModalProps){
  return (
    <Modal open={open}>
      <Box>
        <Image src={iconSrc} alt={`${title}のアイコン`} />
        <Box>
          <Typography>{title}</Typography>
          <Typography>{message}</Typography>
        </Box>
        <Stack direction="row" sx={{justifyContent:"center",alignItems:"center",gap:1}}>
          <Button onClick={secondaryAction}>{secondaryActionLabel}</Button>
          <Button onClick={primaryAction}>{primaryActionLabel}</Button>
        </Stack>
      </Box>
    </Modal>
  )
}
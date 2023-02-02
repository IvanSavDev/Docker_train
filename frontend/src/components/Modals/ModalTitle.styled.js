import { styled } from '@mui/material/styles';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  padding: 0,
  textAlign: 'center',
  fontWeight: 700,
  fontSize: '28px',
  lineHeight: '1em',
  color: theme.palette.custom.main.grey,
}));

export const StyledIconButton = styled(IconButton)(() => ({
  position: 'absolute',
  right: -35,
  top: -7,
}));

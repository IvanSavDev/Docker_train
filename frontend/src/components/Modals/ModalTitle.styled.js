import { styled } from '@mui/material/styles';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  fontFamily: 'InterBold',
  fontWeight: 700,
  fontSize: '28px',
  lineHeight: '1em',
  textAlign: 'center',
  padding: 0,
  color: theme.palette.custom.main.grey,
}));

export const StyledIconButton = styled(IconButton)(() => ({
  position: 'absolute',
  right: -35,
  top: -7,
}));

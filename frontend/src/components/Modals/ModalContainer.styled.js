import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    width: '100%',
    padding: '64px 40px 64px 40px',
    marginRight: '38px',
    maxWidth: '426px',
    overflowY: 'visible',
  },
  '& .MuiDialogActions-root': {
    padding: '0px 24px 0 24px',
  },
  '& .MuiTypography-root': {
    padding: '0 24px 24px 24px',
  },
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(28,23,30,0.8)',
  },
  [theme.breakpoints.down('lessSmall')]: {
    '& .MuiPaper-root': {
      padding: '35px 0px 35px 0px',
    },
  },
}));

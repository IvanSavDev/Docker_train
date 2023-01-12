import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    padding: "20px",
    backgroundColor: "#2B3844",
    color: theme.palette.common.white,
    whiteSpace: "nowrap",
    fontSize: "14px",
    lineHeight: "1em",
  },
  "&": {
    padding: "20px",
    border: 0,
    color: "rgba(43,56,68,0.7)",
    fontSize: 13,
    lineHeight: "14px",
  },
}));

import React from "react";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableButton from "../Buttons/TableButton";
import SellProduct from "../Modals/SellProduct";
import EditProduct from "../Modals/EditProduct";
import DeleteButton from "../Buttons/DeleteButton";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { ReactComponent as Edit } from "../../assets/img/edit.svg";
import Table from "@mui/material/Table";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#2B3844",
    color: theme.palette.common.white,
  },
  "&": {
    border: 0,
    color: "rgba(43,56,68,0.7)",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#F8F8F8",
    border: "0",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const tableHeaders = [
  "Product name",
  "Store",
  "Address",
  "Category",
  "Creation date",
  "Price",
  "Remains",
  "Weight / Volume",
  "Actions",
];

const fields = [
  "productName",
  "store",
  "address",
  "category",
  "creationDate",
  "price",
  "remains",
  "weight",
];

const TableTemplate = ({ items, deleteItem }) => {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden", boxShadow: "none" }}>
      <TableContainer sx={{ maxHeight: "675px" }}>
        <Table stickyHeader aria-label="customized table">
          <TableHead>
            <TableRow>
              {tableHeaders.map((headerName) => (
                <StyledTableCell key={headerName} align="center">
                  {headerName}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(items).map((item) => {
              return (
                <StyledTableRow key={item.store + Math.random()}>
                  {fields.map((field) => (
                    <StyledTableCell key={field + Math.random()} align="center">
                      {item[field]}
                    </StyledTableCell>
                  ))}
                  <StyledTableCell
                    align="center"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    <TableButton
                      id={item.id}
                      render={(open, closeModal, id) => (
                        <SellProduct
                          open={open}
                          closeModal={closeModal}
                          id={id}
                        />
                      )}
                    >
                      Sell
                    </TableButton>
                    <TableButton
                      id={item.id}
                      render={(open, closeModal, id) => (
                        <EditProduct
                          open={open}
                          closeModal={closeModal}
                          id={id}
                        />
                      )}
                    >
                      <Edit />
                    </TableButton>
                    <DeleteButton onClick={() => deleteItem(item.id)} />
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TableTemplate;

import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getDataFromLocalStorage } from "../../utils/localStorage";

import styles from "./MyProduct.module.css";
import CreateProduct from "../../components/Modals/CreateProduct";
import { ReactComponent as Edit } from "../../assets/img/edit.svg";

import { Modal } from "@mui/material";
import TableButton from "../../components/Buttons/TableButton";
import DeleteButton from "../../components/Buttons/DeleteButton";
import useProducts from "../../hooks/useProducts";
import useAccount from "../../hooks/useAccount";
import { isEmptyObject } from "../../utils/utils";
import EditProduct from "../../components/Modals/EditProduct";
import SellProduct from "../../components/Modals/SellProduct";

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

const StyledTableContainer = styled(TableContainer)(() => ({
  "&": {
    boxShadow: "none !important",
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

const MyProduct = () => {
  const [open, setOpen] = useState(false);
  const { products, deleteProduct } = useProducts();

  const handleClickOpenAddModal = () => setOpen(true);
  const handleCloseAddModal = () => setOpen(false);

  // useEffect(() => {
  //   if (!isEmptyObject(products)) {
  //     updateProducts();
  //   }
  // }, []);

  return (
    <>
      <Header
        title="My product"
        description="Product table"
        addProductPage={true}
        handleClick={handleClickOpenAddModal}
      />
      <div className={styles.container}>
        {products ? (
          <StyledTableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="customized table">
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
                {Object.values(products).map((product) => {
                  console.log(product);
                  return (
                    <StyledTableRow key={product.store + Math.random()}>
                      {fields.map((field) => (
                        <StyledTableCell
                          key={field + Math.random()}
                          align="center"
                        >
                          {product[field]}
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
                          id={product.id}
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
                          id={product.id}
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
                        <DeleteButton
                          onClick={() => deleteProduct(product.id)}
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </StyledTableContainer>
        ) : (
          <p>тута пусто</p>
        )}
      </div>
      <Modal open={open}>
        <div>
          <CreateProduct open={open} closeModal={handleCloseAddModal} />
        </div>
      </Modal>
    </>
  );
};

export default MyProduct;

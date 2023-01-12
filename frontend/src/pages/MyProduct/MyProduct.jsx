import React from "react";
import TableBody from "@mui/material/TableBody";

import useProducts from "../../hooks/useProducts";
import Header from "../../components/Header/Header";
import TableTemplate from "../../components/Table/TableTemplate";
import EmptyTable from "../../components/Table/EmptyTable";
import TableHeader from "../../components/Table/TableHeader";
import TableButton from "../../components/Buttons/TableButton";
import SellProduct from "../../components/Modals/SellProduct";
import EditProduct from "../../components/Modals/EditProduct";
import DeleteButton from "../../components/Buttons/DeleteButton";
import { StyledTableCell } from "../../components/Table/StyledTableCell";
import { ReactComponent as Edit } from "../../assets/img/edit.svg";
import { StyledTableRow } from "../../components/Table/StyledTableRow";
import {
  formatNumberWithSymbol,
  getFormatDate,
  isEmptyObject,
} from "../../utils/utils";

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

const MyProduct = () => {
  const { products, deleteProduct } = useProducts();

  const isExistProducts = products ? !isEmptyObject(products) : false;

  return (
    <>
      <Header
        title="My product"
        description="Product table"
        addProductPage={true}
      />
      {isExistProducts ? (
        <TableTemplate>
          <TableHeader headers={tableHeaders} />
          <TableBody>
            {Object.values(products).map((product) => (
              <StyledTableRow key={product.store + Math.random()}>
                <StyledTableCell align="center">
                  {product.productName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {product.store}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {product.address || "-"}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {product.category}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {getFormatDate(product.creationDate)}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{
                    whiteSpace: "nowrap",
                  }}
                >
                  {`$${formatNumberWithSymbol(product.price)}`}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {product.remains}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {`${product.weight}kg`}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "8px",
                    "&": {
                      padding: "13px 16px 13px 16px",
                    },
                  }}
                >
                  <TableButton
                    productId={product.id}
                    render={(open, closeModal, productId) => (
                      <SellProduct
                        open={open}
                        closeModal={closeModal}
                        productId={productId}
                      />
                    )}
                  >
                    Sell
                  </TableButton>
                  <TableButton
                    productId={product.id}
                    render={(open, closeModal, productId) => (
                      <EditProduct
                        open={open}
                        closeModal={closeModal}
                        productId={productId}
                      />
                    )}
                  >
                    <Edit />
                  </TableButton>
                  <DeleteButton handleClick={() => deleteProduct(product.id)} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </TableTemplate>
      ) : (
        <EmptyTable>The table is empty, you need to add a product</EmptyTable>
      )}
    </>
  );
};

export default MyProduct;

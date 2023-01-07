import React, { useState } from "react";
import { Modal } from "@mui/material";

import useProducts from "../../hooks/useProducts";
import Header from "../../components/Header/Header";
import TableTemplate from "../../components/Table/TableTemplate";
import CreateProduct from "../../components/Modals/CreateProduct";
import EmptyTable from "../../components/Table/EmptyTable";
import { isEmptyObject } from "../../utils/utils";

const MyProduct = () => {
  const [open, setOpen] = useState(false);
  const { products, deleteProduct } = useProducts();

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const isExistProducts = products ? !isEmptyObject(products) : false;

  return (
    <>
      <Header
        title="My product"
        description="Product table"
        addProductPage={true}
        handleClick={openModal}
      />
      {isExistProducts ? (
        <TableTemplate items={products} deleteItem={deleteProduct} />
      ) : (
        <EmptyTable>Таблица пустая, добавьте товар</EmptyTable>
      )}
      <Modal open={open}>
        <div>
          <CreateProduct open={open} closeModal={closeModal} />
        </div>
      </Modal>
    </>
  );
};

export default MyProduct;

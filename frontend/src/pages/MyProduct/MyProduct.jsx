import React, { useEffect } from 'react';
import TableBody from '@mui/material/TableBody';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../components/Header/Header';
import TableTemplate from '../../components/Table/TableTemplate';
import EmptyTable from '../../components/Table/EmptyTable';
import TableHeader from '../../components/Table/TableHeader';
import TableButton from '../../components/Buttons/TableButton';
import SellProduct from '../../components/Modals/SellProduct';
import EditProduct from '../../components/Modals/EditProduct';
import DeleteButton from '../../components/Buttons/DeleteButton';
import { StyledTableCell } from '../../components/Table/StyledTableCell';
import { ReactComponent as Edit } from '../../assets/img/edit.svg';
import { StyledTableRow } from '../../components/Table/StyledTableRow';
import {
  formatNumberWithSymbol,
  getFormatDate,
  isEmptyObject,
} from '../../utils/utils';
import { deleteProduct, getProducts } from '../../slices/productsSlice';
import { getUser } from '../../slices/userSlice';

const tableHeaders = [
  'Product name',
  'Store',
  'Address',
  'Category',
  'Creation date',
  'Price',
  'Remains',
  'Weight / Volume',
  'Actions',
];

const MyProduct = () => {
  // const { products, deleteProduct } = useProducts();
  const { products, user } = useSelector((state) => ({
    products: state.products.products,
    user: state.user.user,
  }));
  console.log(products);
  const dispatch = useDispatch();
  console.log(products);
  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts());
    }
    if (isEmptyObject(user)) {
      dispatch(getUser());
    }
  }, []);

  return (
    <>
      <Header title="My product" description="Product table" addProductPage />
      {products.length !== 0 ? (
        <TableTemplate>
          <TableHeader headers={tableHeaders} />
          <TableBody>
            {products.map((product) => (
              <StyledTableRow key={product.id}>
                <StyledTableCell align="center">{product.name}</StyledTableCell>
                <StyledTableCell align="center">
                  {product.store}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {product.address || '-'}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {product.category}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {product.creationDate}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{
                    whiteSpace: 'nowrap',
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
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '8px',
                    '&': {
                      padding: '13px 16px 13px 16px',
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
                  <DeleteButton
                    handleClick={() => dispatch(deleteProduct(product.id))}
                  />
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

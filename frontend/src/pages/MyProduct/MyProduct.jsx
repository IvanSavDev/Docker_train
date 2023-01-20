import React, { useEffect, useState } from 'react';
import TableBody from '@mui/material/TableBody';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';

import Header from '../../components/Header/Header';
import TableTemplate from '../../components/Table/TableTemplate';
import TableHeader from '../../components/Table/TableHeader';
import TableButton from '../../components/Buttons/TableButton';
import SellProduct from '../../components/Modals/SellProduct';
import EditProduct from '../../components/Modals/EditProduct';
import DeleteButton from '../../components/Buttons/DeleteButton';
import { StyledTableCell } from '../../components/Table/StyledTableCell';
import { ReactComponent as Edit } from '../../assets/img/edit.svg';
import { StyledTableRow } from '../../components/Table/StyledTableRow';
import { formatNumberWithSymbol, isEmptyObject } from '../../utils/utils';
import { deleteProduct, getProducts } from '../../slices/productsSlice';
import { getUser } from '../../slices/userSlice';
import { FetchErrors, Statuses } from '../../consts/consts';
import CenteringContainer from '../../components/Containers/CenteringContainer';

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
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user);
  const [fetch, setFetch] = useState(false);
  console.log(products, user);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (products.length === 0) {
          setFetch(true);
          await dispatch(getProducts()).unwrap();
        }
        if (isEmptyObject(user)) {
          await dispatch(getUser()).unwrap();
        }
      } catch (error) {
        if (error.status === 401) {
          toast.error(FetchErrors.AUTHORIZATION);
        } else if (error.status === 404) {
          toast.error(FetchErrors.LOAD_DATA);
        } else {
          toast.error(FetchErrors.UNEXPECTED);
        }
      }
      setFetch(false);
    };
    fetchData();
  }, []);
  console.log('my prod');
  return (
    <>
      <Header title="My product" description="Product table" addProductPage />
      {fetch && (
        <CenteringContainer>
          <CircularProgress />
        </CenteringContainer>
      )}
      {!fetch && products.length === 0 && (
        <CenteringContainer>
          The table is empty, you need to add a product
        </CenteringContainer>
      )}
      {!fetch && products.length !== 0 && (
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
                    type="sellProduct"
                    // render={(open, closeModal, productId) => (
                    //   <SellProduct
                    //     productId={productId}
                    //     open={open}
                    //     closeModal={closeModal}
                    //   />
                    // )}
                  >
                    Sell
                  </TableButton>
                  <TableButton
                    productId={product.id}
                    type="editProduct"
                    // render={(open, closeModal, productId) => (
                    //   <EditProduct
                    //     productId={productId}
                    //     open={open}
                    //     closeModal={closeModal}
                    //   />
                    // )}
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
      )}
    </>
  );
};

export default MyProduct;

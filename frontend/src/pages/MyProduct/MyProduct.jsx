import React, { useEffect } from 'react';
import TableBody from '@mui/material/TableBody';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';

import CenteringContainer from '../../components/Containers/CenteringContainer';
import Header from '../../components/Header/Header';
import TableTemplate from '../../components/Table/TableTemplate';
import TableHeader from '../../components/Table/TableHeader';
import TableButton from '../../components/Buttons/TableButton';
import DeleteButton from '../../components/Buttons/DeleteButton';

import { formatNumberWithSymbol, isEmptyObject } from '../../utils/utils';
import { notifyPageErrors } from '../../utils/notifyErrors';
import { ModalsTypes, Statuses } from '../../consts/consts';
import { getProducts } from '../../store/slices/productsSlice';
import { getUser } from '../../store/slices/userSlice';
import { getSales } from '../../store/slices/salesSlice';

import { TableCellStyled } from '../../components/Table/TableCell.styled';
import { TableRowStyled } from '../../components/Table/TableRow.styled';

import { ReactComponent as Edit } from '../../assets/img/edit.svg';

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
  const { products, status } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user);
  const { sales } = useSelector((state) => state.sales);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!products) {
          await dispatch(getProducts()).unwrap();
        }
      } catch (error) {
        notifyPageErrors(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isEmptyObject(user)) {
          await dispatch(getUser()).unwrap();
        }
      } catch (error) {
        notifyPageErrors(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!sales) {
          await dispatch(getSales()).unwrap();
        }
      } catch (error) {
        notifyPageErrors(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header title="My product" description="Product table" addProductPage />
      {status === Statuses.PENDING && !products && (
        <CenteringContainer>
          <CircularProgress />
        </CenteringContainer>
      )}
      {status !== Statuses.PENDING && products?.length === 0 && (
        <CenteringContainer>
          The table is empty, you need to add a product
        </CenteringContainer>
      )}
      {products && products.length !== 0 && (
        <TableTemplate>
          <TableHeader headers={tableHeaders} />
          <TableBody>
            {products.map((product) => (
              <TableRowStyled key={product.id}>
                <TableCellStyled align="center">{product.name}</TableCellStyled>
                <TableCellStyled align="center">
                  {product.store}
                </TableCellStyled>
                <TableCellStyled align="center">
                  {product.address || '-'}
                </TableCellStyled>
                <TableCellStyled align="center">
                  {product.category}
                </TableCellStyled>
                <TableCellStyled align="center">
                  {product.creationDate}
                </TableCellStyled>
                <TableCellStyled
                  align="center"
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  {`$${formatNumberWithSymbol(product.price)}`}
                </TableCellStyled>
                <TableCellStyled align="center">
                  {formatNumberWithSymbol(product.remains)}
                </TableCellStyled>
                <TableCellStyled align="center">
                  {`${formatNumberWithSymbol(product.weight)}kg`}
                </TableCellStyled>
                <TableCellStyled
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
                    type={ModalsTypes.SELL_PRODUCT}
                  >
                    Sell
                  </TableButton>
                  <TableButton
                    productId={product.id}
                    type={ModalsTypes.EDIT_PRODUCT}
                  >
                    <Edit />
                  </TableButton>
                  <DeleteButton id={product.id} />
                </TableCellStyled>
              </TableRowStyled>
            ))}
          </TableBody>
        </TableTemplate>
      )}
    </>
  );
};

export default MyProduct;

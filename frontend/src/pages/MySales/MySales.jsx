import React, { useEffect } from 'react';
import TableBody from '@mui/material/TableBody';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';

import CenteringContainer from '../../components/Containers/CenteringContainer';
import Header from '../../components/Header/Header';
import TableTemplate from '../../components/Table/TableTemplate';
import TableHeader from '../../components/Table/TableHeader';

import {
  formatNumberWithSymbol,
  generateId,
  isEmptyObject,
  sortByDate,
} from '../../utils/utils';
import { notifyPageErrors } from '../../utils/notifyErrors';
import { Statuses } from '../../consts/consts';
import { getSales } from '../../store/slices/salesSlice';
import { getUser } from '../../store/slices/userSlice';

import { TableRowStyled } from '../../components/Table/TableRow.styled';
import { TableCellStyled } from '../../components/Table/TableCell.styled';

const tableHeaders = [
  'Product name',
  'Store',
  'Address',
  'Category',
  'Creation date',
  'Price',
  'Sold items',
  'Weight / Volume',
  'Last sale',
];

const MySales = () => {
  const { sales, status } = useSelector((state) => state.sales);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

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

  return (
    <>
      <Header title="My sales" description="Sales table" />
      {status === Statuses.PENDING && (
        <CenteringContainer>
          <CircularProgress />
        </CenteringContainer>
      )}
      {status !== Statuses.PENDING && sales?.length === 0 && (
        <CenteringContainer>
          The table is empty, you need to sell goods
        </CenteringContainer>
      )}
      {status === Statuses.FULFILLED && sales && sales.length > 0 && (
        <TableTemplate>
          <TableHeader headers={tableHeaders} />
          <TableBody>
            {sortByDate(sales, 'lastSale').map((sale) => (
              <TableRowStyled key={generateId()}>
                <TableCellStyled align="center">{sale.name}</TableCellStyled>
                <TableCellStyled align="center">{sale.store}</TableCellStyled>
                <TableCellStyled align="center">
                  {sale.address || '-'}
                </TableCellStyled>
                <TableCellStyled align="center">
                  {sale.category}
                </TableCellStyled>
                <TableCellStyled align="center">
                  {sale.creationDate}
                </TableCellStyled>
                <TableCellStyled
                  align="center"
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  {`$${formatNumberWithSymbol(sale.price)}`}
                </TableCellStyled>
                <TableCellStyled align="center">
                  {sale.soldItems}
                </TableCellStyled>
                <TableCellStyled align="center">
                  {`${sale.weight}kg`}
                </TableCellStyled>
                <TableCellStyled align="center">
                  {sale.lastSale}
                </TableCellStyled>
              </TableRowStyled>
            ))}
          </TableBody>
        </TableTemplate>
      )}
    </>
  );
};

export default MySales;

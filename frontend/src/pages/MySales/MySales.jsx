import React, { useEffect } from 'react';
import TableBody from '@mui/material/TableBody';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';

import CenteringContainer from '../../components/Containers/CenteringContainer';
import Header from '../../components/Header/Header';
import TableTemplate from '../../components/Table/TableTemplate';
import TableHeader from '../../components/Table/TableHeader';
import { StyledTableRow } from '../../components/Table/StyledTableRow';
import { StyledTableCell } from '../../components/Table/StyledTableCell';

import { formatNumberWithSymbol, isEmptyObject } from '../../utils/utils';
import { notifyPageErrors } from '../../utils/notifyErrors';
import { Statuses } from '../../consts/consts';
import { getSales } from '../../store/slices/salesSlice';
import { getUser } from '../../store/slices/userSlice';

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
            {sales.map((sale) => (
              <StyledTableRow key={sale.store + Math.random()}>
                <StyledTableCell align="center">{sale.name}</StyledTableCell>
                <StyledTableCell align="center">{sale.store}</StyledTableCell>
                <StyledTableCell align="center">
                  {sale.address || '-'}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {sale.category}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {sale.creationDate}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  {`$${formatNumberWithSymbol(sale.price)}`}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {sale.soldItems}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {`${sale.weight}kg`}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {sale.lastSale}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </TableTemplate>
      )}
    </>
  );
};

export default MySales;

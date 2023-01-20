import React, { useEffect } from 'react';
import TableBody from '@mui/material/TableBody';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';

import Header from '../../components/Header/Header';
import TableTemplate from '../../components/Table/TableTemplate';
import TableHeader from '../../components/Table/TableHeader';
import { StyledTableRow } from '../../components/Table/StyledTableRow';
import { StyledTableCell } from '../../components/Table/StyledTableCell';
import { formatNumberWithSymbol } from '../../utils/utils';
import { getSales } from '../../slices/salesSlice';
import CenteringContainer from '../../components/Containers/CenteringContainer';
import { getProducts } from '../../slices/productsSlice';
import { FetchErrors, Statuses } from '../../consts/consts';

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
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (sales.length === 0) {
          await dispatch(getSales()).unwrap();
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
      {sales.length === 0 && status !== Statuses.PENDING && (
        <CenteringContainer>
          The table is empty, you need to sell goods
        </CenteringContainer>
      )}
      {sales.length !== 0 && status === Statuses.FULFILLED && (
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

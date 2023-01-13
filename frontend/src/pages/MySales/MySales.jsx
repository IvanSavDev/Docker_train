import React from 'react';
import TableBody from '@mui/material/TableBody';

import useSales from '../../hooks/useSales';
import Header from '../../components/Header/Header';
import TableTemplate from '../../components/Table/TableTemplate';
import TableHeader from '../../components/Table/TableHeader';
import { StyledTableRow } from '../../components/Table/StyledTableRow';
import { StyledTableCell } from '../../components/Table/StyledTableCell';
import EmptyTable from '../../components/Table/EmptyTable';
import {
  formatNumberWithSymbol,
  getFormatDate,
  isEmptyObject,
} from '../../utils/utils';

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
  const { sales } = useSales();

  const isExistSales = sales ? !isEmptyObject(sales) : false;

  return (
    <>
      <Header title="My sales" description="Sales table" />
      {isExistSales ? (
        <TableTemplate>
          <TableHeader headers={tableHeaders} />
          <TableBody>
            {Object.values(sales).map((sale) => (
              <StyledTableRow key={sale.store + Math.random()}>
                <StyledTableCell align="center">
                  {sale.productName}
                </StyledTableCell>
                <StyledTableCell align="center">{sale.store}</StyledTableCell>
                <StyledTableCell align="center">
                  {sale.address || '-'}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {sale.category}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {getFormatDate(sale.creationDate)}
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
                  {getFormatDate(sale.dateSale)}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </TableTemplate>
      ) : (
        <EmptyTable>The table is empty, you need to sell goods</EmptyTable>
      )}
    </>
  );
};

export default MySales;

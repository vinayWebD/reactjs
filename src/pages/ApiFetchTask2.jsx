import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';

import { useDispatch, useSelector } from 'react-redux';
import { getReducerState } from '../store/reducers/selector';
import { fetchPosts } from '../store/thunk/apiFetch';

import '../assets/css/apiFetchTask2.scss';

export default function ApiFetchTask2() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [tableRowData, setTableRowData] = useState('');
  const [tableColumnData, setTableColumnData] = useState([]);

  const dispatch = useDispatch();

  let fetchedData = useSelector(getReducerState('apiFetch'));

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  useEffect(() => {
    if (fetchedData.status == 'succeeded') {
      setTableRowData(fetchedData.posts);
    }
  }, [fetchedData]);

  useEffect(() => {
    if (tableRowData) {
      let coloumnKeys = Object.keys(tableRowData[0]);
      console.log(coloumnKeys);
      let coloumnDataArr = [];
      coloumnKeys.forEach((str) => {
        let coloumnObj = {
          id: str,
          label: str.toUpperCase(),
        };
        coloumnDataArr.push(coloumnObj);
      });
      setTableColumnData(coloumnDataArr);
    }
  }, [tableRowData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="fetchTask2Wrapper">
      <div className="searchDiv">
        <TextField
          sx={{
            width: 500,
            mx: 2,
            background: 'white',
            padding: 0,
            lineHeight: 0,
          }}
          label="Search Title"
        />
        <Button variant="contained">Filter</Button>
      </div>
      <div className="fetchTask2TableWrapper">
        <TableContainer
          sx={{
            maxHeight: 440,
          }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {tableColumnData &&
                  tableColumnData.map((column) => (
                    <TableCell key={column.id}>{column.label}</TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableRowData &&
                tableRowData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((rowObj) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={rowObj.id}>
                        {tableColumnData.map((column) => {
                          let value = String(rowObj[column.id]);
                          return <TableCell key={column.id}>{value}</TableCell>;
                        })}
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={tableRowData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
}

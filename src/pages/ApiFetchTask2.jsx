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

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment/moment';

import { useDispatch, useSelector } from 'react-redux';
import { getReducerState } from '../store/reducers/selector';
import { fetchPosts } from '../store/thunk/apiFetch';

import '../assets/css/apiFetchTask2.scss';

export default function ApiFetchTask2() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dateFromValue, setDateFromValue] = useState([null, null]);
  const [dateToValue, setDateToValue] = useState([null, null]);

  const [tableRowData, setTableRowData] = useState('');
  const [tableColumnData, setTableColumnData] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [filterErrorMsg, setFilterErrorMsg] = useState('');

  const dispatch = useDispatch();

  let fetchedData = useSelector(getReducerState('apiFetch'));

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  useEffect(() => {
    if (fetchedData.status == 'succeeded') {
      let filteredArray = [];
      fetchedData.users.map((obj) => {
        let newObj = {
          id: obj.id,
          firstName: obj.firstName,
          lastName: obj.lastName,
          maidenName: obj.maidenName,
          age: obj.age,
          gender: obj.gender,
          email: obj.email,
          phone: obj.phone,
          username: obj.username,
          password: obj.password,
          birthDate: obj.birthDate,
        };
        filteredArray.push(newObj);
      });
      setTableRowData(filteredArray);
    }
  }, [fetchedData]);

  useEffect(() => {
    if (tableRowData) {
      let coloumnKeys = Object.keys(tableRowData[0]);
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

  function searchData() {
    console.log('from and to ', dateFromValue.$d, dateToValue.$D, dateToValue.$M, dateToValue.$y);
    let tempArr = fetchedData.users.filter((obj) => {
      if (obj.title.includes(searchInputValue)) {
        return obj;
      }
    });
    if (tempArr.length == 0) {
      setFilterErrorMsg('No match Found');
      setTableRowData(fetchedData.posts);
    } else {
      setTableRowData(tempArr);
    }
    setSearchInputValue('');
  }

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
            width: 400,
            background: 'white',
            padding: 0,
            lineHeight: 0,
            '& .MuiInputLabel-root': {
              lineHeight: '0.8em',
              overflow: 'visible',
            },
            '& .MuiOutlinedInput-input': {
              padding: '9.5px 14px',
            },
          }}
          value={searchInputValue}
          onChange={(e) => setSearchInputValue(e.target.value)}
          label="Search Title"
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="From"
            value={dateFromValue}
            onChange={(newValue) => {
              setDateFromValue(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  background: 'white',
                  '& .MuiInputLabel-root': {
                    lineHeight: '0.8em',
                    overflow: 'visible',
                  },
                  '& .MuiOutlinedInput-input': {
                    padding: '9.5px 14px',
                  },
                  '& .MuiFormLabel-root': {
                    color: 'rgba(0, 0, 0, 0.6)',
                  },
                  '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(0, 0, 0, 0.25)',
                  },
                }}
              />
            )}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="To"
            value={dateToValue}
            onChange={(newValue) => {
              setDateToValue(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  background: 'white',
                  '& .MuiInputLabel-root': {
                    lineHeight: '0.8em',
                    overflow: 'visible',
                  },
                  '& .MuiOutlinedInput-input': {
                    padding: '9.5px 14px',
                  },
                  '& .MuiFormLabel-root': {
                    color: 'rgba(0, 0, 0, 0.6)',
                  },
                  '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(0, 0, 0, 0.25)',
                  },
                }}
              />
            )}
          />
        </LocalizationProvider>

        <Button variant="contained" onClick={() => searchData()}>
          Filter
        </Button>
      </div>
      <p className="error">{filterErrorMsg}</p>
      <div className="fetchTask2TableWrapper">
        <TableContainer
          sx={{
            maxHeight: 800,
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
                          if (column.id == 'birthDate') {
                            value = moment(String(rowObj[column.id]), 'YYYY-MM-DD').format(
                              'MMM Do YYYY',
                            );
                          }
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

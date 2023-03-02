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
  const [dateFromValue, setDateFromValue] = useState(null);
  const [dateToValue, setDateToValue] = useState(null);

  const [tableRowAllData, setTableRowAllData] = useState('');
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
      setTableRowAllData(filteredArray);
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

  function returnDate(dateValue) {
    let tempDate = moment(
      `${dateValue.$D} ${dateValue.$M + 1} ${dateValue.$y}`,
      'DD MM YYYY',
    ).format('YYYY-MM-DD');
    return tempDate;
  }

  function searchData() {
    if (searchInputValue || dateFromValue || dateToValue) {
      let tempFromDate;
      let tempToDate;
      if (dateFromValue) {
        tempFromDate = returnDate(dateFromValue);
      }
      if (dateToValue) {
        tempToDate = returnDate(dateToValue);
      }
      let tempArr = tableRowAllData.filter((obj) => {
        let isAfterDate = true;
        let isBeforeDate = true;
        if (tempFromDate) {
          isAfterDate = moment(obj.birthDate).isAfter(tempFromDate) ? true : false;
        }
        if (tempToDate) {
          isBeforeDate = moment(obj.birthDate).isBefore(tempToDate) ? true : false;
        }
        if (obj.firstName.includes(searchInputValue) && isAfterDate && isBeforeDate) {
          return obj;
        }
      });
      if (tempArr.length == 0) {
        // setFilterErrorMsg('No match Found');
        setTableRowData([
          {
            id: '',
            firstName: '',
            lastName: '',
            maidenName: '',
            age: '',
            gender: '',
            email: '',
            phone: '',
            username: '',
            password: '',
            birthDate: '',
          },
        ]);
      } else {
        setTableRowData(tempArr);
      }
    }
  }

  function resetTableData() {
    setSearchInputValue('');
    setDateFromValue(null);
    setDateToValue(null);
    setTableRowData(tableRowAllData);
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
          onChange={(e) => {
            setFilterErrorMsg('');
            setSearchInputValue(e.target.value);
          }}
          label="Search FirstName"
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="From"
            value={dateFromValue}
            onChange={(newValue) => {
              setFilterErrorMsg('');
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
                    color: 'rgba(0, 0, 0, 0.6) !important',
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
              setFilterErrorMsg('');
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
                    color: 'rgba(0, 0, 0, 0.6) !important',
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
          Search
        </Button>
        <Button variant="contained" onClick={() => resetTableData()}>
          Reset
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
                          if (column.id == 'birthDate' && rowObj[column.id]) {
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

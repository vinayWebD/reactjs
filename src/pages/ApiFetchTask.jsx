import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import '../../src/assets/css/apiFetchTask.scss';

// const columns = [
//   {
//     id: 'userId',
//     label: 'UserID',
//   },
//   {
//     id: 'id',
//     label: 'Id',
//   },
//   {
//     id: 'title',
//     label: 'Title',
//   },
//   {
//     id: 'body',
//     label: 'Body',
//   },
// ];

export default function ApiFetchTask() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [tableRowData, setTableRowData] = useState('');
  const [tableColumnData, setTableColumnData] = useState([]);

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

  async function fetchData(value) {
    let fetchedData = await fetch(`https://jsonplaceholder.typicode.com/${value}`)
      .then((response) => response.json())
      .then((json) => {
        return json;
      });
    setTableRowData(fetchedData);
  }

  // function searchData() {
  //   let tempArr = fetchedDataArr.filter((obj) => {
  //     if (obj[`${thirdKey}`].includes(searchInput.value)) {
  //       return obj;
  //     }
  //   });
  //   if (tempArr.length == 0) {
  //     tContent.innerHTML = '<h3>No match Found</h3>';
  //   } else {
  //     createTable(tempArr);
  //   }
  //   searchInput.value = '';
  // }

  return (
    <div className="section-wrapper">
      <div className="searchDiv">
        <input type="search" id="searchInput" placeholder="Search Title" />
        <button id="searchbtn" onclick="searchData()">
          FILTER
        </button>
      </div>
      <div className="apiList">
        <button onClick={() => fetchData('posts')}>Posts</button>
        <button onClick={() => fetchData('comments')}>Comments</button>
        <button onClick={() => fetchData('todos')}>Todos</button>
      </div>
      <div id="mainDiv">
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

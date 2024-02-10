import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
    { id: 'username', label: 'Username', minWidth: 170 },
    { id: 'carNumber', label: 'Car Number', minWidth: 100 },
    { id: 'mall', label: 'Mall', minWidth: 170 },
    { id: 'inTime', label: 'In Time', minWidth: 170, format: (value) => formatTime(value) },
    { id: 'outTime', label: 'Out Time', minWidth: 170, format: (value) => formatTime(value) }
];

const formatTime = (value) => {
    if (value instanceof Date) {
      return value.toLocaleTimeString('en-US');
    } else {
      return String(value);
    }
};

function createData(username, carNumber, mall, inTime, outTime) {
    return { username, carNumber, mall, inTime, outTime };
}

const rows = [
    createData("John", "ABC", `Mall1`, new Date().toDateString(), new Date().toDateString()),
    createData("John", "ABC", `Mall1`, new Date().toDateString(), new Date().toDateString()),
    createData("John", "ABC", `Mall1`, new Date().toDateString(), new Date().toDateString()),
    createData("John", "ABC", `Mall1`, new Date().toDateString(), new Date().toDateString()),
    createData("John", "ABC", `Mall1`, new Date().toDateString(), new Date().toDateString()),
    createData("John", "ABC", `Mall1`, new Date().toDateString(), new Date().toDateString()),
    createData("John", "ABC", `Mall1`, new Date().toDateString(), new Date().toDateString()),
    createData("John", "ABC", `Mall1`, new Date().toDateString(), new Date().toDateString()),
    createData("John", "ABC", `Mall1`, new Date().toDateString(), new Date().toDateString()),
    createData("John", "ABC", `Mall1`, new Date().toDateString(), new Date().toDateString()),
    createData("John", "ABC", `Mall1`, new Date().toDateString(), new Date().toDateString()),
    createData("John", "ABC", `Mall1`, new Date().toDateString(), new Date().toDateString()),
    createData("John", "ABC", `Mall1`, new Date().toDateString(), new Date().toDateString()),
    createData("John", "ABC", `Mall1`, new Date().toDateString(), new Date().toDateString()),
    createData("John", "ABC", `Mall1`, new Date().toDateString(), new Date().toDateString()),
    createData("John", "ABC", `Mall1`, new Date().toDateString(), new Date().toDateString()),
    createData("John", "ABC", `Mall1`, new Date().toDateString(), new Date().toDateString()),
    createData("John", "ABC", `Mall1`, new Date().toDateString(), new Date().toDateString()),
    createData("John", "ABC", `Mall1`, new Date().toDateString(), new Date().toDateString())
];

export default function StickyHeadTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    return (
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 550 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
// import React from 'react';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';

// const columns = [
//     { id: 'carNumber', label: 'Car Number', minWidth: 170 },
//   { id: 'inTime', label: 'In Time', minWidth: 170, format: (value) => formatTime(value) },
//   { id: 'outTime', label: 'Out Time', minWidth: 170, format: (value) => formatTime(value) },
// ];

// const formatTime = (value) => {
//     if (value instanceof Date) {
//         return value.toLocaleTimeString('en-US');
//     } else {
//         return String(value);
//     }
// };

// // function createData(username, carNumber, mall, inTime, outTime) {
// //     return { username, carNumber, mall, inTime, outTime };
// // }

// // const rows = [
// //     createData("John", "ABC", `Mall1`, new Date().toDateString(), new Date().toDateString()),
// //     createData("John", "ABC", `Mall1`, new Date().toDateString(), new Date().toDateString()),
// //     createData("John", "ABC", `Mall1`, new Date().toDateString(), new Date().toDateString()),
// //     createData("John", "ABC", `Mall1`, new Date().toDateString(), new Date().toDateString()),
// //     createData("John", "ABC", `Mall1`, new Date().toDateString(), new Date().toDateString()),
// //     createData("John", "ABC", `Mall1`, new Date().toDateString(), new Date().toDateString()),
// //     createData("John", "ABC", `Mall1`, new Date().toDateString(), new Date().toDateString()),
// //     createData("John", "ABC", `Mall1`, new Date().toDateString(), new Date().toDateString()),
// //     createData("John", "ABC", `Mall1`, new Date().toDateString(), new Date().toDateString()),
// //     createData("John", "ABC", `Mall1`, new Date().toDateString(), new Date().toDateString()),
// //     createData("John", "ABC", `Mall1`, new Date().toDateString(), new Date().toDateString()),
// //     createData("John", "ABC", `Mall1`, new Date().toDateString(), new Date().toDateString()),
// //     createData("John", "ABC", `Mall1`, new Date().toDateString(), new Date().toDateString()),
// //     createData("John", "ABC", `Mall1`, new Date().toDateString(), new Date().toDateString()),
// //     createData("John", "ABC", `Mall1`, new Date().toDateString(), new Date().toDateString()),
// //     createData("John", "ABC", `Mall1`, new Date().toDateString(), new Date().toDateString()),
// //     createData("John", "ABC", `Mall1`, new Date().toDateString(), new Date().toDateString()),
// //     createData("John", "ABC", `Mall1`, new Date().toDateString(), new Date().toDateString()),
// //     createData("John", "ABC", `Mall1`, new Date().toDateString(), new Date().toDateString())
// // ];

// export default function StickyHeadTable({ rows }) {
//     const [page, setPage] = React.useState(0);
//     const [rowsPerPage, setRowsPerPage] = React.useState(10);

//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(+event.target.value);
//         setPage(0);
//     };

//     return (
//         <div>
//             {console.log(rows)}
//             {!rows ? <h1>There is no past data to show.</h1> :
//                 <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//                 <TableContainer sx={{ maxHeight: 440 }}>
//                   <Table stickyHeader aria-label="sticky table">
//                     <TableHead>
//                       <TableRow>
//                         {columns.map((column) => (
//                           <TableCell
//                             key={column.id}
//                             align={column.align}
//                             style={{ minWidth: column.minWidth }}
//                           >
//                             {column.label}
//                           </TableCell>
//                         ))}
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {rows
//                         .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                         .map((row) => (
//                           <TableRow hover role="checkbox" tabIndex={-1} key={row.carNumber}>
//                             {columns.map((column) => (
//                               <TableCell key={column.id} align={column.align}>
//                                 {column.format && typeof row[column.id] === 'number'
//                                   ? column.format(row[column.id])
//                                   : row[column.id]}
//                               </TableCell>
//                             ))}
//                           </TableRow>
//                         ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//                 <TablePagination
//                   rowsPerPageOptions={[10, 25, 100]}
//                   component="div"
//                   count={rows.length}
//                   rowsPerPage={rowsPerPage}
//                   page={page}
//                   onPageChange={handleChangePage}
//                   onRowsPerPageChange={handleChangeRowsPerPage}
//                 />
//               </Paper>
//             }
//         </div>
//     );
// }


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
  { id: 'carNumber', label: 'Car Number', minWidth: 170 },
  { id: 'inTime', label: 'In Time', minWidth: 170, format: (value) => formatTime(value) },
  { id: 'outTime', label: 'Out Time', minWidth: 170, format: (value) => formatTime(value) },
];

const formatTime = (value) => {
  if (value instanceof Date) {
    return value.toLocaleTimeString('en-US');
  } else {
    return String(value);
  }
};

export default function StickyHeadTable({ rows }) {
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
    <div>
      {!rows || rows.length === 0 ? (
        <h1>There is no past data to show.</h1>
      ) : (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
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
              {/* {console.log("rows",rows)} */}
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.carNumber}>
                        {/* {console.log("adsf",row[0])} */}
                      {[0,1,2].map((i) => 
                      {
                        const value = row[i];
                        return (
                          <TableCell key={i} align={"hello"}>
                                {row[i]}
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
      )}
    </div>
  );
}

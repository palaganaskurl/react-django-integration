import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function UserList() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const getUserList = async () => {
      const token = JSON.parse(localStorage.getItem('testTokenSave'));

      try {
        const inUserList = await axios.get(
          `${process.env.REACT_APP_DJANGO_API}/users/`,
          {
            headers: {
              Authorization: `Bearer ${token.access_token}`
            }
          }
        );

        setUserList(inUserList.data);
      } catch (e) {
        setUserList([]);
      }
    };

    getUserList();
  }, [setUserList]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((user) => (
              <TableRow
                key={user.email}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{user.email}</TableCell>
                <TableCell component="th" scope="row">
                  {user.first_name}
                </TableCell>
                <TableCell>{user.last_name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

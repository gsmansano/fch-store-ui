import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Container,
  Typography,
  CircularProgress,
  TableContainer,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Scrollbar from '../../components/scrollbar';
import { useListUsers } from '../../services/useUserServices';
import { MoreMenu } from './components/MoreMenu';
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'userId', label: 'ID', alignRight: false },
  { id: 'name', label: 'Nome', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'profile', label: 'Profile', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

export const UserList = () => {
  const [usersData, setFields] = useState([]);

  const { data, getData, isLoading } = useListUsers();

  useEffect(() => {
    if (data) {
      setFields(data)
    }
  }, [data]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title> Panel: Users | Fch Store</title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Users
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            component={RouterLink}
            to="/app/user/add">
            New User
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    {TABLE_HEAD.map((headCell) => (
                      <TableCell
                        key={headCell.id}
                        align={headCell.alignRight ? 'right' : 'left'}
                      >
                        {headCell.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {usersData?.length > 0 && usersData.map((row) => {
                    const { userId, name, email, profile } = row;

                    return (
                      <TableRow hover key={userId} tabIndex={-1}>
                        <TableCell>
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {userId}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{name}</TableCell>
                        <TableCell align="left">{email}</TableCell>
                        <TableCell align="left">{profile}</TableCell>
                        <TableCell align="right">
                          <MoreMenu userId={userId} />
                        </TableCell>
                      </TableRow>
                    );
                  })}

                  {(isLoading) && (
                    <TableRow style={{ height: 53 * 6 }}>
                      <TableCell colSpan={6} align="center">
                        <CircularProgress size={50} />
                      </TableCell>
                    </TableRow>
                  )}

                  {usersData?.length === 0 && !isLoading && (

                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            No Results
                          </Typography>

                          <Typography variant="body2">
                            No Resoults &nbsp;
                            <strong>&quot;{""}&quot;</strong>.
                            <br /> Try another word
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
}


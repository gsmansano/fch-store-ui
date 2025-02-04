import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
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
    TableContainer,
    MenuItem,
    CircularProgress
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import { MoreMenu } from '../../components/MoreMenu';
import { useListManufacturer, useRemoveManufacturer } from '../../services/useManufacturerServices';
import Label from '../../components/label/Label';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'manufacturerId', label: 'ID', alignRight: false },
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'isActive', label: 'Is active?', alignRight: false },
    { id: '' }
];

// ----------------------------------------------------------------------

export const ManufacturerList = () => {
    const [pageData, setPageData] = useState([]);
    const { data, getData, isLoading } = useListManufacturer();
    const { doRequest: doRemove, data: resultRemove, isLoading: isRemoving } = useRemoveManufacturer();

    useEffect(() => {
        if (data) {
            setPageData(data);
        }
    }, [data]);

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resultRemove]);

    return (
        <>
            <Helmet>
                <title> Panel: Manufacturer | Fch Store</title>
            </Helmet>

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Manufacturers
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<Iconify icon="eva:plus-fill" />}
                        component={RouterLink}
                        to="/app/manufacturer/add">
                        New Manufacturer
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
                                    {pageData?.length > 0 && pageData.map((row) => {
                                        const { manufacturerId, name, isActive } = row;

                                        return (
                                            <TableRow hover key={manufacturerId} tabIndex={-1}>
                                                <TableCell>
                                                    <Stack direction="row" alignItems="center" spacing={2}>
                                                        <Typography variant="subtitle2" noWrap>
                                                            {manufacturerId}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell align="left">{name}</TableCell>
                                                <TableCell align="left">
                                                    <Label color={isActive ? 'success' : 'error'}>{isActive ? 'Yes' : 'No'}</Label>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <MoreMenu>
                                                        <MenuItem component={RouterLink} to={`/app/manufacturer/edit/${manufacturerId}`}>
                                                            <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                                                            Edit
                                                        </MenuItem>
                                                        <MenuItem onClick={() => doRemove(manufacturerId)}>
                                                            <Iconify icon={'eva:trash-fill'} sx={{ mr: 2 }} />
                                                            Remove
                                                        </MenuItem>
                                                    </MoreMenu>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}

                                    {(isLoading || isRemoving) && (
                                        <TableRow style={{ height: 53 * 6 }}>
                                            <TableCell colSpan={4} align="center">
                                                <CircularProgress size={50} />
                                            </TableCell>
                                        </TableRow>
                                    )}

                                    {pageData?.length === 0 && !isLoading && (
                                        <TableRow>
                                            <TableCell align="center" colSpan={4} sx={{ py: 3 }}>
                                                <Paper
                                                    sx={{
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <Typography variant="h6" paragraph>
                                                        No results
                                                    </Typography>

                                                    <Typography variant="body2">
                                                        No results for &nbsp;
                                                        <strong>&quot;{""}&quot;</strong>.
                                                        <br /> Try a new word
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


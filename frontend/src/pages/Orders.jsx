import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Button,
    CircularProgress,
    Chip
} from '@mui/material';
import { format } from 'date-fns';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/api/orders/my-orders', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setOrders(response.data.data);
                setLoading(false);
            } catch (err) {
                setError('فشل في جلب الطلبات. يرجى المحاولة مرة أخرى.');
                setLoading(false);
                console.error('Error fetching orders:', err);
            }
        };

        fetchOrders();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'delivered':
                return 'success';
            case 'cancelled':
                return 'error';
            case 'shipped':
                return 'info';
            case 'processing':
                return 'warning';
            default:
                return 'default';
        }
    };



    if (loading) {
        return (
            <Container maxWidth="lg" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="lg" style={{ padding: '20px' }}>
                <Typography color="error">{error}</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom style={{ marginBottom: '20px', fontWeight: 'bold' }}>
                طلباتي
            </Typography>

            {orders.length === 0 ? (
                <Typography variant="body1">لا يوجد لديك أي طلبات حتى الآن.</Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>رقم الطلب</TableCell>
                                <TableCell>التاريخ</TableCell>
                                <TableCell>المجموع</TableCell>
                                <TableCell>حالة الطلب</TableCell>
                                <TableCell>حالة الدفع</TableCell>
                                <TableCell>الإجراءات</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order._id}>
                                    <TableCell>#{order._id.substring(0, 8)}</TableCell>
                                    <TableCell>
                                        {format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm')}
                                    </TableCell>
                                    <TableCell>{order.totalAmount.toFixed(2)} ر.س</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={order.status}
                                            color={getStatusColor(order.status)}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={order.paymentStatus}
                                            color={order.paymentStatus === 'completed' ? 'success' : 'warning'}
                                            size="small"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};

export default OrdersPage;

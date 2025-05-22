import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow,
  Paper, Typography, Button, CircularProgress, Chip,
  Box, Card, CardContent, Divider, IconButton, Tooltip,
  ThemeProvider, createTheme
} from '@mui/material';
import { format } from 'date-fns';
import RefreshIcon from '@mui/icons-material/Refresh';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import EmptyOrdersIllustration from '@mui/icons-material/ShoppingCart';

// تعريف الثيم بالألوان المخصصة
const theme = createTheme({
  palette: {
    primary: {
      main: '#2B2B2B',
      light: '#3f3f3f',
      dark: '#1a1a1a',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#CEBEB3',
      light: '#d8cec5',
      dark: '#b8a99d',
      contrastText: '#2B2B2B'
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff'
    },
    text: {
      primary: '#2B2B2B',
      secondary: '#5a5a5a'
    }
  }
});

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders/my-orders', {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        if (!response.data.success) {
          throw new Error(response.data.message || 'Failed to fetch orders');
        }
  
        setOrders(response.data.data || []);
        
      } catch (err) {
        console.error('Error details:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status
        });
        
        setError(err.response?.data?.message || err.message || 'Failed to fetch orders');
        
        if (err.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrders();
  }, [navigate]);

  const getStatusColor = (orderstatus) => {
    switch (orderstatus) {
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

  const getStatusText = (status) => {
    switch (status) {
      case 'delivered':
        return 'تم التوصيل';
      case 'cancelled':
        return 'ملغي';
      case 'shipped':
        return 'تم الشحن';
      case 'processing':
        return 'قيد المعالجة';
      default:
        return status;
    }
  };

  const getPaymentStatusText = (paymentStatus) => {
    return paymentStatus === 'completed' ? 'مكتمل' : 'قيد الانتظار';
  };

  const handleViewDetails = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {loading ? (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '70vh' 
          }}>
            <CircularProgress size={60} thickness={4} sx={{ color: '#2B2B2B' }} />
            <Typography sx={{ mt: 2, color: 'text.secondary' }}>
              جاري تحميل الطلبات...
            </Typography>
          </Box>
        ) : error ? (
          <Container maxWidth="sm">
            <Card sx={{ 
              mt: 4, 
              textAlign: 'center', 
              p: 3, 
              borderRadius: 2, 
              boxShadow: 3, 
              border: '1px solid #CEBEB3' 
            }}>
              <Typography variant="h6" color="error" gutterBottom>
                {error}
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 3 }}>
                نواجه مشكلة في تحميل طلباتك. يرجى المحاولة مرة أخرى.
              </Typography>
              <Button 
                variant="contained" 
                startIcon={<RefreshIcon />}
                onClick={() => window.location.reload()}
                sx={{
                  borderRadius: 8, 
                  bgcolor: '#2B2B2B',
                  '&:hover': { 
                    bgcolor: '#3f3f3f'
                  }
                }}
              >
                إعادة المحاولة
              </Button>
            </Card>
          </Container>
        ) : (
          <>
            <Box sx={{
              display: 'flex', 
              alignItems: 'center', 
              mb: 4, 
              pb: 2, 
              borderBottom: `3px solid #CEBEB3` 
            }}>
              <ShoppingBagIcon sx={{ fontSize: 32, mr: 2, color: '#2B2B2B' }} />
              <Typography 
                variant="h4" 
                component="h1" 
                sx={{ 
                  fontWeight: 700,
                  color: '#2B2B2B'
                }}
              >
                طلباتي
              </Typography>
            </Box>

            {orders.length === 0 ? (
              <Card sx={{ 
                textAlign: 'center', 
                p: 6, 
                borderRadius: 2,
                boxShadow: 2,
                bgcolor: '#f9f9f9',
                border: '1px solid #CEBEB3' 
              }}>
                <EmptyOrdersIllustration sx={{ fontSize: 100, color: '#CEBEB3', mb: 2 }} />
                <Typography variant="h6" sx={{ mb: 1, color: '#2B2B2B' }}>
                  لا يوجد لديك أي طلبات حتى الآن
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  عند إجراء طلبات، ستظهر هنا لتتمكن من متابعتها
                </Typography>
                <Button 
                  variant="contained" 
                  onClick={() => navigate('/products')}
                  sx={{ 
                    borderRadius: 8, 
                    bgcolor: '#2B2B2B',
                    '&:hover': { 
                      bgcolor: '#3f3f3f'
                    }
                  }}
                >
                  تصفح المنتجات
                </Button>
              </Card>
            ) : (
              <Card sx={{ 
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                border: '1px solid #CEBEB3'
              }}>
                <Box sx={{ 
                  p: 2, 
                  bgcolor: '#2B2B2B', 
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <ReceiptIcon sx={{ mr: 1 }} />
                  <Typography variant="subtitle1" fontWeight={500}>
                    سجل الطلبات
                  </Typography>
                </Box>
                <Divider />
                <TableContainer component={Box} sx={{ maxHeight: 600 }}>
                  <Table stickyHeader sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', bgcolor: '#CEBEB3', color: '#2B2B2B' }}>رقم الطلب</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', bgcolor: '#CEBEB3', color: '#2B2B2B' }}>التاريخ</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', bgcolor: '#CEBEB3', color: '#2B2B2B' }}>المجموع</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', bgcolor: '#CEBEB3', color: '#2B2B2B' }}>حالة الطلب</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', bgcolor: '#CEBEB3', color: '#2B2B2B' }}>حالة الدفع</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', bgcolor: '#CEBEB3', color: '#2B2B2B' }}>الإجراءات</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow 
                          key={order._id}
                          hover
                          sx={{ 
                            '&:last-child td, &:last-child th': { border: 0 },
                            '&:nth-of-type(odd)': { 
                              bgcolor: 'rgba(206, 190, 179, 0.05)' 
                            },
                            '&:hover': { 
                              bgcolor: 'rgba(206, 190, 179, 0.15)' 
                            }
                          }}
                        >
                          <TableCell sx={{ fontWeight: 500, color: '#2B2B2B' }}>
                            #{order._id.substring(0, 8)}
                          </TableCell>
                          <TableCell>
                            {format(new Date(order.createdAt), 'dd/MM/yyyy')}
                            <Typography variant="caption" display="block" color="text.secondary">
                              {format(new Date(order.createdAt), 'HH:mm')}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ fontWeight: 500, color: '#2B2B2B' }}>
                            {typeof order.total === 'number' ? `${order.total.toFixed(2)} ر.س` : 'غير متوفر'}
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={getStatusText(order.status)}
                              color={getStatusColor(order.status)}
                              size="small"
                              sx={{ 
                                fontWeight: 500, 
                                borderRadius: '6px',
                                px: 1
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={getPaymentStatusText(order.paymentStatus)}
                              color={order.paymentStatus === 'completed' ? 'success' : 'warning'}
                              size="small"
                              variant={order.paymentStatus === 'completed' ? 'filled' : 'outlined'}
                              sx={{ 
                                fontWeight: 500, 
                                borderRadius: '6px',
                                px: 1
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Tooltip title="عرض التفاصيل">
                              <IconButton 
                                size="small" 
                                onClick={() => handleViewDetails(order._id)}
                                sx={{ 
                                  bgcolor: '#CEBEB3', 
                                  color: '#2B2B2B',
                                  '&:hover': { 
                                    bgcolor: '#b8a99d' 
                                  } 
                                }}
                              >
                                <VisibilityIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box sx={{ 
                  p: 2, 
                  bgcolor: '#CEBEB3', 
                  color: '#2B2B2B',
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Typography variant="body2" fontWeight={500}>
                    إجمالي الطلبات: {orders.length}
                  </Typography>
                  <Button 
                    variant="contained" 
                    size="small"
                    onClick={() => window.location.reload()}
                    sx={{ 
                      bgcolor: '#2B2B2B',
                      '&:hover': { 
                        bgcolor: '#3f3f3f'
                      }
                    }}
                  >
                    تحديث
                  </Button>
                </Box>
              </Card>
            )}
          </>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default OrdersPage;
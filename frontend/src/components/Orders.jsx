import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/orders', {
                    withCredentials: true,
                });
                setOrders(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">🛒 Orders</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                orders.map((order) => (
                    <div key={order._id} className="bg-white rounded-lg shadow p-4 mb-4">
                        <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>

                        {/* 🛒 Order Summary */}
                        <p><strong>Status:</strong> {order.orderStatus}</p>
                        <p><strong>Subtotal:</strong> {order.subtotal} JD</p>
                        <p><strong>Shipping Fee:</strong> {order.shippingFee} JD</p>
                        <p><strong>Total:</strong> {order.total} JD</p>

                        {/* 💳 Payment Info */}
                        <div className="mt-2">
                            <h4 className="font-medium">💳 Payment</h4>
                            <p>Method: {order.paymentMethod}</p>
                            <p>Status: {order.paymentStatus}</p>
                            {order.couponUsed && <p>Coupon: {order.couponUsed}</p>}
                            {order.discountAmount > 0 && <p>Discount: {order.discountAmount} JD</p>}
                        </div>

                        {/* 🚚 Shipping Info */}
                        <div className="mt-2">
                            <h4 className="font-medium">🚚 Shipping</h4>
                            <p>Method: {order.shippingMethod}</p>
                            <p>Address ID: {order.shippingAddress.city}</p>
                            <p><strong>Address:</strong> {order.shippingAddress.address}</p>
                        </div>

                        <p className="text-sm text-gray-500 mt-2">Ordered At: {new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default Orders;

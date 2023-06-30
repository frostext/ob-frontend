import React, { useEffect, useState } from 'react'
import { getAllOrders, updateOrderStatus } from '../../../apis/Api';
import { toast } from 'react-toastify';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        getAllOrders().then((res) => {
            console.log(res.data);
            setOrders(res.data.orders);
        }).catch((err) => {
            console.log(err);
        });
    }, []);


    // change status of order
    const changeStatus = (orderNumber, status) => {
        const orderStatus = {status};
        updateOrderStatus(orderNumber, orderStatus).then((res) => {
            toast.success('Order status updated successfully');
            window.location.reload();
        }).catch((err) => {
            console.log(err);
            toast.error('Something went wrong');
        })
    }


    return (
        <div className="container mt-3">
            <h3>Admin Orders</h3>
            {
                orders.map((order) => (
                    <div class="card mt-2">
                        <div class="card-header d-flex justify-content-between">
                            <h6>ORDER - {order.orderNumber}</h6>
                            <div class="dropdown">
                                <button
                                    class="btn btn-primary dropdown-toggle"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-mdb-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {order.status}
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li>
                                        <button
                                            className="dropdown-item"
                                            onClick={() => changeStatus(order._id, 'Approved')}>
                                            Approved
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-item"
                                            onClick={() => changeStatus(order._id, 'In Progress')}>
                                            In Progress
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-item"
                                            onClick={() => changeStatus(order._id, 'Delivered')}>
                                            Delivered
                                        </button>
                                    </li>
                                </ul>
                            </div>

                        </div>
                        <div class="card-body">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Image</th>
                                        <th scope="col">Product Name</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        order.cart.map((item) => (
                                            <tr>
                                                <th scope="row"><img src={item.image} alt="" width="50" /></th>
                                                <td>{item.name}</td>
                                                <td>{item.category}</td>
                                                <td>{item.price}</td>
                                                <td>{item.quantity}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>

                            </table>
                        </div>
                        <div class="card-footer d-flex justify-content-between">
                            <div>
                                <h6>Order Date : {order.orderedDate}</h6>
                            </div>
                            <div>
                                <h6>Shipping info : {order.shippingAddress}</h6>
                            </div>
                            <div>
                                <h6>Total Price : {order.totalAmount}</h6>
                            </div>

                        </div>

                    </div>
                ))
            }

        </div>
    )
}

export default AdminOrders
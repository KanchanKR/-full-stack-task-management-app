/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { getOrders } from "../api"; // Ensure this API function exists in your API file
import { CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../redux/reducers/SnackbarSlice";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("krist-app-token"); // Get the token from localStorage
      if (!token) {
        throw new Error("No token found");
      }
      const response = await getOrders(token); // API call to fetch orders
      setOrders(response.data); // Update the state with the fetched orders
    } catch (err) {
      console.error(err);
      dispatch(
        openSnackbar({
          message: "Failed to fetch orders. Please try again.",
          severity: "error",
        })
      );
    } finally {
      setLoading(false); // Stop the loading spinner after fetching
    }
  };

  useEffect(() => {
    fetchOrders(); // Fetch orders when the component mounts
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 p-5 pb-48 h-full overflow-y-auto bg-gray-100">
      <div className="flex flex-col items-center w-full max-w-7xl gap-7 py-8 text-2xl">
        <div className="flex items-center justify-center w-full font-semibold text-3xl">
          Your Orders
        </div>

        {loading ? (
          <CircularProgress /> // Show loading spinner while data is being fetched
        ) : orders.length === 0 ? (
          <div>No orders found</div> // Display if no orders are returned
        ) : (
          <div className="w-full flex flex-col gap-5">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white shadow-lg p-5 rounded-lg flex flex-col gap-3"
              >
                <div className="flex justify-between items-center">
                  <div className="font-semibold text-lg">Order ID: {order._id}</div>
                  <div className="text-green-500">{order.status}</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-gray-500">Total Amount:</div>
                  <div className="font-semibold">${order.total_amount}</div>
                </div>
                <div className="text-gray-500">Address: {order.address}</div>
                <div className="flex flex-col gap-2">
                  <div className="font-semibold text-lg">Products:</div>
                  {order.products.map((item) => (
                    <div
                      key={item.product._id}
                      className="flex justify-between items-center"
                    >
                      <div>{item.product.name}</div>
                      <div>Quantity: {item.quantity}</div>
                    </div>
                  ))}
                </div>
                <div className="text-gray-500">
                  Ordered at: {new Date(order.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;

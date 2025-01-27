/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { addToCart, deleteFromCart, getCart, placeOrder } from "../api";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../redux/reducers/SnackbarSlice";
import { DeleteOutline } from "@mui/icons-material";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [products, setProducts] = useState([]);
  const [buttonLoad, setButtonLoad] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    completeAddress: "",
  });

  const getProducts = async () => {
    setLoading(true);
    const token = localStorage.getItem("krist-app-token");
    await getCart(token).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  const calculateSubtotal = () => {
    return products.reduce(
      (total, item) => total + item.quantity * item?.product?.price?.org,
      0
    );
  };

  const convertAddressToString = (addressObj) => {
    return `${addressObj.firstName} ${addressObj.lastName}, ${addressObj.completeAddress}, ${addressObj.phoneNumber}, ${addressObj.emailAddress}`;
  };

  const PlaceOrder = async () => {
    setButtonLoad(true);
    try {
      const isDeliveryDetailsFilled =
        deliveryDetails.firstName &&
        deliveryDetails.lastName &&
        deliveryDetails.completeAddress &&
        deliveryDetails.phoneNumber &&
        deliveryDetails.emailAddress;

      if (!isDeliveryDetailsFilled) {
        dispatch(
          openSnackbar({
            message: "Please fill in all required delivery details.",
            severity: "error",
          })
        );
        return;
      }

      const token = localStorage.getItem("krist-app-token");
      const totalAmount = calculateSubtotal().toFixed(2);
      const orderDetails = {
        products,
        address: convertAddressToString(deliveryDetails),
        totalAmount,
      };

      await placeOrder(token, orderDetails);
      dispatch(
        openSnackbar({
          message: "Order placed successfully",
          severity: "success",
        })
      );
      setButtonLoad(false);
      setReload(!reload);
    } catch (err) {
      dispatch(
        openSnackbar({
          message: "Failed to place order. Please try again.",
          severity: "error",
        })
      );
      setButtonLoad(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [reload]);

  const addCart = async (id) => {
    const token = localStorage.getItem("krist-app-token");
    await addToCart(token, { productId: id, quantity: 1 })
      .then((res) => {
        setReload(!reload);
      })
      .catch((err) => {
        setReload(!reload);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };

  const removeCart = async (id, quantity, type) => {
    const token = localStorage.getItem("krist-app-token");
    let qnt = quantity > 0 ? 1 : null;
    if (type === "full") qnt = null;
    await deleteFromCart(token, {
      productId: id,
      quantity: qnt,
    })
      .then((res) => {
        setReload(!reload);
      })
      .catch((err) => {
        setReload(!reload);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };

  return (
    <div className="flex flex-col items-center gap-8 p-5 pb-48 h-full overflow-y-auto bg-gray-100">
      <div className="flex flex-col items-center w-full max-w-7xl gap-7 py-8 text-2xl">
        <div className="flex items-center justify-center w-full font-semibold text-3xl">
          Your Shopping Cart
        </div>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {products.length === 0 ? (
              <div>Cart is empty</div>
            ) : (
              <div className="flex flex-col gap-8 lg:flex-row w-full p-3">
                <div className="flex-1 flex flex-col gap-3">
                  <div className="flex items-center gap-7 mb-5 font-semibold text-lg">
                    <div className="flex-1">Product</div>
                    <div>Price</div>
                    <div>Quantity</div>
                    <div>Subtotal</div>
                    <div></div>
                  </div>
                  {products.map((item) => (
                    <div className="flex items-center gap-7 mb-3">
                      <div className="flex-1 flex items-center gap-4">
                        <img
                          src={item?.product?.img}
                          alt="product"
                          className="h-20"
                        />
                        <div className="max-w-[8rem] lg:max-w-[10rem]">
                          <div className="font-medium text-lg text-indigo-500">
                            {item?.product?.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {item?.product?.desc}
                          </div>
                        </div>
                      </div>
                      <div>${item?.product?.price?.org}</div>
                      <div className="flex items-center gap-3 border border-gray-300 rounded-md p-2">
                        <div
                          className="cursor-pointer"
                          onClick={() =>
                            removeCart(item?.product?._id, item?.quantity - 1)
                          }
                        >
                          -
                        </div>
                        {item?.quantity}
                        <div
                          className="cursor-pointer"
                          onClick={() => addCart(item?.product?._id)}
                        >
                          +
                        </div>
                      </div>
                      <div>
                        ${" "}
                        {(item.quantity * item?.product?.price?.org).toFixed(2)}
                      </div>
                      <div>
                        <DeleteOutline
                          sx={{ color: "red" }}
                          onClick={() =>
                            removeCart(
                              item?.product?._id,
                              item?.quantity - 1,
                              "full"
                            )
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex-1 flex flex-col gap-3">
                  <div className="flex justify-between font-semibold text-xl">
                    Subtotal : ${calculateSubtotal().toFixed(2)}
                  </div>
                  <div className="flex flex-col gap-2 font-semibold text-lg">
                    Delivery Details:
                    <div>
                      <div className="flex gap-2">
                        <TextInput
                          small
                          placeholder="First Name"
                          value={deliveryDetails.firstName}
                          handelChange={(e) =>
                            setDeliveryDetails({
                              ...deliveryDetails,
                              firstName: e.target.value,
                            })
                          }
                        />
                        <TextInput
                          small
                          placeholder="Last Name"
                          value={deliveryDetails.lastName}
                          handelChange={(e) =>
                            setDeliveryDetails({
                              ...deliveryDetails,
                              lastName: e.target.value,
                            })
                          }
                        />
                      </div>
                      <TextInput
                        small
                        placeholder="Email Address"
                        value={deliveryDetails.emailAddress}
                        handelChange={(e) =>
                          setDeliveryDetails({
                            ...deliveryDetails,
                            emailAddress: e.target.value,
                          })
                        }
                      />
                      <TextInput
                        small
                        placeholder="Phone no. +91 XXXXX XXXXX"
                        value={deliveryDetails.phoneNumber}
                        handelChange={(e) =>
                          setDeliveryDetails({
                            ...deliveryDetails,
                            phoneNumber: e.target.value,
                          })
                        }
                      />
                      <TextInput
                        small
                        textArea
                        rows="5"
                        placeholder="Complete Address (Address, State, Country, Pincode)"
                        value={deliveryDetails.completeAddress}
                        handelChange={(e) =>
                          setDeliveryDetails({
                            ...deliveryDetails,
                            completeAddress: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 font-semibold text-lg">
                    Payment Details:
                    <div>
                      <TextInput small placeholder="Card Number" />
                      <div className="flex gap-2">
                        <TextInput small placeholder="Expiry Date" />
                        <TextInput small placeholder="CVV" />
                      </div>
                      <TextInput small placeholder="Card Holder name" />
                    </div>
                  </div>
                  <Button
                    text="Place Order"
                    small
                    onClick={PlaceOrder}
                    isLoading={buttonLoad}
                    isDisabled={buttonLoad}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;

/* eslint-disable no-unused-vars */
import { CircularProgress, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import {
  FavoriteBorderOutlined,
  FavoriteRounded,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import {
  addToCart,
  addToFavourite,
  deleteFromFavourite,
  getFavourite,
  getProductDetails,
} from "../api";
import { openSnackbar } from "../redux/reducers/SnackbarSlice";
import { useDispatch } from "react-redux";

const FoodDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState();

  const getProduct = async () => {
    setLoading(true);
    await getProductDetails(id).then((res) => {
      setProduct(res.data);
      setLoading(false);
    });
  };

  const removeFavourite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("krist-app-token");
    await deleteFromFavourite(token, { productId: id })
      .then((res) => {
        setFavorite(false);
        setFavoriteLoading(false);
      })
      .catch((err) => {
        setFavoriteLoading(false);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };

  const addFavourite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("krist-app-token");
    await addToFavourite(token, { productId: id })
      .then((res) => {
        setFavorite(true);
        setFavoriteLoading(false);
      })
      .catch((err) => {
        setFavoriteLoading(false);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };

  const checkFavorite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("krist-app-token");
    await getFavourite(token, { productId: id })
      .then((res) => {
        const isFavorite = res.data?.some((favorite) => favorite._id === id);
        setFavorite(isFavorite);
        setFavoriteLoading(false);
      })
      .catch((err) => {
        setFavoriteLoading(false);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };

  useEffect(() => {
    getProduct();
    checkFavorite();
  }, []);

  const addCart = async () => {
    setCartLoading(true);
    const token = localStorage.getItem("krist-app-token");
    await addToCart(token, { productId: id, quantity: 1 })
      .then((res) => {
        setCartLoading(false);
        navigate("/cart");
      })
      .catch((err) => {
        setCartLoading(false);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };

  return (
    <div className="p-5 md:p-8 pb-48 h-full overflow-y-auto flex flex-col items-center gap-8 bg-gray-100">
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="w-full max-w-7xl flex gap-10 justify-center md:flex-col md:gap-8">
          <div className="flex-1 flex justify-center">
            <img
              src={product?.img}
              className="max-w-lg w-full max-h-[500px] rounded-lg object-cover"
              alt={product?.name}
            />
          </div>
          <div className="flex-1 flex flex-col gap-4 p-2">
            <h1 className="text-3xl font-semibold text-gray-800">{product?.name}</h1>
            <Rating value={3.5} />
            <div className="flex items-center gap-2 text-lg font-medium text-gray-800">
              ₹{product?.price?.org}{" "}
              <span className="text-sm font-medium line-through text-gray-500">
                ₹{product?.price?.mrp}
              </span>{" "}
              <span className="text-sm font-medium text-green-600">
                ({product?.price?.off}% Off)
              </span>
            </div>
            <p className="text-base font-normal text-gray-600">{product?.desc}</p>
            <div className="text-base font-medium">Ingredients:</div>
            <div className="flex flex-wrap gap-3">
              {product?.ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="bg-green-100 text-green-600 text-sm px-3 py-1 rounded-full"
                >
                  {ingredient}
                </div>
              ))}
            </div>
            <div className="flex gap-4 py-8 md:py-4">
              <Button
                text="Add to Cart"
                full
                outlined
                isLoading={cartLoading}
                onClick={() => addCart()}
              />
              <Button text="Order Now" full />
              <Button
                leftIcon={
                  favorite ? (
                    <FavoriteRounded sx={{ fontSize: "22px", color: "red" }} />
                  ) : (
                    <FavoriteBorderOutlined sx={{ fontSize: "22px" }} />
                  )
                }
                full
                outlined
                isLoading={favoriteLoading}
                onClick={() => (favorite ? removeFavourite() : addFavourite())}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDetails;

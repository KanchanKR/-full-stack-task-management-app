/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { CircularProgress, Rating } from "@mui/material";
import {
  AddShoppingCartOutlined,
  FavoriteBorder,
  FavoriteRounded,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  addToFavourite,
  deleteFromFavourite,
  getFavourite,
  addToCart,
} from "../../api";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../redux/reducers/SnackbarSlice";

const ProductsCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  const addFavourite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("krist-app-token");
    console.log("Token being sent:", token); // Log the token
    
    await addToFavourite(token, { productId: product?._id })
      .then((res) => {
        setFavorite(true);
        setFavoriteLoading(false);
      })
      .catch((err) => {
        setFavoriteLoading(false);
        console.log(err);
        dispatch(
          openSnackbar({
            message: err.response.data.message,
            severity: "error",
          })
        );
      });
  };
  

  const removeFavourite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("krist-app-token");
    await deleteFromFavourite(token, { productId: product?._id })
      .then(() => {
        setFavorite(false);
        setFavoriteLoading(false);
      })
      .catch((err) => {
        setFavoriteLoading(false);
        dispatch(
          openSnackbar({
            message: err.response.data.message,
            severity: "error",
          })
        );
      });
  };

  const checkFavorite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("krist-app-token");
    await getFavourite(token, { productId: product?._id })
      .then((res) => {
        const isFavorite = res.data?.some(
          (favorite) => favorite._id === product?._id
        );
        setFavorite(isFavorite);
        setFavoriteLoading(false);
      })
      .catch((err) => {
        setFavoriteLoading(false);
        dispatch(
          openSnackbar({
            message: err.response.data.message,
            severity: "error",
          })
        );
      });
  };

  const addCart = async (id) => {
    const token = localStorage.getItem("krist-app-token");
    await addToCart(token, { productId: id, quantity: 1 })
      .then(() => {
        navigate("/cart");
      })
      .catch((err) => {
        dispatch(
          openSnackbar({
            message: err.response.data.message,
            severity: "error",
          })
        );
      });
  };

  useEffect(() => {
    checkFavorite();
  }, [favorite]);

  return (
    <div className="group w-[300px] flex flex-col gap-4 transition-all duration-300 cursor-pointer sm:w-[180px]">
      {/* Image container with hover effect */}
      <div className="relative flex items-center justify-center rounded-lg transition-all duration-300 hover:bg-black">
        <img
          src={product?.img}
          alt={product?.name}
          className="w-full h-[300px] object-cover rounded-lg transition-opacity duration-300 sm:h-[180px] hover:opacity-90"
        />
        
        {/* Icons (favorite & cart) visible only when parent is hovered */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-3 hidden group-hover:flex">
          {/* Favorite Icon */}
          <div
            onClick={() => (favorite ? removeFavourite() : addFavourite())}
            className="rounded-full w-[36px] h-[36px] bg-white p-2 flex items-center justify-center shadow-lg cursor-pointer"
          >
            {favoriteLoading ? (
              <CircularProgress sx={{ fontSize: "20px" }} />
            ) : favorite ? (
              <FavoriteRounded sx={{ fontSize: "20px", color: "red" }} />
            ) : (
              <FavoriteBorder sx={{ fontSize: "20px" }} />
            )}
          </div>

          {/* Cart Icon */}
          <div
            onClick={() => addCart(product?._id)}
            className="rounded-full w-[36px] h-[36px] bg-white p-2 flex items-center justify-center shadow-lg cursor-pointer"
          >
            <ShoppingBagOutlined sx={{ fontSize: "20px" }} />
          </div>
        </div>

        {/* Rating Badge */}
        <div className="absolute bottom-2 left-2 z-10 bg-white p-1 rounded-md flex items-center opacity-90">
          <Rating value={3.5} sx={{ fontSize: "14px" }} />
        </div>
      </div>

      {/* Product Details */}
      <div
        className="flex flex-col gap-1 px-2"
        onClick={() => navigate(`/dishes/${product._id}`)}
      >
        <h3 className="text-lg font-bold text-primary">{product?.name}</h3>
        <p className="text-base font-normal text-primary line-clamp-2">
          {product?.desc}
        </p>
        <div className="flex items-center gap-2">
          <p className="text-lg font-medium text-primary">${product?.price?.org}</p>
          <span className="text-sm font-medium text-secondary/60 line-through">
            ${product?.price?.mrp}
          </span>
          <span className="text-sm font-medium text-green-500">
            (${product?.price?.off}% Off)
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;

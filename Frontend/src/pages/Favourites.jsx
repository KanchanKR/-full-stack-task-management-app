import { useEffect, useState } from "react";
import ProductsCard from "../components/cards/ProductsCard";
import { getFavourite } from "../api";
import { CircularProgress } from "@mui/material";

const Favourites = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    setLoading(true);
    const token = localStorage.getItem("krist-app-token");
    await getFavourite(token).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="p-5 md:p-6 pb-48 h-full overflow-y-auto flex flex-col items-center gap-8 bg-gray-100">
      <div className="w-full max-w-7xl py-8 flex flex-col gap-7">
        <div className="text-3xl font-semibold flex justify-between items-center">
          Your Favourites
        </div>
        <div className="flex flex-wrap gap-8 justify-center">
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              {products.map((product) => (
                <ProductsCard key={product._id} product={product} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favourites;

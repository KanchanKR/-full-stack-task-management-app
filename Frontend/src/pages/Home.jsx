import { useEffect, useState } from "react";
import { category } from "../utils/data";
import HeaderImage from "../utils/Images/Header.png";
import ProductCategoryCard from "../components/cards/ProductCategoryCard";
import ProductsCard from "../components/cards/ProductsCard";
import { getAllProducts } from "../api";
import { CircularProgress } from "@mui/material";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    setLoading(true);
    await getAllProducts().then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 p-5 md:p-8 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="max-w-6xl p-8">
        <img src={HeaderImage} className="w-full max-w-5xl" alt="Header" />
      </div>

      {/* Food Categories Section */}
      <div className="max-w-6xl p-8">
        <div className="text-2xl font-semibold mb-6">Food Categories</div>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {category.map((category) => (
            <ProductCategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>

      {/* Most Popular Section */}
      <div className="max-w-6xl p-8">
        <div className="text-2xl font-semibold mb-6">Most Popular</div>
        {loading ? (
          <div className="flex justify-center">
            <CircularProgress />
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {products.map((product) => (
              <ProductsCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

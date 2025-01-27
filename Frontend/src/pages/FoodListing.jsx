import { useEffect, useState } from "react";
import ProductCard from "../components/cards/ProductsCard";
import { filter } from "../utils/data";
import { CircularProgress, Slider } from "@mui/material";
import { getAllProducts } from "../api";

const FoodListing = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]); // Default price range
  const [selectedCategories, setSelectedCategories] = useState([]); // Default selected categories

  const getFilteredProductsData = async () => {
    setLoading(true);
    // Call the API function for filtered products
    await getAllProducts(
      selectedCategories.length > 0
        ? `minPrice=${priceRange[0]}&maxPrice=${
            priceRange[1]
          }&categories=${selectedCategories.join(",")}`
        : `minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`
    ).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getFilteredProductsData();
  }, [priceRange, selectedCategories]);

  return (
    <div className="flex flex-col md:flex-row gap-8 p-5 md:p-8 bg-gray-100 min-h-screen">
      <div className="flex flex-col gap-4 w-full md:w-1/4">
        <div className="p-4 bg-white rounded-md shadow-lg w-full">
          {filter.map((filters) => (
            <div key={filters.name} className="mb-6">
              <div className="text-lg font-semibold mb-4">{filters.name}</div>
              {filters.value === "price" ? (
                <Slider
                  aria-label="Price"
                  defaultValue={priceRange}
                  min={0}
                  max={1000}
                  valueLabelDisplay="auto"
                  marks={[
                    { value: 0, label: "$0" },
                    { value: 1000, label: "$1000" },
                  ]}
                  onChange={(e, newValue) => setPriceRange(newValue)}
                />
              ) : filters.value === "category" ? (
                <div className="flex flex-wrap gap-2">
                  {filters.items.map((item) => (
                    <div
                      key={item}
                      className={`px-3 py-1 cursor-pointer border rounded-md text-sm ${
                        selectedCategories.includes(item)
                          ? "bg-blue-500 text-white border-blue-500"
                          : "border-gray-300 text-gray-600"
                      }`}
                      onClick={() =>
                        setSelectedCategories((prevCategories) =>
                          prevCategories.includes(item)
                            ? prevCategories.filter(
                                (category) => category !== item
                              )
                            : [...prevCategories, item]
                        )
                      }
                    >
                      {item}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 p-5 bg-white rounded-md shadow-lg">
        <div className="flex flex-wrap justify-center gap-6">
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodListing;

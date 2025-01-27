/* eslint-disable react/prop-types */


const ProductCategoryCard = ({ category }) => {
  return (
    <div className="w-[250px] flex flex-col gap-4 transition-all duration-300 cursor-pointer sm:w-[170px]">
      <div className="relative flex items-center justify-center rounded-lg transition-all duration-300 hover:bg-primary">
        <img
          src={category.img}
          alt={category.name}
          className="w-full h-[320px] object-cover rounded-lg transition-opacity duration-300 sm:h-[230px] hover:opacity-80"
        />
        <div className="absolute bottom-0 w-full z-10 flex gap-3 p-2 bg-gradient-to-t from-black to-transparent">
          <div className="w-full text-white text-center font-medium py-3 px-5 rounded-lg bg-gradient-to-t from-black to-transparent sm:py-2 sm:px-3">
            {category.name}
          </div>
        </div>
        <div className="absolute top-2 right-2 z-10 text-xs font-bold text-white bg-green-500 py-1 px-2 rounded-md sm:text-[10px]">
          {category.off}
        </div>
      </div>
    </div>
  );
};

export default ProductCategoryCard;

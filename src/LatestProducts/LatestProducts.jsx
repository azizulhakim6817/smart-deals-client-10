import { use } from "react";
import Product from "../component/Product/Product";

const LatestProducts = ({ latestProduct }) => {
  const latestProductsItems = use(latestProduct);
  //console.log("LKFja", latestProductsItems);

  return (
    <div className="mt-6 gap-4 mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {latestProductsItems?.data?.slice(0, 6)?.map((product, i) => (
        <Product key={i} product={product} />
      ))}
    </div>
  );
};

export default LatestProducts;

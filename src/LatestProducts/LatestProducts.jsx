import { use } from "react";
import Product from "../component/Product/Product";

const LatestProducts = ({ latestProduct }) => {
  const latestProducts = use(latestProduct);
  //console.log(latestProducts);
  return (
    <div className="mt-6 gap-4 mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {latestProducts?.data?.slice(0, 6)?.map((product) => (
        <Product key={product?._id} product={product} />
      ))}
    </div>
  );
};

export default LatestProducts;

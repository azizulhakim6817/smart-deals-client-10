import { use } from "react";
import Product from "../Product/Product";
const latestProductPromise = fetch(
  "https://smart-deals-server-10.vercel.app/latest-products"
).then((res) => res.json());

const AllProducts = () => {
  const products = use(latestProductPromise);

  return (
    <div className="mt-6 gap-4 mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product, i) => (
        <Product key={i} product={product} />
      ))}
    </div>
  );
};

export default AllProducts;

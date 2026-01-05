import { Link } from "react-router";

const Product = ({ product }) => {
  //console.log("product", product);
  return (
    <div className="card bg-base-100  shadow-sm">
      <figure className="px-4 pt-4">
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body ">
        <h2 className="card-title font-bold text-[#001931]">
          {product?.title}
        </h2>
        <p className="text-start text-secondary font-bold">
          ${product.price_max}-{product.price_min}
        </p>
        <div className="card-actions">
          <Link
            to={`/product-details/${product._id}`}
            className="w-full btn btn-outline btn-primary"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;

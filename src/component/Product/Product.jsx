import { Link } from "react-router";

const Product = ({ product }) => {
  //console.log("product", product);

  return (
    <div className="card bg-base-100 shadow-sm animate-in fade-in zoom-in duration-300 transition-transform hover:scale-105 hover:shadow-lg">
      <figure className="px-4 pt-4">
        <img
          src={product?.image}
          alt="Shoes"
          className="rounded-xl h-40 w-110"
        />
      </figure>
      <div className="card-body ">
        <h2 className="card-title font-bold ">{product?.title}</h2>
        <p className="text-start text-secondary font-bold">
          ${product?.price_max}-{product?.price_min}
        </p>
        <div className="card-actions">
          <Link
            to={`/product-details/${product?._id}`}
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

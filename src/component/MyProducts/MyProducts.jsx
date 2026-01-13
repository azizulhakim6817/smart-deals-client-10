import { useEffect, useState } from "react";
import useAuth from "./../../hooks/useAuth";
import { Link } from "react-router";
import { toast } from "react-toastify";

const MyProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingProduct, setLoadingProduct] = useState(false);

  useEffect(() => {
    fetch(
      `https://smart-deals-server-10.vercel.app/my-products?email=${user.email}`,
      {
        headers: { authorization: `Bearer ${user.accessToken}` },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  const handleDownload = (product) => {
    fetch("https://smart-deals-server-10.vercel.app/downloads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: product._id,
        title: product.title,
        image: product.image,
        price_min: product.price_min,
        price_max: product.price_max,
        seller_name: product.seller_name,
        download_by: user.email,
      }),
    })
      .then((res) => res.json())
      .then(() => toast.success("Successfully Downloaded"))
      .catch((err) => {
        console.error(err);
        toast.error("Download failed");
      });
  };

  //! handleSearchSubmit--------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    const search_text = e.target.search.value.trim();
    setLoadingProduct(true);
    //console.log("search", search_text);
    fetch(
      `https://smart-deals-server-10.vercel.app/search?search=${search_text}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data.data);
        setLoadingProduct(false);
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-4 bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-lg font-semibold">Loading, please wait...</p>
      </div>
    );
  }

  /*  if (loadingProduct) {
    return (
      <div className="text-center mt-36">
        <span className="loading loading-spinner loading-xl text-blue-700"></span>
      </div>
    );
  } */

  return (
    <div>
      <div className="mt-4 mb-8 mx-4 text-center">
        <h1 className="my-4 text-2xl font-bold text-gray-700 dark:text-white ">
          MY 3D PRODUCTS
        </h1>
        {/* search input--------------------------------- */}
        <div>
          <form onSubmit={handleSubmit}>
            <label className="input rounded-full">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input type="search" name="search" placeholder="Search" />
            </label>
            <button
              type="submit"
              className="btn rounded-full text-white bg-blue-600"
            >
              {loadingProduct ? "Searching..." : " search"}
            </button>
          </form>
        </div>
      </div>
      <div className="my-12 gap-4 mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product, i) => (
          <div
            key={i}
            className="card bg-base-100 shadow-sm animate-in fade-in zoom-in duration-300 transition-transform hover:scale-105 hover:shadow-lg"
          >
            <figure className="px-4 pt-4">
              <img
                src={product?.image}
                alt={product.title}
                className="rounded-xl h-40 w-110"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title font-bold">{product?.title}</h2>
              <p className="text-start text-secondary font-bold">
                ${product.price_max}-{product.price_min}
              </p>
              {/*   <p className="text-start text-secondary font-bold">
              Downloads : ({product?.downloads})
            </p> */}
              <div className="card-actions grid grid-cols-1 md:grid-cols-3 gap-2">
                <Link
                  to={`/product-details/${product._id}`}
                  className="w-full btn btn-outline btn-primary"
                >
                  View Details
                </Link>
                <button
                  onClick={() => handleDownload(product)}
                  className="w-full btn btn-secondary"
                >
                  Download
                </button>
                <button className="w-full btn text-white btn-error">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProducts;

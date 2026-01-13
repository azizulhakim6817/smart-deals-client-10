import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";

const MyDownloads = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://smart-deals-server-10.vercel.app//get-downloads?email=${user.email}`,
      {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-4 bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-lg font-semibold">Loading, please wait...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="my-12 gap-4 mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product, i) => (
          <div
            key={product._id}
            className="card bg-base-100 shadow-sm animate-in fade-in zoom-in duration-300 transition-transform hover:scale-105 hover:shadow-lg"
          >
            <figure className="px-4 pt-4">
              <img
                src={product?.image}
                alt="Shoes"
                className="rounded-xl h-40 w-110"
              />
            </figure>
            <div className="card-body ">
              <h2 className="card-title font-bold text-[#001931]">
                {product?.title}
              </h2>
              <p className="text-start text-secondary font-bold">
                ${product.price_max}-{product.price_min}
              </p>
              <div className="card-actions grid grid-cols-1 md:grid-cols-2">
                <Link
                  to={`/downloads-details/${product._id}`}
                  className="w-full btn btn-outline btn-primary"
                >
                  View Details
                </Link>

                {/*  <button
                  onClick={dandleDownload}
                  className="w-full btn text-white  btn-warning"
                >
                  Download
                </button> */}
                <button
                  to={`/product-details/${product._id}`}
                  className="w-full btn text-white  btn-error"
                >
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

export default MyDownloads;

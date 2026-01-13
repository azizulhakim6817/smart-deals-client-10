import { Search } from "lucide-react";
import { Suspense } from "react";
import LatestProducts from "../../LatestProducts/LatestProducts";
import { Link } from "react-router";

const latestProductPromise = fetch(
  "https://smart-deals-server-10.vercel.app/latest-products"
).then((res) => res.json());

const Home = () => {
  return (
    <div className="text-center">
      <h1 className="mt-6 text-2xl md:text-5xl font-bold">
        Deal your <span className="text-secondary">Products</span> <br /> in a{" "}
        <span className="text-secondary">Smart</span> way !
      </h1>
      <p className="my-4 px-4 text-[14px]">
        SmartDeals helps you sell, resell, and shop from trusted local sellers —
        all in one place!
      </p>
      {/* input search */}
      <div className="mb-3">
        <div className="join">
          <div>
            <label className="rounded-l-full input validator join-item">
              <input
                type="email"
                placeholder="search For Products, Categoriees..."
                required
              />
            </label>
          </div>
          <button className="rounded-r-full text-white btn bg-gradient-to-r from-primary to-secondary join-item">
            <Search size={18} className="" />
          </button>
        </div>
      </div>
      {/* button-2 */}
      <div className="mx-4 flex flex-col md:flex-row justify-center items-center gap-2">
        <button className="btn text-white bg-gradient-to-r from-primary to-secondary">
          Watch All Products
        </button>
        <button className="btn btn-active">Post an Product</button>
      </div>

      {/* latest-products */}
      <div>
        <div className="mt-6 md:mt-12 px-4">
          <h1 className="text-4xl font-bold  text-gray-700 dark:text-white">
            Recent <span className="text-secondary">Products</span>
          </h1>
        </div>
        <Suspense fallback={<p>Loading...</p>}>
          <LatestProducts latestProduct={latestProductPromise} />
        </Suspense>
        <div className="text-center my-8">
          <Link
            to="/allProducts"
            className="btn text-white bg-gradient-to-r from-primary to-secondary"
          >
            Show All
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

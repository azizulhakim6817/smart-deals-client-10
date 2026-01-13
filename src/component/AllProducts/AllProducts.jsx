import { useEffect, useState } from "react";
import Product from "../Product/Product";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  //console.log(totalPages); // 6 pages
  const limit = 6;
  //console.log(totalProducts); // 26 products

  //!sort--useState()---------
  const [sort, setSort] = useState("price_min");
  const [price, setPrice] = useState("");

  //! search--useState()---------
  const [seachText, setSearchText] = useState("");

  //! paginatoin------------------------------ */
  useEffect(() => {
    fetch(
      `https://smart-deals-server-10.vercel.app//latest-products?limit=${limit}&skip=${
        currentPage * limit
      }&sort=${sort}&price=${price}&search=${seachText}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        setTotalProducts(data.total);
        /* total / limit ----page---setTotalPages-----*/
        const pages = Math.ceil(data.total / limit);
        setTotalPages(pages);
        setLoading(false);
      });
  }, [currentPage, limit, sort, price, seachText]);

  //! sort -------------------
  const handleSort = (e) => {
    e.preventDefault();
    const sortText = e.target.value; // e.g. "price_min-asc"
    const [sort, price] = sortText.split("-");
    setSort(sort);
    setPrice(price);
  };

  //! search -------------------
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

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
      {/* length--search--sort/filter-----------------*/}
      <div className="my-8 mx-10 gap-2 grid grid-cols-1 md:grid-cols-3 justify-between items-center">
        <div>
          <h1 className="text-[16px] md:text-2xl font-bold">
            <span className="text-blue-700">( {totalProducts} )</span>
            <span className=" text-gray-700">All-Products</span>
          </h1>
        </div>
        {/* search-------------------------------------*/}
        <div>
          <label className="input">
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
            <input
              type="search"
              onChange={handleSearchChange}
              required
              placeholder="Search"
            />
          </label>
        </div>
        {/* sort------------------------------------------*/}
        <div onClick={handleSort} className="text-end">
          <select defaultValue="Price" className="select">
            <option value="price_min-asc">Price: Low to High</option>
            <option value="price_min-desc">Price: High to Low</option>
            <option value="createdAt-desc">Latest Products</option>
          </select>
        </div>
      </div>
      {/* all products------------------------------------*/}
      <div className="my-6 gap-4 mx-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      {/* pagination button-- 1,2,3,4,5,6----------------------------- */}
      <div className="my-8 mx-1 md:mx-10 flex justify-center md:justify-end items-center gap-1 md:gap-4">
        {/* prev button */}
        {currentPage > 0 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="btn btn-secondary"
          >
            Prev
          </button>
        )}
        {[...Array(totalPages).keys()].map((i) => (
          <button
            onClick={() => setCurrentPage(i)}
            className={`btn ${i === currentPage && "btn-primary"}`}
          >
            {i + 1}
          </button>
        ))}
        {/* next button */}
        {currentPage < totalPages - 1 && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="btn btn-secondary"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default AllProducts;

import { MoveLeft } from "lucide-react";
import { CircleUser } from "lucide-react";
import { use } from "react";
import { useRef } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "./../../constext/AuthContext";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import confetti from "canvas-confetti";

const ProductDetails = () => {
  const { user } = use(AuthContext);
  const products = useLoaderData();

  //bids -----------------------------------------
  const [bids, setBids] = useState([]);

  //product id by bid modal open----------------------------------
  const bideModalRef = useRef(null);
  const handleModalOpen = (e) => {
    e.preventDefault();
    bideModalRef.current.showModal();
    handleBidConvas();

    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const bid = e.target.bid.value;
    //console.log(products._id, name, email, bid, phone);

    const newBid = {
      product: products._id,
      buyer_name: name,
      buyer_image: photo,
      buyer_email: email,
      buyer_contact: phone,
      bid_price: parseFloat(bid),
      status: "pending",
    };
    // console.log("bids", newBid);

    fetch(`https://smart-deals-server-10.vercel.app//bids`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          bideModalRef.current.close();
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Your bid has been placed",
            showConfirmButton: false,
            timer: 1500,
          });
          //add the new bid to the state and sort(a,b)-----------
          newBid._id = data.insertedId;
          const newBidsPorduct = [...bids, newBid];
          newBidsPorduct.sort((a, b) => a.bid_price - b.bid_price);
          setBids(newBidsPorduct);
        }
      });
  };

  //popup chance button -----------------
  const handleModalChancel = (e) => {
    e.preventDefault();
    bideModalRef.current.close();
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Your bid has been chanced",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  /* table data product id by all bids-------- */
  useEffect(() => {
    axios
      .get(
        `https://smart-deals-server-10.vercel.app//product-by-id/${products._id}`,
        {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((data) => {
        console.log(data.data);
        setBids(data.data);
      });
  }, [products._id]);

  /* table data product id by all bids-------- */
  //!fetch method uses ---------------------------------
  // useEffect(() => {
  //   fetch(`https://smart-deals-server-10.vercel.app//product-by-id/${products._id}`, {
  //     headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setBids(data);
  //     });
  // }, [products._id]);

  //remove bid -------------------
  const handleRemoveBid = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://smart-deals-server-10.vercel.app//bids-delete/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your bid has been deleted.",
                icon: "success",
              });
              // ✅ remove bid from UI state
              const remainingBids = bids.filter((bid) => bid._id !== _id);
              setBids(remainingBids);
            }
          });
      }
    });
  };

  /* canvas buttons --------------------------- */
  const handleBidConvas = () => {
    const end = Date.now() + 15 * 1000;
    const colors = ["#bb0000", "#ffffff"];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });

      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })(); // ✅ MUST call it
  };

  return (
    <div>
      <div className="card flex flex-col lg:flex-row my-8 mx-4 md:mx-26 card-side bg-base-300 shadow-sm">
        <div className="lg:w-6/12">
          {/* image */}
          <figure>
            <img
              className=" lg:h-75 rounded-md"
              src={products.image}
              alt="Movie"
            />
          </figure>
          {/* Product Description  */}
          <div className="bg-white rounded-md px-2 py-2 my-2 mt-4">
            <p className="font-bold text-[18px]">Product Details</p>

            <div className="flex justify-between items-center">
              <p className="my-1 text-[#001931] text-[12px]">Condition : New</p>
              <p className="my-1 text-[#001931] text-[12px]">
                Usage Time : 3 Month
              </p>
            </div>
            <hr className="my-2" />
            <p className="my-2 text-[#969A9D] text-[12px] md:text-[14px]">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on
              purpose (injected humour and the like).
            </p>
          </div>
        </div>
        <div className="card-body">
          {/*Back to Products  */}
          <div className="mt-4 flex gap-1 justify-start items-center">
            <MoveLeft />
            <span className="text-[12px]">Back to Products</span>
          </div>
          {/* title */}
          <h2 className="card-title text-[14px] md:text-3xl font-bold">
            {products?.title}
          </h2>
          <span className="w-22.5 text-center rounded-full text-[10px] text-primary bg-gray-300">
            Art and Hobbies
          </span>
          {/* Price starts from  */}
          <div className="bg-white rounded-md px-2 py-2 my-2">
            <p className="font-bold text-[#4CAF50] text-[14px]">
              ${products.price_min}-{products.price_max}
            </p>
            <p className="text-[#001931] text-[12px]">Price starts from </p>
          </div>
          {/* Product Details  */}
          <div className="bg-white rounded-md px-2 py-2 my-2">
            <p className="font-bold text-[14px]">Product Details</p>
            <p className="my-1 text-[#001931] text-[12px]">
              Product ID : {products._id}
            </p>
            <p className="text-[#001931] text-[12px]">
              Posted : {new Date(products.created_at).toLocaleDateString()}
            </p>
          </div>
          {/* Seller Information  */}
          <div className="bg-white rounded-md px-2 py-2 my-2">
            <p className="font-bold text-[14px]">Seller Information</p>
            <div className="my-2 flex justify-start items-center gap-2">
              <CircleUser />
              <div>
                <p className=" text-[#001931] text-[12px]">Sara Chen</p>
                <p className=" text-[#001931] text-[12px]">
                  crafts.by.sara@shop.net
                </p>
              </div>
            </div>
            <p className="my-2 text-[#001931] text-[12px]">
              Location : Los Angeles, CA
            </p>
            <p className="text-[#001931] text-[12px]">
              Contact : sara.chen_contact
            </p>
            <p className="my-2 text-[#001931] text-[12px]">
              <span> Status : </span>
              <span className="px-2 w-22.5 text-center rounded-full text-[10px] text-black bg-orange-400">
                Call On
              </span>
            </p>
          </div>
          {/*dialog & button click to open */}
          <div className="card-actions justify-end">
            <button
              onClick={handleModalOpen}
              className="w-full btn text-white bg-gradient-to-r from-primary to-secondary"
            >
              Watch
            </button>
            {/* module button */}
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            {/*  <button
            className="btn"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            open modal
          </button> */}
            <dialog
              ref={bideModalRef}
              id="my_modal_5"
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">
                  Press ESC key or click the button below to close
                </p>

                <form method="dialog" onSubmit={handleModalOpen}>
                  <fieldset className="fieldset">
                    <label className="label">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="input w-full"
                      defaultValue={user?.displayName}
                      readOnly
                    />
                    <label className="label">User Photo</label>
                    <input
                      type="text"
                      name="photo"
                      className="input w-full"
                      defaultValue={user?.photoURL}
                      readOnly
                    />
                    <label className="label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="input w-full"
                      defaultValue={user?.email}
                      readOnly
                    />
                    <label className="label">Contact Number</label>
                    <input
                      type="text"
                      name="phone"
                      className="input w-full"
                      placeholder="Phone number..."
                    />

                    <label className="label">Amount</label>
                    <input
                      type="text"
                      name="bid"
                      className="input w-full"
                      placeholder="Amount"
                    />

                    <button
                      onClick={handleBidConvas}
                      className="btn btn-neutral mt-4"
                    >
                      Please Your Bid
                    </button>
                  </fieldset>
                  {
                    <button
                      onClick={handleModalChancel}
                      className="mt-4 btn w-full"
                    >
                      Chancel
                    </button>
                  }
                </form>
              </div>
            </dialog>
          </div>
        </div>
      </div>

      {/* bid for this products  */}
      <div className="my-8 md:my-12 mx-4 md:mx-26">
        <h1 className="text-2xl font-bold text-[#001931]">
          Bids For This Products:{" "}
          <span className="text-primary">({bids.length})</span>
        </h1>

        {/* table */}
        <div>
          <div className="overflow-x-auto bg-white rounded-md px-2 py-2 my-2 mt-4">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Sl NO</th>
                  <th>Buyer Name</th>
                  <th>Buyer Email</th>
                  <th>Bid Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {bids.map((bidsProduct, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              className="w-20 h-20"
                              src={bidsProduct?.buyer_image}
                              alt=""
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">
                            {bidsProduct?.buyer_name}
                          </div>
                          <div className="text-sm opacity-50">
                            United States
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{bidsProduct.buyer_email}</td>
                    <td>${bidsProduct.bid_price}</td>
                    <td>
                      {bidsProduct.status === "pending" ? (
                        <div className="badge badge-warning">
                          {bidsProduct.status}
                        </div>
                      ) : (
                        <div className="badge badge-success">
                          {bidsProduct.status}
                        </div>
                      )}
                    </td>
                    <th>
                      <div
                        onClick={() => {
                          handleRemoveBid(bidsProduct._id);
                          handleBidConvas();
                        }}
                        className="badge text-red-600 badge-outline cursor-pointer"
                      >
                        Remove Bid
                      </div>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

import { use } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../constext/AuthContext";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyBids = () => {
  //! user find-----------
  const { user } = use(AuthContext);
  //console.log("Users", user);

  //!setBids all in useState-------------------------------
  const [bids, setBids] = useState([]);
  //console.log(bids);

  //!axiosSecure ----------------------
  const axiosSecure = useAxiosSecure();

  //! get user by email find product by all bids.
  useEffect(() => {
    axiosSecure
      .get(`/bids-email-all-data?email=${user?.email}`)
      .then((data) => {
        console.log(data?.data);
        setBids(data?.data);
      });
  }, [user, axiosSecure]);

  /* //! get user by email find product by all bids.
  useEffect(() => {
    if (user?.email) {
      fetch(`https://smart-deals-server-10.vercel.app/bids-email-all-data?email=${user?.email}`, {
        headers: { authorization: `Bearer ${user.accessToken}` },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setBids(data);
        });
    }
  }, [user]); */

  //!remove bid -------------------
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
        fetch(`https://smart-deals-server-10.vercel.app/bids-delete/${_id}`, {
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

  return (
    <div>
      {/* bid for this products  */}
      <div className="my-8 md:my-12 mx-4 md:mx-26">
        <h1 className="text-2xl font-bold text-[#001931]">
          Bids For This Products:{" "}
          <span className="text-primary">({bids?.length})</span>
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
                    <td>{bidsProduct?.buyer_email}</td>
                    <td>${bidsProduct?.bid_price}</td>
                    <td>
                      {bidsProduct.status === "pending" ? (
                        <div className="badge badge-warning">
                          {bidsProduct?.status}
                        </div>
                      ) : (
                        <div className="badge badge-success">
                          {bidsProduct?.status}
                        </div>
                      )}
                    </td>
                    <th>
                      <div
                        onClick={() => handleRemoveBid(bidsProduct?._id)}
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

export default MyBids;

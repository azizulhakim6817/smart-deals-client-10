import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";

const CreateAProduct = () => {
  const navigate = useNavigate();
  //! AuthContext is called to hooks folder import */
  const { user } = useAuth();
  //console.log("suer", user);

  //! axiosInstance(useAxios(url))----------
  //const axiosInstance = useAxios();

  //! useAxiosSecure(useAxios(url))----------
  const axiosSecure = useAxiosSecure();

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const price_min = e.target.price_min.value;
    const price_max = e.target.price_max.value;
    const image = e.target.image.value;

    console.log(title, description, price_min, price_max, image);
    const newProduct = {
      title,
      description,
      price_min,
      price_max,
      image,
      seller_name: user.displayName,
      email: user.email,
    };
    axiosSecure.post("/products", newProduct).then((data) => {
      console.log(data.data);
      if (data.data.insertedId) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Your product has been created 👍",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate("/allProducts"); // ✅ navigate after alert closes
        });
      }
    });

    //! axios try now----------------------- */
    // axios.post("https://smart-deals-server-10.vercel.app/products", newProduct).then((data) => {
    //   console.log(data.data);
    //   if (data.data.insertedId) {
    //     Swal.fire({
    //       position: "top-center",
    //       icon: "success",
    //       title: "Your product has been created 👍",
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //   }
    // });
  };

  return (
    <div className="my-8 mx-4  min-h-screen">
      <div className="card mx-auto w-full max-w-sm md:max-w-xl shrink-0 shadow-2xl">
        <div className="text-center">
          <h1 className="mt-4 text-2xl font-bold text-gray-800">
            Create A New Product
          </h1>
        </div>
        <div className="card-body">
          <fieldset className="fieldset">
            <form onSubmit={handleSubmitForm} className="space-y-2">
              {/* title */}
              <label className="label font-bold">Title</label>
              <input
                type="text"
                name="title"
                className="input w-full "
                placeholder="Title"
              />
              {/* description */}
              <label className="label font-bold">Description</label>
              <input
                type="text"
                name="description"
                className="input w-full"
                placeholder="Description"
              />
              {/* price_min */}
              <label className="label font-bold">Price_min</label>
              <input
                type="text"
                name="price_min"
                className="input w-full"
                placeholder="$Price_min"
              />
              {/* price_max */}
              <label className="label font-bold">Price_max</label>
              <input
                type="text"
                name="price_max"
                className="input w-full"
                placeholder="$price_max"
              />
              {/* image */}
              <label className="label font-bold">Image</label>
              <input
                type="text"
                name="image"
                className="input w-full"
                placeholder="image"
              />

              <button className="btn w-full text-white bg-gradient-to-r from-primary to-secondary">
                Create product
              </button>
            </form>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default CreateAProduct;

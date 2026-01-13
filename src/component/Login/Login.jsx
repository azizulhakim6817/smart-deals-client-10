import { use } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

const Login = () => {
  const axiosInstance = useAxios();
  const { googleSignIn, signInUser } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  //! form register---------------------------------------
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      //! Firebase user create
      const result = await signInUser(email, password);
      const user = result.user;
      console.log("Firebase user:", user);
      //! Backend save (NO password)
      const newUser = {
        email: user.email,
        created_at: new Date(),
      };
      const res = await axiosInstance.post("/users", newUser);
      console.log("Backend:", res.data);
      //!redirect (optional)
      navigate(location.state || "/");
    } catch (error) {
      console.error("Register failed:", error.message);
    }
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        console.log(result.user);

        const newUser = {
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
        };

        fetch("https://smart-deals-server-10.vercel.app//users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("After Users", data);
            navigate(location.state || "/");
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="my-8 card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-2xl font-bold text-center">Login now!</h1>

        <form onSubmit={handleLogin}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
            />

            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Password"
            />

            <button className="btn btn-neutral mt-4">Login</button>
          </fieldset>
        </form>

        {/* Google */}
        <button
          onClick={handleGoogleSignIn}
          className="btn bg-white text-black border-[#e5e5e5]"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
        {/* redirect to register */}
        <div className="text-center mb-4">
          <p>
            Already have an account?
            <Link to="/register" className="text-blue-600 font-bold">
              <span> regiser</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

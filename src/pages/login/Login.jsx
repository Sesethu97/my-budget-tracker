import { NavLink, useNavigate } from "react-router-dom";
import loginlogo from "../../assets/loginLogo.png";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login({ setUsername, setEmail: setUserEmail }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      email === storedUser.email &&
      password === storedUser.password
    ) {
      setUsername(storedUser.username);
      setUserEmail(storedUser.email);

      navigate("/dashboard");
    } else {
      toast.error("Invalid login details");
    }

    if (!storedUser) {
      toast.error("No account found. Please sign up.");
      return;
    }
  };
  return (
    <main className="grid grid-cols-2 min-h-screen">
      <div className="bg-sidebarColor/20 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md">
          <form className="text-white" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center text-center">
                <h1 className="text-white text-3xl font-bold">Sign in</h1>
                <p className="mt-2 text-md text-subText">Welcome to BugetPal</p>
              </div>

              <div>
                <label className="block mb-2 text-md font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-full text-white bg-subText/50 border border-mainText focus:outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 text-md font-medium">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-full text-white bg-subText/50 border border-mainText focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2 w-full rounded-full font-bold transition-opacity bg-white text-black cursor-pointer border border-gray-300 bg-white"
              >
                Sign in
              </button>
              <ToastContainer />
            </div>
          </form>

          <hr className="my-6 border-subText/30" />

          <p className="text-center text-sm text-white">
            Don't have an account?{" "}
            <NavLink to="/signup" className="font-bold hover:underline">
              Sign up
            </NavLink>
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <img src={loginlogo} className="opacity-20 w-svh" />
      </div>
    </main>
  );
}
export default Login;

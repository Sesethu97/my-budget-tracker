import { NavLink, useNavigate } from "react-router-dom";
import loginlogo from "../../assets/loginLogo.png";
import { useState } from "react";

function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };
  return (
    <main className="grid grid-cols-2 min-h-screen">
      <div className="bg-sidebarColor flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <form className="text-white" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center text-center">
                <h1 className="text-white text-2xl font-bold">Sign in</h1>
                <p className="mt-2 text-sm text-subText">Welcome to BugetPal</p>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">Email</label>
                <input
                  type="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 rounded-full bg-subText/50 border border-mainText focus:outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-full bg-subText/50 border border-mainText focus:outline-none"
                />
              </div>

              <div className="flex items-center">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300"
                />
                <label
                  htmlFor="default-checkbox"
                  className="ms-2 text-sm text-white"
                >
                  Accept the terms and conditions
                </label>
              </div>

              <button
                type="submit"
                className="px-5 py-2 w-full rounded-full bg-white text-black font-bold"
              >
                Sign in
              </button>
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

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PostCreate from "../helpers/PostRequest";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    const bodyData = { fullName,email, password };
    try {
      let { data } = await PostCreate({
        url: "/register",
        method: "POST",
        data: bodyData,
      });
      console.log(data);
      navigate("/login");
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <div className="font-[sans-serif]">
      <div className="grid lg:grid-cols-2 md:grid-cols-2 items-center gap-4">
        <form onSubmit={handleRegister} className="max-w-xl w-full p-6 mx-auto">
          <div className="mb-12">
            <h3 className="text-gray-800 text-4xl font-extrabold">
              Create your account
            </h3>
            <p className="text-gray-800 text-sm mt-6">
              join many clubs in here
            </p>
          </div>

          <div>
            <label className="text-gray-800 text-sm block mb-2">
              Full Name
            </label>
            <div className="relative flex items-center">
              <input
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
                name="fullName"
                type="text"
                required
                className="w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                placeholder="Enter Full Name"
              />
            </div>
          </div>
          <div>
            <label className="text-gray-800 text-sm block mb-2">Email</label>
            <div className="relative flex items-center">
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                name="email"
                type="text"
                required
                className="w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                placeholder="Enter email"
              />
            </div>
          </div>

          <div className="mt-8">
            <label className="text-gray-800 text-sm block mb-2">Password</label>
            <div className="relative flex items-center">
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                name="password"
                type="password"
                required
                className="w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                placeholder="Enter password"
              />
            </div>
          </div>

          <div className="mt-12">
            <button
              type="submit"
              className="w-full py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Register
            </button>
          </div>
          <p className="text-gray-800 text-sm mt-6">
            Already have an account{" "}
            <Link
              to="/Login"
              className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
            >
              Login here
            </Link>
          </p>
        </form>

        <div className="max-md:order-1 h-screen min-h-full">
          <img
            src="https://readymadeui.com/image-3.webp"
            className="w-full h-full object-cover"
            alt="login-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;

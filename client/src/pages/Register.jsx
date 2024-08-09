import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PostCreate from "../helpers/PostRequest";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [weightGoalOn30day, setWeightGoalOn30day] = useState("");
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    const bodyData = {
      email,
      password,
      gender,
      height,
      weight,
      weightGoalOn30day,
    };
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
    <div className="font-sans min-h-screen h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 md:grid-cols-2 items-center gap-12 w-full max-w-7xl">
        <form
          onSubmit={handleRegister}
          className="bg-white shadow-xl rounded-lg p-8 max-w-lg w-full mx-auto"
        >
          <div className="mb-12">
            <h3 className="text-gray-900 text-3xl font-bold leading-tight">
              Create your account
            </h3>
            <p className="text-gray-600 text-sm mt-4">
              Join many clubs and connect with people here!
            </p>
          </div>

          <div className="mt-6">
            <label className="text-gray-700 text-sm block mb-2">Email</label>
            <div className="relative flex items-center">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="email"
                required
                className="w-full text-sm text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 outline-none transition duration-150"
                placeholder="Enter Email"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="text-gray-700 text-sm block mb-2">Password</label>
            <div className="relative flex items-center">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                type="password"
                required
                className="w-full text-sm text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 outline-none transition duration-150"
                placeholder="Enter Password"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-700 text-sm block mb-2">Gender</label>
            <div className="relative flex items-center">
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className=" border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm p-2"
              >
                <option value="" disabled selected>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-gray-700 text-sm block mb-2">Height</label>
            <div className="relative flex items-center">
              <input
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                name="fullName"
                type="number"
                required
                className="w-full text-sm text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 outline-none transition duration-150"
                placeholder="Enter Height"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-700 text-sm block mb-2">Weight</label>
            <div className="relative flex items-center">
              <input
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                name="fullName"
                type="number"
                required
                className="w-full text-sm text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 outline-none transition duration-150"
                placeholder="Enter your current weight"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-700 text-sm block mb-2">
              Weight Goal
            </label>
            <div className="relative flex items-center">
              <input
                value={weightGoalOn30day}
                onChange={(e) => setWeightGoalOn30day(e.target.value)}
                type="number"
                required
                className="w-full text-sm text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 outline-none transition duration-150"
                placeholder="Enter Weight Goal"
              />
            </div>
          </div>

          <div className="mt-10">
            <button
              type="submit"
              className="w-full py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow shadow-lg hover:shadow-xl"
            >
              Register
            </button>
          </div>

          <p className="text-gray-600 text-sm mt-6 text-center">
            Already have an account?{" "}
            <Link
              to="/Login"
              className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
            >
              Login here
            </Link>
          </p>
        </form>

        <div className="hidden lg:block">
          <img
            src="https://readymadeui.com/image-3.webp"
            className="w-full h-full object-cover rounded-lg shadow-lg"
            alt="login"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;

import { Link, useNavigate } from "react-router-dom";
import PostCreate from "../helpers/PostRequest";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const bodyData = { email, password };
    try {
      let { data } = await PostCreate({
        url: "/login",
        method: "POST",
        data: bodyData,
      });
      console.log(data);

      localStorage.setItem("access_token", data.access_token);
      navigate("/");
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `${error.response.data.message}`,
        icon: "error",
      });
      console.log(error.response.data.message);
    }
  };
  useEffect(() => {
    window.google.accounts.id.initialize({
      // client_id: "939437554944-at2ut7qrpk9q6kelf2q94vce3lv8knti.apps.googleusercontent.com",
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: async (response) => {
        console.log("Encoded JWT ID token: " + response.credential);

        // Check if the user already exists
        try {
          const userCheckResponse = await axios.post("https://ip.vexus.my.id/auth/check-user", {
            googleToken: response.credential
          });

          if (userCheckResponse.data.exists) {
            // User exists, proceed with the login
            const { data } = await axios.post("https://ip.vexus.my.id/auth/google", {
              googleToken: response.credential
            });

            localStorage.setItem("access_token", data.access_token);
            navigate("/");
          } else {
            // User does not exist, show Swal to collect additional details
            const dataSwal = await Swal.fire({
              title: "Enter your details",
              html: `
                <div class="flex flex-col space-y-4">
                  <div>
                    <label for="swal-input1" class="block text-sm font-medium text-gray-700">Gender</label>
                    <select id="swal-input1" class="swal2-input border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm p-2">
                      <option value="" disabled selected>Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label for="swal-input2" class="block text-sm font-medium text-gray-700">Height (cm)</label>
                    <input type="number" id="swal-input2" class="swal2-input mx-auto border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm p-2" placeholder="Height" min="0">
                  </div>
                  <div>
                    <label for="swal-input3" class="block text-sm font-medium text-gray-700">Weight (kg)</label>
                    <input type="number" id="swal-input3" class="swal2-input mx-auto border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm p-2" placeholder="Weight" min="0">
                  </div>
                  <div>
                    <label for="swal-input4" class="block text-sm font-medium text-gray-700">Weight Goal (kg)</label>
                    <input type="number" id="swal-input4" class="swal2-input border mx-auto border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm p-2" placeholder="Weight Goal" min="0">
                  </div>
                </div>
              `,
              focusConfirm: false,
              customClass: {
                popup: 'rounded-lg p-6 bg-white shadow-lg max-w-md mx-auto',
                title: 'text-lg font-bold text-gray-800 mb-4',
                confirmButton: 'bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4',
                cancelButton: 'bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded mt-4',
              },
              preConfirm: () => {
                const gender = document.getElementById("swal-input1").value;
                const height = document.getElementById("swal-input2").value;
                const weight = document.getElementById("swal-input3").value;
                const weightGoalOn30day = document.getElementById("swal-input4").value;
            
                if (!gender || !height || !weight || !weightGoalOn30day) {
                  Swal.showValidationMessage("All fields are required");
                  return false;
                }
            
                return { gender, height, weight, weightGoalOn30day };
              },
            });
            
            

            const { gender, height, weight, weightGoalOn30day } = dataSwal.value;

            const { data } = await axios.post("https://ip.vexus.my.id/auth/google", {
              googleToken: response.credential,
              data: { gender, height, weight, weightGoalOn30day },
            });

            localStorage.setItem("access_token", data.access_token);
            navigate("/");
          }
        } catch (error) {
          console.log(error);
          
          Swal.fire("Error", "Authentication failed. Please try again.", "error");
        }
      },
    });

    window.google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }
    );

    window.google.accounts.id.prompt();
  }, []);

  
  return (
    // <div className="font-[sans-serif]">
    //   <div className="grid lg:grid-cols-2 md:grid-cols-2 items-center gap-4">
    //     <form onSubmit={handleLogin} className="max-w-xl w-full p-6 mx-auto">
    //       <div className="mb-12">
    //         <h3 className="text-gray-800 text-4xl font-extrabold">
    //           Login to your account
    //         </h3>
    //         <p className="text-gray-800 text-sm mt-6">welcome back</p>
    //       </div>

    //       <div>
    //         <label className="text-gray-800 text-sm block mb-2">Email</label>
    //         <div className="relative flex items-center">
    //           <input
    //             value={email}
    //             onChange={(e) => {
    //               setEmail(e.target.value);
    //             }}
    //             name="email"
    //             type="text"
    //             required
    //             className="w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
    //             placeholder="Enter email"
    //           />
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="#bbb"
    //             stroke="#bbb"
    //             className="w-[18px] h-[18px] absolute right-2"
    //             viewBox="0 0 682.667 682.667"
    //           >
    //             <defs>
    //               <clipPath id="a" clipPathUnits="userSpaceOnUse">
    //                 <path d="M0 512h512V0H0Z" data-original="#000000"></path>
    //               </clipPath>
    //             </defs>
    //             <g
    //               clipPath="url(#a)"
    //               transform="matrix(1.33 0 0 -1.33 0 682.667)"
    //             >
    //               <path
    //                 fill="none"
    //                 strokeMiterlimit="10"
    //                 strokeWidth="40"
    //                 d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
    //                 data-original="#000000"
    //               ></path>
    //               <path
    //                 d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
    //                 data-original="#000000"
    //               ></path>
    //             </g>
    //           </svg>
    //         </div>
    //       </div>

    //       <div className="mt-8">
    //         <label className="text-gray-800 text-sm block mb-2">Password</label>
    //         <div className="relative flex items-center">
    //           <input
    //             value={password}
    //             onChange={(e) => {
    //               setPassword(e.target.value);
    //             }}
    //             name="password"
    //             type="password"
    //             required
    //             className="w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
    //             placeholder="Enter password"
    //           />
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="#bbb"
    //             stroke="#bbb"
    //             className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
    //             viewBox="0 0 128 128"
    //           >
    //             <path
    //               d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
    //               data-original="#000000"
    //             ></path>
    //           </svg>
    //         </div>
    //       </div>

    //       <div className="mt-12">
    //         <button
    //           type="submit"
    //           className="w-full py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
    //         >
    //           Sign in
    //         </button>
    //       </div>
    //       <div className="mt-12">
    //         <div id="buttonDiv"></div>
    //       </div>
    //       <p className="text-gray-800 text-sm mt-6">
    //         Dont have an account{" "}
    //         <Link
    //           to="/register"
    //           className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
    //         >
    //           Register here
    //         </Link>
    //       </p>
    //     </form>

    //     <div className="max-md:order-1 h-screen min-h-full">
    //       <img
    //         src="https://readymadeui.com/image-3.webp"
    //         className="w-full h-full object-cover"
    //         alt="login-image"
    //       />
    //     </div>
    //   </div>
    // </div>
    <div className="font-sans">
  <div className="grid lg:grid-cols-2 md:grid-cols-2 items-center gap-4">
    <form 
      onSubmit={handleLogin} 
      className="max-w-xl w-full p-8 mx-auto bg-white rounded-lg shadow-lg"
    >
      <div className="mb-12">
        <h3 className="text-gray-900 text-4xl font-extrabold">
          Login to your account
        </h3>
        <p className="text-gray-500 text-sm mt-2">Welcome back! Please enter your details.</p>
      </div>

      <div>
        <label className="text-gray-700 text-sm block mb-2">Email</label>
        <div className="relative flex items-center">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            type="email"
            required
            className="w-full text-sm text-gray-700 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-4 py-3 rounded-md outline-none transition duration-150 ease-in-out"
            placeholder="Enter your email"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#bbb"
            stroke="#bbb"
            className="w-[18px] h-[18px] absolute right-3"
            viewBox="0 0 682.667 682.667"
          >
            <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
              <path fill="none" strokeMiterlimit="10" strokeWidth="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"></path>
              <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"></path>
            </g>
          </svg>
        </div>
      </div>

      <div className="mt-8">
        <label className="text-gray-700 text-sm block mb-2">Password</label>
        <div className="relative flex items-center">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
            required
            className="w-full text-sm text-gray-700 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-4 py-3 rounded-md outline-none transition duration-150 ease-in-out"
            placeholder="Enter your password"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#bbb"
            stroke="#bbb"
            className="w-[18px] h-[18px] absolute right-3 cursor-pointer"
            viewBox="0 0 128 128"
          >
            <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"></path>
          </svg>
        </div>
      </div>

      <div className="mt-12">
        <button
          type="submit"
          className="w-full py-3 px-6 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-150 ease-in-out"
        >
          Sign in
        </button>
      </div>
      <div className="mt-12">
        <div id="buttonDiv"></div>
      </div>
      <p className="text-gray-500 text-sm mt-6">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
        >
          Register here
        </Link>
      </p>
    </form>

    <div className="max-md:order-1 h-screen min-h-full">
      <img
        src="https://readymadeui.com/image-3.webp"
        className="w-full h-full object-cover rounded-lg"
        alt="login-image"
      />
    </div>
  </div>
</div>

  );
};

export default Login;

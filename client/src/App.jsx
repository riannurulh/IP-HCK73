import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomePage from "./pages/Home";
import Navbar from "./components/Navbar";
import MyClub from "./pages/MyClub";
import UpdateClub from "./pages/ClubUpdate";

const router = createBrowserRouter([
  {
    loader: () => {
      if (localStorage.getItem("access_token")) {
        return redirect("/");
      }
      return null;
    },
    children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    element: <Navbar />,
    loader: () => {
      if (!localStorage.getItem("access_token")) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/my-clubs",
        element: <MyClub />,
      },
      {
        path: "/update-club/:clubId/:myClubId",
        element: <UpdateClub />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;

import { useEffect, useState } from "react";
import PostCreate from "../helpers/PostRequest";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { deletePlan, fetchPlans } from "../features/counter/planSlice";
// import Snap from "@midtrans/snap-js";

const HomePage = (update) => {
  // const[plan,setPlan] = useState([])
  // async function getPlan() {
  //   try {
  //     let { data } = await PostCreate({
  //       url: "/plans",
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  //       },
  //     });
  //     setPlan(data);
  //   } catch (error) {
  //     console.log(error.response.data);
  //   }
  // }
  const plan = useSelector((state) => state.plan.data);

  const dispatch = useDispatch();

  const handleUpgrade = async () => {
    try {
      // 1. example we are using axios to get to step 3 endpoint.
      //    -> example endpoint we created earlier is app.get('/payment/token')
      //    -> so we will call that endpoint to get the token
      // const { data } = await axios.get("http://localhost:3000/token");
      const { data } = await PostCreate({
        url: "/token",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      // 2. then we will use the token to open pop up snap payment
      window.snap.pay(data.token, {
        // on success we have to update the data
        onSuccess: function (result) {
          alert("payment success!");

          // 3. you should update the user subscription to premium
          // or you can call the upgrade endpoint whatever to upgrade account
        },
      });
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = (id) => {
    dispatch(deletePlan(id));
  };
  // const handleDelete = async (id) => {
  //   try {
  //     // await Snap.pay(transactionToken);

  //     await PostCreate({
  //       url: `/plans/${id}`,
  //       method: "DELETE",
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  //       },
  //     });
  //     dispatch(fetchPlans());
  //     // getPlan()
  //     // Handle pembayaran berhasil
  //   } catch (error) {
  //     // Handle pembayaran gagal
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    dispatch(fetchPlans());
    // getPlan()
  }, []);
  useEffect(() => {
    dispatch(fetchPlans());
    // getPlan()
  }, [update]);
  return (
    // <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <>
      {[
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ].map((item) => {
        return (
          <>
            <p
              className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
              key={item}
            >
              {item}
            </p>
            <div className="max-w-screen-xl flex flex-wrap  items-center gap-4 justify-start mx-auto p-8">
              {plan.map((el) => {
                return (
                  el.day === item && (
                    <Card
                      key={el.id}
                      item={el}
                      handleDelete={handleDelete}
                      handleUpgrade={handleUpgrade}
                    />
                  )
                );
              })}
            </div>
          </>
        );
      })}
    </>
    // </div>
  );
};
export default HomePage;

import { useEffect, useState } from "react";
import PostCreate from "../helpers/PostRequest";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [club, setClub] = useState([]);
  async function getClub() {
    try {
      let { data } = await PostCreate({
        url: "/plans",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log(data);
      setClub(data);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  useEffect(() => {
    getClub();
  }, []);
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
            <div className="max-w-screen-xl flex flex-wrap items-center gap-8 justify-between mx-auto p-8">
              {club.map((el) => {
                return el.day === item && <Card item={el.Exercise} />;
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

import { useEffect, useState } from "react";
import PostCreate from "../helpers/PostRequest";
import Card from "../components/Card";

const MyClub = () => {
  const [myClub, setMyClub] = useState([]);

  const getMyClub = async () => {
    try {
      let { data } = await PostCreate({
        url: `/myclubs`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log(data);
      setMyClub(data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const handleLeave = async (id) => {
    try {
      await PostCreate({
        url: `/myclubs/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      getMyClub()
    } catch (error) {
      console.log(error.response.data);
    }
  };
 
  useEffect(() => {
    getMyClub();
  }, []);
  return (
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      {myClub.map((item) => {
        return (
          <Card key={item.id} getMyClub={getMyClub} item={item} list="list" handleLeave={handleLeave} />
        );
      })}
    </div>
  );
};

export default MyClub;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostCreate from "../helpers/PostRequest";

const UpdateClub = () => {
  const { clubId, myClubId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();
  console.log(clubId, myClubId);

  const getMyClub = async () => {
    try {
      let { data } = await PostCreate({
        url: `/clubs/${myClubId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log(data);
      setTitle(data.title);
      setDescription(data.description);
      setImageUrl(data.imageUrl);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault()
      try {
        await PostCreate({
          url: `/clubs/${clubId}`,
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          data:{
            title:title,
            description:description,
            imageUrl:imageUrl
          }
        });
        navigate('/')
      } catch (error) {
        console.log(error.response.data);
      }
    };
  useEffect(() => {
    getMyClub();
    console.log(title, 'wwwwww');
  }, []);
  return (
    <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4">
      <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
        <div className="text-center mb-12">
          <a href="javascript:void(0)">
            <img
              src="https://readymadeui.com/readymadeui.svg"
              alt="logo"
              className="w-40 inline-block"
            />
          </a>
        </div>

        <form onSubmit={handleUpdate}>
          <div className="space-y-6">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Title</label>
              <input
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                name="title"
                type="text"
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter title"
              />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                name="description"
                type="textarea"
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter description"
              />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Image URL
              </label>
              <input
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                }}
                name="imageUrl"
                type="text"
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter Image URL"
              />
            </div>
          </div>

          <div className="!mt-12">
            <button
              type="submit"
              className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Create an account
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};
export default UpdateClub;

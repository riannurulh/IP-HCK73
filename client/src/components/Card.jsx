import { Link } from "react-router-dom";

const Card = ({ item }) => {

  return (
    <div className="bg-gray-800 px-8 py-10 shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-sm rounded-2xl font-[sans-serif] overflow-hidden mx-auto mt-4">
      <div className="flex flex-col items-center">
        <img
          src=""
          className="w-60 h-60 rounded-full object-cover"
        />
        <div className="mt-6 text-center">
          <p className="text-base text-gray-300 font-bold uppercase">
            {item.name}
          </p>
          {/* <form
            onSubmit={(e) => {
              e.preventDefault();
              postMyClub(item.id);
            }}
          >
            {list ? (
              <div className="flex flex-wrap gap-4">
                <Link
                to={`/update-club/${id}/${item.id}`}
                // onClick={() => {
                //     handleUpdate(item.id);
                //   }}
                  type="button"
                  className="mt-6 px-5 py-2.5 rounded-lg text-white text-sm tracking-wider font-medium border border-current outline-none bg-blue-700 hover:bg-blue-800 active:bg-blue-700"
                >
                  Update
                </Link>
                <button
                  onClick={() => {
                    handleLeave(id);
                  }}
                  type="button"
                  className="mt-6 px-5 py-2.5 rounded-lg text-white text-sm tracking-wider font-medium border border-current outline-none bg-blue-700 hover:bg-blue-800 active:bg-blue-700"
                >
                  Leave
                </button>
              </div>
            ) : (
              <button
                type="submit"
                className="mt-6 px-5 py-2.5 rounded-lg text-white text-sm tracking-wider font-medium border border-current outline-none bg-blue-700 hover:bg-blue-800 active:bg-blue-700"
              >
                Join
              </button>
            )}
          </form> */}
        </div>
      </div>
    </div>
  );
};
export default Card;

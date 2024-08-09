import { useDispatch } from "react-redux";
import { Link, useActionData } from "react-router-dom";
import { deletePlan, fetchPlans } from "../features/counter/planSlice";

const Card = ({ item, handleDelete, handleUpgrade, isLoading }) => {
  const dispatch = useDispatch;
  return (
    <div
      key={item.id}
      className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105"
    >
      <div
        className="bg-cover bg-center h-48"
        style={{
          backgroundImage: `url('https://media.istockphoto.com/id/1496130088/id/foto/wanita-kebugaran-dan-push-up-pada-mockup-untuk-latihan-latihan-atau-pelatihan-intensif-di.jpg?s=612x612&w=0&k=20&c=Ndzz6Q7KpfycAuwdacKptbAOy_VLZ161qyM5bkucunI=')`,
        }}
      >
        <div className="bg-gradient-to-t from-black via-transparent to-transparent h-full p-6 flex items-end">
          <h5 className="text-white text-xl font-bold leading-tight">
            {item.Exercise.name}
          </h5>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-700 text-base mb-4">
          {item.totalSet} SET x {item.setRepetition} reps
        </p>
        <div className="flex space-x-4">
          <button
            onClick={() => handleDelete(item.id)}
            className="py-2 px-4 bg-red-600 text-white rounded-md shadow hover:bg-red-700 transition duration-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default Card;

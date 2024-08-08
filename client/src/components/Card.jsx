import { useDispatch } from "react-redux";
import { Link, useActionData } from "react-router-dom";
import { deletePlan, fetchPlans } from "../features/counter/planSlice";

const Card = ({ item,handleDelete,handleUpgrade,isLoading }) => {
  
const dispatch = useDispatch
  return (
    <div className="w-5/12 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-[url('https://media.istockphoto.com/id/1496130088/id/foto/wanita-kebugaran-dan-push-up-pada-mockup-untuk-latihan-latihan-atau-pelatihan-intensif-di.jpg?s=612x612&w=0&k=20&c=Ndzz6Q7KpfycAuwdacKptbAOy_VLZ161qyM5bkucunI=')] bg-cover bg-blend-screen">
      <h5 className="text-gray-900 text-xl font-bold leading-tight">
        {item.Exercise.name}
      </h5>
      <p className="text-gray-700 text-base">
        {item.totalSet} SET x {item.setRepetition} 
      </p>
      <button
      onClick={()=>{handleDelete(item.id)}} 
      >
delete
      </button>
      <button
      onClick={()=>{handleUpgrade()}} 
      className="ml-4"
      >
upgrade
      </button>

    </div>
  );
};
export default Card;

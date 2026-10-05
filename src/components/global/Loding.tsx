import { FaSpinner } from "react-icons/fa";

const Loding=()=>{
    return(
        <div className="text-white text-[20px] bg-cyan-950 rounded-2xl w-[40%] mt-[100px] m-auto p-8 flex justify-baseline items-baseline">
            <FaSpinner className="animate-spin text-2xl" />
            <p className="ml-[10px]">Loding...</p>
        </div>
    );
}

export default Loding
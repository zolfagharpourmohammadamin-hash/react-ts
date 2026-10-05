import { FaGhost } from "react-icons/fa";

type PropTypes = {
  Erorr: string;
  TextEror: string;
};

const DsErorr = ({ Erorr, TextEror }: PropTypes) => {
  return (
    <div className="flex flex-col justify-self-start pt-10 rounded-4xl items-center mt-[100px] m-auto bg-cyan-900 w-[30%] h-[300px]">
      <h1 className="text-8xl mt-0 text-white drop-shadow-[0_0_20px_rgba(34,211,238,0.7)]">
        {Erorr}
      </h1>
      <h2 className="text-3xl mt-1.5 text-white drop-shadow-[0_0_20px_rgba(34,211,238,0.7)]">
        {TextEror}
      </h2>
      <FaGhost
        className="
    text-7xl text-white mt-6
     animate-[float_3s_ease-in-out_infinite]
    drop-shadow-[0_0_20px_rgba(34,211,238,0.7)]
  "
      />
    </div>
  );
};

export default DsErorr;

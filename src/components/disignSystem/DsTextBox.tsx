type PropTypes = {
  color?: "green" | "red" | "blue" | "orange" | "gray" | "cyan";
  textLable?: string;
  className?: string;
  colorLable?: "white" | "blue" | "gray" | "cyan";
  placeHold?: string;
   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  required?:boolean;
   type?: "text" | "password";
};

const DsTextBox = ({
  colorLable = "gray",
  textLable = "Name",
  color,
  className = "w-[100px]",
  onChange,
  required=false,
  value,
  type="text",
  placeHold,
}: PropTypes) => {
  let colorClass = "";
  let colorTextLabe = "";

  switch (color) {
    case "green":
      colorClass = "bg-green-600 focus:bg-green-700 text-white";
      break;
    case "red":
      colorClass = "bg-red-600 focus:bg-red-700 text-white";
      break;
    case "blue":
      colorClass = "bg-cyan-500 focus:bg-cyan-700 text-white";
      break;
    case "cyan":
      colorClass = "bg-cyan-950 focus:bg-cyan-900 text-cyan-500";
      break;
    case "orange":
      colorClass = "bg-orange-500 focus:bg-orange-700 text-white";
      break;
    case "gray":
      colorClass = "bg-gray-500 focus:bg-gray-700 text-white";
      break;
  }

  switch (colorLable) {
    case "cyan":
      colorTextLabe = "text-cyan-950";
      break;
    case "white":
      colorTextLabe = "text-white";
      break;
    case "blue":
      colorTextLabe = "text-cyan-500";
      break;
    case "gray":
      colorTextLabe = "text-gray-500";
      break;
  }



  return (
    <div className="flex flex-col gap-1.5 m-0">
      <label className={`font-bold ${colorTextLabe}`}>{textLable}</label>
      <input
        onChange={onChange}
        value={value}
        type={type}
        required={required}
        placeholder={placeHold}
        className={`${colorClass} ${colorTextLabe} ${className} m-0 rounded-[7px] p-2`}
      />
    </div>
  );
};

export default DsTextBox;

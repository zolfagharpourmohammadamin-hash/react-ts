import type { ReactElement } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type PropTypes = {
  type?: "button" | "submit" | "reset";
  color?: "green" | "red" | "blue" | "orange" | "gray" | "cyan";
  size?: "sm" | "xl" | "lg";
  text?: string;
  click?: () => void;
  icone?: ReactElement;
  clasName?: string;
  radios?: "sm" | "xl" | "lg";
  isDisabled?: boolean;
  isLoading?: boolean;
};

const DsButton = ({
  click,
  type = "button",
  text,
  color = "green",
  size = "sm",
  clasName = "flex justify-center items-center transition-all",
  icone,
  radios,
  isDisabled = false,
  isLoading = false,
}: PropTypes) => {
  let colorClass = "";
  let sizeClass = "";
  let radiosClass = "";

  switch (color) {
    case "green":
      colorClass = "bg-green-600 hover:bg-green-700 text-white";
      break;

    case "red":
      colorClass = "bg-red-600 hover:bg-red-700 text-white";
      break;

    case "blue":
      colorClass = "bg-cyan-500 hover:bg-cyan-700 text-white";
      break;

    case "cyan":
      colorClass = "bg-cyan-800 hover:bg-cyan-900 text-white";
      break;

    case "orange":
      colorClass = "bg-orange-500 hover:bg-orange-700 text-white";
      break;

    case "gray":
      colorClass = "bg-gray-500 hover:bg-gray-700 text-white";
      break;
  }

  switch (size) {
    case "xl":
      sizeClass = "text-[17px] min-w-[30px] min-h-[30px]";
      break;

    case "lg":
      sizeClass = "text-[14px] min-w-[25px] min-h-[25px]";
      break;

    case "sm":
      sizeClass = "text-[13px] min-w-[20px] min-h-[20px]";
      break;
  }

  switch (radios) {
    case "xl":
      radiosClass = "rounded-[13px]";
      break;

    case "lg":
      radiosClass = "rounded-[8px]";
      break;

    case "sm":
      radiosClass = "rounded-[6px]";
      break;
  }

  return (
    <button
      type={type}
      onClick={click}
      disabled={isDisabled || isLoading}
      className={`
        ${clasName}
        py-2.5 px-3
        font-bold
        flex flex-row-reverse justify-center items-center gap-2
        ${colorClass}
        ${radiosClass}
        ${sizeClass}
        ${
          isDisabled || isLoading
            ? "opacity-50 cursor-not-allowed"
            : ""
        }
      `}
    >
      {isLoading ? (
        <AiOutlineLoading3Quarters
          className="animate-spin"
          size={18}
        />
      ) : (
        <>
          {text}
          {icone}
        </>
      )}
    </button>
  );
};

export default DsButton;
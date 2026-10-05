type PropTypes = {
  text: string,
  color?: "white" | "cyan" ,
   className?: string
}

const Typography = ({className="ml-[50px] dark:text-white", text , color ="cyan"}:PropTypes )=> {
let colorClass="";
  switch (color) {
    case "white":
      colorClass = "text-white";
      break;
      case "cyan":
      colorClass = "text-cyan-950";
      break;
  }
  return (
    <>
      <div>
        <h1 className={`${className} ${colorClass}  text-4xl font-black `}>{text}</h1>
      </div>
    </>
  );
};

export default Typography;

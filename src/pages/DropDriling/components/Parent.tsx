import Children from "./Children";

const Parent = () => {
  return (
    <>
      <div className="bg-slate-300 rounded-2xl w-[90%] m-auto p-5">
        <h1>
          parent component
        </h1>
        <Children />
      </div>
    </>
  );
};

export default Parent;
